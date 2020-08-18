import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Current from '../../../src/components/Current';
import { Data } from '../../../src/types';

configure({ adapter: new Adapter() });

describe('<Current />', () => {
  const mockData: Data = {
    amount: '12121.23',
    base: 'BTC',
    currency: 'USD',
    timestamp: new Date(),
  };

  let wrapper = shallow(<Current current={mockData} />);

  it("should render a div with a class 'current'", () => {
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.find('div').first().hasClass('current')).toEqual(true);
  });

  it("should render a span with '12121.23 USD'", () => {
    expect(wrapper.find('span').at(1).text()).toEqual('12121.23 USD');
  });

  it("should render 'Loading' when current is null", () => {
    // Dont pass props
    wrapper = shallow(<Current />);
    expect(wrapper.find('div').at(2).text()).toEqual('Loading');
  });
});
