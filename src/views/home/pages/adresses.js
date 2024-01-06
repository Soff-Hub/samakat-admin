import * as React from "react";
import PropTypes from "prop-types";
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
import { Box, CircularProgress, Pagination, Stack, Typography } from "@mui/material";

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}  >
        <TableCell component="th" scope="row" align="left">
          <Link to={`actions/?${row.id}`}> {row.user?.first_name ? row.user?.first_name : ""} {row.user?.phone} {row.user?.last_name} </Link>
        </TableCell>
        <TableCell scope="row" align="center">
          <Link to={`actions/?${row.id}`}> {row.address}</Link>
        </TableCell>
        <TableCell scope="row" align="right">
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
                <TableCell align="left"><span className="font-bold text-[16px]" >Foydalanuvchi</span></TableCell>
                <TableCell align="center"><span className="font-bold text-[16px]" >Address</span></TableCell>
                <TableCell align="right"><span className="font-bold text-[16px]" >Filial</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
          {count && Math.ceil(count / 30) <= 1 || count === 0 ? (
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
