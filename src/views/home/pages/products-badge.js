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
          {row.text}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <span style={{ color: `${row.textColor}` }}>{row.textColor}</span>
        </TableCell>
        <TableCell component="th" scope="row" align="right"></TableCell>
        <TableCell component="th" scope="row" align="right"></TableCell>
        <TableCell
          component="th"
          scope="row"
          align="right"
          sx={{ position: "relative" }}
        >
          <Link to={`actions/?edit?${row.id}`}>
            <IconButton color="primary">
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
          </Link>
          {/* <IconButton
            color="error"
            onClick={() => {
              setDeleteId(row.id);
              setOpen(true);
            }}
            aria-label="delete"
          >
            <DeleteSharpIcon />
          </IconButton> */}
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

  const getBadge = async () => {
    await Client.get(API_ENDPOINTS.BADGE)
      .then((res) => {
        setBadgeData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <TableCell>Belgi matni</TableCell>
              <TableCell align="right">Belgi rangi</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bagdeData?.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
