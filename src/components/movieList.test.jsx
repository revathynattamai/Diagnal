import { render, screen } from '@testing-library/react';
import { MovieList } from './movieList';

test('render correctly', () => {
    render(<MovieList />);
    console.log(screen.debug());
})