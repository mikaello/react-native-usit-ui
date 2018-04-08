import React from 'react';

import Svg, { G, Circle } from 'react-native-svg';
import { colors } from '../styles';

const RadioChecked = (p: { color?: string }) => (
  <Svg height="22" width="22" viewBox="0 0 22 22">
    <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <G id="Radio" stroke={p.color || colors.primary} strokeWidth="2">
        <Circle fill="white" cx="11" cy="11" r="10" />
      </G>
      <Circle fill={p.color || colors.primary} cx="11" cy="11" r="5" />
    </G>
  </Svg>
);

export default RadioChecked;
