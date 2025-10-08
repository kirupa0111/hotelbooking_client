import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/instance";

const Widget = ({ type }) => {
  let data;
  //temprory
  //  const amount = 100;
  // const diff = 20;
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        if (type === "user") {
          // Adjust endpoint as per your backend API
          const res = await axiosInstance.get("/users/count");
          console.log(res.data.count);
          setAmount(res.data.count);
        } else if (type === "bookings") {
          const res = await axiosInstance.get("/bookings/count");
          console.log(res.data.count);
          setAmount(res.data.count);
        } else if (type === "hotels") {
          const res = await axiosInstance.get("/hotels/count");
          console.log(res.data.count);
          setAmount(res.data.count);
        } else {
          setAmount(0);
        }
      } catch (err) {
        setAmount(0);
      }
    };

    fetchCount();
  }, [type]);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,

        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "bookings":
      data = {
        title: "BOOKINGS",
        isMoney: false,

        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "hotels":
      data = {
        title: "HOTELS",
        isMoney: true,

        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      data = {
        title: "UNKNOWN",
        isMoney: false,
        icon: null,
        link: "",
      };
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage">
          <KeyboardArrowUpIcon />
          {/* {diff}% */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
