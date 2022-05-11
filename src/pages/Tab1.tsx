import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { Map } from "pigeon-maps";
import { useEffect, useState } from "react";
import { flashOutline, listOutline, flashOff } from "ionicons/icons";

type Coordinates = [number, number];

const Tab1: React.FC = () => {
  const [center, setCenter] = useState<Coordinates>([50.879, 4.6997]);
  const [zoom, setZoom] = useState(11);
  const [newLocationMode, setNewLocationMode] = useState<boolean>(false);

  const toggleNewLocation = () => setNewLocationMode((prevState) => !prevState);

  const baseUrl = "http://localhost:4000";

  const fetchData = async () => {
    try {
      const data = await fetch(`${baseUrl}/get-categories`);
      const response = await data.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Map
          center={center}
          zoom={zoom}
          onBoundsChanged={({ center, zoom }) => {
            console.log(center);
            console.log(zoom);
            setCenter(center);
            setZoom(zoom);
          }}
        />
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
