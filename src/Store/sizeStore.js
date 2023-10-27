import Swal from 'sweetalert2';
import { create } from "zustand";
import * as Server from "../app/api/index";

const useSizeStore = create ((set) => ({
    list : [],
    loading : false,
    getAllList : async () => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getAllSizeList();
            set((state)=>({
                list: response.data,
                loading: false,
            }));
        } 
        catch (error) {
            Swal.fire("Failed","List Fetch Failed","error");    
        }
    },
    // getListByParentId : async (parentId) => {
    //     try {
    //         set((state)=>({loading:true}));
    //         var response = await Server.getCategoryListByParentId({categoryId:parentId});
    //         set((state)=>({
    //             list: response.data,
    //             loading: false,
    //         }));
    //     } 
    //     catch (error) {
    //         Swal.fire("Failed","List Fetch Failed","error");    
    //     }
    // },
}));

export default useSizeStore;