import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  let navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          navigate("/somepage");
        }
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("MetaMask is not installed. Please consider installing it.");
    }
  };

  return (
    <div className="nav">
      <div className="logo_container">
        <img src="" alt="Logo Description" />
      </div>
      <div className="nav_container">
        <Link to="/destination1">
          <div className="nav_header">
            <p className="nav_text"></p>
          </div>
        </Link>
        <Link to="/destination2">
          <div className="nav_header">
            <p className="nav_text"></p>
          </div>
        </Link>
        <Link to="/destination3">
          <div className="nav_header">
            <p className="nav_text"></p>
          </div>
        </Link>
        <Link to="/destination4">
          <div className="nav_header">
            <p className="nav_text"></p>
          </div>
        </Link>
      </div>
      <div className="btn_nav" onClick={connectWallet}>
        <p className="btn_text"></p>
      </div>
    </div>
  );
};

export default Nav;
