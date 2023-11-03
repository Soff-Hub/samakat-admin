
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import NavHeader from "components/shared/NavHeader";
  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { API_ENDPOINTS } from "service/ApiEndpoints";
  import Client from "service/Client";
  import ResponsiveDialog from "components/shared/modal";
  import IconButton from "@mui/material/IconButton";
  import PropTypes from "prop-types";
  import Collapse from "@mui/material/Collapse";
  import TableContainer from "@mui/material/TableContainer";
  import Paper from "@mui/material/Paper";
  import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
  import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
  import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
  import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
  import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
  import ToggleButton from "@mui/material/ToggleButton";
  import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
  import NavHeaderSelect from "components/shared/NavHeaderSelect";
  import Typography from "@mui/material/Typography";
  import Pagination from "@mui/material/Pagination";
import Categories, { Row } from "views/home/pages/categories";

export function ChaildRow({props, getCatgeoryChaild}) {
  console.log('dataaa ', props);
  const [data, setData] = useState([])
  
    // const [openDelete, setOpen] = useState(false);
    // const [deleteId, setDeleteId] = useState(null);
    // const [categoryChaild, setCategoryDetail] = useState(null);
    // const [data, setData] = useState(null);


    // async function getCategories() {
    //   await Client.get(API_ENDPOINTS.CATEGORIES)
    //     .then((resp) => setData(resp.results))
    //     .catch((err) => console.log(err));
    // }
  
    // async function handleDelete() {
    //   await Client.delete(`${API_ENDPOINTS.DELETE_CATEGORY}${deleteId}/`)
    //     .then((resp) => {
    //       setOpen(false);
    //       console.log(resp);
    //       getCategories();
    //     })
    //     .catch((err) => console.log(err));
    // }
  
    // const getCatgeoryChaild = async (id) => {
    //   await Client.get(`${API_ENDPOINTS.CATEGORIES}?parent=${id}`)
    //     .then((res) => {
    //       console.log("chaild", res.results);
    //       // setCategoryDetail(res.results);
    //     })
    //     .catch((err) => console.log(err));
    // };
    const getCatgeoryChaildd = async (id) => {
      await Client.get(`${API_ENDPOINTS.CATEGORIES}?parent=${id}`)
        .then((res) => {
          console.log("chaild", res.results);
          setData(res.results);
        })
        .catch((err) => console.log(err));
    };
    // const [openContext, setOpenContext] = React.useState(false);


    // const { row } = props;
  
  
  
    return (
      <>
        <React.Fragment>
          {/* <TableRow sx={{ "& > *": { borderBottom: "unset" }, padding: 0 }}>
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
                  setDeleteId(row.slug);
                  setOpen(true);
                }}
                aria-label="delete"
              >
                <DeleteSharpIcon />
              </IconButton>
            </TableCell>
          </TableRow> */}
          <TableRow onclick={() => getCatgeoryChaildd(props.id)}  aria-label={`expand row`}>
                  <TableCell>
                  </TableCell>
                  <TableCell
                    style={{ paddingBottom: "10px", paddingTop: "10px" }}
                  >
                    {/* <Collapse in={openContext} timeout="auto" unmountOnExit>
                    </Collapse> */}
                    {props.name}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                      
                  <TableCell align="right" sx={{ position: "relative" }}>
                    <Link to={`actions/?${props.type}?${props.id}`}>
                      <IconButton color="primary" aria-label="delete">
                        <AddCircleOutlinedIcon />
                      </IconButton>
                    </Link>
                    <Link to={`actions/?edit?${props.type}?${props.slug}`}>
                      <IconButton color="primary">
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      onClick={() => {
                        // setDeleteId(props.slug);
                        // setOpen(true);
                      }}
                      aria-label="delete"
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
            <Row  id={props.id} row={data} />
                  
                </TableRow>
        </React.Fragment>
        {/* <ResponsiveDialog
          open={openDelete}
          setOpen={setOpen}
          handleDelete={handleDelete}
        /> */}
      </>
    );
  }
  