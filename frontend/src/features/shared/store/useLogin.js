import { create } from "zustand";

const useLogin = create((set)=>({
   user: null,
   loading: false,
   login: true  
}))