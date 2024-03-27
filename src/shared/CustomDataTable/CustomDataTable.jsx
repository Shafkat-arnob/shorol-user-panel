import DataTable from "react-data-table-component";
import { customStyles } from "./customStyles";

const CustomDataTable = ({
  data,
  columns,
  hasPagination = false,
  multipleSelection = false,
  ...rest
}) => {
  const handlePageChange = (page) => {
    console.log("handlePageChange", page);
    setPage(page)
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log('handlePerRowsChange', newPerPage, page)
    setRowsPerPage(newPerPage);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      center={true}
      responsive={true}
      customStyles={customStyles}
      // pagination={hasPagination}
      // onChangeRowsPerPage={handlePerRowsChange}
      // onChangePage={handlePageChange}
      {...rest}
    />
  );
};

export default CustomDataTable;
