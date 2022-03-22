import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
  test('Se existe o primeiro link Home, e se redireciona para / qdo clicado', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Se existe o segundo link About, e se redireciona para /about qdo clicado', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Se existe o link Favorite, e se redireciona para /favorites qdo clicado', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Se é direcionada p/ a pág. Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/qualquer/');
    const notFoundTitle = screen.getByText(/Page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
