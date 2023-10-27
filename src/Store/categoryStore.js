import Swal from 'sweetalert2';
import { create } from "zustand";
import { RootCategoryId } from '../Constant';
import * as Server from "../app/api/index";


const useCategoryStore = create ((set) => ({
    list : [],
    subCategoryList : [],
    loading : false,
    getAllList : async () => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getAllCategoryList();
            set((state)=>({
                list: response.data?.filter((item)=> item.id!==RootCategoryId),
                loading: false,
            }));
        } 
        catch (error) {
            Swal.fire("Failed","List Fetch Failed","error");    
        }
    },
    getListByParentId : async (parentId) => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getCategoryListByParentId({categoryId:parentId});

            if(parentId==RootCategoryId) {
            set((state)=>({
                list: response.data,
                loading: false,
            }));
            }
            else {
                set((state)=>({
                    subCategoryList: response.data,
                    loading: false,
                }));
            }
        } 
        catch (error) {
            Swal.fire("Failed","List Fetch Failed","error");    
        }
    },
}));

export default useCategoryStore;