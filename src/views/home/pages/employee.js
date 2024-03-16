import NavHeader from "components/shared/NavHeader";
import React from "react";
import { Space, Table, Tag } from "antd";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Link } from "react-router-dom";

function Employee() {
  const columns = [
    {
      title: "Ism familiya",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nomer",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tahrirlash",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          <Link to={"actions/"}>
            <IconButton color="primary">
              <DriveFileRenameOutlineOutlinedIcon />
            </IconButton>
          </Link>
        </>
      ),
    },
    {
      title: "O'chirish",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          <IconButton
            color="error"
            // onClick={() => {
            //   setDeleteId();
            //   setOpen(true);
            // }}
            aria-label="delete"
          >
            <DeleteSharpIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className="px-2 py-3">
      <NavHeader title="Xodimlar" />
      <div className="py-3 px-2">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default Employee