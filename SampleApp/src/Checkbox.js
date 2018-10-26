// @flow

import * as React from 'react';
import { Checkbox } from 'react-native-usit-ui';

import { Dimensions, View } from 'react-native';

class CheckboxExample extends React.Component<{}> {
  constructor() {
    super();
    this.state = { checked: false };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Checkbox
          onPress={() => this.setState({ checked: !this.state.checked })}
          checked={this.state.checked}
        />
      </View>
    );
  }
}
export default CheckboxExample;
