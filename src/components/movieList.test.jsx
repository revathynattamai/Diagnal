import React from 'react';
import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'; 
import { expect, test, afterEach } from 'vitest'
import MovieList from './movieList';

const movies = [
    {
        "name": "The Birds",
        "poster-image": "TheBirdsposter.jpg"
    },
    {
        "name": "Rear Window",
        "poster-image": "RearWindowposter.jpg"
    }
]

const searchMovies = [
    {
      "name": "Search The Birds",
      "poster-image": "searchTheBirdsposter.jpg"
    },
    {
      "name": "Search Rear Window",
      "poster-image": "searchRearWindowposter.jpg"
    }
  ]


test('render movie List correctly', () => {
    render(<MovieList movies={movies} view={"main"} />);
    const items = document.querySelectorAll("img");
    expect(items.length).toBe(2);
    expect(items[0].src).toContain("https://test.create.diagnal.com/images/TheBirdsposter.jpg");
    expect(items[1].src).toContain("https://test.create.diagnal.com/images/RearWindowposter.jpg");
    const name = document.querySelectorAll("span");
    expect(name[0].innerHTML).toBe("The Birds");
    expect(name[1].innerHTML).toBe("Rear Window");
})

test('render search movie List correctly', () => {
    render(<MovieList searchList={searchMovies} view={"search"} />);
    const items = document.querySelectorAll("img");
    console.log(screen.debug());
    expect(items.length).toBe(2);
    expect(items[0].src).toContain("https://test.create.diagnal.com/images/searchTheBirdsposter.jpg");
    expect(items[1].src).toContain("https://test.create.diagnal.com/images/searchRearWindowposter.jpg");
    const name = document.querySelectorAll("span");
    expect(name[0].innerHTML).toBe("Search The Birds");
    expect(name[1].innerHTML).toBe("Search Rear Window");
})