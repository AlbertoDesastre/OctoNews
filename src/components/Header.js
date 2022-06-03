import { useEffect, useRef, useState } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownNavMenu, setIsDropdownNavMenu] = useState(false);
  const navigate = useNavigate();
  const node = useRef();

  const handleDropdown = (e) => {
    setIsDropdownNavMenu(!isDropdownNavMenu);
  };

  const clickOutsideDropdown = (e) => {
    if (!node.current.contains(e.target)) {
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
    <header>
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
    </header>
  );
};

const DropdownNavMenu = ({ isDropdown }) => {
  return (
    <nav className={isDropdown ? "dropdown-content" : ""}>
      <Link to="/News">Register</Link>
      <hr />
      <Link to="/News">Login</Link>
    </nav>
  );
};
