import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axiosInstance from "../../utils/instance";
import { green } from "@mui/material/colors";
// import { userColumns, roomColumns, hotelColumns } from "../../datatablesource";

const Datatable = ({ columns }) => {
  console.log(columns);

  const location = useLocation();

  console.log(location);
  const path = location.pathname.split("/")[1];
  console.log(path);
  const resolvedType = path;
  const [list, setList] = useState();

  const { data } = useFetch(`/${path}`);
  console.log(data);
  useEffect(() => {
    console.log(data);
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      if (path === "rooms") {
        // Find the room object to get its hotelId
        const room = list.find((item) => item._id === id);
        if (!room || !room.hotelId) {
          alert("Hotel ID not found for this room.");
          return;
        }
        await axiosInstance.delete(`/${path}/${id}/${room.hotelId}`);
      } else {
        await axiosInstance.delete(`/${path}/${id}`);
      }
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Item not found. It may have already been deleted.");
      } else {
        alert("Failed to delete item. Please try again.");
      }
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log(params);

        return (
          <div className="cellAction">
            <Link
              to="/users/test"
              style={{ textDecoration: "none", color: green }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={
          resolvedType === "booking" ? columns : columns.concat(actionColumn)
        }
        // || []).concat(actionColumn)
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
