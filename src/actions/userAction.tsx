import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
} from "../constants/userConstants";
import { RootState } from "../store";
import axios from "axios";

export const login =
  (
    email: String,
    password: String
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    console.log(email, password);

    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      // const response: any = await fetch(
      //   "https://localhost:7075/api/User/login",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     credentials: "include",
      //     body: JSON.stringify({
      //       email,
      //       password,
      //     }),
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));

      const response = await axios
        .post("https://localhost:7075/api/User/login", {
          email,
          password,
        })
        .then((response) => {
          return response.data.detail;
        });

      console.log(response, "++++++++++++++++++++++");

      const userData = { Email: response.email, Password: response.password };

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });

      localStorage.setItem("userInfo", JSON.stringify(userData));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          (error as any).response && (error as any).response.data.message
            ? (error as any).response.data.message
            : (error as any).message,
      });

      alert("login failed");
    }
  };

export const logout =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });

    await fetch("https://localhost:7075/api/User/logout", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };
