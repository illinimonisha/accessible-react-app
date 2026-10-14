import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import K8Page from './K8Page';

jest.mock(
  'react-router-dom',
  () => ({
    Link: ({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
    NavLink: ({ to, children, ...props }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  }),
  { virtual: true }
);

jest.mock('../components/icons/ScrambledScriptIcon.jsx', () => () => null);
jest.mock('../components/icons/TapTroubleIcon', () => () => null);
jest.mock('../components/icons/DimmedDetailsIcons.jsx', () => () => null);
jest.mock('../components/icons/ColorClashIcon.jsx', () => () => null);
jest.mock('../components/icons/SightlessSearchIcon.jsx', () => () => null);
jest.mock('../components/icons/SilentSurfingIcon.jsx', () => () => null);
jest.mock('../components/icons/HesitantHoverIcon.jsx', () => () => null);
jest.mock('../components/icons/FracturedFocusIcon.jsx', () => () => null);

const gamesByCategory = {
  Vision: ['Color Clash', 'Dimmed Details', 'Sightless Search'],
  Dexterity: ['Tap Trouble', 'Hesitant Hover'],
  Auditory: ['Silent Surfing'],
  Cognitive: ['Scrambled Script', 'Fractured Focus'],
};

const allGames = Object.values(gamesByCategory).flat();

test('filters K-8 games by category and restores all games', async () => {
  render(<K8Page />);

  const filterGroup = screen.getByRole('group', { name: 'Filter games by category' });
  expect(within(filterGroup).getAllByRole('button').map((button) => button.textContent)).toEqual([
    'Vision',
    'Dexterity',
    'Auditory',
    'Cognitive',
    'All',
  ]);

  allGames.forEach((game) => {
    expect(screen.getByRole('heading', { name: game })).toBeInTheDocument();
  });

  for (const [category, visibleGames] of Object.entries(gamesByCategory)) {
    const filterButton = within(filterGroup).getByRole('button', { name: category });
    await userEvent.click(filterButton);
    expect(filterButton).toHaveAttribute('aria-pressed', 'true');

    visibleGames.forEach((game) => {
      expect(screen.getByRole('heading', { name: game })).toBeInTheDocument();
    });
    allGames
      .filter((game) => !visibleGames.includes(game))
      .forEach((game) => {
        expect(screen.queryByRole('heading', { name: game })).not.toBeInTheDocument();
      });
  }

  await userEvent.click(within(filterGroup).getByRole('button', { name: 'All' }));
  allGames.forEach((game) => {
    expect(screen.getByRole('heading', { name: game })).toBeInTheDocument();
  });
});
