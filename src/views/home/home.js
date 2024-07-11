import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  navigationConfig,
  navigationConfigEmployee,
  navigationConfigSeller,
} from "configs/navigationConfig";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import {
  adminActionRoutes,
  employeActionRoutes,
  sellerActionRoutes,
} from "configs/routes.config/routes";
import AppRoute from "components/route/AppRoute";
import UserDropdown from "components/shared/UserDropdown";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "store/slice";
import Logo from "../../assets/images/logo-white.png";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentPage, role, isLoginning } = useSelector(
    (state) => state.admin
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const currentPageConverter = (page) => {
    if (role === "superadmin") {
      const current = navigationConfig.find(
        (el) => el.path.split("/")[1] === page.split("/")[1]
      );
      dispatch(setCurrentPage(current?.name || "Dashboard"));
    }else if (role === "seller") {
      const current = navigationConfigSeller.find(
        (el) => el.path.split("/")[1] === page.split("/")[1]
      );
      dispatch(setCurrentPage(current?.name || "Dashboard"));
    } else {
      const current = navigationConfigEmployee.find(
        (el) => el.path.split("/")[1] === page.split("/")[1]
      );
      dispatch(setCurrentPage(current?.name || "Buyurtmalar"));
    }
  };

  useEffect(() => {
    if (role === "superadmin") {
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
    } else if (role === "employee") {
      if (location.pathname === "/") {
        navigate("/orders");
      }
    }else{
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
    }
    currentPageConverter(location.pathname);

    // eslint-disable-next-line
  }, [location.pathname, navigationConfig, role, isLoginning]);

  return (
    <Box sx={{ display: "flex", minWidth: 650 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="bg-black">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentPage}
          </Typography>
          <UserDropdown />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img style={{ width: "80%" }} src={Logo} alt="aloqand" />
          <IconButton onClick={handleDrawerClose}>
            <MenuOpenIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          {role === "superadmin"
            ? navigationConfig?.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ display: "block" }}
                  className={
                    item.name === currentPage ? "bg-black text-white" : ""
                  }
                >
                  <Link to={item.path}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                          color: item.name === currentPage ? "#fff" : "",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                          color: item.name === currentPage ? "#fff" : "",
                          opacity: open ? 1 : 0,
                        }}
                        primary={item.name}
                      />
                    </ListItemButton>
                  </Link>
                  <Divider />
                </ListItem>
              ))
            : role === "seller"
            ? navigationConfigSeller?.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ display: "block" }}
                  className={
                    item.name === currentPage ? "bg-black text-white" : ""
                  }
                >
                  <Link to={item.path}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                          color: item.name === currentPage ? "#fff" : "",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                  <Divider />
                </ListItem>
              ))
            : navigationConfigEmployee?.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ display: "block" }}
                  className={
                    item.name === currentPage ? "bg-black text-white" : ""
                  }
                >
                  <Link to={item.path}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                          color: item.name === currentPage ? "#fff" : "",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                  <Divider />
                </ListItem>
              ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 2, p: 0 }}
        style={{ backgroundColor: "#F2F5FB", height: "100%" }}
      >
        <DrawerHeader />
        <div>
          <Suspense>
            <Routes>
              {role === "superadmin"
                ? adminActionRoutes.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={<AppRoute component={route.component} />}
                      />
                    );
                  })
                : role === "seller"
                ? sellerActionRoutes.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={<AppRoute component={route.component} />}
                      />
                    );
                  })
                : employeActionRoutes.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={<AppRoute component={route.component} />}
                      />
                    );
                  })}
            </Routes>
          </Suspense>
        </div>
      </Box>
    </Box>
  );
}
