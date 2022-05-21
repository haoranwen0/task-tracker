import React from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import Create from "../components/Create";

import "../css/Home.css";

function Home() {
  return (
    <div className="home-wrapper">
      <Header />
      <Main />
      <Create />
    </div>
  );
}

export default Home;
