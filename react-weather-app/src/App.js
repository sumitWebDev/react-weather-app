import Weather from './components/weather'
import Day from './components/day';
import { Routes, Route } from 'react-router-dom'
import './styles/themes.scss'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path='/:id' element={<Day />} />
        <Route path='*' element={<Day />} />
      </Routes>
    </>
  );
}

export default App;
