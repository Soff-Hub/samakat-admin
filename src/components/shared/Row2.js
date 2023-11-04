import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import ResponsiveDialog from "components/shared/modal";
import { ChaildRow } from "./chaildrow";
import { ChaildRow2 } from "./ChaildRow2";

export function Row2({row}) {
  const [data, setData] = useState(null)
  const [deleteItem, setDeleteItem] = useState('')

  useEffect(() => {
    setData(row)
  },[deleteItem, row])
console.log('dataa', data);

  return (
    <>
      <React.Fragment>
        { data ? data?.map((item, i) => {
          return <ChaildRow2 row={item} key={i} setDeleteItem={setDeleteItem} />
        }) :
        <>Loading...</>
    }
      </React.Fragment>
    </>
  );
}
