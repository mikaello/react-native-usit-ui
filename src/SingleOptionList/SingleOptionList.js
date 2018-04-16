// @flow
import React from 'react';
import { View, ScrollView } from 'react-native';
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
  defaultSelected?: number | string,
  transparent?: boolean,
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

class SingleOptionList extends React.Component<Props, States> {
  static defaultProps = {
    icons: defaultIcons,
    onChange: () => {},
    onTextInputChange: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: props.defaultSelected,
    };
  }

  onSelect(id: number | string) {
    this.setState({ selected: id });
    this.props.onChange(id);
  }

  render() {
    const { color, icons, items, onTextInputChange, transparent } = this.props;

    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {items.map(element => (
          <ListElement
            key={element.id}
            item={element}
            icons={icons}
            color={color}
            selected={this.state.selected === element.id}
            onPress={() => this.onSelect(element.id)}
            onTextInputChange={onTextInputChange}
            transparent={transparent}
          />
        ))}
      </ScrollView>
    );
  }
}

export default SingleOptionList;
