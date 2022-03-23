import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Se é exibido No favorite pokemon found se não tiver pokémons fav', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const textDetails = screen.getByRole('link', { name: /More details/i });
    expect(pathname).toBe('/');
    userEvent.click(textDetails);

    const favoritePokemonText = screen.getByText(/Pokémon favoritado/i);
    expect(history.location.pathname).toBe('/pokemons/25'); // ____________-
    userEvent.click(favoritePokemonText);

    const favoritePokemonsPage = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(history.location.pathname).toBe('/pokemons/25');
    userEvent.click(favoritePokemonsPage);

    const pikachu = screen.getByText(/pikachu/i);
    expect(history.location.pathname).toBe('/favorites');
    expect(pikachu).toBeInTheDocument();
  });
});
