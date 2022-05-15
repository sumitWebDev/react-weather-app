import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchWeatherDayAsync } from "../actions/weather.actions";
import dict from "../dict";
import moment from "moment";
import { useParams } from 'react-router-dom';
import '../styles/dayDetails.scss'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Day = (props) => {
    const dispatch = useDispatch();
    const { weatherEachDay } = useSelector((store) => store);
    const params = useParams();
    useEffect(() => {
        dispatch(FetchWeatherDayAsync());
    }, [dispatch])
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    let dataEachDay = weatherEachDay.map((day) => {
        if (moment(new Date(params.id * 1000)).format('DD/MM/YYYY') === moment(new Date(day.dt * 1000)).format('DD/MM/YYYY')) {
            return (

                <div key={day.dt} className="flex items-center text-center day-details-grid justify-center">
                    <div className='day-details-grid-contents'>
                        <h3 className="text-white-700 time">
                            {moment(new Date(day.dt * 1000)).format("hh:mm A")}
                        </h3>
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
            <div className="humidity-chart-cont flex justify-center align-center gap-x-6 gap-y-6">
                <ResponsiveContainer width="50%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 10,
                            right: 80,
                            left: 10,
                            bottom: 30,
                        }}
                    >
                        <Tooltip />
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/* <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend /> */}
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
                <div className="day-details-cont grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-6">

                    {dataEachDay.length > 0 ? dataEachDay : '...Loading weather data'}
                </div>
        </>
    );
}

export default Day;