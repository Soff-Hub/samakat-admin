import { Input, Select, Space } from "antd";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";

const option = [
  {
    label: "rang",
    value: 1,
  },
];

export default function ProductPrice() {
  const [page, setPage] = useState(true);
  const [dataArray, setDataArray] = useState([
    {
      colour: "",
      size: "",
      price: "",
    },
  ]);
  const [dataArrayFilial, setDataArrayFilial] = useState([
    {
      filial: "",
      product: "",
      count: "",
    },
  ]);

  const handleAddRow = () => {
    setDataArray([
      ...dataArray,
      {
        colour: "",
        size: "",
        price: "",
      },
    ]);
  };
  const handleAddRowBranch = () => {
    setDataArrayFilial([
      ...dataArrayFilial,
      {
        filial: "",
        product: "",
        count: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newArray = [...dataArray];
    newArray[index][field] = value;
    setDataArray(newArray);
  };
  const handleInputChangeFilial = (index, field, value) => {
    const newArray = [...dataArrayFilial];
    newArray[index][field] = value;
    setDataArrayFilial(newArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", dataArray);
    // Add your submit logic here, such as an API call
  };
  const handleSubmitBranch = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", dataArrayFilial);
    setPage(false)
    // Add your submit logic here, such as an API call
  };

//   console.log("dataArrayFilial", dataArrayFilial);

  return (
    <>
      {page ? (
        <div className="bg--color px-2 py-3">
          <h3 className="font-semibold	">Mahsulot narxini qo'shish</h3>
          <form onSubmit={handleSubmit} className="mt-3">
            {dataArray.map((item, index) => (
              <div className="row" key={index} style={{ marginBottom: "10px" }}>
                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Ranglar"
                      onChange={(value) =>
                        handleInputChange(index, "colour", value)
                      }
                      options={option}
                    />
                  </Space>
                </div>

                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Narxlar"
                      onChange={(value) =>
                        handleInputChange(index, "size", value)
                      }
                      options={option}
                    />
                  </Space>
                </div>

                <Input
                  size="small"
                  className="col-md-3"
                  placeholder="Narxni kiriting"
                  onChange={(e) =>
                    handleInputChange(index, "price", e.target.value)
                  }
                />
                <div className="col-md-3">
                  <Button
                    variant="contained"
                    sx={{
                      background: "#000",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                    size="small"
                    style={{ width: "100%" }}
                    startIcon={<AddIcon />}
                    onClick={handleAddRow}
                  >
                    Qo'shish
                  </Button>
                </div>
              </div>
            ))}
            <div className="col-md-4">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "green",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                style={{ width: "100%", marginTop: "10px" }}
              >
                Submit
              </Button>
            </div>
          </form>
          <Toaster />
        </div>
      ) : (
        <div className="bg--color px-2 py-3">
          <h3 className="font-semibold	">Mahsulot filialini qo'shish</h3>
          <form onSubmit={handleSubmitBranch} className="mt-3">
            {dataArrayFilial.map((item, index) => (
              <div className="row" key={index} style={{ marginBottom: "10px" }}>
                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Filial"
                      onChange={(value) =>
                        handleInputChangeFilial(index, "filial", value)
                      }
                      options={option}
                    />
                  </Space>
                </div>

                <div className="col-md-3">
                  <Space
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    direction="vertical"
                  >
                    <Select
                      size="large"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Mahsulot"
                      onChange={(value) =>
                        handleInputChangeFilial(index, "product", value)
                      }
                      options={option}
                    />
                  </Space>
                </div>

                <Input
                  size="small"
                  className="col-md-3"
                  placeholder="Sonini kiriting"
                  onChange={(e) =>
                    handleInputChangeFilial(index, "count", e.target.value)
                  }
                />
                <div className="col-md-3">
                  <Button
                    variant="contained"
                    sx={{
                      background: "#000",
                      "&:hover": {
                        backgroundColor: "#333",
                      },
                    }}
                    size="small"
                    style={{ width: "100%" }}
                    startIcon={<AddIcon />}
                    onClick={handleAddRowBranch}
                  >
                    Qo'shish
                  </Button>
                </div>
              </div>
            ))}
            <div className="col-md-4">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "green",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                style={{ width: "100%", marginTop: "10px" }}
              >
                Submit
              </Button>
            </div>
          </form>
          <Toaster />
        </div>
      )}
    </>
  );
}
