import { useEffect } from "react";
import CityInput from "./components/CityInput";
import Weather from "./components/Weather";
import "./App.css";
import geoCoords from "./utils/geoCoords";
import getWeather, {
  getCityCoords,
  getCityName,
} from "./services/weatherService";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import {
  setCity,
  setCountry,
  setGeoCoordinates,
  setUnit,
  setWeather,
} from "./store/appSlice";

function App() {
  const dispatch = useDispatch();
  const app = useSelector((state: RootState) => state.app);

  useEffect(() => {
    (async () => {
      const { longitude: lon, latitude: lat } = await geoCoords();
      if (lon && lat) {
        const { name, country } = await getCityName(lon, lat);
        dispatch(setGeoCoordinates({ payload: { lon, lat } }));
        dispatch(setCity({ payload: name }));
        dispatch(setCountry({ payload: country }));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { lon, lat, country } = await getCityCoords(app.city);
      dispatch(setGeoCoordinates({ payload: { lon, lat } }));
      dispatch(setCountry({ payload: country }));
    })();
  }, [app.city]);

  useEffect(() => {
    (async () => {
      const data = await getWeather(app.geoCoords.lon, app.geoCoords.lat);
      console.log(data);
      dispatch(setWeather({ payload: data }));
    })();
  }, [app.geoCoords.lat, app.geoCoords.lon]);

  const activeStyle = { background: "#1a1a1a", color: "#fff" };

  return (
    <section className="container">
      <div className="col-left">
        <CityInput />
        <Weather />
      </div>
      <div className="col-right">
        <div className="top-header">
          <Tabs
            defaultIndex={1}
            rightComponent={
              <div className="units">
                <span
                  style={app.unit === "C" ? activeStyle : { color: "#000" }}
                  onClick={() => {
                    dispatch(setUnit({ payload: "C" }));
                  }}
                >
                  °C
                </span>
                <span
                  onClick={() => {
                    dispatch(setUnit({ payload: "F" }));
                  }}
                  style={app.unit === "F" ? activeStyle : { color: "#000" }}
                >
                  °F
                </span>
              </div>
            }
          >
            <Tab title="Today">
              <div className="forecast-container">No data to preview</div>
            </Tab>
            <Tab title="Week">
              <Forecast />
            </Tab>
          </Tabs>
        </div>
        <h2 className="heading">Today's Highlights</h2>
        <Highlights />
      </div>
    </section>
  );
}

export default App;
