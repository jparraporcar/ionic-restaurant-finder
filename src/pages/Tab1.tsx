import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonPopover,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { useCallback, useEffect, useState } from "react";
import { flashOutline, listOutline, flashOff } from "ionicons/icons";
import { getPosition } from "../utils/getPosition";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setPosition, setRecords } from "../store/locationSlice";
import { maptiler } from "pigeon-maps/providers";

type Coordinates = [number, number] | null;

const Tab1: React.FC = () => {
  const [zoom, setZoom] = useState(15);
  const [newPositionMode, setNewPositionMode] = useState<boolean>(false);
  const [newAnchor, setNewAnchor] = useState<Coordinates>(null);
  const [popoverState, setShowPopover] = useState<{
    showPopover: boolean;
    event: Event | null;
  }>({ showPopover: false, event: null });
  const positionState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const maptileProvider = maptiler("d5JQJPLLuap8TkJJlTdJ", "streets");

  const toggleNewLocation = () =>
    setNewPositionMode((prevState) => {
      return !prevState;
    });

  const baseUrl = "http://localhost:4000";

  const fetchAndSetPosition = useCallback(async () => {
    console.log("...fetching and setting...");
    try {
      const fetchedPosition = await getPosition();
      dispatch(
        setPosition({
          latitude: fetchedPosition.coords.latitude,
          longitude: fetchedPosition.coords.longitude,
          records: [],
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("executing useEffect 1...");
    fetchAndSetPosition();
  }, [fetchAndSetPosition]);

  const fetchAndSetRecords = useCallback(async () => {
    if (positionState.latitude && positionState.longitude) {
      const data = await fetch(
        `${baseUrl}/get-records?latitude=${positionState.latitude}&longitude=${positionState.longitude}&radius=3000`
      );
      const response = await data.json();
      dispatch(
        setRecords({
          latitude: positionState.latitude,
          longitude: positionState.longitude,
          records: response.allRecords,
        })
      );
    }
  }, [positionState.latitude, positionState.longitude, dispatch]);

  useEffect(() => {
    console.log("executing useEffect 2...");
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
        records: positionState.records,
      })
    );
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {!(positionState.latitude && positionState.longitude) ? (
          <p>...Loading</p>
        ) : (
          <Map
            provider={maptileProvider}
            defaultZoom={zoom}
            defaultCenter={[positionState.latitude!, positionState.longitude!]}
            touchEvents={true}
            center={[positionState.latitude!, positionState.longitude!]}
            zoom={zoom}
            onClick={onClickSetPosition}
            onBoundsChanged={({ center, zoom }) => {
              if (newPositionMode) {
                return;
              }
              setNewAnchor(null);
              const updatedLatitude = center[0];
              const udpatedLongitude = center[1];
              setZoom(zoom);
              dispatch(
                setPosition({
                  latitude: updatedLatitude,
                  longitude: udpatedLongitude,
                  records: positionState.records,
                })
              );
            }}
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
            <IonPopover
              showBackdrop={false}
              event={popoverState.event}
              isOpen={popoverState.showPopover}
              onDidDismiss={() =>
                setShowPopover({ showPopover: false, event: null })
              }
            >
              <p>This is popover content</p>
            </IonPopover>
            {positionState.records.length > 0 &&
              positionState.records.map((el, i) => (
                <Marker
                  key={i}
                  width={50}
                  anchor={[el.latitude, el.longitude]}
                  onClick={(event) => {
                    event.event.persist();
                    console.log("within the marker event");
                    setShowPopover({ showPopover: true, event: event.event });
                  }}
                />
              ))}
          </Map>
        )}
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton>
            <IonIcon icon={listOutline} />
          </IonFabButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={toggleNewLocation}>
            <IonIcon icon={newPositionMode ? flashOff : flashOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
