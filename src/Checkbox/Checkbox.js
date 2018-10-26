//@flow
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { CheckedBox, UncheckedBox } from '../svg-icons';

const defaultIcons = {
  checked: (color: string) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <CheckedBox color={color} />
    </View>
  ),
  unchecked: (color: string, disabled: ?boolean) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <UncheckedBox color={color} disabled={disabled} />
    </View>
  ),
};

type Props = {
  checked: boolean,
  color: string,
  style: any,
  onPress: () => void,
};

const Checkbox = ({ checked, onPress, color, style }: Props) => (
  <View style={StyleSheet.flatten(style)}>
    <TouchableOpacity onPress={onPress}>
      {checked ? defaultIcons.checked(color) : defaultIcons.unchecked(color)}
    </TouchableOpacity>
  </View>
);

Checkbox.defaultProps = {
  color: 'black',
  checked: false,
  onPress: () => {},
  style: {},
};

export default Checkbox;
