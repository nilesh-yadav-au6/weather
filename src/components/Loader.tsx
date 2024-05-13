interface Props {
  showText?: boolean;
  height?: number;
  width?: number;
  style?: object;
}

function Loader({ showText = false, height, width, style }: Props) {
  return (
    <div
      className={showText ? "loader center" : "loader"}
      style={{ ...style, height, width }}
    >
      <div className="spinner"></div>
      {showText && <span className="loader-text">Loading...</span>}
    </div>
  );
}

export default Loader;
