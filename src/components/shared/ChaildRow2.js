import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import ResponsiveDialog from "components/shared/modal";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Row2 } from "./Row2";
import toast, { Toaster } from "react-hot-toast";

export function ChaildRow2({ row, Detele, getchildData }) {
  const [data, setData] = useState([]);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [rowData, setRowData] = useState([]);

  const getCatgeoryChaild = async (id) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?parent=${id}`)
      .then((res) => {
        setData(res.results);
      })
      .catch((err) => console.log(err));
  };

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DELETE_CATEGORY}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        Detele(deleteId);
        location.reload();
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        toast.success(`${err?.response?.data?.[0]}`);
      });
  }

  useEffect(() => {
    setRowData(row);
  }, [data]);

  return (
    <>
      <Toaster />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          onClick={() => getCatgeoryChaild(rowData.id)}
          className="acc-parent"
          style={{ backgroundColor: "#EDF4FB", boxShadow: "none" }}
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
        <AccordionDetails className="child-margin ">
          <Row2
            row={data}
            Detele={Detele}
            getCatgeoryChaild={getCatgeoryChaild}
          />
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
