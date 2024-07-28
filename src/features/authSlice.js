import  {createSlice} from "@reduxjs/toolkit"

const initialState={
    status:false,
    data:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true
            state.data=action.payload.userData
        },
        logout:(state)=>{
            state.status=false,
            state.userData=false
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer