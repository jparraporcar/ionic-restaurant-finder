import { IonButton, IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import { Record } from "../store/locationSlice";

interface ISheetModalBodyProps {
  records: Record[];
  onCustomClick: () => void;
}

const sheetModalBody = (props: ISheetModalBodyProps) => {
  return (
    <>
      <IonGrid>
        <IonRow className="ion-align-items-center ion-justify-content-between">
          <IonCol size="9" className="ion-no-margin">
            <IonSearchbar />
          </IonCol>
          <IonCol size="3" className="ion-no-margin">
            <IonButton style={{ height: "36px" }} onClick={props.onCustomClick}>
              Close
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default sheetModalBody;
