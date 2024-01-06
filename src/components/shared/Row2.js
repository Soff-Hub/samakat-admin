import React, { useEffect, useState } from "react";
import { ChaildRow2 } from "./ChaildRow2";
import { Box, CircularProgress } from "@mui/material";

export function Row2({ row, Detele, getCatgeoryChaild, type }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!row) {
      setData([]);
    } else {
      setData(row);
    }
  }, [row]);

  return (
    <>
      <React.Fragment>
        {data?.length !== 0 ? (
          data?.length > 0 ? (
            data?.map((item, i) => {
              return (
                <ChaildRow2
                  type={type}
                  getchildData={getCatgeoryChaild}
                  row={item}
                  key={i}
                  Detele={Detele}
                />
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "150px 0",
              }}
            >
              <CircularProgress />
            </Box>
          )
        ) : (
          ""
        )}
      </React.Fragment>
    </>
  );
}
