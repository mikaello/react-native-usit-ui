import * as React from 'react';
import {
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');

type UiOFooterProps = {
  onPress: () => void,
  numberOfTriesBeforeAction?: number,
  language?: string,
  touchInterval?: ?number,
  style?: Object,
};

type UiOFooterState = {
  touchCounter: number,
  touchCounterDeadline: ?Date,
};

class UiOFooter extends React.Component<UiOFooterProps, UiOFooterState> {
  static defaultProps = {
    numberOfTriesBeforeAction: 7,
    touchInterval: 0.5, // 30 seconds
  };

  constructor(props: UiOFooterProps) {
    super(props);
    this.state = {
      touchCounter: 0,
      touchCounterDeadline: props.touchInterval
        ? this.generateNewDeadline(props.touchInterval)
        : null,
    };
  }

  generateNewDeadline = (minutesInFuture: number) =>
    new Date(new Date().getTime() + minutesInFuture * 60000);

  getNewDeadline = () =>
    this.props.touchInterval
      ? this.generateNewDeadline(this.props.touchInterval)
      : null;

  incrementTouchCounter = () => {
    if (
      this.state.touchCounterDeadline &&
      new Date() > this.state.touchCounterDeadline
    ) {
      this.setState({
        touchCounter: 1,
        touchCounterDeadline: this.getNewDeadline(),
      });
    } else if (
      this.state.touchCounter === this.props.numberOfTriesBeforeAction
    ) {
      this.props.onPress();
      this.setState({
        touchCounter: 0,
        touchCounterDeadline: this.getNewDeadline(),
      });
    } else {
      this.setState({
        touchCounter: this.state.touchCounter + 1,
      });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.incrementTouchCounter()}>
        <Image
          style={[
            {
              alignSelf: 'center',
              height: 30,
              width: width * 0.6,
            },
            StyleSheet.flatten(this.props.style),
          ]}
          resizeMode="contain"
          source={ this.props.language === 'no' ? require('./UiO_logo.png') : require('./UiO_logo_en.png')}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default UiOFooter;
