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

export function ChaildRow2({ row, Detele, type }) {
  const [data, setData] = useState([]);
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [errorData, setErrorData] = useState("");

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
        window.location.reload();
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
        setErrorData(`${err?.response?.data?.[0]}`);
      });
  }

  useEffect(() => {
    setRowData(row);
    // eslint-disable-next-line
  }, [ type, row]);


  
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={rowData?.child_is_available ? <ExpandMoreIcon /> : ""}
          aria-controls="panel2a-content"
          id="panel2a-header"
          onClick={() => (rowData?.is_add_childe ? getCatgeoryChaild(rowData.id) : '')}
          className="acc-parent"
          style={{ backgroundColor: "#EDF4FB", boxShadow: "none" }}
        >
          <div className="flex justify-between w-full">
            <div>{rowData.name}</div>
            <div>
              {row?.slug === "express" ? (
                ""
              ) : (
                <>
                  {rowData.is_add_childe ? (
                    <Link
                      to={`actions/?${rowData.type}?${rowData.id}?chaild?${rowData.slug}`}
                    >
                      <IconButton color="primary" aria-label="delete">
                        <AddCircleOutlinedIcon />
                      </IconButton>
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link to={`actions/?edit?${rowData.type}?${rowData.slug}`}>
                    <IconButton color="primary">
                      <DriveFileRenameOutlineOutlinedIcon />
                    </IconButton>
                  </Link>
                 {
                  rowData.is_delete ? (
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
                  ) : ''
                 }
                </>
              )}
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
        errorData={errorData}
      />
    </>
  );
}
