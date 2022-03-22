import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragOne = screen.getByText(/This application simulates/i);
    const paragTwo = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragOne).toBeInTheDocument();
    expect(paragTwo).toBeInTheDocument();
  });

  test('Se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText('Pokédex');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
