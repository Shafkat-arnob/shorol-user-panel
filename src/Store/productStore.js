import Swal from 'sweetalert2';
import { create } from "zustand";
import * as Server from "../app/api/index";

const useProductStore = create ((set) => ({
    list : [],
    loading : false,
    selectedProduct: {},
    getAllList : async () => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getAllProductList();
            set((state)=>({
                list: response.data,
                loading: false,
            }));
        } 
        catch (error) {
            Swal.fire("Failed","List Fetch Failed","error");    
        }
    },
    getSelectedProduct : async (id) => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getProductById(id);
            set((state)=>({
                selectedProduct: response.data,
                loading: false,
            }));
        } 
        catch (error) {
            Swal.fire("Failed","Product Fetch Failed","error");    
        }
    },
    getProductByFilters : async (params) => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getProductByCategoryAndColor(params);
            set((state)=>({
                list: response.data,
                loading: false,
            }));
        } 
        catch (error) {
            Swal.fire("Failed","Product Fetch Failed","error");    
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

export default useProductStore;