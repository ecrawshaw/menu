import React from 'react';
import { render } from '@testing-library/react';
import MenuCard from '../MenuCard';

const props = {
  key: 'Snickers',
  title: 'Snickers',
  description: 'Hungry, why wait?',
  price: 3.99,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Snickers-broken.png',
};

describe('Testing the menuCard component', () => {
  let container;

  it('Should render a menu item card', () => {
    container = render(
      <MenuCard {...props} />,
    );

    expect(container.getByText(props.title)).toBeInTheDocument();
    expect(container.getByText(props.description)).toBeInTheDocument();
    expect(container.getByText('$3.99')).toBeInTheDocument();
  });
});
