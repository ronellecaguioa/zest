import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';

import Chart from '../../../src/components/Chart';
import { Data } from '../../../src/types';

jest.unmock('plotly.js');
jest.unmock('../../../src/components/Chart');

configure({ adapter: new Adapter() });

describe('<Chart />', () => {
  // Mock fetched data
  const mockData: Data[] = [
    {
      amount: '12121.23',
      base: 'BTC',
      currency: 'USD',
      timestamp: new Date(),
    },
  ];

  const wrapper = mount(
    <Chart fetchedData={mockData} min={mockData[0]} max={mockData[0]} />
  );
  it('should render a Plot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
