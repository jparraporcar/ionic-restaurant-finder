import { IonButton, IonCol, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import { Record } from "../store/locationSlice";

interface ISheetModalBodyProps {
  records: Record[];
}

const sheetModalBody = (props: ISheetModalBodyProps) => {
  return (
    <>
      <IonGrid>
        <IonRow className="ion-align-items-center ion-justify-content-between">
          <IonCol className="ion-no-margin">
            <IonSearchbar />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default sheetModalBody;
