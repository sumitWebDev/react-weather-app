import axios from "axios";
import { useEffect, useState } from "react";
import dict from "../dict";
export default function Example() {
  var day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [cityName, setCityName] = useState();
  const [weatherConditions, setweatherConditions] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=7fa8ec92190927efb89d316589df0a71&units=metric"
      )
      .then((response) => {
        setCityName(`${response.data.city.name},${response.data.city.country}`);
        let weatherConditions = response.data.list.filter((i) => {
          return (
            new Date(i.dt * 1000).toLocaleTimeString() ===
            new Date(1648144800 * 1000).toLocaleTimeString()
          );
        });
        setweatherConditions(weatherConditions);
      });
  }, []);

  let showData = "";
  if (weatherConditions) {
    showData = weatherConditions.map((weather) => {
      console.log(weather);
      return (
        <a key={weather.dt} href="#" className="group">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center">
            <h3 className="mt-4 text-sm text-gray-700">
              {day[new Date(weather.dt * 1000).getDay()]}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {weather.dt_txt}
            </p>
            <i className={`wi ${dict[weather.weather[0].icon]}`}></i>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {weather.main.temp}
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {weather.weather[0].description}
            </p>
          </div>
        </a>
      );
    });
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Weather Conditions</h2>
        <p>{cityName}</p>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {showData}
        </div>
      </div>
    </div>
  );
}
