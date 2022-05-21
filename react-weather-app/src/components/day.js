import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchWeatherDayAsync } from "../actions/weather.actions";
import dict from "../dict";
import moment from "moment";
import { useParams } from 'react-router-dom';
import '../styles/dayDetails.scss'
import { LineChart, Line, Legend, XAxis, ResponsiveContainer, LabelList } from 'recharts';


const Day = (props) => {
    const dispatch = useDispatch();
    const { weatherEachDay } = useSelector((store) => store);
    const params = useParams();
    useEffect(() => {
        dispatch(FetchWeatherDayAsync());
    }, [dispatch])
    let humidityData = [];
    let maxTempData = [];

    let dataEachDay = weatherEachDay.map((day) => {
        if (moment(new Date(params.id * 1000)).format('DD/MM/YYYY') === moment(new Date(day.dt * 1000)).format('DD/MM/YYYY')) {
            maxTempData.push({ 'max temp': day.main.temp_max, 'time': moment(new Date(day.dt * 1000)).format("hh:mm A") });
            humidityData.push({ 'humidity': day.main.humidity, 'time': moment(new Date(day.dt * 1000)).format("hh:mm A") });
            return (

                <div key={day.dt} className="flex items-center text-center day-details-grid justify-center grid grid-cols-1 lg:grid-cols-2">
                    <h3 className="text-white-700 time">
                        {moment(new Date(day.dt * 1000)).format("hh:mm A")}
                    </h3>
                    <div className='day-details-grid-contents'>
                        <i className={`wi ${dict[day.weather[0].icon]}`}></i>
                        <p className="font-medium temp-day">
                            {day.main.temp}&deg;C
                        </p>
                        <p className="font-medium weather-cond-day">
                            {day.weather[0].description}
                        </p>
                    </div>

                </div>

            )
        }
    })

    return (
        <>

            <div className="day-details-cont ">
                <div className="chart-cont grid grid-cols-1 lg:grid-cols-4 lg:gap-6 ">
                    <div className="humidity-chart lg:col-span-2">
                        <h2>Humidity</h2>
                        <ResponsiveContainer width="100%" height="80%">
                            <LineChart
                                width={500}
                                height={150}
                                data={humidityData}
                                margin={{
                                    top: 10,
                                    right: 50,
                                    left: 50,
                                    bottom: 10,
                                }}
                            >
                                {/* <Tooltip /> */}
                                <XAxis dataKey="time" />
                                <Legend />
                                <Line type="monotone" dataKey="humidity" stroke="#8884d8" activeDot={{ r: 8 }} dot={false}/>
                                <LabelList dataKey="amountLabel" style={{ fill: "white" }} />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="humidity-chart lg:col-span-2">
                        <h2>Maximum Temperature</h2>
                        <ResponsiveContainer width="100%" height="80%">
                            <LineChart
                                width={500}
                                height={150}
                                data={maxTempData}
                                margin={{
                                    top: 10,
                                    right: 50,
                                    left: 50,
                                    bottom: 10,
                                }}
                            >
                                {/* <Tooltip /> */}
                                <XAxis dataKey="time" />
                                <Legend />
                                <Line type="monotone" dataKey="max temp" stroke="#8884d8" activeDot={{ r: 8 }} dot={false}/>
                                <LabelList dataKey="amountLabel" style={{ fill: "white" }} />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="day-details grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-6">
                    {dataEachDay.length > 0 ? dataEachDay : '...Loading weather data'}
                </div>

            </div>
        </>
    );
}

export default Day;