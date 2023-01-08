import { ReactElement } from "react";

import pdf from '../../assets/files/info.pdf';
import styles from './Material.module.scss';

export const Material = (): ReactElement => {
  return (
    <div>
      <iframe title="Material" className={styles.iframe} src={pdf}></iframe>
    </div>
  );
};
