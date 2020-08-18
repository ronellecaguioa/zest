import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';

import App from '../../src/App';

jest.unmock('plotly.js');
jest.unmock('../../src/App');
// jest.unmock('./stylesheets/index.scss')

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const wrapper = shallow(<App />);
  it('should render header with a title "Bitcoin Prices"', () => {
    expect(wrapper.find('header').length).toEqual(1);
    expect(wrapper.find('header').childAt(0).text()).toEqual('Bitcoin Prices');
  });

  it('should render a main html element with two div tags', () => {
    const main = wrapper.find('main');
    expect(main.length).toEqual(1);
    expect(main.childAt(0).hasClass('chart')).toEqual(true);
    expect(main.childAt(1).hasClass('metrics')).toEqual(true);
  });
});
