// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import AccordionExample from './src/Accordion';
import AchievementModalExample from './src/AchievementModal';
import ButtonExample from './src/Button';
import DividerExample from './src/Divider';
import FloatingButtonExample from './src/FloatingButton';
import MenuButtonExample from './src/MenuButton';
import MultipleOptionExample from './src/MultipleOptionList';
import SingleOptionExample from './src/SingleOptionList';
import SliderExample from './src/Slider';
import StepperExample from './src/Stepper';
import GradientBackgroundExample from './src/GradientBackground';
import CheckboxExample from './src/Checkbox';

type Props = {};
type State = {
  showAccordion: boolean,
  showAchievementModal: boolean,
  showButton: boolean,
  showDivider: boolean,
  showFloatingButton: boolean,
  showMenuButton: boolean,
  showMultipleOption: boolean,
  showSingleOption: boolean,
  showSlider: boolean,
  showStepper: boolean,
  showGradientBackground: boolean,
  showCheckbox: boolean,
};

const initState: State = {
  showAccordion: false,
  showAchievementModal: false,
  showButton: false,
  showDivider: false,
  showFloatingButton: false,
  showMenuButton: false,
  showMultipleOption: false,
  showSingleOption: false,
  showSlider: false,
  showStepper: false,
  showGradientBackground: false,
  showCheckbox: false,
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initState;
  }

  statePreserveGradient = () => ({
    ...initState,
    showGradientBackground: this.state.showGradientBackground,
  });

  toggleAccordion = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showAccordion: !this.state.showAccordion,
    });

  toggleAchievementModal = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showAchievementModal: !this.state.showAchievementModal,
    });

  toggleButton = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showButton: !this.state.showButton,
    });

  toggleDivider = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showDivider: !this.state.showDivider,
    });
  toggleFloatingButton = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showFloatingButton: !this.state.showFloatingButton,
    });

  toggleMenuButton = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showMenuButton: !this.state.showMenuButton,
    });

  toggleMultipleOption = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showMultipleOption: !this.state.showMultipleOption,
    });

  toggleSingleOption = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showSingleOption: !this.state.showSingleOption,
    });

  toggleSlider = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showSlider: !this.state.showSlider,
    });

  toggleStepper = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showStepper: !this.state.showStepper,
    });

  toggleGradientBackground = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showGradientBackground: !this.state.showGradientBackground,
    });

  toggleCheckbox = () =>
    this.setState({
      ...this.statePreserveGradient(),
      showCheckbox: !this.state.showCheckbox,
    });

  render() {
    return (
      <View style={styles.outerContainer}>
        {this.state.showGradientBackground && <GradientBackgroundExample />}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
        >
          <SafeAreaView>
            <Text style={styles.header}>USITs mobile components</Text>
          </SafeAreaView>

          <TouchableOpacity onPress={this.toggleAccordion}>
            <Text style={styles.item}>Accordion</Text>
          </TouchableOpacity>
          {this.state.showAccordion && <AccordionExample />}

          <TouchableOpacity onPress={this.toggleAchievementModal}>
            <Text style={styles.item}>AchievementModal</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleButton}>
            <Text style={styles.item}>Button</Text>
          </TouchableOpacity>
          {this.state.showButton && <ButtonExample />}

          <TouchableOpacity onPress={this.toggleDivider}>
            <Text style={styles.item}>Divider</Text>
          </TouchableOpacity>
          {this.state.showDivider && <DividerExample />}

          <TouchableOpacity onPress={this.toggleFloatingButton}>
            <Text style={styles.item}>FloatingButton</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleMenuButton}>
            <Text style={styles.item}>MenuButton</Text>
          </TouchableOpacity>
          {this.state.showMenuButton && <MenuButtonExample />}

          <TouchableOpacity onPress={this.toggleMultipleOption}>
            <Text style={styles.item}>MultipleOptionList</Text>
          </TouchableOpacity>
          {this.state.showMultipleOption && <MultipleOptionExample />}

          <TouchableOpacity onPress={this.toggleSingleOption}>
            <Text style={styles.item}>SingleOptionList</Text>
          </TouchableOpacity>
          {this.state.showSingleOption && <SingleOptionExample />}

          <TouchableOpacity onPress={this.toggleSlider}>
            <Text style={styles.item}>Slider</Text>
          </TouchableOpacity>
          {this.state.showSlider && <SliderExample />}

          <TouchableOpacity onPress={this.toggleStepper}>
            <Text style={styles.item}>Stepper</Text>
          </TouchableOpacity>
          {this.state.showStepper && <StepperExample />}
          <TouchableOpacity onPress={this.toggleCheckbox}>
            <Text style={styles.item}>Checkbox</Text>
          </TouchableOpacity>
          {this.state.showCheckbox && <CheckboxExample />}
          <TouchableOpacity onPress={this.toggleGradientBackground}>
            <Text style={styles.item}>GradientBackground</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.showFloatingButton && <FloatingButtonExample />}
        {this.state.showAchievementModal && (
          <AchievementModalExample onClose={this.toggleAchievementModal} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 15,
    fontWeight: '500',
  },
  item: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
});
