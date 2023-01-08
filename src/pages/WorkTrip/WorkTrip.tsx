import { ReactElement } from "react";

import Pdf from '../../assets/files/trip.pdf';
import styles from "./WorkTrip.module.scss";


export const WorkTrip = (): ReactElement => {
  return (
    <div className={styles.work_trip}>
      <iframe title="workTrip" src={Pdf} className={styles.work_trip__iframe} ></iframe>
    </div>
  );
};
