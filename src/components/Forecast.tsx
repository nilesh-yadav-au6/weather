import Card from "./Card";
import Loader from "./Loader";
import Temperature from "./Temperature";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Daily } from "../store/appSlice";

function Forecast() {
  const weather = useSelector((state: RootState) => state.app.weather);

  if (!weather) {
    return <Loader />;
  }

  const { daily } = weather;

  return (
    <div className="forecast-container">
      {daily?.map((weather: Daily, index: number) => {
        const date = new Date(weather.dt * 1000);
        const dayFormatter = Intl.DateTimeFormat([], {
          weekday: "long",
          timeZone: weather.timezone,
        });
        return (
          <Card key={index} className="forecast-card">
            <div className="forecast-day">{dayFormatter.format(date)}</div>
            <img
              src={`/weather_icons/${weather?.weather[0]?.icon}.png`}
              alt="icon"
              width={50}
            />
            <div className="minmax-temp">
              <Temperature temperature={weather?.temp?.max} />°
              <span>
                <Temperature temperature={weather?.temp?.min} />°
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Forecast;
