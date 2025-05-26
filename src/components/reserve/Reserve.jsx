import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/instance";
import PaymentButton from "../../components/paymentbutton/PaymentButton";
import { useLocation } from "react-router-dom";
const Reserve = ({ setOpen, hotelId }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [selectedRooms, setSelectedRooms] = useState([]);

  const [amount, setAmount] = useState();

  const { data } = useFetch(`/hotels/room/${hotelId}`);
  console.log("Fetched data:", data);
  const { dates } = useContext(SearchContext);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(data);

  const { hoteldata } = useFetch(`/hotels/find/${id}`);
  console.log(hoteldata);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  // Defensive check for dates[0], startDate, and endDate
  let alldates = [];
  if (
    Array.isArray(dates) &&
    dates.length > 0 &&
    dates[0].startDate &&
    dates[0].endDate
  ) {
    alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  } else {
    console.warn("dates[0], startDate, or endDate is undefined");
  }

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e, price) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setAmount(price);
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);
  const navigate = useNavigate();

  const handleClick = async () => {
    console.log(user); //null
    console.log(hotelId);
    console.log(selectedRooms); // selected room id
    console.log(data); // room details 3 rooms
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axiosInstance.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      // navigate("/");
      navigate("/hotelslist", {
        state: { user, hotelId, selectedRooms, data },
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(amount);
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>select your room:</span>
        {Array.isArray(data) ? (
          data
            .filter((item) => item !== null)

            .map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rIteminfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max People:<b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item.price}</div>
                </div>
                {Array.isArray(item.roomNumber) &&
                item.roomNumber.length > 0 ? (
                  item.roomNumber.map((roomNumber) => (
                    <div className="room" key={roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={(e) => {
                          handleSelect(e, item.price);
                        }}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))
                ) : (
                  <div>No rooms available</div>
                )}
              </div>
            ))
        ) : (
          <div>Loading...</div>
        )}
        {/* <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button> */}
        <PaymentButton
          amount={amount}
          currency="INR"
          selectedRooms={selectedRooms}
          hotelId={hotelId}
          user={user}
          userId={user ? user._id : undefined}
          data={data}
          dates={dates}
        />
      </div>
    </div>
  );
};

export default Reserve;
