import Swal from 'sweetalert2';
import { create } from "zustand";
import * as Server from "../app/api/index";


const useAuthStore = create ((set) => ({
    authenticated : false,
    loading : false,
    loginAuth : async (params) => {
        console.log("inside store login auth");
        try {
            set((state)=>({loading:true}))
            var response = await Server.login(params);
            sessionStorage.setItem("authenticated", true);
            sessionStorage.setItem("access_token", response.data.access_token);
            sessionStorage.setItem("refresh_token", response.data.refresh_token);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem(
                "role",
                response.data?.authorities[0]?.authority
            );
            set((state)=>({
                authenticated: true,
                loading: false
            }))

            //toast.success("Login Successful");
            
        } catch (error) {
            console.log("login failed");
            Swal.fire("Failed","Login Failed","error");
            //toast.error("Login Failed");
        }
    },
    logout : () => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("userId");
        sessionStorage.setItem("authenticated", false);
        set((state)=>({
            authenticated: false,
        }))
        // localStorage.removeItem("profileURL");
        // localStorage.removeItem("token");
        // localStorage.removeItem("auth0_profile");
        // localStorage.removeItem("Name");
        // localStorage.setItem("authenticated", false);
        }
}));

export default useAuthStore;