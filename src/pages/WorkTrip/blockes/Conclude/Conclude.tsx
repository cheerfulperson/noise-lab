import { ReactElement } from "react";
import Typography from "@mui/material/Typography";

import styles from "./Conclude.module.scss";

export const Conclude = (): ReactElement => {
  return (
    <div className={styles.conclude}>
      <Typography marginTop={"8px"}>
        Сделать вывод о влиянии помех на искажение информации, представляемой в
        аналоговой и цифровой формах.
      </Typography>
      <Typography marginTop={"8px"}>
        Сделать вывод о том какой сигнал лучше использовать.
      </Typography>
    </div>
  );
};
