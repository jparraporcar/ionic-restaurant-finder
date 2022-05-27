import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import "./MapOverlay.css";
import {
  paperPlaneOutline,
  callOutline,
  arrowForwardOutline,
  recording,
} from "ionicons/icons";
import { Record } from "../store/locationSlice";

interface IMapOverlay {
  record: Record;
}

const MapOverlay = (props: IMapOverlay) => {
  return (
    <IonCard className="card-main">
      <IonText>
        <h1 className="card-main__business-name">{props.record.name}</h1>
      </IonText>
      <IonText>
        <h3>{props.record.displayAddress}</h3>
      </IonText>
      <IonText>
        <h1 className="card-main__rating">{`${props.record.rating} star rating`}</h1>
      </IonText>
      <IonGrid className="ion ion-no-margin ion-no-padding">
        <IonRow>
          <IonCol size="12" style={{ height: "30px" }}>
            <IonItem lines="none">
              <IonIcon
                style={{ marginRight: "10px" }}
                size="small"
                icon={paperPlaneOutline}
                slot="start"
              />
              <IonText>
                <h4>{`${props.record.distance} miles away`}</h4>
              </IonText>
            </IonItem>
          </IonCol>
          <IonCol size="12" style={{ height: "30px" }}>
            <IonItem lines="none">
              <IonIcon
                style={{ marginRight: "10px" }}
                size="small"
                icon={callOutline}
                slot="start"
              />
              <IonText>
                <h4>{props.record.phone}</h4>
              </IonText>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonButton
              style={{ marginTop: "15px" }}
              size="small"
              shape="round"
              expand="full"
            >
              View
              <IonIcon size="small" icon={arrowForwardOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="6">
            <IonButton
              className="button-calloutline"
              size="small"
              shape="round"
              expand="full"
            >
              <IonIcon size="small" icon={callOutline} slot="icon-only" />
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton
              className="button-paperoutline"
              size="small"
              shape="round"
              expand="full"
            >
              <IonIcon size="small" icon={paperPlaneOutline} slot="icon-only" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default MapOverlay;
