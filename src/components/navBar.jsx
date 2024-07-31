import React, { useContext } from 'react';
import '../App.css';
import { baseUrl } from '../utils';
import { MovieContext } from "../dataContext";


function showNavBar() {
    const { movies, searchList, view, title, searchTerm, setSearchTerm, setView, setSearchList } = useContext(MovieContext);

    const handleSearchValueChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === "") {
            setView("main");
        }
    }

    const handleSearch = () => {
        let searchedMovies = movies.filter((movie) => {
            if (movie.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return movie;
            }
        });
        setSearchList(searchedMovies);
        setView("search");
        if (searchTerm === "") {
            setView("main");
        }
    }

    const handleBack = () => {
        setView("main");
        setSearchTerm("");
    }

    return (<div className='nav'>
        <div className='left-nav'>
            <img className='items' src={`${baseUrl}images/Back.png`} onClick={handleBack} />
            <div className='items'>{title} </div>
        </div>
        <div className='right-nav'>
            <input type="text" value={searchTerm} onChange={(event) => handleSearchValueChange(event)} onKeyDown={(e) => {
                if (e.key === "Enter")
                    handleSearch()
            }}></input>
            <img src={`${baseUrl}images/search.png`} onClick={handleSearch} />
        </div>
    </div>)

}

export default showNavBar;
