// 회원 정보 집어 넣는 것(php의 session 같은 페이지)
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        displayName: "",
        uid: "",
        accessToken: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.accessToken = action.payload.accessToken;
        },

        clearUser: (state) => {
            state.displayName = "";
            state.uid = "";
            state.accessToken = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;