import axios from "axios";
import { useEffect, useState } from "react";
import dict from "../dict";

export default function Example(props) {
  var day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [weatherConditions, setweatherConditions] = useState();
  const [count,setCount] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${props.coords.latitude}&lon=${props.coords.longitude}&exclude=hourly,minutely&appid=b7e82c1fd0244baac1d6ac379633a7dc&units=metric`
      )
      .then((response) => {
        let weatherConditions = response.data.daily.map((weather) => {
          if (count < 5) {
            setCount(count+1)
            return (
              <a key={weather.dt} href="#" className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center">
                  <h3 className="mt-4 text-sm text-gray-700">
                    {day[new Date(weather.dt * 1000).getDay()]}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {new Date(weather.dt * 1000).toLocaleDateString()}
                  </p>
                  <i className={`wi ${dict[weather.weather[0].icon]}`}></i>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {weather.temp.day}&deg;C
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {weather.weather[0].description}
                  </p>
                </div>
              </a>
            );
          }
          else
           return false
        });
        setweatherConditions(weatherConditions);
      });
  }, []);


  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {weatherConditions}
      </div>

    </>
  );
}
