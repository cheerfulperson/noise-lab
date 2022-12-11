import { ReactElement, useCallback } from "react";

import Pdf from '../../../public/assets/files/trip.pdf';
import styles from "./WorkTrip.module.scss";


export const WorkTrip = (): ReactElement => {
  return (
    <div className={styles.work_trip}>
      <iframe src={Pdf} className={styles.work_trip__iframe} ></iframe>
    </div>
  );
};
