// @flow
import React from 'react';
import { View, ScrollView } from 'react-native';
import ListElement from '../ListElement';
import { CheckedBox, UncheckedBox } from '../svg-icons';

import type { ListItem } from '../ListElement/ListElement';

const defaultIcons = {
  checked: (color: string) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <CheckedBox color={color} />
    </View>
  ),
  unchecked: (color: string, disabled: boolean) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <UncheckedBox color={color} disabled={disabled} />
    </View>
  ),
};

type Props = {
  items: Array<ListItem>,
  maxOptions: ?number,
  onChange: (result: Array<string | number>) => void,
  onTextInputChange: string => void,
  color?: string,
  icons?: {
    checked: (color: string) => React.Component<*>,
    unchecked: (color: string) => React.Component<*>,
  },
  transparent?: boolean
};

type State = {
  selected: Array<number | string>,
};

class MultipleOptionList extends React.Component<Props, State> {
  static defaultProps = {
    maxOptions: undefined,
    icons: defaultIcons,
    onChange: () => {},
    onTextInputChange: () => {},
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  onSelect(id: number | string) {
    const updatedSelected = this.isSelected(id)
      ? this.state.selected.filter(value => value !== id)
      : [...this.state.selected, id];

    this.setState({ selected: updatedSelected });
    this.props.onChange(updatedSelected);
  }

  isMaxOptionsSelected = (): boolean =>
    this.props.maxOptions === this.state.selected.length;

  isSelected = (id: number | string): boolean =>
    this.state.selected.includes(id);

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
            disabled={
              this.isMaxOptionsSelected() && !this.isSelected(element.id)
            }
            selected={this.isSelected(element.id)}
            onPress={() => this.onSelect(element.id)}
            onTextInputChange={onTextInputChange}
            transparent={transparent}
          />
        ))}
      </ScrollView>
    );
  }
}

export default MultipleOptionList;
