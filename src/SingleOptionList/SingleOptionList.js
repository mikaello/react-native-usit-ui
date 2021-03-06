// @flow
import React from 'react';
import { View } from 'react-native';
import ListElement from '../ListElement';
import { RadioChecked, RadioUnchecked } from '../svg-icons';

import type { ListItem } from '../ListElement/ListElement';

type Props = {
  items: Array<ListItem>,
  onChange: (id: number | string) => void,
  onTextInputChange: string => void,
  color?: string,
  icons?: {
    checked: (color: string) => React.Component<*>,
    unchecked: (color: string) => React.Component<*>,
  },
  selected?: number | string,
  scrollDisabled?: boolean,
  optionalStyles?: Object,
  style?: Object,
};

type States = {
  selected: ?(number | string),
};

const defaultIcons = {
  checked: (color: string) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <RadioChecked color={color} />
    </View>
  ),
  unchecked: (color: string) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <RadioUnchecked color={color} />
    </View>
  ),
};

defaultIcons.checked.displayName = 'CheckedIcon';
defaultIcons.unchecked.displayName = 'UncheckedIcon';

class SingleOptionList extends React.Component<Props, States> {
  static defaultProps = {
    icons: defaultIcons,
    onChange: () => {},
    onTextInputChange: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  onSelect(id: number | string) {
    this.setState({ selected: id });
    this.props.onChange(id);
  }

  render() {
    const {
      color,
      icons,
      items,
      onTextInputChange,
      style,
      optionalStyles,
    } = this.props;

    return (
      <View style={style}>
        {items.map(element => {
          const usesProps = typeof this.props.selected !== 'undefined';
          return (
            <ListElement
              key={element.id}
              item={element}
              icons={icons}
              color={color}
              selected={
                usesProps
                  ? this.props.selected === element.id
                  : this.state.selected === element.id
              }
              onPress={() => this.onSelect(element.id)}
              onTextInputChange={onTextInputChange}
              optionalStyles={optionalStyles}
            />
          );
        })}
      </View>
    );
  }
}

export default SingleOptionList;
