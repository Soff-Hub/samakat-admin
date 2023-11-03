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
import Stack from "@mui/material/Stack";
import { ChaildRow } from "components/shared/chaildrow";

export default function Categories() {
  const [data, setData] = useState(null);
  const [openDelete, setOpen] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [alignment, setAlignment] = React.useState("web");
  const [page, setPage] = React.useState(1);
  const [type, setType] = useState("bistro");
  const [count, setCount] = useState(10);

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?page=${value}&type=${type}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  async function getCategories() {
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}?page=${page}&type=bistro&parent_is_null=true`
    )
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }
  const ITEM_HEIGHT = 48;
  console.log(count);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?search=${e}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const Bistre = async () => {
    setPage(1);
    setType("bistro");
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}?page=${page}&type=bistro&parent_is_null=true`
    )
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };
  const Beauty = async () => {
    setPage(1);
    setType("byute");
    await Client.get(
      `${API_ENDPOINTS.CATEGORIES}?page=${page}&type=byuti&parent_is_null=true`
    )
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <NavHeaderSelect title="Kategoriyalar" />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        // aria-label="Platform"
        className="mt-5"
      >
        <ToggleButton style={{ width: "500px" }} onClick={Bistre} value="web">
          Быстрый
        </ToggleButton>
        <ToggleButton
          style={{ width: "500px" }}
          onClick={Beauty}
          value="android"
        >
          Beauty
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        type="text"
        placeholder="Kategoriya izlang..."
        className=" px-3 ps-5 py-3 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
        style={{ width: "100%" }}
        onChange={(e) => Search(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Ko'rish</TableCell>
              <TableCell>Nomi</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? data.map((row) => <Row key={row.slug} id={row.id} row={row} />) : <></>}
          </TableBody>
        </Table>
      </TableContainer>

      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        // handleDelete={handleDelete}
      />
      <div className="mt-3">
        <Stack spacing={2}>
          <Typography> Sahifa : {page}</Typography>
          <Pagination
            count={Math.trunc(count / 10) < 1 ? 1 : Math.trunc(count / 10)}
            page={page}
            onChange={handleChangePag}
          />
        </Stack>
      </div>
    </div>
  );
}

export function Row(props) {
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [categoryChaild, setCategoryDetail] = useState(null);
  const [data, setData] = useState(null);
  async function getCategories() {
    await Client.get(API_ENDPOINTS.CATEGORIES)
      .then((resp) => setData(resp.results))
      .catch((err) => console.log(err));
  }

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DELETE_CATEGORY}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        console.log(resp);
        getCategories();
      })
      .catch((err) => console.log(err));
  }

  const getCatgeoryChaild = async (id) => {
    console.log('click');
    
    await Client.get(`${API_ENDPOINTS.CATEGORIES}?parent=${id}`)
      .then((res) => {
        console.log("chaild", res.results);
        setCategoryDetail(res.results);
        Row(res.results)
      })
      .catch((err) => console.log(err));
  };

  const [openContext, setOpenContext] = React.useState(false);
  const { row } = props;


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
                setDeleteId(row.slug);
                setOpen(true);
              }}
              aria-label="delete"
            >
              <DeleteSharpIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        {openContext &&
          categoryChaild?.map((item, i) => {
            return (
              // <TableRow onClick={() => getCatgeoryChaild(item?.id)} aria-label={`expand row`}>
              //   <TableCell>
              //   </TableCell>
              //   <TableCell
              //     style={{ paddingBottom: "10px", paddingTop: "10px" }}
              //   >
              //     <Collapse in={openContext} timeout="auto" unmountOnExit>
              //       {item?.name}
              //     </Collapse>
              //   </TableCell>
              //   <TableCell></TableCell>
              //   <TableCell></TableCell>
              //   <TableCell align="right" sx={{ position: "relative" }}>
              //     <Link to={`actions/?${item.type}?${item.id}`}>
              //       <IconButton color="primary" aria-label="delete">
              //         <AddCircleOutlinedIcon />
              //       </IconButton>
              //     </Link>
              //     <Link to={`actions/?edit?${item.type}?${item.slug}`}>
              //       <IconButton color="primary">
              //         <DriveFileRenameOutlineOutlinedIcon />
              //       </IconButton>
              //     </Link>
              //     <IconButton
              //       color="error"
              //       onClick={() => {
              //         setDeleteId(item.slug);
              //         setOpen(true);
              //       }}
              //       aria-label="delete"
              //     >
              //       <DeleteSharpIcon />
              //     </IconButton>
              //   </TableCell>
              // </TableRow>
             <ChaildRow getCatgeoryChaild={getCatgeoryChaild}  props={item} key={i} />
            );
          })}
      </React.Fragment>
      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
}

