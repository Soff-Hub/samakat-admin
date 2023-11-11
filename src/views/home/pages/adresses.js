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
import NavHeader from "components/shared/NavHeader";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { Box, CircularProgress, Pagination, Stack, Typography } from "@mui/material";

function Row(props) {
  const { row } = props;
  const [openDelete, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const handleDelete = async (id) => {
    await Client.delete(API_ENDPOINTS)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Link to={`actions/?${row.id}`}> {row.user}</Link>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Link to={`actions/?${row.id}`}> {row.address}</Link>
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <Link to={`actions/?${row.id}`}> {row.branch}</Link>
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
  const [data, setData] = React.useState(null);
  const [count, setCount] = React.useState("");
  const [page, setPage] = React.useState(1);

  const getData = async () => {
    await Client.get(API_ENDPOINTS.ADDRESS)
      .then((res) => {
        setData(res.results);
        setCount(res.count)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.ADDRESS}?page=${value}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };


  React.useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <>
      <div className="mb-5">
        <h1 className="text-2xl">Manzillar</h1>
      </div>
      {data?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="right">Branch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
          {count && Math.ceil(count / 30) <= 1 ? (
            <></>
          ) : (
            <div className="m-3 mb-5">
              <Stack spacing={2}>
                <Typography> Sahifa : {page}</Typography>
                <Pagination
                  count={Math.ceil(count / 30) < 1 ? 1 : Math.ceil(count / 30)}
                  page={page}
                  onChange={handleChangePag}
                />
              </Stack>
            </div>
          )}
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            padding: "150px 0",
            margin: "0 auto",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
