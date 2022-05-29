import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { arrowForwardOutline, paperPlaneOutline } from "ionicons/icons";
import { Record } from "../store/locationSlice";
import "./SingleRecord.css";

interface ISingleRecord {
  record: Record;
  id: string;
  onCustomClick: () => void;
}

const SingleRecord: React.FC<ISingleRecord> = (props) => {
  return (
    <IonCard
      type="button"
      routerLink={`/list/${props.id}`}
      onClick={props.onCustomClick}
    >
      <IonCardSubtitle className="ion-margin">
        {props.record.name}
      </IonCardSubtitle>
      <IonNote style={{ display: "block", margin: "0 16px" }}>
        {props.record.displayAddress}
      </IonNote>
      <IonItem className="ion-margin" lines="none">
        <IonLabel color="primary" style={{ fontSize: "15px" }}>
          {props.record.distance} miles away
        </IonLabel>
        <IonIcon
          icon={paperPlaneOutline}
          slot="start"
          size="small"
          color="primary"
        />
        <IonButton slot="end" style={{ width: "50px", height: "30px" }}>
          <IonIcon icon={arrowForwardOutline} />
        </IonButton>
      </IonItem>
    </IonCard>
  );
};

export default SingleRecord;
