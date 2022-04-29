import React from 'react' 
import { useSelector } from 'react-redux'
const Sidebar = (props) =>{
    const {weatherToday} = useSelector((store)=>store)
    console.log(weatherToday[0])
    return( 
        <aside className="bg-gradient-to-t from-green to-dark-green sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0">
        <ul className="relative">
            <li className="relative">
                <p className="flex items-center text-sm py-4 px-6 h-12">{ weatherToday.length > 0 ? weatherToday[0].temp : '' }</p>
                {weatherToday.length > 0 ? weatherToday[0].weather[0].main : ''} 
            </li>
        </ul>
    </aside>
    )
}

export default Sidebar