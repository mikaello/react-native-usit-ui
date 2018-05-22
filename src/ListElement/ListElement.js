// @flow
import React from 'react';
import {
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomText from '../CustomText';

import { colors, constants } from '../styles';

const { height, width } = Dimensions.get('window');
const midValue = width / height;
const rowHeight = height * 0.08;

export type ListItem = {
  id: string | number,
  text: string,
  subText?: string,
  textInput?: boolean,
  inputPlaceholder?: string,
  inputKeyboardType?: string,
};

type Props = {
  item: ListItem,
  selected: boolean,
  disabled: boolean,
  onPress: () => void,
  onTextInputChange: string => void,
  icons: {
    checked: (color: string) => React.Component<*>,
    unchecked: (color: string, disabled: boolean) => React.Component<*>,
  },
  color: string,
};

class ListElement extends React.Component<Props> {
  static defaultProps = {
    color: colors.primary,
    disabled: false,
    onPress: () => {},
    onTextInputChange: () => {},
  };

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.selected !== nextProps.selected ||
      this.props.disabled !== nextProps.disabled
    );
  }

  render() {
    const {
      color,
      item,
      icons,
      selected,
      onPress,
      onTextInputChange,
      disabled,
    } = this.props;
    // The color design of the rows is based on opacity, so HEX values is used
    const selectedColor = color && `${color}33`;
    const unselectedColor = color && `${color}10`;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={constants.activeOpacity}
          onPress={() => !disabled && onPress()}
          style={[
            styles.row,
            {
              backgroundColor: selected ? selectedColor : unselectedColor,
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.iconContainer}>
              {selected
                ? icons.checked(color)
                : icons.unchecked(color, disabled)}
            </View>
            <View style={styles.text}>
              <CustomText
                style={{
                  fontSize: midValue * 36,
                }}
              >
                {item.text}
              </CustomText>
            </View>
          </View>
          {item.subText && (
            <View style={{ flexDirection: 'row', marginBottom: 18 }}>
              <View style={{ flex: 0.157 }} />
              <View style={{ flex: 0.83 }}>
                <CustomText style={{ fontSize: midValue * 27 }}>
                  {item.subText}
                </CustomText>
              </View>
            </View>
          )}
        </TouchableOpacity>
        {item.textInput &&
          selected && (
            <TextInput
              style={styles.textInput}
              placeholder={item.inputPlaceholder}
              onChangeText={onTextInputChange}
              keyboardType={item.inputKeyboardType}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    width: width * 0.9,
    borderRadius: constants.borderRadius,
  },
  iconContainer: {
    width: width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 14,
    width: width * 0.75,
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#c3c3c3',
    borderRadius: 4,
    fontSize: midValue * 36,
    paddingVertical: 10,
    paddingLeft: 16,
    marginLeft: width * 0.14,
    marginBottom: 12,
  },
});

export default ListElement;
