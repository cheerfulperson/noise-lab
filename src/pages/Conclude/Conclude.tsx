import { ReactElement } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import styles from "./Conclude.module.scss";

export const Conclude = (): ReactElement => {
  return (
    <div className={styles.conclude}>
      <h2 className={styles.conclude__title}>Содержание отчета</h2>
      <List className={styles.conclude__list}>
        {[
          "Цель работы.",
          "Результаты расчетов.",
          "Результаты исследований (данные измерений, графики, пояснение результатов измерений и расчетов, выводы).",
          "Вывод по выполенной работе.",
        ].map((value, i) => (
          <ListItem key={value}>
            <ListItemText><strong>{i + 1}.</strong> {value}</ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
