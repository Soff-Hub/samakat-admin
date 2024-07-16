import {
  Backdrop,
  Fade,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "service/ApiEndpoints";
import Client from "service/Client";
import CircularProgress from "@mui/material/CircularProgress";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Form, Image, InputNumber } from "antd";
import logo from '../../../assets/images/logo Alokand emblem.png'
import toast, { Toaster } from "react-hot-toast";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #fff",
  boxShadow: 2,
  p: 2,
};

export function formatterPrice(number) {
  const numStr = String(number);

  const [integerPart, decimalPart] = numStr.split(".");

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  const formattedNumber =
    decimalPart !== undefined
      ? `${formattedIntegerPart}.${decimalPart}`
      : formattedIntegerPart;

  return formattedNumber;
}

export default function Applicaitons() {
  const { role } = useSelector((state) => state.admin);
  const [data, setData] = useState(null);
  const [dataProfile, setDataProfile] = useState(null);
  const [count, setCount] = useState("");
  const [page, setPage] = useState(1);
  const [productsId, setProductsId] = useState(null);
  const [description, setDescription] = useState(null);
  const [files, setfiles] = useState(null);
  const [open, setOpen] = useState(false);
  const [statusSel, setstatusSel] = useState(null);
  const handleClose = () => setOpen(false);
  const [form] = Form.useForm();


  async function getOrders() {
    await Client.get(API_ENDPOINTS.APPLICATIONS)
      .then((resp) => {
        setData(resp.results);
        setCount(resp.count);
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = async (event) => {
    try {
      await Client.post(API_ENDPOINTS.APPLICATIONS, event)
      getOrders();
      toast.success('Muvaffaqiyatli yuborildi')
    } catch (error) {
      toast.error(error?.response?.data?.msg[0] || error?.message);
    }
  };

  const handleSubmitPatch = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      if (files) {
        formData?.append("check_file", files);
      }
      if (description) {
        formData?.append("description", description);
      }
      if (statusSel) {
        formData?.append("status", statusSel);
      }
      formData?.append("amout", productsId?.amount);
      formData?.append("card_number", productsId?.card_number);
      await Client.patch(
        API_ENDPOINTS.APPLICATIONS + productsId?.id + "/",
        formData
      )
      toast.success('Muvaffaqiyatli yangilandi')
      getOrders();
      setOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg[0] || error?.message);
      setOpen(false);
    }
  };

  const handleClickPatch = async (item) => {
    if (item?.id) {
      setOpen(true);
      setProductsId(item);
    }
  };

  const Search = async (e) => {
    await Client.get(`${API_ENDPOINTS.APPLICATIONS}?search=${e}`)
      .then((resp) => {
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const handleChangePag = async (event, value) => {
    setPage(value);
    await Client.get(`${API_ENDPOINTS.APPLICATIONS}?page=${value}`)
      .then((resp) => {
        setCount(resp.count);
        setData(resp.results);
      })
      .catch((err) => console.log(err));
  };

  const getDate = (date) => {
    const Date = date.slice(0, 10);
    const time = date.slice(11, 18);
    return time + "\n" + Date;
  };

  async function getProfile() {
    await Client.get(API_ENDPOINTS.PROFILE)
      .then((resp) => {
        setDataProfile(resp);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getProfile()
    getOrders();
  }, []);


  const columnSeller = [
    {
      id: 1,
      name: "Id",
    },
    {
      id: 2,
      name: "Umumiy so'mma",
    },
    {
      id: 3,
      name: "Karta raqam",
    },
    {
      id: 4,
      name: "Tavsif",
    },
    {
      id: 5,
      name: "Chek rasmi",
    },
    {
      id: 6,
      name: "Yuborilgan sana",
    },
    {
      id: 7,
      name: "Holat",
    },
  ];

  const columnAdmin = [
    {
      id: 1,
      name: "Id",
    },
    {
      id: 2,
      name: "Sotuvchi",
    },
    {
      id: 3,
      name: "Umumiy so'mma",
    },
    {
      id: 4,
      name: "Karta raqam",
    },
    {
      id: 5,
      name: "Tavsif",
    },
    {
      id: 6,
      name: "Chek rasmi",
    },
    {
      id: 7,
      name: "Yuborilgan sana",
    },
    {
      id: 8,
      name: "Holat",
    },
    {
      id: 9,
      name: "Harakatlar",
    },
  ];

  const status = {
    approved: {
      name: "Tasdiqlangan",
      color: " text-green-600",
    },
    pending: {
      name: "Jarayonda",
      color: "text-yellow-500",
    },
    cancelled: {
      name: "Bekor qilingan",
      color: "text-[red]",
    },
  };

  useEffect(() => {
    if (dataProfile?.wallet) {
      form.setFieldsValue({
        amount: dataProfile?.wallet
      })
    }
  }, [form, dataProfile?.wallet])


  return (
    <div className="px-2 py-3 bg--color">
      <Toaster />
      <div className="mb-4">
        <h1 className="text-2xl">Arizalar </h1>
      </div>
      {role === "seller" && (
        <Form
          form={form}
          onFinish={handleSubmit}
          layout='vertical'
          className="row p-3 m-0 bg-white mb-2 "
        >
          <span className="mb-3 text-yellow-400  font-semibold">
            Balansdagi pulingizni yechib olishingiz uchun ariza yuboring. Sizga 24 soat ichida arizangizda ko’rsatilgan summa bo’yicha pul o’tkaziladi va bu bo’yicha xabar yuboriladi.
            <br />  !Eslatma: Xisobingizda kamida  <strong >{formatterPrice(dataProfile?.application_charge)}</strong> so’m bo’lishi kerak.
          </span>
          <Form.Item

            label="Summa"
            className="col-md-5  m-0"
            name="amount"


            rules={[
              {
                required: true,
                message:
                  'Summani kirtish majburiy',
              },
            ]}>
            <InputNumber
              disabled={dataProfile?.wallet < dataProfile?.application_charge}
              placeholder="Summa kiriting"
              className='w-full py-1 h-[40px]'
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Karta raqam"
            className="col-md-5  m-0"
            name="card_number"


            rules={[
              {
                required: true,
                message:
                  'Karta raqam kirtish majburiy',
              },
            ]}>
            <InputNumber
              disabled={dataProfile?.wallet < dataProfile?.application_charge}
              placeholder="Karta raqam kiriting"
              className='w-full py-1 h-[40px] '
              maxLength={19}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{4})+(?!\d))/g, ',')}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Button
            disabled={dataProfile?.wallet < dataProfile?.application_charge}
            type="primary"
            className={`bg-blue-500 text-${dataProfile?.wallet < dataProfile?.application_charge ? "gray-400" : "white"} col-md-2 mt-[30px] h-[40px]`}
            htmlType="submit"
          >
            Yuborish
          </Button>


        </Form>
      )}

      {data ? (
        <div className="block w-full border shadow-lg p-2 colorr">
          {role !== "seller" && (
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Izlash"
                className="sm:w-full w-1/2 px-3 py-2 border-2 rounded-md my-3 border-3  hover:outline-none focus:outline-none active:outline-none"
                onChange={(e) => Search(e.target.value)}
              />
            </div>
          )}

          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                {role === "seller"
                  ? columnSeller?.map((item) => (
                    <TableCell key={item?.id}>
                      <span className="font-bold text-[16px]">
                        {item?.name}
                      </span>
                    </TableCell>
                  ))
                  : columnAdmin?.map((item) => (
                    <TableCell key={item?.id}>
                      <span className="font-bold text-[16px]">
                        {item?.name}
                      </span>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <span className="hover:underline">#{row.id}</span>
                    </TableCell>
                    {role !== "seller" && (
                      <TableCell component="th" scope="row">
                        <span className="hover:underline">{row.seller}</span>
                      </TableCell>
                    )}

                    <TableCell component="th" scope="row">
                      <span className="hover:underline">
                        <span className="font-semibold">
                          {" "}
                          {formatterPrice(row?.amount)} so'm
                        </span>{" "}
                      </span>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <span className="hover:underline">
                        {row?.card_number}
                      </span>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <span className="hover:underline">
                        {row?.description || "Ko'rib chiqilmoqda..."}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Image.PreviewGroup >
                        <Image
                          height={40}
                          width={40}
                          src={row?.check_file || logo}
                          alt={row?.check_file || "Check rasmi"}
                        />

                      </Image.PreviewGroup>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span className="hover:underline">
                        {getDate(row?.created_at)}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span
                        className={`hover:underline ${status[row.status]?.color
                          }`}
                      >
                        {status[row.status]?.name}
                      </span>
                    </TableCell>
                    {role !== "seller" && (
                      <TableCell
                        component="th"
                        scope="row"
                        className="text-center"
                      >
                        <span
                          onClick={() => handleClickPatch(row)}
                          className="hover:underline"
                          style={{ cursor: "pointer" }}
                        >
                          <EditNoteIcon />
                        </span>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {(count && Math.ceil(count / 30) <= 1) || count === 0 ? (
            <></>
          ) : (
            <div className="m-3 mb-5">
              <Stack spacing={2}>
                <Typography> Sahifa : {page}</Typography>
                <Pagination
                  count={Math.ceil(count / 30) <= 1 ? 1 : Math.ceil(count / 30)}
                  page={page}
                  onChange={handleChangePag}
                />
              </Stack>
            </div>
          )}
        </div>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex justify-between items-start">
              <p id="transition-modal-title" variant="h6" component="h2">
                {productsId?.seller}
                <p>{formatterPrice(productsId?.amount)} so'm</p>
              </p>
              <span onClick={handleClose} style={{ cursor: "pointer" }}>
                {" "}
                <CloseIcon />
              </span>
            </div>

            <form
              className="pt-3 mt-3 pc-3 pb-0 flex flex-col justify-between bg-white gap-3"
              autoComplete="off"
              onSubmit={handleSubmitPatch}
            >
              <Select
                defaultValue={productsId?.status || statusSel}
                onChange={(e) => setstatusSel(e.target?.value)}
                placeholder="Holat"
              >
                <MenuItem value={"approved"}>Tasdiqlangan</MenuItem>
                <MenuItem value={"pending"}>Jarayonda</MenuItem>
                <MenuItem value={"cancelled"}>Bekor qilingan</MenuItem>
              </Select>

              <TextField
                className="w-100"
                name="check_file"
                label="Chek rasmi"
                type="file"
                onChange={(e) => setfiles(e.target.files[0])}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                className="w-100"
                label="Tavsif"
                multiline
                rows={4}
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={productsId?.description}
              />

              <div className="flex justify-end ">
                <div className="flex gap-3 items-center">
                  <button
                    className=" h-[40px] btn btn-danger text-red-500"
                    type="button"
                    onClick={handleClose}
                  >
                    Bekor qilish
                  </button>
                  <button

                    className=" h-[40px] btn btn-primary text-blue-500"
                    type="submit"
                  >
                    Yuborish
                  </button>
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
