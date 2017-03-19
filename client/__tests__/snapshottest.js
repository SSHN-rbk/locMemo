import 'react-native';
import React from 'react';
import Intro from '../index.android.js';
//import mockCamera from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <Intro />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});




//jest.mock('react-native-camera', () => mockCamera);