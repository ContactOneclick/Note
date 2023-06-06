import React from "react";
import SettingIcon from "../../assets/setting.png";
import "./header.css";

const Header = () => {
  return (
    <div className="align-items-center bg-danger d-flex flex-row justify-content-between rounded-4">
      <div className="d-flex flex-column gap-2 m-3 text-white">
        <span> User dashboard / Attendance </span>
        <span className="text_header"> Attendance </span>
      </div>
      <div className="d-flex flex-row gap-3 m-3 text-white">
        <span className="text_header">Set Password</span>
        <span className="text_header">Logout</span>|
        <span className="text_header">Hi, Mark</span>
        <button className="bg-transparent border-0">
          <img src={SettingIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Header;
