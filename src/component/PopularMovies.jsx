import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
// import Navbar from './Navbar';
import { searchMovie } from './Api';
import Footer from './Footer';

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const movieBanner = movies[Math.floor(Math.random() * movies.length)];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState('')

  useEffect(() => {
    searchMovie().then((result) => {
        setSearchResults(result);
    })
}, []);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {

    const getMovieList = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        setMovies(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            // Temporary solution
          }

          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getMovieList();
  }, []);

  useEffect(() => {

    const searchMovieList = async () => {
      const datainput = input
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}search/movie?page=1&query=${datainput}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        setSearchResults(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            // Temporary solution
          }

          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    searchMovieList();
  }, [input]);

  const filteredMovies = input.length >= 3 ? searchResults : movies;


  return (
    <>
    <div className="home-banner">
      <div className="banner-image">
      <img src={`https://image.tmdb.org/t/p/original/${movieBanner?.backdrop_path}`} alt="" className='image-container'/>
      {/*  */}
      <div className='navbar-wrapper'>
        <h4>Movielist</h4>
        <input type="search" placeholder='What do you want to watch?' onChange={(e) => setInput(e.target.value)}/>
        {isLoggedIn ? (
                  <div className="button-wrapper">          
                  <button className='register'
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    window.location.href = "/";
                  }}
                  >Logout</button>
                  </div>
        ) : (
          <div className="button-wrapper">          
          <Link as={Link} to={'/login'}><button className='login'>Login</button></Link>
          <Link as={Link} to={'/register'} ><button className='register'>Register</button></Link>
          </div>
        ) }
      </div>
      <div className='content-wrapper'>
        <h3>{movieBanner?.original_title}</h3>
        <p>{movieBanner?.overview}</p>
        <button>Watch Trailer</button>
      </div>
      </div>
    </div>
      {isLoggedIn ? (      <div className="app">
        <div className="app-header">
          <h2>Popular Movies</h2>
          <div className="movie-container d-flex flex-wrap m-5">
         {filteredMovies.map((movie, index) => (
                <Card key={index} variant="secondary" className="bg-danger mx-4 mb-2" style={{ width: '18rem' }}>
                <Card.Img />
                <Card.Body >
                  <Card.Title>{movie.title}</Card.Title>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" />
                 <Link to={`/Detail/${movie.id}`}> <Button variant="primary">Detail</Button></Link>
                </Card.Body>
              </Card>
         )) 

    }
          </div>
        </div>
      </div>) : (<>
      <h1 className='text-center m-5'>Login first to see all PopularMovies</h1>
      </>)}
        <Footer></Footer>
    </>
  )
}

export default PopularMovies
