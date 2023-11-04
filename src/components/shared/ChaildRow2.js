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
import { Row } from "./Row";
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
import Categories from "views/home/pages/categories";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Row2 } from "./Row2";

export function ChaildRow2({ row , Detele }) {
  const [openContext, setOpenContext] = React.useState(false);
  const [data, setData] = useState([]);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [rowData, setRowData] = useState([])
//   const [deleteItem, setDeleteItem] = useState('')

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DELETE_CATEGORY}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        Detele(deleteId)
        console.log(resp);
      })
      .catch((err) => console.log(err));
  }

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

  useEffect(() => {
    setRowData(row)
  }, [])


  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          onClick={() => (
            setOpenContext(!openContext), getCatgeoryChaild(rowData.id)
          )}
          className="acc-parent"
          style={{ backgroundColor: "#A1A8B8", boxShadow: "none" }}
        >
          <div className="flex justify-between w-full">
            <div>{rowData.name}</div>
            <div>
              <Link to={`actions/?${rowData.type}?${rowData.id}`}>
                <IconButton color="primary" aria-label="delete">
                  <AddCircleOutlinedIcon />
                </IconButton>
              </Link>
              <Link to={`actions/?edit?${rowData.type}?${rowData.slug}`}>
                <IconButton color="primary">
                  <DriveFileRenameOutlineOutlinedIcon />
                </IconButton>
              </Link>
              <IconButton
                color="error"
                onClick={() => {
                  setDeleteId(rowData.slug);
                  setOpen(true);
                }}
                aria-label="delete"
              >
                <DeleteSharpIcon />
              </IconButton>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="child-margin">
          <Row2 row={data} />
        </AccordionDetails>
      </Accordion>
      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}
