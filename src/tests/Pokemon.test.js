import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const altImg = screen.getByAltText(/pikachu sprite/i);
    expect(altImg.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });

  test('Se a URL exibida muda p /pokemon/<id>, onde <id> é o id do Pokémon ', () => {
    const { history } = renderWithRouter(<App />);
    const text = screen.getByRole('link', { name: /more details/i });
    userEvent.click(text);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const textFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(textFavorite);

    const icon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(icon.src).toContain('/star-icon.svg');
  });
});
