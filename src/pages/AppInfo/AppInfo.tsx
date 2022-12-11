import { ReactElement } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Image } from "../../components";
import { signalsNaming } from "../../context";
import styles from "./AppInfo.module.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const AppInfo = (): ReactElement => {
  return (
    <div className={styles.app_info}>
      <h2 className={styles.app_info__title}>Информация о приложении</h2>
      <Stack spacing={1}>
        <Item
          style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
        >
          Данное приложение является программным обеспечением, доступным
          студентам для использования только в учебных целях. Вся навигация по
          приложения предельна проста и все кнопки подписаны, при нажатии на
          которые будут происходить какие-либо действия.
        </Item>
        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item>
              <Image imageType="info5" className={styles.app_info__big_image} />
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              Слева расположен телефон, на котором вы выбираете изображение и
              настраиваете полезный сигнал. Справа же телефон, на котором
              отображается сигнал под воздействием помех. По центру расположена
              некоторая информация и кнопки, при нажатии на которые вам
              отображается соответствующая информация.
            </Item>
          </Stack>
        </Item>

        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item>
              <Image imageType="info7" className={styles.app_info__big_image} />
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              По центру макета отображается актуальная информация о сигнале и
              виде помехи.
            </Item>
          </Stack>
        </Item>

        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item>
              <Image imageType="info8" className={styles.app_info__big_image} />
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              На макете телефона расположенного справа будет отображаться
              действие помех, меня различного рода настройки (сигнала, помех) вы
              можете убедиться сами.
            </Item>
          </Stack>
        </Item>

        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item>
              <Image imageType="info1" />
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              При наведении на графике на точку будут показаны все необходимые
              данные (частоты, напряжение в этой точке) относящиеся к этой
              точке.
            </Item>
          </Stack>
        </Item>
        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item style={{ width: "100%" }}>
              <FormControl
                fullWidth
                className={styles.signal_settings__signal_type}
              >
                <InputLabel id="demo-simple-select-label">
                  Тип сигнала
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="select-signal"
                  label="Тип сигнала"
                  defaultValue={"analog"}
                >
                  {Object.entries(signalsNaming).map(([key, text]) => (
                    <MenuItem key={key} value={key}>
                      {text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              При нажатии на такой элемент будет открываться список с
              предложенным выбором.
            </Item>
          </Stack>
        </Item>
        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item>
              <Image imageType="info2" />
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              При нажатии на ссылку вы перейдете на то место куда она ведет.
            </Item>
          </Stack>
        </Item>
        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item>
              <Image imageType="info3" />
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              При нажатии на изображение вы можете выбрать то, которое будет
              отображаться на экране телефона. И нажав на кнопку сохранить оно
              примениться к макету.
            </Item>
          </Stack>
        </Item>
        <Item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Item>
              <Image imageType="info4" />
            </Item>
            <Item
              style={{ color: "black", textAlign: "justify", fontSize: "18px" }}
            >
              При передвижении микшера на слайдере будет меняться яркость
              экрана.
            </Item>
          </Stack>
        </Item>
      </Stack>
    </div>
  );
};
