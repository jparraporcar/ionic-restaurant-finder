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
import { useDispatch, useSelector } from "react-redux";
import { Record, setResults } from "../store/locationSlice";
import { RootState } from "../store/store";
import SingleRecord from "./SingleRecord";

interface ISheetModalBodyProps {
  results: Record[];
  closeModal: () => void;
}

const SheetModalBody = (props: ISheetModalBodyProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();
  const recordsState = useSelector((state: RootState) => state.records);
  const resultsState = useSelector((state: RootState) => state.results);

  const searchHandler = (event: CustomEvent<SearchbarChangeEventDetail>) => {
    setSearchText(event.detail.value!);
  };

  useEffect(() => {
    let filteredRecords: Record[] = [];

    if (searchText.trim().toLowerCase() !== "") {
      recordsState.forEach((record: Record) => {
        if (
          record.name.toLowerCase().includes(searchText.trim().toLowerCase())
        ) {
          filteredRecords.push(record);
        }
      });
      dispatch(setResults(filteredRecords));
    } else {
      dispatch(setResults(recordsState));
    }
  }, [searchText, dispatch]);

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
            {props.results.map((result, index) => {
              return (
                <SingleRecord
                  key={index}
                  id={result.id}
                  record={result}
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
