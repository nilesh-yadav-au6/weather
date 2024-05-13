import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function useTemp(temp: number, toFixed = 0) {
  const app = useSelector((state: RootState) => state.app);
  const { unit } = app;

  if (unit.toLowerCase() === "f") {
    return ((temp * 9) / 5 + 32).toFixed(toFixed);
  }

  return temp.toFixed(toFixed);
}

export default useTemp;
