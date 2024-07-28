import uuid from 'react-uuid';
import { baseUrl } from '../utils';
import { memo } from 'react'
import './App.css'

const handleImgeError = (event) => {
    return event.target.src = "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png";
}

const showMovieList = (movies) => {
    if (!movies?.length) { return <div>No movies</div> }
    return movies?.map((movie) => {
        return (<div className='movie' key={uuid()}>
            <img src={`${baseUrl}images/${movie["poster-image"]}`} onError={handleImgeError} />
            <span>{movie?.name}</span>
        </div>)
    })
}

const MovieList = memo(function MovieList({ movies, searchList, view }) {
    return (
        <div className='movieContainer'>
            {view === "main" && showMovieList(movies)}
            {view === "search" && showMovieList(searchList)}
        </div>)
})


export default MovieList;