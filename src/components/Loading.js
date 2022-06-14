import "./Loading.css";

export const Loading = (className) => {
  return (
    <img
      className={className}
      src="/svg-icons/three-dots.svg"
      alt="loading three dots"
    />
  );
};
