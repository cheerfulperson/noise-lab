import { Button } from "@mui/material";
import { Help } from "@mui/icons-material";
import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import { EAppRoutes } from "../../types";

export const Header = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  const openTrip = (): void => {
    if (typeof window !== 'undefined' && window.electron) {
      window.electron.openTrip();
    }
  }

  const openMaterial = (): void => {
    if (typeof window !== 'undefined' && window.electron) {
      window.electron.openMaterial();
    }
  }

  const openMeth = (): void => {
    if (typeof window !== 'undefined' && window.electron) {
      window.electron.openMeth();
    }
  }

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
            "outlined"
          }
          onClick={openMaterial}
        >
          Теор. материал
        </Button>
        <Button
          variant={
            location.pathname.includes(EAppRoutes.MATERIAL)
              ? "contained"
              : "outlined"
          }
          onClick={openMeth}
        >
          Методика иссл.
        </Button>
        <Button
          variant={
            "outlined"
          }
          onClick={openTrip}
        >
          Задание
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
          Содержание отчета
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
