import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();
  const node = useRef();

  const handleDropdown = (e) => {
    setIsDropdown(!isDropdown);
  };

  const clickOutsideDropdown = (e) => {
    if (!node.current.contains(e.target)) {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("touchmove", clickOutsideDropdown);
    document.addEventListener("mousedown", clickOutsideDropdown);
    return () => {
      document.removeEventListener("touchmove", clickOutsideDropdown);
      document.removeEventListener("mousedown", clickOutsideDropdown);
    };
  }, [isDropdown]);

  return (
    <header>
      <img
        src="/octopus.png"
        alt="icon octonews"
        onClick={() => navigate("/")}
      />
      <input type="search" placeholder="search..." />
      <button
        ref={node}
        className="settings"
        type="button"
        onClick={handleDropdown}
      >
        <img
          src={isDropdown ? "/users-arrow-down.svg" : "/users-arrow-left.svg"}
          alt="user-settings"
        />
      </button>
      <DropdownMenu isDropdown={isDropdown} />
    </header>
  );
};

const DropdownMenu = ({ isDropdown }) => {
  return (
    <nav className={isDropdown ? "dropdown-content" : ""}>
      <Link to="/News">Register</Link>
      <hr />
      <Link to="/News">Login</Link>
    </nav>
  );
};
