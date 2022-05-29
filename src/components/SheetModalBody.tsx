import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonSearchbar,
  SearchbarChangeEventDetail,
  SearchbarCustomEvent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Record, setFiltered } from "../store/locationSlice";
import SingleRecord from "./SingleRecord";

interface ISheetModalBodyProps {
  records: Record[];
  closeModal: () => void;
}

const SheetModalBody = (props: ISheetModalBodyProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();

  const searchHandler = (event: CustomEvent<SearchbarChangeEventDetail>) => {
    setSearchText(event.detail.value!);
  };

  useEffect(() => {
    dispatch(setFiltered(searchText));
    console.log("executing useEffect 3");
  }, [searchText]);

  return (
    <>
      <IonGrid className="ion-no-margin">
        <IonRow className="ion-align-items-center ion-justify-content-between">
          <IonCol className="ion-no-margin">
            <IonSearchbar value={searchText} onIonChange={searchHandler} />
          </IonCol>
        </IonRow>
        <IonRow>
          <div style={{ overflow: "scroll", height: "90vh" }}>
            {props.records.map((record, index) => {
              return (
                <SingleRecord
                  key={index}
                  id={record.id}
                  record={record}
                  onCustomClick={props.closeModal}
                />
              );
            })}
          </div>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default SheetModalBody;
