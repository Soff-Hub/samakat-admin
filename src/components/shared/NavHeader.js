import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function NavHeader({ title }) {

  return (
    <>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 30 }}>{title}</span>

        <Link to="actions">
          <Button
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
