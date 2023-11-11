import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import Client from "service/Client";
import { API_ENDPOINTS } from "service/ApiEndpoints";

export default function Users() {
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState(null);

  const handleChangeAcc = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const getItem = async (id) => {
    await Client.get(`${API_ENDPOINTS.DETAIL_USER}${id}`)
      .then((res) => {
        console.log("res", res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getItem(location.search.split("?")[2]);
    // eslint-disable-next-line
  }, [location.search.split("?")[2]]);

  return (
    <div>
      <div className="flex items-center justify-between">
            <h1 className="text-[28px] pb-3">Foydalanuvchi</h1>
            <Link to="/users">
              <Button
                variant="contained"
                color="info"
                size="large"
                startIcon={<ArrowBackIcon />}
              >
                Orqaga
              </Button>
            </Link>
          </div>

      <form className="flex gap-[40px]">
        <div className="w-full">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChangeAcc("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Asosiy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex gap-3">
                <TextField
                  label="Telefon raqam"
                  // eslint-disable-next-line
                  variant="outlined"
                  size="small"
                  name="phone"
                  value={data ? data?.phone : ""}
                />
                <TextField
                  label="Ism"
                  variant="outlined"
                  size="small"
                  name="first_name"
                  value={data ? data?.first_name : "-"}
                />
                <TextField
                  label="Roli"
                  variant="outlined"
                  size="small"
                  name="first_name"
                  value={data ? data?.role : ""}
                />
                <TextField
                  label="Holati"
                  variant="outlined"
                  size="small"
                  name="first_name"
                  value={data ? data?.verify_code : ""}
                />
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChangeAcc("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Foydalanuvchi Manzillari
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data?.user_addresses ? (
                data?.user_addresses?.map((item, i) => {
                  return (
                    <div key={i}>
                      <hr className="py-2" />
                      <h3>
                        {" "}
                        <span className="font-medium">Location</span> :{" "}
                        {item?.branch}
                      </h3>
                      <h3>
                        {" "}
                        <span className="font-medium">Filial</span> :{" "}
                        {item?.address?.location}
                      </h3>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChangeAcc("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Mahsulot savati
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data?.product_wishlist ? (
                data?.product_wishlist?.map((item, i) => {
                  return (
                    <div>
                      <span className="font-medium">{i + 1}.</span>
                      {item.product}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChangeAcc("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Retsipt savati
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data?.recipe_wishlist ? (
                data?.recipe_wishlist?.map((item, i) => {
                  return (
                    <div>
                      <span className="font-medium">{i + 1}.</span>
                      {item.recipe}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </form>
    </div>
  );
}
