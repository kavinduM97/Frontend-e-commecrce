import { createSlice, configureStore } from "@reduxjs/toolkit";

//import { configureStore } from "@reduxjs/toolkit/dist/configureStore";

const initialAuthState = {
  //userName : "",
  //passWord : "",
  isAuthanticated: false,
};

const authSlice = createSlice({
  name: "authantication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      // initialAuthState.userName = state.userName
      // initialAuthState.passWord = state.passWord
      state.isAuthanticated = true;
    },

    // logout(state) {
    //     state.isAuthanticated = false
    // }
  },
});

export const store = configureStore({ reducer: { auth: authSlice.reducer } });

export const authActions = authSlice.actions;

//useSelector
