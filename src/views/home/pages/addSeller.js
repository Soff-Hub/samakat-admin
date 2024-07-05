import React, { useEffect, useState } from "react";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import NavHeader from "components/shared/NavHeader";
import { Table } from "antd";
import ResponsiveDialog from "components/shared/modal";
import { Pagination, Stack, Typography } from "@mui/material";

function AddSeller() {
  const [data, setData] = useState(null);
  // const [count, setCount] = useState(null)
  
  const [openDelete, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");
  const columns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (image) => <a>{image ? <img src={image} alt="seller's logo" width={40} /> : <i class="fa-solid fa-minus"></i>}</a>,
    },
    {
      title: "Mas'ul shaxs",
      dataIndex: "first_name",
      key: "name",
      render: (first_name) => <a>{first_name ? first_name : <i class="fa-solid fa-minus"></i>}</a>,
    },
    {
      title: "Telefon raqam",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <a>{phone}</a>,
    },
    {
      title: "Do'kon nomi",
      dataIndex: "name",
      key: "name",
      render: (name) => <a>{name ? name : <i class="fa-solid fa-minus"></i>}</a>,
    },
    {
      title: "Yaratilgan vaqti",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => <a>{created_at ? created_at : <i class="fa-solid fa-minus"></i>}</a>,
    },
    {
      title: "Amallar",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <>
        <Link to={`actions/${id}`}>
            <IconButton color="primary">
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton
            color="error"
            onClick={() => {
              setDeleteId(id);
              setOpen(true);
            }}
            aria-label="delete"
          >
            <DeleteSharpIcon />
          </IconButton>
        </>
      ),
    },
  ];


    async function handleDelete() {
        await Client.delete(`${API_ENDPOINTS.DETAIL_SELLER}${deleteId}/`)
          .then((resp) => {
            setOpen(false);
            getSellerList();
            setData(resp.results);
          })
          .catch((err) => console.log(err));
      }
    

  async function getSellerList() {
    await Client.get(API_ENDPOINTS.SELLER)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.SELLER}?page=${value}`)
      .then((resp) => {
        console.log(resp);
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSellerList();
  }, []);

  return (
    <div className="px-2 py-3">
      <NavHeader title="Sotuvchilar" />
      <div className="py-3 px-2">
        <Table columns={columns} dataSource={data} pagination={false} />
        {( Math.ceil(count / 30) <= 1) || count === 0 ? (
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
      </div>
      <ResponsiveDialog
        open={openDelete}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default AddSeller;
