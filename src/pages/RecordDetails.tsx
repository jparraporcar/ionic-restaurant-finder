import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonLoading,
  IonBadge,
  IonItem,
  IonIcon,
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonText,
  IonImg,
} from "@ionic/react";
import { arrowForward, arrowForwardOutline, call } from "ionicons/icons";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReviewComponent from "../components/Review";
import {
  ReviewsDetails,
  setRecordDetails,
  setReviews,
  TDetails,
} from "../store/detailsSlice";
import { RootState } from "../store/store";
import "./RecordDetails.css";

const RecordDetails: FC = (props) => {
  const detailsState = useSelector((state: RootState) => {
    return state.detailsReducer;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const params = useParams<{ id: string }>();
  console.log(params.id);

  const baseUrl = "http://52.207.36.30:8080"; // for connecting a physical
  // const baseUrl = "http://localhost:4000";

  const fetchRecordAndReviewsDetails = async () => {
    const responseRecord = await fetch(`${baseUrl}/get-record?id=${params.id}`);
    const detailsFetched = (await responseRecord.json()) as TDetails;
    dispatch(setRecordDetails(detailsFetched));

    const responseReviews = await fetch(
      `${baseUrl}/get-reviews?id=${params.id}`
    );
    const reviewsFetched = (await responseReviews.json()) as ReviewsDetails;
    dispatch(setReviews(reviewsFetched));

    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecordAndReviewsDetails();
  }, [params.id]);

  if (isLoading) {
    return (
      <IonLoading isOpen={isLoading} message="Fetching business details..." />
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="All Places" defaultHref="/map" />
          </IonButtons>
          <IonLabel slot="end" style={{ marginRight: "25px" }}>
            {detailsState.recordDetails.name}
          </IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="full">
          <IonBadge
            slot="start"
            style={{ margin: "24px", marginRight: "10px", maxWidth: "95px" }}
          >
            {detailsState.recordDetails.categories[0].alias}
          </IonBadge>
          <IonBadge slot="start" style={{ maxWidth: "95px" }}>
            {detailsState.recordDetails.categories[0].title}
          </IonBadge>
          <IonButton
            fill="outline"
            slot="end"
            color="primary"
            style={{ marginRight: "10px" }}
            href={detailsState.recordDetails.url}
            target="_blank"
          >
            View on Yelp
            <IonIcon icon={arrowForward} color="primary" size="small" />
          </IonButton>
        </IonItem>
        <IonGrid style={{ margin: "16px 24px" }} className="ion-no-padding">
          <IonRow className="ion-no-margin">
            <IonCol size="6" className="ion-no-margin">
              <IonButton
                expand="full"
                shape="round"
                style={{ marginRight: "10px" }}
              >
                <IonIcon icon={call} />
              </IonButton>
            </IonCol>
            <IonCol size="6" className="ion-no-margin">
              <IonButton
                expand="full"
                shape="round"
                style={{ marginLeft: "10px" }}
              >
                View on map
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonText color="primary" style={{ marginLeft: "24px" }}>
          Photos {`(${detailsState.recordDetails.photos.length})`}
        </IonText>
        <IonGrid style={{ padding: "8px" }}>
          <IonRow className="ion-justify-content-between">
            {detailsState.recordDetails.photos.map((photoUrl, index) => {
              return (
                <IonCol size="4" key={index} style={{ padding: "8px" }}>
                  <IonImg src={photoUrl} />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
        <IonText color="primary" style={{ marginLeft: "24px" }}>
          Reviews {`(${detailsState.reviewsDetails.reviews!.length})`}
        </IonText>
        <IonGrid>
          <IonRow>
            {detailsState.reviewsDetails.reviews?.map((review, index) => {
              return <ReviewComponent reviewDetails={review} />;
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RecordDetails;
