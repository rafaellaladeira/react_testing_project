import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const HISTORY_PUSH = '/pokemons/25';

  test('Se as infos detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORY_PUSH);

    const textDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    expect(textDetails).toBeInTheDocument();

    const textSummary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(textSummary).toBeInTheDocument();

    const text = screen.getByText(/This intelligent Pokémon roasts /i);
    expect(text).toBeInTheDocument();
  });

  test('Se existe na pág uma seção com os mapas das localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORY_PUSH);

    const detailsHeading = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(detailsHeading).toBeInTheDocument();

    const location = screen.getAllByAltText(/pikachu location/i);
    expect(location[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const locationOne = screen.getByText(/Kanto Viridian Forest/i);
    const locationTwo = screen.getByText(/Kanto Power Plant/i);
    expect(locationOne).toBeInTheDocument();
    expect(locationTwo).toBeInTheDocument();
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(HISTORY_PUSH);

    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favorite);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
