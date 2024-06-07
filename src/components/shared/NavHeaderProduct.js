import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function NavHeaderProduct({ title, admin }) {
  return (
    <>
    
      <div className="flex items-center justify-between py-2">
        <span style={{ fontSize: 30 }}>{title}</span>
        {
          admin !== true &&
        <Link to={"actions/product"}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
            sx={{ 
              background: "#000",
              '&:hover': {
                backgroundColor: "#333", // Change this to the desired hover color
              }
            }}
          >
            Qo'shishh
          </Button>
        </Link>
        }
      </div>
    </>
  );
}
