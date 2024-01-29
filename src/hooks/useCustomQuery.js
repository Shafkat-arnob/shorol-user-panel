import { showSweetAlert } from "@/lib/swal";
import { useQuery } from "react-query";

const useCustomQuery = ({ queryKey = [], queryFn = () => {}, rest = {} }) => {
  //const [fetchedData,setFetchedData] = useState();

  const { data, isLoading, refetch, isError } = useQuery(queryKey, queryFn, {
    onSuccess: (response) => {
      console.log(response.data);
    },
    onError: (error) => {
      showSweetAlert({
        icon: "error",
        title: "Error!",
        text: error.message,
        showConfirmButton: true,
      });
    },
    refetchOnWindowFocus: false,
    ...rest,
  });

  return { data, isLoading, refetch, isError };
};

export default useCustomQuery;
