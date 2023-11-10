import React, { useEffect, useState } from "react";
import { ChaildRow2 } from "./ChaildRow2";
import { Box, CircularProgress } from "@mui/material";

export function Row2({ row, Detele, getCatgeoryChaild }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(row);
  }, [row]);

  return (
    <>
      <React.Fragment>
        {data ? (
          data?.map((item, i) => {
            return <ChaildRow2 getchildData={getCatgeoryChaild} row={item} key={i} Detele={Detele} />;
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
