// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  stepX: number,
  ofY: number,
  primaryColor?: string,
  secondaryColor?: string,
  width?: number,
  height?: number,
  style?: Object,
};

const ProgressBar = ({
  stepX,
  ofY,
  primaryColor,
  secondaryColor,
  width,
  height,
  style,
}: Props) => {
  return (
    <View
      style={[
        { width: width, height: height, flexDirection: 'row' },
        StyleSheet.flatten(style),
      ]}
    >
      <View style={{ flex: stepX, backgroundColor: primaryColor }} />
      <View style={{ flex: ofY - stepX, backgroundColor: secondaryColor }} />
    </View>
  );
};

ProgressBar.defaultProps = {
  primaryColor: '#972E9B',
  secondaryColor: '#F4EAF5',
  width: '90%',
  height: 4,
};

export default ProgressBar;
