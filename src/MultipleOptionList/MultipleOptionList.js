// @flow
import React from 'react';
import { View } from 'react-native';
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

defaultIcons.checked.displayName = 'CheckedIcon';
defaultIcons.unchecked.displayName = 'UncheckedIcon';

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
  selected?: Array<number | string>,
  style?: Object,
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
    const selected = this.props.selected
      ? this.props.selected
      : this.state.selected;

    const updatedSelected = this.isSelected(id)
      ? selected.filter(value => value !== id)
      : [...selected, id];

    this.setState({ selected: updatedSelected });
    this.props.onChange(updatedSelected);
  }

  isMaxOptionsSelected = (): boolean => {
    const selected = this.props.selected
      ? this.props.selected
      : this.state.selected;

    return this.props.maxOptions === selected.length;
  };

  isSelected = (id: number | string): boolean => {
    const selected = this.props.selected
      ? this.props.selected
      : this.state.selected;

    return selected.includes(id);
  };

  render() {
    const { color, icons, items, onTextInputChange, style } = this.props;
    return (
      <View style={style}>
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
          />
        ))}
      </View>
    );
  }
}

export default MultipleOptionList;
