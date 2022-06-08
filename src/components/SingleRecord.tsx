import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { arrowForwardOutline, paperPlaneOutline } from "ionicons/icons";
import { Record } from "../store/locationSlice";
import RatingStars from "./RatingStars";
import "./SingleRecord.css";
import { ratingHelper } from "../utils/functionHelpers";

interface ISingleRecord {
  record: Record;
  id: string;
  onCustomClick?: () => void;
  imageURL?: string;
}

const SingleRecord: React.FC<ISingleRecord> = (props) => {
  const ratingBool = ratingHelper(props.record.rating);
  return (
    <IonCard
      type="button"
      routerLink={`/list/${props.id}`}
      onClick={props.onCustomClick}
      style={props.imageURL ? { height: "450px" } : {}} //
    >
      {props.imageURL ? (
        <img
          alt="business"
          src={props.record.imageURL}
          style={{ height: "250px", width: "100%", objectFit: "cover" }}
        />
      ) : null}
      <div className="container-star">
        <RatingStars ratingBool={ratingBool} />
      </div>
      <IonCardSubtitle className="ion-margin" style={{ marginLeft: "16px" }}>
        {props.record.name}
      </IonCardSubtitle>
      <IonNote style={{ display: "block", margin: "0 16px" }}>
        {props.record.displayAddress}
      </IonNote>
      <IonItem
        className="ion-margin"
        lines="none"
        style={{ marginLeft: "16px" }}
      >
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
