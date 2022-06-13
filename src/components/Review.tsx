import { IonAvatar, IonButton, IonCard, IonItem, IonText } from "@ionic/react";
import { Review } from "../store/detailsSlice";

interface IPropsReview {
  reviewDetails: Review;
}

const ReviewComponent: React.FC<IPropsReview> = (props) => {
  return (
    <>
      <IonCard className="ion-margin ion-padding">
        <IonItem lines="none">
          <IonAvatar slot="start">
            <img
              src={props.reviewDetails.user.image_url}
              style={{ width: "70px" }}
            />
          </IonAvatar>
          <IonText slot="start">{props.reviewDetails.user.name}</IonText>
          <IonButton slot="end">FULL REVIEW ON YELP</IonButton>
        </IonItem>
        <IonText>{props.reviewDetails.text}</IonText>
      </IonCard>
    </>
  );
};

export default ReviewComponent;
