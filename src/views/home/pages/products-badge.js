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
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">
          <Link to={`actions/?edit?${row.id}`}>{row.text}</Link>{" "}
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

  React.useEffect(() => {
    getBadge();
  }, []);

  return (
    <>
      <div className="mb-5">
        <NavHeader title="Mahsulot belgisi" />
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <span className="font-bold text-[16px]">Belgi matni</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-bold text-[16px]">Belgi rangi</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold text-[16px]">Amallar</span>
              </TableCell>
            </TableRow>
          </TableHead>
          {bagdeData?.length >= 0 ? (
            <TableBody>
              {bagdeData?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
              {count && Math.ceil(count / 30) <= 1 ? (
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
    </>
  );
}
