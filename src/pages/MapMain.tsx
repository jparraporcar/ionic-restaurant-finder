import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonLoading,
  IonModal,
} from "@ionic/react";
import "./MapMain.css";
import "../components/MapOverlay.css";
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { useCallback, useEffect, useState } from "react";
import { flashOutline, listOutline, flashOff } from "ionicons/icons";
import { getPosition } from "../utils/getPosition";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setPosition, setRecords, setResults } from "../store/locationSlice";
import { maptiler } from "pigeon-maps/providers";
import MapOverlay from "../components/MapOverlay";
import SheetModalBody from "../components/SheetModalBody";

type Coordinates = [number, number] | null;

const MapMain: React.FC = (props) => {
  const [zoom, setZoom] = useState(14);
  const [newPositionMode, setNewPositionMode] = useState<boolean>(false);
  const [newAnchor, setNewAnchor] = useState<Coordinates>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const positionState = useSelector(
    (state: RootState) => state.locationReducer
  );
  const dispatch = useDispatch();
  const maptileProvider = maptiler("d5JQJPLLuap8TkJJlTdJ", "streets");
  const toggleNewLocation = () =>
    setNewPositionMode((prevState) => {
      return !prevState;
    });

  // const baseUrl = "http://192.168.0.149:4000"; // for connecting a physical
  const baseUrl = "http://localhost:4000";

  const fetchAndSetPosition = useCallback(async () => {
    try {
      // const fetchedPosition = await getPosition();
      dispatch(
        setPosition({
          latitude: 40.8264691,
          longitude: -73.9549618,
          // latitude: fetchedPosition.coords.latitude,
          // longitude: fetchedPosition.coords.longitude,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAndSetPosition();
  }, [fetchAndSetPosition]);

  const fetchAndSetRecords = useCallback(async () => {
    if (positionState.latitude && positionState.longitude) {
      const data = await fetch(
        `${baseUrl}/get-records?latitude=${positionState.latitude}&longitude=${positionState.longitude}&radius=1000`
      );
      const response = await data.json();
      dispatch(setRecords(response.allRecords));
      dispatch(setResults(response.allRecords));
    }
  }, [positionState.latitude, positionState.longitude, dispatch]);

  useEffect(() => {
    fetchAndSetRecords();
  }, [fetchAndSetRecords]);

  const onClickSetPosition = async ({
    event,
    latLng,
    pixel,
  }: {
    event: MouseEvent;
    latLng: [number, number];
    pixel: [number, number];
  }) => {
    if (!newPositionMode) {
      return;
    }
    setNewAnchor([latLng[0], latLng[1]]);
    await fetchAndSetRecords();
    dispatch(
      setPosition({
        latitude: latLng[0],
        longitude: latLng[1],
      })
    );
  };

  const showInfoHandler = (index: number) => {
    const tempResults = JSON.parse(JSON.stringify(positionState.results));
    !tempResults[index].showInfo &&
      tempResults.map((result: any) => (result.showInfo = false));
    tempResults[index].showInfo = !tempResults[index].showInfo;
    dispatch(setResults(tempResults));
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {!positionState.latitude ? (
          <IonLoading isOpen={!positionState.latitude ? true : false} />
        ) : (
          <Map
            provider={maptileProvider}
            defaultZoom={zoom}
            defaultCenter={[positionState.latitude!, positionState.longitude!]}
            touchEvents={true}
            center={[positionState.latitude!, positionState.longitude!]}
            zoom={zoom}
            onClick={onClickSetPosition}
          >
            <ZoomControl
              style={{
                left: 20,
                top: 50,
              }}
              buttonStyle={{
                paddingLeft: "5px",
                paddingRight: "5px",
                width: "40px",
                margin: "4px",
              }}
            />
            {newAnchor && (
              <Marker
                width={50}
                anchor={[newAnchor[0], newAnchor[1]]}
                color="red"
              />
            )}

            {positionState.results.map((result, index) => {
              if (result.showInfo) {
                return (
                  <Overlay
                    className="marker-overlay"
                    key={index}
                    anchor={[result.latitude, result.longitude]}
                    offset={[105, 14]}
                  >
                    <MapOverlay record={result} />
                  </Overlay>
                );
              }
              return "";
            })}

            {positionState.results.map((el, index) => (
              <Marker
                key={index}
                payload={index}
                width={50}
                anchor={[el.latitude, el.longitude]}
                onClick={({ event, anchor, payload }) =>
                  showInfoHandler(payload)
                }
              />
            ))}
          </Map>
        )}
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={listOutline} />
          </IonFabButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={toggleNewLocation}>
            <IonIcon icon={newPositionMode ? flashOff : flashOutline} />
          </IonFabButton>
        </IonFab>
        <IonModal
          breakpoints={[0, 0.3, 0.6, 1]}
          initialBreakpoint={0.3}
          backdropBreakpoint={0.6}
          isOpen={showModal}
          onDidDismiss={closeModalHandler}
        >
          <SheetModalBody
            results={positionState.results}
            closeModal={closeModalHandler}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default MapMain;
