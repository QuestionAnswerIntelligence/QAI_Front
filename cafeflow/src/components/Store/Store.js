import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../Constant";
import "./Store.css";

const Store = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const requestPayment = (price, itemName) => {
    axios
      .post(
        `${API_URL}/payment/ready`,
        {
          price: price,
          itemName: itemName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        const redirectUrl = response.data.next_redirect_pc_url;
        window.location.href = redirectUrl;
      })
      .catch((error) => {
        console.error("Payment request error:", error);
      });
  };

  return (
    <div className="a">
      <div className="container11">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>포인트 샵</h1>
        </div>
        <div style={{ marginTop: "-7px" }}>
          <hr></hr>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="pointBox">
            <button
              className="box"
              onClick={() => requestPayment(1000, "1000포인트")}
            >
              1000 포인트
            </button>
            <button
              className="box"
              onClick={() => requestPayment(1000, "1000포인트")}
            >
              3000 포인트
            </button>
            <button
              className="box"
              onClick={() => requestPayment(1000, "1000포인트")}
            >
              5000 포인트
            </button>
            <button
              className="box"
              onClick={() => requestPayment(1000, "1000포인트")}
            >
              10000 포인트
            </button>
            <button
              className="box"
              onClick={() => requestPayment(1000, "1000포인트")}
            >
              30000 포인트
            </button>
            <button
              className="box"
              onClick={() => requestPayment(1000, "1000포인트")}
            >
              50000 포인트
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
