import "./Error.css";

export const Error = ({ className, error }) => (
  <p className={className}>{error}</p>
);
