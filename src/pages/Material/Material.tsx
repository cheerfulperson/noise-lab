import { ReactElement } from "react";

import pdf from '../../../public/assets/files/info.pdf';
import styles from './Material.module.scss';

export const Material = (): ReactElement => {
  return (
    <div>
      <iframe className={styles.iframe} src={pdf}></iframe>
    </div>
  );
};
