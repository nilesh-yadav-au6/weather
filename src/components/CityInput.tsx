import { useRef, useEffect } from "react";
import { getCityName } from "../services/weatherService";
import geoCoords from "../utils/geoCoords";
import { useDispatch } from "react-redux";
import { setCity, setCountry, setGeoCoordinates } from "../store/appSlice";

interface GeolocationCoordinates {
  longitude: number;
  latitude: number;
}

function CityInput() {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  let time: number | undefined;

  const handleGeolocationSearch = async () => {
    try {
      const coords = (await geoCoords()) as GeolocationCoordinates;
      dispatch(
        setGeoCoordinates({
          payload: { lon: coords.longitude, lat: coords.latitude },
        })
      );
      const { country, name } = await getCityName(
        coords.longitude,
        coords.latitude
      );
      dispatch(setCountry({ payload: country }));
      dispatch(setCity({ payload: name }));
      input.current!.value = "";
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  };

  useEffect(() => {
    handleGeolocationSearch();
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.target.value;
    clearTimeout(time);
    time = setTimeout(() => {
      dispatch(setCity({ payload: value }));
    }, 500);
  };

  return (
    <div className="input-group">
      <span onClick={handleGeolocationSearch}>
        <svg
          className="location"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M5 9a7 7 0 1 1 8 6.93V21a1 1 0 1 1-2 0v-5.07A7.001 7.001 0 0 1 5 9Zm5.94-1.06A1.5 1.5 0 0 1 12 7.5a1 1 0 1 0 0-2A3.5 3.5 0 0 0 8.5 9a1 1 0 0 0 2 0c0-.398.158-.78.44-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        type="text"
        ref={input}
        placeholder="Search for places ..."
        onInput={handleInputChange}
      />
    </div>
  );
}

export default CityInput;
