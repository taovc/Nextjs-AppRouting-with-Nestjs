"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListSimple from "./list";
import { ListSubheader } from "@mui/material";

interface listData {
  name: string;
  MainIcon: any;
  SubIcon: any;
  datas: any;
}

export default function ListGroup({
  header,
  listData,
}: {
  header: string;
  listData: listData[];
}) {
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {header}
        </ListSubheader>
      }
    >
      {listData?.map((data) => (
        <ListSimple
          key={data.name}
          name={data.name}
          MainIcon={data.MainIcon}
          SubIcon={data.SubIcon}
          datas={data.datas}
        />
      ))}
    </List>
  );
}
