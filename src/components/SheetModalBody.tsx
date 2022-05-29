import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonSearchbar,
} from "@ionic/react";
import { Record } from "../store/locationSlice";
import SingleRecord from "./SingleRecord";

interface ISheetModalBodyProps {
  records: Record[];
  closeModal: () => void;
}

const sheetModalBody = (props: ISheetModalBodyProps) => {
  return (
    <>
      <IonGrid className="ion-no-margin">
        <IonRow className="ion-align-items-center ion-justify-content-between">
          <IonCol className="ion-no-margin">
            <IonSearchbar />
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

export default sheetModalBody;
