"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function ListSimple({
  name,
  MainIcon,
  SubIcon,
  datas,
}: {
  name: string;
  MainIcon: any;
  SubIcon: any;
  datas: any;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <MainIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {datas?.map((data: any) => (
        <Collapse key={data.id} in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <SubIcon />
              </ListItemIcon>
              <ListItemText primary={data?.release_date} />
              <ListItemText primary={data?.original_title} />
            </ListItemButton>
          </List>
        </Collapse>
      ))}
    </>
  );
}
