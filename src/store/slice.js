import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginning: JSON.parse(localStorage.getItem("is_loginning")) || false,
  token: localStorage.getItem("admin") || "",
  user: null,
  currentPage:
    localStorage.getItem("role") === "superadmin"  ?  "Dashboard" : localStorage.getItem("role") === "seller" ? "Dashboard" : "Buyurtmalar",
  role: localStorage.getItem("role") || "",
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload?.token.access;

      localStorage.setItem("admin", action.payload?.token.access);
      localStorage.setItem("role", action.payload?.role);
      localStorage.setItem("is_loginning", JSON.stringify(true));
      state.isLoginning = true;

      if (action.payload?.role === "employee") {
         // eslint-disable-next-line
        location.replace("orders");
      } else if (action.payload?.role === "superadmin") {
         // eslint-disable-next-line
        location.replace("dashboard");
      }else{
         // eslint-disable-next-line
         location.replace("dashboard");
      }
    },
    logoutSuccess: (state, action) => {
      state.isLoginning = false;
      state.token = "";
      localStorage.removeItem("admin");
      localStorage.removeItem("role");
      localStorage.removeItem("is_loginning");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});


export const { loginSuccess, logoutSuccess, setUser, setCurrentPage } =
  slice.actions;
export default slice.reducer;
