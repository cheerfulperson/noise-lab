import { ReactElement } from "react";
import Typography from "@mui/material/Typography";

import styles from "./AnalogConclude.module.scss";

export const AnalogConclude = (): ReactElement => {
  return (
    <div className={styles.analog_conclude}>
      <ul className={styles.analog_conclude__list}>
        <li>
          <Typography marginTop={"8px"}>
            Сделать вывод о том какая помеха самая опасная и влечет за собой
            сильное ухудшение сигнала.
          </Typography>
        </li>
        <li>
          <Typography marginTop={"8px"}>
            Сделать вывод о заметности помех на разных уровнях яркости
            изображения.
          </Typography>
        </li>
        <li>
          <Typography marginTop={"8px"}>
            Как влияют на качество ТВ изображения периодические, импульсные и
            флуктуационные помехи?
          </Typography>
        </li>
      </ul>
    </div>
  );
};
