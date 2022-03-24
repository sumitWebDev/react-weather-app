import axios from 'axios' 
import {useEffect, useState} from 'react'

const products = [
    {
      id: 1,
      day: 'Monday',
      href: '#',
      time: 'March 1st, 1:00pm',
      imageSrc: 'wi-day-sunny',
      temp: '35F   ',
      conditions: 'Clear Sky', 
    },
    {
      id: 2,
      day: 'Tuesday',
      href: '#',
      time: 'March 1st, 1:00pm',
      imageSrc: 'wi wi-day-cloudy',
      temp: '35F',
      conditions: 'Clear Sky', 

    },
    {
      id: 3,
      day: 'Wednesday',
      href: '#',
      time: 'March 1st, 1:00pm',
      imageSrc: 'wi-day-lightning',
      temp: '35F',
      conditions: 'Clear Sky',  

    },
    {
      id: 4,
      day: 'Thursday',
      href: '#',
      time: 'March 1st, 1:00pm',
      imageSrc: 'wi-day-windy',
      temp: '35F',
      conditions: 'Clear Sky', 

    },
    // More products...
  ]
  
  export default function Example() {

    const [cityName, setCityName] = useState();
    //const [weatherConditions, setweatherConditions] = useState();

    useEffect(()=>{
        axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=7fa8ec92190927efb89d316589df0a71')
            .then((response)=>{
                setCityName(`${response.data.city.name},${response.data.city.country}` )
                // let weatherConditions = response.data.map((weather)=>{
                //     return (
                //         <h3 className="mt-4 text-sm text-gray-700"></h3>
                //     )
                // })
                console.log(response.data)
            
            })
    })

    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Weather Conditions</h2>
            <p>{cityName}</p>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center">
                 <h3 className="mt-4 text-sm text-gray-700">{product.day}</h3>
                 <p className="mt-1 text-lg font-medium text-gray-900">{product.time}</p>
                  <i className= {`wi ${product.imageSrc}`}></i>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.temp}</p>
                  <p className="mt-1 text-lg font-medium text-gray-900">{product.conditions}</p>
                </div>                                
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
  