import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import './App.css';
import { baseUrl } from './utils';
import { MyContext } from "./dataContext";

const MovieList = lazy(() => import("./components/movieList"));

function App() {
  const [data, setData] = useState(null);
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [isReachBottom, setIsReachBottom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("main");
  const [searchList, setSearchList] = useState(null);

  const fetchData = async () => {
    const response = await fetch(`${baseUrl}data/page${page}.json`);
    const result = await response.json();
    if (data) {
      setData(result.page);
      setMovies([...movies, ...result.page['content-items'].content]);
    } else {
      setData(result.page);
      setMovies(result.page['content-items'].content);
    }
  }

  const onscroll = () => {
    const scrolledTill = window.scrollY + window.innerHeight;
    const minVal = 300;
    setIsReachBottom(document.body.scrollHeight - minVal < scrolledTill);
    if (isReachBottom && movies?.length != data?.['total-content-items']) setPage(page + 1)
  };

  useEffect(() => {
    fetchData();
  }, [page])

  useEffect(() => {
    window.addEventListener("scroll", onscroll);
    return () => {
      window.removeEventListener("scroll", onscroll);
    };
  }, [isReachBottom]);

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

   const showNavBar = () => {
    return (<div className='nav'>
      <div className='left-nav'>
        <img className='items' src={`${baseUrl}images/Back.png`} onClick={handleBack} />
        <div className='items'>{data?.title} </div>
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

  return (
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Suspense fallback={<div>Loading</div>}>
          {showNavBar()}
          <MyContext.Provider value={{ movies, searchList, view }}>
          <MovieList />
          </MyContext.Provider>
        </Suspense>
      </ErrorBoundary >
  )
}

export default App;
