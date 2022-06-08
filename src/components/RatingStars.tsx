import { IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";
import { FC } from "react";

import "./RatingStars.css";

interface IRatingStars {
  ratingBool: boolean[];
}

const RatingStar: FC<IRatingStars> = (props) => {
  return (
    <>
      {props.ratingBool.map((value, index) => {
        return (
          <div key={index}>
            <IonIcon icon={star} className={value ? "starblue" : "stargrey"} />
          </div>
        );
      })}
    </>
  );
};

export default RatingStar;
