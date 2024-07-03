import { TextField } from "@mui/material";
import { Button, Modal, Table, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";

export default function Settings() {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [radius, setRadius] = useState("");
  const [amout, setAmout] = useState("");
  const { role } = useSelector((state) => state.admin);
  const [timeData, setTimeData] = useState(null);

  async function getData() {
    await Client.get(API_ENDPOINTS.SETTINGS)
      .then((resp) => {
        setData(resp);
        setRadius(resp?.delivery_time);
        setAmout(resp?.min_amount);
      })
      .catch((err) => console.log(err));
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (id) => {
    const data = {
      delivery_time: radius,
      min_amount: amout,
    };
    await Client.patch(API_ENDPOINTS.SETTINGS, data)
      .then((resp) => {
        getData();
        message.open({
          type: "success",
          content: `Yetkazib berish vaqti o'zgartirildi`,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        message.open({
          type: "error",
          content: `Yetkazib berish vaqti o'zgartirilmadi`,
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function getWorkTime() {
    await Client.get(API_ENDPOINTS.WORKTIME)
      .then((resp) => {
        setTimeData(resp);
      })
      .catch((err) => console.log(err));
  }

  const workName = {
    1:"Dushanba",
    2:"Seshanba",
    3:"Chorshanba",
    4:"Payshanba",
    5:"Juma",
    6:"Shanba",
    7:"Yakshanba",
  }


  const columns = [
    {
      title: "Hafta kunlari",
      dataIndex: "day_of_week",
      key: "name",
      render: (day_of_week) => <span>{workName[day_of_week]}</span>,
    },
    {
      title: "Boshlanish vaqti",
      dataIndex: "start_time",
      key: "start_time",
      render: (start_time) => <span>{start_time}</span>,
    },
    {
      title: "Tugash vaqti",
      dataIndex: "end_time",
      key: "end_time",
      render: (end_time) => <span>{end_time}</span>,
    },
    {
      title: "Dam olish kunlari",
      dataIndex: "not_working_day",
      key: "not_working_day",
      render: (not_working_day) => <span>{not_working_day ? <i class="fa-regular fa-circle-check text-[green]"></i> : <i class="fa-regular fa-circle-check text-[red]"></i>}</span>,
    },
    {
      title: "Tahrirlash",
      key: "id",
      dataIndex: "id",
      render: (id) => (
        <>
          <Link to={`actions/${id}`}>
            <IconButton color="primary">
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
          </Link>
        </>
      ),
    }
  ];

  useEffect(() => {
    getData();
    getWorkTime()
  }, []);

  return (
    <div className="p-2">
      <div className="mb-4">
        <h1 className="text-2xl">Sozlamalar</h1>
      </div>
      {role != "seller" && (
        <div
          className="colorr"
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div>
              {" "}
              <p>Yetkazib berish vaqti</p>
              <p className="font-bold text-center">
                {data?.delivery_time} {data?.delivery_time ? "min" : ""}{" "}
              </p>
            </div>
            <div>
              {" "}
              <p>Eng kam miqdor</p>
              <p className="font-bold text-center">
                {data?.min_amount} {data?.min_amount ? "so'm" : ""}{" "}
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Button onClick={showModal}>
              <i class="fa-solid fa-pen-to-square"></i>
            </Button>
          </div>

          <Modal
            title="Tahrirlash"
            open={isModalOpen}
            onOk={() => handleOk(data?.id)}
            onCancel={handleCancel}
            okText="Yuborish"
            cancelText="Ortga"
            okButtonProps={{
              style: {
                backgroundColor: "#000",
                color: "white",
              },
            }}
          >
            <TextField
              inputMode="numeric"
              label="Vaqt"
              variant="outlined"
              size="small"
              type="number"
              value={radius}
              style={{ width: "100%" }}
              onChange={(e) => setRadius(e.target.value)}
            />
            <TextField
              inputMode="numeric"
              label="Eng kam miqdor ( so'm )"
              variant="outlined"
              size="small"
              type="number"
              value={amout}
              style={{ width: "100%", marginTop: "10px" }}
              onChange={(e) => setAmout(e.target.value)}
            />
          </Modal>
        </div>
      )}

      {
        role === "seller" && 
        <div className=" px-2">
           <h2 className="text-xl pb-2">Ish vaqti</h2>
        <Table columns={columns} dataSource={timeData} pagination={false} />
      </div>
      }

    </div>
  );
}
