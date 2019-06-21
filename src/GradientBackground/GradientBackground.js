// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Svg, LinearGradient, Defs, Stop, Rect } from 'react-native-svg';

type GradientDirection = 'leftToRight' | 'topToBottom';

type Props = {
  fromColor?: string,
  toColor?: string,
  direction?: GradientDirection,
};

const GradientBackground = ({ fromColor, toColor, direction }: Props) => (
  <Svg style={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
    <Defs>
      <LinearGradient
        id="grad"
        x1="0%"
        y1="0%"
        x2={direction === 'leftToRight' ? '100%' : '0%'}
        y2={direction === 'topToBottom' ? '100%' : '0%'}
      >
        <Stop offset="0" stopColor={fromColor} stopOpacity="1" />
        <Stop offset="1" stopColor={toColor} stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
  </Svg>
);

GradientBackground.defaultProps = {
  fromColor: "#b8cef2",
  toColor: "#40a4f9",
  direction: 'topToBottom',
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default GradientBackground;
