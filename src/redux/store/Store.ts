import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import CommonSlice from "../slice/CommonSlice";


export const store=configureStore({
    reducer:{
        CommonSlice:CommonSlice
    }
})

export type RootState=ReturnType<typeof store.getState>;
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;


export type AppDispatch=typeof store.dispatch;
export const useAppDispatch:()=>AppDispatch=useDispatch
