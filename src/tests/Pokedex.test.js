import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(text).toBeInTheDocument();
  });

  test('Se é exibido o próx Pokémon qdo o botão Próximo pokémon é clicado.', async () => {
    // botão
    const { history } = renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pikachu = screen.getByText(/pikachu/i);
    expect(history.location.pathname).toBe('/');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(button);
    const charmander = screen.getByText(/charmander/i);
    expect(history.location.pathname).toBe('/');
    expect(charmander).toBeInTheDocument();
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    // const names = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const filter = pokemons.filter((pokemon) => pokemon.type);
    console.log(filter);

    expect(buttons[0]).toHaveTextContent('Electric');
    userEvent.click(buttons[0]);
    const filter0 = pokemons.filter((pokemon) => pokemon.type === 'Electric');
    expect(filter0).toBeDefined();

    expect(buttons[1]).toHaveTextContent('Fire');
    userEvent.click(buttons[1]);
    const filter1 = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    expect(filter1).toBeDefined();

    expect(buttons[2]).toHaveTextContent('Bug');
    userEvent.click(buttons[2]);
    const filter2 = pokemons.filter((pokemon) => pokemon.type === 'Bug');
    expect(filter2).toBeDefined();

    expect(buttons[3]).toHaveTextContent('Poison');
    userEvent.click(buttons[3]);
    const filter3 = pokemons.filter((pokemon) => pokemon.type === 'Poison');
    expect(filter3).toBeDefined();

    expect(buttons[4]).toHaveTextContent('Psychic');
    userEvent.click(buttons[4]);
    const filter4 = pokemons.filter((pokemon) => pokemon.type === 'Psychic');
    expect(filter4).toBeDefined();

    expect(buttons[5]).toHaveTextContent('Normal');
    userEvent.click(buttons[5]);
    const filter5 = pokemons.filter((pokemon) => pokemon.type === 'Normal');
    expect(filter5).toBeDefined();

    expect(buttons[6]).toHaveTextContent('Dragon');
    userEvent.click(buttons[6]);
    const filter6 = pokemons.filter((pokemon) => pokemon.type === 'Dragon');
    expect(filter6).toBeDefined();

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const filter = pokemons.filter((pokemon) => pokemon.type);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    expect(filter).toBeDefined();

    if (window.onload) {
      expect(buttonAll).toBeEnabled();
    }
  });
});
