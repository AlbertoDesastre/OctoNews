import { useContext, useEffect, useRef, useState } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import "./Header.css";

export const Header = () => {
  const { user, isLoadingUser } = useContext(AuthContext);
  const { height, width } = useWindowDimensions();

  const [inputValue, setInputValue] = useState("");
  const [isDropdownNavMenu, setIsDropdownNavMenu] = useState(false);
  const navigate = useNavigate();
  const node = useRef();

  const handleDropdown = (e) => {
    setIsDropdownNavMenu(!isDropdownNavMenu);
  };

  const clickOutsideDropdown = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setIsDropdownNavMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("touchmove", clickOutsideDropdown);
    document.addEventListener("mousedown", clickOutsideDropdown);
    return () => {
      document.removeEventListener("touchmove", clickOutsideDropdown);
      document.removeEventListener("mousedown", clickOutsideDropdown);
    };
  }, [isDropdownNavMenu]);

  const handleKeyPress = async (e) => {
    if (e.keyCode === 13) {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ q: inputValue })}`,
      });
    }
  };

  return (
    <header className="front-header">
      <img
        src="/octopus.png"
        alt="icon octonews"
        onClick={() => navigate("/")}
      />
      <input
        type="search"
        placeholder="search..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      />
      {!isLoadingUser && width > 1000 && <DesktopNavMenu />}
      {!isLoadingUser && width < 1000 && (
        <>
          {user ? (
            <>
              <button
                ref={node}
                className="settings"
                type="button"
                onClick={handleDropdown}
              >
                {user.avatar ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/users/${user.avatar}`}
                    alt="user-settings"
                  />
                ) : (
                  <img
                    src={`/user-login-default-icon.svg`}
                    alt="user-settings"
                  />
                )}
              </button>
              <DropdownNavMenu isDropdown={isDropdownNavMenu} />
            </>
          ) : (
            <>
              <button
                ref={node}
                className="settings"
                type="button"
                onClick={handleDropdown}
              >
                <img
                  src={
                    isDropdownNavMenu
                      ? "/users-arrow-down.svg"
                      : "/users-arrow-left.svg"
                  }
                  alt="user-settings"
                />
              </button>
              <DropdownNavMenu isDropdown={isDropdownNavMenu} />
            </>
          )}
        </>
      )}
    </header>
  );
};

const DropdownNavMenu = ({ isDropdown }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className={isDropdown ? "dropdown dropdown-content" : "dropdown"}>
      {user ? (
        <>
          <Link to={`/users/${user.name}/settings`}>Settings</Link>
          <hr />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <hr />
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

const DesktopNavMenu = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="desktop-user">
      {user && (
        <>
          {user.avatar ? (
            <img
              className="desktop-user-img"
              src={`${process.env.REACT_APP_BACKEND}/uploads/users/${user.avatar}`}
              alt="user-settings"
            />
          ) : (
            <img
              className="desktop-user-img"
              src={`/user-login-default-icon.svg`}
              alt="user-settings"
            />
          )}
        </>
      )}
      <nav className="desktop-navmenu">
        {user ? (
          <>
            <Link to={`/users/${user.name}/settings`}>Settings</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </div>
  );
};
