import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutSessionAction } from "../redux/userDucks";

const NavBar = (props) => {
  const dispatch = useDispatch();

  const isUserActive = useSelector((store) => store.user.active);

  const closeSession = () => {
    dispatch(logOutSessionAction());
    props.history.push("/login");
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-2">
      <Link className="navbar-brand" to="/">
        {" "}
        APP POKE{" "}
      </Link>
      <div className="d-flex">
        {isUserActive ? (
          <>
            <NavLink className="btn btn-dark mr-2" to="/" exact>
              Home
            </NavLink>
            <NavLink className="btn btn-dark mr-2" to="/profile" exact>
              Profile
            </NavLink>
            <button
              onClick={() => closeSession()}
              className="btn btn-dark mr-2"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink className="btn btn-dark mr-2" to="/login" exact>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(NavBar);
