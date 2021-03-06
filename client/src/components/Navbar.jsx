import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { unSetQid } from "../redux/reducers/auth";

export default function Navbar() {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const { qid: token } = useSelector((state) => state.auth);

  const isAuthPath =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPath) {
    return null;
  }

  return (
    <div className="header">
      <div className="container d-flex align-items-center justify-content-between">
        <div>
          <h3 className="brand">
            <Link to="/" className="custom-link">
              MobiHub
            </Link>
          </h3>
        </div>
        <div className="nav-links">
          {token ? (
            <>
              {" "}
              <div>
                <Link to="/chats" className="custom-link">
                  Messages
                </Link>
              </div>
              <div>
                <Link to="/add-car" className="custom-link">
                  Add Car
                </Link>
              </div>
              <div>
                <span
                  className="custom-link cursor-pointer"
                  onClick={async () => {
                    await dispatch(unSetQid());
                    history.push("/");
                  }}
                >
                  Logout
                </span>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/login" className="custom-link">
                  Sign In
                </Link>
              </div>
              <div>
                <Link to="/register" className="custom-link">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
