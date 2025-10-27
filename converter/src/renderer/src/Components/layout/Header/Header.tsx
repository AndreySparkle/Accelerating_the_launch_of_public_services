import React from "react";
import logo from "../../../assets/icons/Logo.svg";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container mx-auto py-4 px-15">
        <Link to="/">
          <img
            src={logo}
            alt="Госуслуги"
            width="124"
            height="22"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
