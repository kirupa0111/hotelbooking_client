import "./list.scss";
import Sidebar from "../../components/adminesidebar/Sidebar";
import Navbar from "../../components/adminnavbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="lContainer">
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
