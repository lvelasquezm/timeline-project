import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import * as itemsModule from '../data/items';

import App from '../components/App';

// Save the original items array.
const { items: originalItems } = jest.requireActual('../data/items');

describe('<App />', () => {
  it('renders the app', () => {
    // @ts-ignore: mock the items array.
    itemsModule.items = originalItems;
    render(<App />);

    expect(screen.getByText('Timeline Visualization')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-wrapper')).toBeInTheDocument();
  });

  it('renders the empty state', () => {
    // @ts-ignore: mock the items array.
    itemsModule.items = [];

    render(<App />);

    expect(screen.getByTestId('empty-container')).toBeInTheDocument();
  });
});