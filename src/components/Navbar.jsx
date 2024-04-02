import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import "../styles/component/navbar.css";

function Navbar() {
  // user is a state variable which holds the data of logged in user.
  const [user, setUser] = useState(null);
  const menuRight = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (userData) {
      setUser(userData.user);
    }
  }, []);

  const username = user && `${user.fristName} ${user.lastName}`;

  const padding = {
    padding: "20px",
    fontSize: "24px",
  };

  // logout function
  const handleLogout = (e) => {
    // remove user data from session storage
    sessionStorage.removeItem("loggedInUser");

    // dispatch
    dispatch({ type: "User-Logout" });

    // set data empty
    setUser("");

    // navigate to login page
    navigate("/login");

    // refresh page
    window.location.reload();
  };

  const items = [
    {
      label: username,
      items: [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => handleLogout(),
          key: "logout", // Add a unique key prop
        },
      ],
      key: "user", // Add a unique key prop
    },
  ];

  const startContent = (
    <>
      <Link to="/dashBoard" style={padding}>
        DashBoard
      </Link>
      <Link to="/addUrl" style={padding}>
        Create Url
      </Link>
      <Link to="/viewUrl" style={padding}>
        View Url
      </Link>
    </>
  );

  const endContent = (
    <>
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        className="mr-2 avatar"
        onClick={(event) => menuRight.current.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
        shape="circle"
      />
      <Menu
        model={items}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </>
  );

  return (
    <>
      {user && user != null ? (
        <div className="card p-2 mt-3 mr-2 ml-2 border-0">
          <Menubar start={startContent} end={endContent} />
        </div>
      ) : (
        <div className="nav">
          <Link to="/" style={padding}>
            Home
          </Link>
          <Link to="/login" style={padding}>
            Login
          </Link>
          <Link to="/signup" style={padding}>
            Signup
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
