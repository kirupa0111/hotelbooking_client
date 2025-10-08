import "./home.scss";
import Sidebar from "../../components/adminesidebar/Sidebar";
import Navbar from "../../components/adminnavbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featuredchart/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/admintable/AdminTable";
function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homecontainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="bookings" />
          <Widget type="hotels" />
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="last 6 month Revenue" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          {/* <div className="listTitle">Latest Transactions</div> */}
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Home;
