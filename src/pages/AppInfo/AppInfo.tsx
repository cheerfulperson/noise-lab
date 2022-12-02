import { ReactElement } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CheckBox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

import { Image } from "../../components";
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
        <Item style={{ color: "black", textAlign: "justify" }}>
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
            <Item style={{ color: "black", textAlign: "justify" }}>
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
              <Image imageType="info1" />
            </Item>
            <Item style={{ color: "black", textAlign: "justify" }}>
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
            <Item>
              <CheckBox />
            </Item>
            <Item style={{ color: "black", textAlign: "justify" }}>
              При нажатии на такой элемент в ходе работы можно отметить, что
              данный пункт выполнен.
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
            <Item style={{ color: "black", textAlign: "justify" }}>
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
            <Item style={{ color: "black", textAlign: "justify" }}>
              При нажатии на изображение вы можете выбрать то, которое будет
              отображаться на экране телефона.
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
            <Item style={{ color: "black", textAlign: "justify" }}>
              При передвижении микшера на слайдере будет меняться яркость
              экрана.
            </Item>
          </Stack>
        </Item>
      </Stack>
    </div>
  );
};
