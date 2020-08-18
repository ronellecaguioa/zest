import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Trending from '../../../src/components/Trending';
import { Data } from '../../../src/types';

configure({ adapter: new Adapter() });

describe('<Trending />', () => {
  const mockData: Data[] = [
    {
      amount: '12121.23',
      base: 'BTC',
      currency: 'USD',
      timestamp: new Date(),
    },
    {
      amount: '12200.23',
      base: 'BTC',
      currency: 'USD',
      timestamp: new Date(),
    },
  ];

  const wrapper = shallow(<Trending fetchedData={mockData} />);

  it("should render a div tag with a class 'trending'", () => {
    expect(wrapper.find('div').at(0).hasClass('trending')).toEqual(true);
  });

  it('should not be trending', () => {
    expect(wrapper.find('h3').hasClass('down')).toEqual(true);
  });

  it("should display 'Loading' while data loads", () => {
    expect(wrapper.find('.high').childAt(1).text()).toEqual('Loading');
  });
});
