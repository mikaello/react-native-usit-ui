/*
 * Copyright (c) 2017, University of Oslo, Norway All rights reserved.
 *
 * This file is part of "UiO Software Information Inventory".
 *
 * "UiO Software Information Inventory" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at byour option) any later version.
 *
 * "UiO Software Information Inventory" is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * "UiO Software Information Inventory". If not, see <http://www.gnu.org/licenses/>
 *
 * @flow
 *
 */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from 'react-native-wheel-datepicker';

type AndroidTimePickerProps = {
  time: Date,
  onTimeChange: (time: Date) => void,
};

type AndroidTimePickerState = {
  date: Date,
};

export default class AndroidTimePicker extends React.Component<
  AndroidTimePickerProps,
  AndroidTimePickerState,
> {
  constructor(props: AndroidTimePickerProps) {
    super(props);
    this.state = {
      date: props.time,
    };
  }

  getValue() {
    const { date } = this.state;
    const nextTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    );

    return nextTime;
  }

  onHourChange = (hour: number) => {
    this.state.date.setHours(hour);
    this.props.onTimeChange(this.state.date);
  };

  onMinuteChange = (minute: number) => {
    this.state.date.setMinutes(minute);
    this.props.onTimeChange(this.state.date);
  };

  render() {
    const [hours, minutes] = [[], []];

    for (let i = 0; i <= 23; i += 1) {
      hours.push(i);
    }

    for (let i = 0; i <= 59; i += 1) {
      minutes.push(i);
    }

    return (
      <View style={styles.row}>
        <View key="hour" style={styles.container}>
          <Picker
            selectedValue={this.state.date.getHours()}
            pickerData={hours}
            style={styles.picker}
            onValueChange={this.onHourChange}
          />
        </View>
        <View key="minute" style={styles.container}>
          <Picker
            selectedValue={this.state.date.getMinutes()}
            pickerData={minutes}
            style={styles.picker}
            onValueChange={this.onMinuteChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 80,
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
