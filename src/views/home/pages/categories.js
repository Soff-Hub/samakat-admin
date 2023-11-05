import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import ResponsiveDialog from "components/shared/modal";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NavHeaderSelect from "components/shared/NavHeaderSelect";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Row } from "components/shared/Row";
import Categories2 from "./categories2";

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
           <Categories2/>
    </div>
  );
}
