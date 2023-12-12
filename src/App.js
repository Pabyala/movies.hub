import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import TVSeries from './Pages/TVSeries';
import Navbar from './Components/Navbar';
import { Container } from 'react-bootstrap';
import Search from './Pages/Search';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar/>
        <Container className='app-con'>
          <Routes>
            <Route path='/' element={<Trending/>} exact/>
            <Route path='/movies' element={<Movies/>}/>
            <Route path='/series' element={<TVSeries/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
