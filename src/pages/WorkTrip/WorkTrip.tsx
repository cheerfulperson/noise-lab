import { ReactElement, useCallback } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";

import { useAppStateContext } from "../../context";
import { EAppRoutes } from "../../router";
import { workTripInfo } from "./workTripConfig";
import styles from "./WorkTrip.module.scss";

const StyledList = styled(List)`
  height: calc(100vh - 140px);
  min-height: 0px;
  overflow-y: auto;
`;

export const WorkTrip = (): ReactElement => {
  const { workTrip, setWorkTrip } = useAppStateContext();

  const handleToggle = useCallback(
    (value: string) => () => {
      const currentIndex = workTrip.indexOf(value);
      const newChecked = [...workTrip];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setWorkTrip(newChecked);
    },
    [workTrip]
  );

  return (
    <div className={styles.work_trip}>
      <h2 className={styles.work_trip__title}>Ход работы</h2>
      <StyledList sx={{ width: "100%", bgcolor: "background.paper" }}>
        <div
          className={styles.work_trip__accordion_summary}
          style={{ padding: "0px 16px" }}
        >
          <Typography fontWeight={700}>1. </Typography>
          <div className={styles.work_trip__list_btn}>
            <ListItemButton
              role={undefined}
              onClick={handleToggle("firstStep")}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={workTrip.indexOf("firstStep") !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            </ListItemButton>
          </div>
          <Typography fontWeight={700}>
            Ознакомиться с{" "}
            <Link to={EAppRoutes.MATERIAL}>методическим описанием</Link>{" "}
            лабораторной работы. Ознакомиться с{" "}
            <Link to={EAppRoutes.APP_INFO}>функционалом и интерфейсом</Link>{" "}
            программы.
          </Typography>
        </div>
        {workTripInfo.map(({ element: Element, id, title }, i) => {
          return (
            <ListItem key={id} disablePadding>
              <Accordion
                className={styles.work_trip__accordion}
                defaultExpanded={workTrip.indexOf(id) === -1}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className={styles.work_trip__accordion_summary}>
                    <Typography fontWeight={700}>{i + 2}. </Typography>
                    <div className={styles.work_trip__list_btn}>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(id)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={workTrip.indexOf(id) !== -1}
                            tabIndex={-1}
                            disableRipple
                          />
                        </ListItemIcon>
                      </ListItemButton>
                    </div>
                    <Typography fontWeight={700}>{title}</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Element />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
      </StyledList>
    </div>
  );
};
