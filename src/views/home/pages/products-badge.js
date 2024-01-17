import * as React from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ResponsiveDialog from "components/shared/modal";
import NavHeaderSelect from "components/shared/NavHeaderSelect";

function Row(props) {
  const { row } = props;
  const { setOpen } = props;
  const { setDeleteId } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">
          <Link to={`actions/?edit?${row.id}`}>{row.text}</Link>{" "}
        </TableCell>
        <TableCell align="left">
          <Link to={`actions/?edit?${row.id}`}>
            {row.discount !== 0 ? (
              row.discount + "%"
            ) : (
              <i style={{ color: "red" }} class="fa-solid fa-xmark"></i>
            )}
          </Link>{" "}
        </TableCell>
        <TableCell align="center">
          <Link to={`actions/?edit?${row.id}`}>
            <span style={{ color: `${row.textColor}` }}>
              <i className="fa-solid fa-certificate"></i>
            </span>
          </Link>
        </TableCell>
        <TableCell align="right" sx={{ position: "relative" }}>
          <Link to={`actions/?edit?${row.id}`}>
            <IconButton color="primary">
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton
            color="error"
            onClick={() => {
              setDeleteId(row.id);
              setOpen(true);
            }}
            aria-label="delete"
          >
            <DeleteSharpIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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

export default function CollapsibleTable() {
  const [bagdeData, setBadgeData] = React.useState(null);
  const [count, setCount] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [openDelete, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [type, setType] = React.useState("bistro");

  const getBadge = async () => {

    await Client.get(API_ENDPOINTS.BADGE)
      .then((res) => {
        setBadgeData(res.results);
        setCount(res.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await Client.delete(`${API_ENDPOINTS.DELETE_BADGE}${deleteId}/`)
      .then((resp) => {
        console.log(resp);
        setOpen(false);
        getBadge();
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.BADGE}?page=${value}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setBadgeData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = async (e) => {
    setPage(1);
    setType(e.target.value);
    await Client.get(
      `${API_ENDPOINTS.BADGE}?page=${page}&type=${e.target.value}`
    )
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setBadgeData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getBadge();
  }, []);

  return (
    <div className="p-2">
      <div className="mb-5">
        <NavHeaderSelect title="Mahsulot aksiyalari" />
      </div>
      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleChange}
        className="mt-5 flex items-center w-full"
      >
        <ToggleButton className="w-full" value="bistro">
          Bistro
        </ToggleButton>
        <ToggleButton className="w-full" value="byuti">
          Byuti
        </ToggleButton>
      </ToggleButtonGroup>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <span className="font-bold text-[16px]">Nomi</span>
              </TableCell>
              <TableCell align="left">
                <span className="font-bold text-[16px]">Chegirmasi</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-bold text-[16px]">Rangi</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold text-[16px]">Amallar</span>
              </TableCell>
            </TableRow>
          </TableHead>
          {bagdeData?.length >= 0 ? (
            <TableBody>
              {bagdeData?.map((row) => (
                <Row
                  key={row.name}
                  row={row}
                  setOpen={setOpen}
                  setDeleteId={setDeleteId}
                />
              ))}
              {(count && Math.ceil(count / 30) <= 1) || count === 0 ? (
                <></>
              ) : (
                <div className="m-3 mb-5">
                  <Stack spacing={2}>
                    <Typography> Sahifa : {page}</Typography>
                    <Pagination
                      count={
                        Math.ceil(count / 30) < 1 ? 1 : Math.ceil(count / 30)
                      }
                      page={page}
                      onChange={handleChangePag}
                    />
                  </Stack>
                </div>
              )}
            </TableBody>
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "150px",
                marginLeft: "100px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Table>
      </TableContainer>
      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}
