import { useMutation, useQueryClient } from "react-query";
import { showSweetAlert } from "../utils/swal";

const useCustomMutation = ({
  queryKey,
  mutationFn = () => {},
  afterSuccessFn = () => {},
  afterErrorFn = () => {},
  successText,
  rest = {},
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      queryKey && queryClient.invalidateQueries(queryKey);
      showSweetAlert({
        text: successText
          ? successText
          : `Your ${queryKey} has been created successfully!`,
      });
      afterSuccessFn();
    },
    onError: (error) => {
      showSweetAlert({
        icon: "error",
        title: "Error!",
        text: error.message,
      });
      afterErrorFn();
    },
    ...rest,
  });

  return { mutate, isLoading, isError };
};

export default useCustomMutation;
