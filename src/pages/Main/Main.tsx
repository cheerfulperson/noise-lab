import { Button } from "@mui/material";
import { ReactElement } from "react";
import { useNavigate } from "react-router";

import { EAppRoutes } from "../../router";
import { Image } from "../../components";
import bg from "../../assets/images/background.png";
import styles from "./Main.module.scss";

export const Main = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.main} style={{ backgroundImage: `url(${bg})` }}>
      <h2 className={styles.main__title}>Приветствуем вас!</h2>
      <p className={styles.main__subtitle}>Лабораторная работа</p>
      <p className={styles.main__name}>
        “Влияние помех на искажение информации, представляемой в аналоговой и
        цифровой формах”
      </p>
      <Image imageType="book" className={styles.main__image} />
      <div className={styles.main__button}>
        <Button
          variant="contained"
          onClick={() => navigate(EAppRoutes.WORK_TRIP)}
        >
          начать работу
        </Button>
      </div>
    </div>
  );
};
