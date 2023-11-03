import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieSearch, getMovies } from "../Redux/Actions/postActions";
import { logout } from "../Redux/Actions/authActions";
import CardMovie from "../component/CardMovie";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [input, setInput] = useState("");

  //access local storage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // To set the state of the store
  const dispatch = useDispatch();

  // Access the store
  const { posts } = useSelector((state) => state.post);
  const { Search } = useSelector((state) => state.post);

  const movieBanner = posts[Math.floor(Math.random() * posts.length)];

  //fetching api popularmovies
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  //fetching api searchmovies
  useEffect(() => {
    dispatch(getMovieSearch(input));
  }, [dispatch, input]);

  const filteredMovies = input.length >= 3 ? Search : posts;

  return (
    <>
      <div className="home-banner">
        <div className="banner-image">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieBanner?.backdrop_path}`}
            alt=""
            className="image-container"
          />

          <div className="navbar-wrapper">
            <h4>Movielist</h4>
            <input
              type="search"
              placeholder="What do you want to watch?"
              onChange={(e) => setInput(e.target.value)}
            />
            {isLoggedIn ? (
              <div className="button-wrapper">
                <button
                  className="register"
                  onClick={() => {
                    dispatch(logout((window.location.href = "/")));
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="button-wrapper">
                <Link as={Link} to={"/login"}>
                  <button className="login">Login</button>
                </Link>
                <Link as={Link} to={"/register"}>
                  <button className="register">Register</button>
                </Link>
              </div>
            )}
          </div>
          <div className="content-wrapper">
            <h3>{movieBanner?.original_title}</h3>
            <p>{movieBanner?.overview}</p>
            <button>Watch Trailer</button>
          </div>
        </div>
      </div>
      <CardMovie filteredMovies={filteredMovies} />
    </>
  );
}

export default Home;
