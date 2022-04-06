import Weather from './components/weather'
import Day from './components/day';
import { Routes, Route } from 'react-router-dom'
import './styles/themes.css'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path='/day' element={<Day />} />
      </Routes>
    </>
  );
}

export default App;
