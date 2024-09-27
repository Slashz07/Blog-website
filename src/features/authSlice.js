import  {createSlice} from "@reduxjs/toolkit"

const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.userData=action.payload.userData
        },
        logout:(state)=>{
            state.status=false,
            state.userData=null
        },
        updatePic:(state,action)=>{
            state.userData.prefs=action.payload.userPic
        },
    }
})

export const {login,logout, updatePic} = authSlice.actions

export default authSlice.reducer