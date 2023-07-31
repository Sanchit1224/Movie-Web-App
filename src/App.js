import React, {useState,useEffect } from "react";
import MoviesList from './components/MoviesList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddToFavourite from "./components/AddToFavourites";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue,setSearchValue]= useState('');
  const [favourites, setFavourites] = useState([]);

  const getmoviesRequest = async (searchValue)=>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=5ab94c2c`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
    setMovies(responseJson.Search);
  }
};
   const addFavouriteMovie = (movie)=>{
     const newFavouriteList = [...favourites,movie];
     setFavourites(newFavouriteList);
   };
  useEffect(()=>{
    getmoviesRequest(searchValue);
  },[searchValue]);
  return (
  <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading = "Movies"/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
   <div className="row">
   <MoviesList movies = {movies}
    favouriteComponents={AddToFavourite}
    handleFavouritesClick={addFavouriteMovie}
    />
   </div>
   <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MoviesList movies={favourites} favouriteComponents={AddToFavourite} />
			</div>
    </div>
  );
};
export default App;
