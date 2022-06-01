import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useSelector } from "react-redux";
import SingleRecord from "../components/SingleRecord";
import { RootState } from "../store/store";
import "./RecordsList.css";

const RecordsList: React.FC = () => {
  const recordsState = useSelector((state: RootState) => state.records);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All places in your location</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feeling hungry?</IonTitle>
          </IonToolbar>
        </IonHeader>
        {recordsState.map((record, index) => {
          return (
            <SingleRecord
              key={index}
              id={record.id}
              record={record}
              imageURL={record.imageURL}
            />
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default RecordsList;
