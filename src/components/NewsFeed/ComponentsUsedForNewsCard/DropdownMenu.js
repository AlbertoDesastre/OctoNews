export const DropdownMenu = ({ isDropdown, idOfDropDown }) => {
  return (
    <div
      className={
        isDropdown
          ? "dropdown-content-newscard dropdown-newscard"
          : "dropdown-newscard"
      }
      id={idOfDropDown}
    >
      <button>Link copied!</button>
    </div>
  );
};
