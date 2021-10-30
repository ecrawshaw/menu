import React from 'react';
import { render } from '@testing-library/react';
import MenuCard from '../menuCard';
/* globals describe, expect, it */

const props = {
  key: 0,
  title: 'Snickers',
  description: 'Hungry, why wait?',
  price: 3.99,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Snickers-broken.png',
};

describe('Testing the menuCard component', () => {
  let component;

  it('Should render a menu item card', () => {
    component = render(
      <MenuCard {...props} />,
    );

    expect(component.getByText(props.title)).toBeInTheDocument();
    expect(component.getByText(props.description)).toBeInTheDocument();
    expect(component.getByText('$3.99')).toBeInTheDocument();
  });
});
