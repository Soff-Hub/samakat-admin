import { Input, Select, Space, Steps } from "antd";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductPrice() {
  const [submiting, setSubmiting] = useState(false);
  const [branch, setBranch] = useState([]);
  const [product, setProduct] = useState([]);
  const [percentBranch, setPercentBranch] = useState(10);
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = search.split("=")?.[1];
  const [dataArrayFilial, setDataArrayFilial] = useState([
    {
      branch: "",
      product_variant: "",
      quantity: "",
    },
  ]);

  const handleAddRowBranch = () => {
    setDataArrayFilial([
      ...dataArrayFilial,
      {
        branch: "",
        product_variant: "",
        quantity: "",
      },
    ]);
  };

  const handleInputChangeFilial = (index, field, value) => {
    const newArray = [...dataArrayFilial];
    newArray[index][field] = value;
    setDataArrayFilial(newArray);
  };

  const handleSubmitBranch = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", dataArrayFilial);
    setSubmiting(true);

    const data = {
      product_quantities: dataArrayFilial,
    };

    await Client.post(
      `${API_ENDPOINTS.CREATE_PRODUCT_BRANCH_POST + params}/`,
      data
    )
      .then((data) => {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi");
        navigate(`/products`);
        setPercentBranch(100);
      })
      .catch((err) => {
        toast.error("Xatolik! Qayta urinib ko'ring");
        setSubmiting(false);
      });

    setSubmiting(false);
    document.querySelector(".create-branch-form").reset();
  };

  const getProductBranchs = async () => {
    await Client.get(`${API_ENDPOINTS.CREATE_PRODUCT_BRANCH + params}/`)
      .then((resp) => {
        console.log("date", resp);
        setBranch(
          resp?.branches?.map((e) => ({
            label: e?.name,
            value: e?.id,
          }))
        );
        setProduct(
          resp?.product_variants?.map((e) => ({
            label: (
              <div>
                {e?.name}
              </div>
            ),
            value: e?.id,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteRow = (index) => {
    console.log('index', index);
    
    const newArray = [...dataArrayFilial];
    newArray.splice(index, 1); // O'sha qatorni o'chiradi
    setDataArrayFilial(newArray);
  };

  console.log('dataArrayFilial', dataArrayFilial);
  

  useEffect(() => {
    getProductBranchs();
  }, []);

  return (
    <>
      <div className="my-4">
        <Steps
          current={3}
          percent={percentBranch}
          items={[
            {
              title: "Mahsulot qismlari",
              subTitle: "birinchi bosqich",
            },
            {
              title: "Narx qo'shish",
              subTitle: "ikkinchi bosqich",
            },
            {
              title: "Filial biriktirish",
              subTitle: "uchinchi bosqich",
            },
          ]}
        />
      </div>
      <div className="bg--color px-2 py-3">
        <h3 className="font-semibold	">Mahsulot filialini qo'shish</h3>
        <form
          onSubmit={handleSubmitBranch}
          className="mt-3   create-branch-form"
        >
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
                    onChange={(value) => (
                      handleInputChangeFilial(index, "branch", value),
                      setPercentBranch(40)
                    )}
                    options={branch}
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
                    onChange={(value) => (
                      handleInputChangeFilial(index, "product_variant", value),
                      setPercentBranch(70)
                    )}
                    options={product}
                  />
                </Space>
              </div>

              <Input
                size="small"
                className="col-md-3"
                placeholder="Sonini kiriting"
                onChange={(e) =>
                  handleInputChangeFilial(index, "quantity", e.target.value)
                }
              />
                <Button
                   type="danger"
                  onClick={() => handleDeleteRow(index)}
                  className="col-md-1 ml-2"
                >
                  <DeleteIcon />
                </Button>
            </div>
          ))}
          <div className="row mt-4">
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
                style={{ width: "100%" }}
              >
                {submiting ? "Qo'shilmoqda" : "mahsulot qo'shish"}
              </Button>
            </div>
            <div className="col-md-4">
              <Button
                variant="contained"
                sx={{
                  background: "#000",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
                style={{ width: "100%" }}
                startIcon={<AddIcon />}
                onClick={handleAddRowBranch}
              >
                Qo'shish
              </Button>
            </div>
          </div>
        </form>
        <Toaster />
      </div>
    </>
  );
}
