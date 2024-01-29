import Swal from 'sweetalert2'

export const toastify = ({ icon = "success", title = "Action Successful" }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
      container: "swal-toast-container",
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
};

export const showSweetAlert = ({
  icon= "success",
  title = "Congratulations!",
  text = `Action successful!`,
  showConfirmButton= false
}) => {
  Swal.fire({
    icon: icon,
    // iconColor: "#000",
    title: title,
    text: text,
    timer: 2000,
    showConfirmButton:showConfirmButton,
    showConfirmButton: false,
  });
};

export const showDeleteAlert = () => {
  Swal.fire({
    title: {title},
    text: {text},
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText
  }).then((result) => {
    if (result.isConfirmed) {
      confirmedHandler()
    }
  })
};

export const showAreSureAlert = ({
  icon= 'warning',
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmButtonText= 'Yes, I am sure!',
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#16A34A',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText
  })
};
