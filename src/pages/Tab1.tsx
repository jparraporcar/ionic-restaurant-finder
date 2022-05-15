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

type Coordinates = [number, number];

const Tab1: React.FC = () => {
  const [zoom, setZoom] = useState(15);
  const [newLocationMode, setNewLocationMode] = useState<boolean>(false);
  const positionState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const maptileProvider = maptiler("d5JQJPLLuap8TkJJlTdJ", "streets");

  const toggleNewLocation = () =>
    setNewLocationMode((prevState) => {
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
  }, [positionState.latitude, positionState.longitude]);

  useEffect(() => {
    console.log("executing useEffect 2...");
    fetchAndSetRecords();
  }, [fetchAndSetRecords]);

  console.log("about to render...");
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
            onBoundsChanged={({ center, zoom }) => {
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
            <ZoomControl style={{ left: 20, top: 50 }} />
            {positionState.records.length > 0 &&
              positionState.records.map((el, i) => (
                <Marker
                  key={i}
                  width={50}
                  anchor={[el.latitude, el.longitude]}
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
            <IonIcon icon={newLocationMode ? flashOff : flashOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
