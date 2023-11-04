import {
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import { Row } from "./Row";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

export function ChaildRow(props) {
  const { row } = props;
  const [openContext, setOpenContext] = React.useState(false);
  const [data, setData] = useState([]);

  const getCatgeoryChaild = async (id) => {
    console.log("click");

    if (!openContext) {
      await Client.get(`${API_ENDPOINTS.CATEGORIES}?parent=${id}`)
        .then((res) => {
          console.log("chaild", res.results);
          setData(res.results);
        })
        .catch((err) => console.log(err));
    } else {
      setData([]);
    }
    setOpenContext(!openContext);
  };
  return (
    <>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0 }}>
          <TableCell>
            <IconButton
              aria-label={`expand row`}
              size="small"
              onClick={() => (
                setOpenContext(!openContext), getCatgeoryChaild(row.id)
              )}
            >
              {openContext ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right" sx={{ position: "relative" }}>
            <Link to={`actions/?${row.type}?${row.id}`}>
              <IconButton color="primary" aria-label="delete">
                <AddCircleOutlinedIcon />
              </IconButton>
            </Link>
            <Link to={`actions/?edit?${row.type}?${row.slug}`}>
              <IconButton color="primary">
                <DriveFileRenameOutlineOutlinedIcon />
              </IconButton>
            </Link>
            <IconButton
              color="error"
              onClick={() => {
                // setDeleteId(row.slug);
                // setOpen(true);
              }}
              aria-label="delete"
            >
              <DeleteSharpIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <div className="child-margin">
          <Row row={data}></Row>
        </div>
        {/* <TableContainer component={Paper} className="child-margin">
          <Table aria-label="collapsible table">
            <TableBody>
              <Row row={data} />
            </TableBody>
          </Table>
        </TableContainer> */}
      </React.Fragment>
    </>
  );
}
