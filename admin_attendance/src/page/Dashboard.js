import React from "react";
import Header from "../component/Header/Header";
import Attendance from "../component/Attendance/Attendance";
import Footer from "../component/Footer";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex flex-column m-md-3">
        <Header />
        <Attendance />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
