import Swal from 'sweetalert2';
import { create } from "zustand";
import * as Server from "../app/api/index";


const useBrandStore = create ((set) => ({
    list : [],
    loading : false,
    getAllList : async () => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getAllBrandList();
            set((state)=>({
                list: response.data,
                loading: false,
            }));
        } 
        catch (error) {
            Swal.fire("Failed","List Fetch Failed","error");    
        }
    },
    getListByCategoryId : async (categoryId) => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getBrandListByCategoryId({categoryId});
            set((state)=>({
                list: response.data,
                loading: false,
            }));
        } 
        catch (error) {
            Swal.fire("Failed","List Fetch Failed","error");    
        }
    },
}));

export default useBrandStore;