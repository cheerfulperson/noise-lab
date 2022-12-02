import { Button } from "@mui/material";
import { Help } from "@mui/icons-material";
import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router";

import styles from "./Header.module.scss";
import { EAppRoutes } from "../../router/router.config";

export const Header = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Button
          variant={
            location.pathname === EAppRoutes.MAIN || location.pathname === "/"
              ? "contained"
              : "outlined"
          }
          onClick={() => navigate(EAppRoutes.MAIN)}
        >
          Главная
        </Button>
        <Button
          variant={
            location.pathname.includes(EAppRoutes.MATERIAL)
              ? "contained"
              : "outlined"
          }
          onClick={() => navigate(EAppRoutes.MATERIAL)}
        >
          Теор. материал
        </Button>
        <Button
          variant={
            location.pathname.includes(EAppRoutes.WORK_TRIP)
              ? "contained"
              : "outlined"
          }
          onClick={() => navigate(EAppRoutes.WORK_TRIP)}
        >
          ход работы
        </Button>
        <Button
          variant={
            location.pathname.includes(EAppRoutes.MAKET)
              ? "contained"
              : "outlined"
          }
          onClick={() => navigate(EAppRoutes.MAKET)}
        >
          Учебный макет
        </Button>
        <Button
          variant={
            location.pathname.includes(EAppRoutes.CONCLUDE)
              ? "contained"
              : "outlined"
          }
          onClick={() => navigate(EAppRoutes.CONCLUDE)}
        >
          заключение
        </Button>
        <Button
          variant={
            location.pathname.includes(EAppRoutes.APP_INFO)
              ? "contained"
              : "outlined"
          }
          onClick={() => navigate(EAppRoutes.APP_INFO)}
        >
          <Help />
        </Button>
      </div>
    </header>
  );
};
