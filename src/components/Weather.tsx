import { useEffect, useState } from "react";
import Loader from "./Loader";
import Temperature from "./Temperature";
import { getCityImage } from "../services/weatherService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function Weather() {
  const [data, setData] = useState("");

  const app = useSelector((state: RootState) => state.app);
  const { weather, unit } = app;

  console.log(weather, unit);

  useEffect(() => {
    getCityImage(app.city).then((value) => {
      setData(value.results[0].urls.small);
    });
  }, [app.city, app.country]);

  if (!weather) {
    return <Loader showText={true} height={40} />;
  }

  const { current } = weather;

  const date = new Date(current?.dt * 1000);

  const formatter = Intl.DateTimeFormat([], {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    timeZone: weather.timezone,
  });
  const dayFormatter = Intl.DateTimeFormat([], {
    weekday: "long",
    timeZone: weather.timezone,
  });

  return (
    <>
      <div
        className="weather-icon"
        style={{
          background: `url(/weather_icons/${current?.weather[0]?.icon}.png)`,
        }}
      ></div>
      <h2 className="temp">
        <Temperature temperature={current?.temp || 0} />
        <span>°{unit}</span>
      </h2>
      <p className="day">
        {dayFormatter.format(date)},
        <span className="time">{formatter?.format(date)}</span>
      </p>
      <div className="divider"></div>
      <div className="icon-img-container">
        <img
          src={`/weather_icons/${current?.weather[0]?.icon}.png`}
          alt="icon"
          width={25}
        />
        {current?.weather[0]?.description}
      </div>
      <div className="city-img-container">
        <img src={data} className="img-city" />
        <div className="city-name">
          {app.city}, {app.country}
        </div>
      </div>
    </>
  );
}

export default Weather;
