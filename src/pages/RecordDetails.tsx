import {
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonLabel,
} from "@ionic/react";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  IDetailsState,
  setRecordDetails,
  TDetails,
} from "../store/detailsSlice";
import { RootState } from "../store/store";

const RecordDetails: FC = (props) => {
  const detailsState = useSelector((state: RootState) => {
    return state.detailsReducer.recordDetails as TDetails;
  });

  const dispatch = useDispatch();

  const params = useParams<{ id: string }>();
  console.log(params.id);

  const fetchRecordDetails = async () => {
    const response = await fetch(
      `http://localhost:4000/get-record?id=${params.id}`
    );
    const detailsFetched = (await response.json()) as TDetails;
    dispatch(setRecordDetails(detailsFetched));
  };

  useEffect(() => {
    fetchRecordDetails();
  }, [params.id]);

  if (!detailsState) {
    return <>...There is an issue</>;
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="All Places" defaultHref="/map" />
            </IonButtons>
            <IonLabel>{detailsState!.name}</IonLabel>
          </IonToolbar>
        </IonHeader>
        <div>...this is a test content</div>
        <div>{params.id}</div>
      </IonContent>
    </IonPage>
  );
};

export default RecordDetails;
