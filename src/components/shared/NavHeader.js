import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";

export default function NavHeader({ title }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 30 }}>{title}</span>

        <Link to="actions">
          <Button
            onClick={handleClick("bottom-end")}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
          >
            Qo'shish
          </Button>
        </Link>
      </div>
    </>
  );
}
