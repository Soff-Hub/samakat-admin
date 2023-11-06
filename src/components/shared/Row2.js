import React, { useEffect, useState } from "react";
import { ChaildRow2 } from "./ChaildRow2";
import { Box, CircularProgress } from "@mui/material";

export function Row2({ row, Detele }) {
  const [data, setData] = useState(null);
  const [deleteItem] = useState("");

  useEffect(() => {
    setData(row);
  }, [deleteItem, row]);

  return (
    <>
      <React.Fragment>
        {data ? (
          data?.map((item, i) => {
            return <ChaildRow2 row={item} key={i} Detele={Detele} />;
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              wdith: "100%",
              justifyContent: "center",
              padding: "150px 0",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </React.Fragment>
    </>
  );
}
