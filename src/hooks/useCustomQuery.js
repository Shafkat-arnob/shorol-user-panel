import { useQuery } from "react-query";
import Swal from "sweetalert2";

const useCustomQuery = ({ queryKey = [], queryFn = () => {}, rest = {} }) => {
  //const [fetchedData,setFetchedData] = useState();

  const { data, isLoading, refetch, isError } = useQuery(queryKey, queryFn, {
    onSuccess: (response) => {
      console.log("called");
      console.log(response);
    },
    onError: (error) => {
      Swal.fire({
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
