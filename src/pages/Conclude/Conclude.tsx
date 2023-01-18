import { ReactElement } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import styles from "./Conclude.module.scss";
import { styled } from "@mui/material";

const StyledItem = styled(ListItem)`
  padding-top: 0px;
  padding-bottom: 0px;
`;

export const Conclude = (): ReactElement => {
  return (
    <div className={styles.conclude}>
      <h2 className={styles.conclude__title}>Cодержание отчета</h2>
      <div className={styles.conclude__wrapper}>
        <List className={styles.conclude__list}>
          {[
            "Цель работы.",
            [
              `В отчете по лабораторной работе обязательно должна быть указана цель (цели)
          лабораторной работы. Допускается указать задачи, на которые была разбита цель.`,
              ` В конце теоретических сведений помещается описание лабораторного
          макета.`,
            ],
            "Расчетная часть",
            [
              `В начале расчётной части указываются исходные данные по
          лабораторной работе.`,
              `Приводятся все данные и расчеты, необходимые для
          достижения цели (целей) лабораторной работы.`,
            ],
            "Пояснить результаты расчетов.",
            "Вывод по выполенной работе.",
            [
              ` Отчет по лабораторной работе обязательно должен содержать выводы по
          лабораторной работе.`,
              `Выводы по лабораторной работе должны отражать факт достижения цели
          лабораторной работы.`,
            ],
          ].map((value, i) => {
            if (typeof value === "string") {
              return (
                <StyledItem key={value}>
                  <ListItemText>
                    <strong>{i + 1}.</strong> {value}
                  </ListItemText>
                </StyledItem>
              );
            }
            return (
              <StyledItem key={value.join(".")}>
                <List>
                  {value.map((value, k) => (
                    <StyledItem key={value}>
                      <ListItemText>
                        <strong>
                          {i}.{k + 1}.
                        </strong>{" "}
                        {value}
                      </ListItemText>
                    </StyledItem>
                  ))}
                </List>
              </StyledItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};
