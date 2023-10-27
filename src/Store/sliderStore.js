import Swal from 'sweetalert2';
import { create } from "zustand";
import * as Server from "../app/api/index";

const useSliderStore = create ((set) => ({
    list : [],
    loading : false,
    getAllList : async () => {
        try {
            set((state)=>({loading:true}));
            var response = await Server.getAllSliderList();
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

export default useSliderStore;