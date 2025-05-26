import axiosInstance from "../../utils/instance";
import React, { useEffect } from "react";
// import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentButton = ({
  amount,
  selectedRooms,
  hotelId,
  user,
  userId,
  dates,
}) => {
  console.log(user);
  console.log(user.email);
  console.log(dates);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(`/hotels/find/${id}`);
  console.log(data);
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = " https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("Razorpay script loaded");
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
      };
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);
  const handlePayment = async () => {
    // Check if already booked
    try {
      const check = await axiosInstance.post("/hotels/checkBooked", {
        userId,
        hotelId,
      });
      if (check.data.alreadyBooked) {
        alert("You have already booked this hotel with this email.");
        return;
      }
    } catch (err) {
      alert("Error checking booking status.");
      return;
    }
    if (window.Razorpay) {
      try {
        const { data: order } = await axiosInstance.post(
          "/payment/createorder",
          {
            amount: amount,
            currency: "INR",
          }
        );
        const options = {
          key: "rzp_test_d4P8UEi6kaJGfV",
          amount: order.amount,
          currency: order.currency,
          name: "Your App Name",
          description: "Test Transaction",
          order_id: order.id,
          handler: async function (response) {
            try {
              const bookedHotelDetails = {
                userId: userId,
                hotelId: hotelId,
                roomIds: selectedRooms,
                paymentId: response.razorpay_payment_id,
                paymentStatus: "success",
                checkIn: dates[0].startDate,
                checkOut: dates[0].endDate,
                amount: amount,
                username: user.username,
                img: user.img,
                hotelname: data.name,
                email: user.email,
              };

              console.log("Booked hotel details:", bookedHotelDetails);
              console.log("Payment response:", response);
              const paymentResult = {
                order_id: order.id,
                payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              console.log(options);

              const verify = await axiosInstance.post(
                "/payment/verifypayment",
                paymentResult
              );
              console.log(verify);
              if (verify.data) {
                console.log(bookedHotelDetails);
                const bookHotel = await axiosInstance.post(
                  "/hotels/bookedHotel",
                  bookedHotelDetails
                );
              }
              console.log(verify.data.message);
              alert("data send successfully");

              if (verify.data.message === "payment verified successfully") {
                alert("Payment successful!");
                navigate("/");
              } else {
                alert("Payment verification failed!");
              }
            } catch (error) {
              console.log(error);
              alert("payment verification failed");
            }
          },

          prefill: {
            name: user.username,
            email: user.email,
            contact: "6381020691",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Error during payment:", error);
        alert("Payment failed. Please try again.");
      }
    }
  };

  // console.log("amount", amount);
  // console.log("selectedRooms", selectedRooms);
  // console.log("hotelId", hotelId);
  // console.log("user", user);
  // console.log("userId", userId);
  return (
    <div>
      <h2>Complete Your Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentButton;
