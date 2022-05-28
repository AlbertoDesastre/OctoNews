import "./Header.css";

export const Header = () => {
  return (
    <header>
      <img src="/favicon.ico" alt="icon octonews" />
      <input type="search" placeholder="search" />
      <button className="settings" type="button">
        settings
      </button>
    </header>
  );
};
