import React, { useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import ResponsiveDialog from "components/shared/modal";
import { ChaildRow } from "./chaildrow";

export function Row(props) {
  const { row } = props;

  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function handleDelete() {
    await Client.delete(`${API_ENDPOINTS.DELETE_CATEGORY}${deleteId}/`)
      .then((resp) => {
        setOpen(false);
        console.log(resp);
        getCategories();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <React.Fragment>
        {row?.map((item, i) => {
          return <ChaildRow row={item} key={i} />;
        })}
      </React.Fragment>
      {/* <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      /> */}
    </>
  );
}
