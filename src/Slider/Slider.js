// @flow

import React from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
  LayoutAnimation,
  Platform,
} from 'react-native';
import CustomText from '../CustomText';

const { width } = Dimensions.get('window');

type SliderProps = {
  animate: number,
  size: number,
  min: number,
  max: number,
  initialValue: number,
  hideMarkers: boolean,
  color: string,
  labels?: string[],
  showValueLabel?: boolean,
  vertical?: boolean,
  onValueChange: number => void,
  lineContainerHeight: number,
  thumbStyle: View.propTypes.style,
  lineStyle: View.propTypes.style,
  markerStyle: View.propTypes.style,
};

type SliderState = {
  value: number,
  measured: boolean,
  thumbSize: number,
  position: number,
};

// See: https://github.com/facebook/flow/issues/4564
type SyntheticTouchEventLike = {
  nativeEvent: {
    locationX: number,
    locationY: number,
  },
};

class Slider extends React.Component<SliderProps, SliderState> {
  static defaultProps = {
    animate: true,
    onValueChange: () => {},
    size: width * 0.9,
    min: 0,
    max: 100,
    initialValue: -1000,
    thumbStyle: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
    },
    color: '#2294A8',
    hideMarkers: false,
    lineContainerHeight: 50,
  };

  trackSize: number;
  numberOfSteps: number;
  previousPosition: number;
  trackOffsetX: number;
  trackOffsetY: number;

  panResponder: () => void;
  trackPanResponder: () => void;
  trackContainer: any;
  thumb: any;

  constructor(props: SliderProps) {
    super(props);
    this.state = {
      value: props.initialValue,
      position: 0,
      measured: false,
      thumbSize: props.thumbStyle.width,
    };

    this.trackSize = props.size - props.thumbStyle.width;
    this.numberOfSteps = props.max - props.min;
    this.previousPosition = 0;
    this.trackOffsetX = -1;
    this.trackOffsetY = -1;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (e, gestureState) => this.handleMove(e, gestureState),
      onPanResponderRelease: (e, gestureState) =>
        this.handlePanResponderEnd(e, gestureState),
      onPanResponderTerminate: (e, gestureState) =>
        this.handlePanResponderEnd(e, gestureState),
    });

    this.trackPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: e => this.handleTrackTap(e),
      onPanResponderMove: (e, gestureState) => this.handleMove(e, gestureState),
      onPanResponderRelease: () => this.handleTrackRelease(),
      onPanResponderTerminate: () => this.handleTrackRelease(),
    });
  }

  componentWillUpdate() {
    if (
      Platform.OS === 'android' &&
      this.state.value === this.props.initialValue
    ) {
      return;
    }
    this.props.animate && LayoutAnimation.easeInEaseOut();
  }

  componentWillUpdate() {
    this.props.animate && LayoutAnimation.easeInEaseOut();
  }

  measureHelper = () => {
    this.trackContainer.measure((fxT, fyT, trackWidth, trackHeight, px, py) => {
      this.trackOffsetX = px;
      this.trackOffsetY = py;
      this.setState({ measured: true });
      this.convertToInitialPosition(this.props.initialValue);
    });
  };

  handleTrackRelease() {
    this.props.onValueChange(this.state.value);
  }

  handleTrackTap(e: SyntheticTouchEventLike) {
    const sizeOfTrack = this.trackSize;
    const relativeTouchPosition = e.nativeEvent.locationX;

    const result = Math.round(
      relativeTouchPosition / sizeOfTrack * this.numberOfSteps,
    );
    const relativeThumbPosition = result / this.numberOfSteps * sizeOfTrack;

    const rangeOfTrack =
      relativeTouchPosition / sizeOfTrack * this.numberOfSteps;

    let position;
    let value;

    if (rangeOfTrack < 0) {
      this.previousPosition = 0;
      position = 0;
      value = this.props.min;
    } else if (rangeOfTrack > this.numberOfSteps) {
      this.previousPosition = sizeOfTrack;
      position = sizeOfTrack;
      value = this.props.max;
    } else {
      this.previousPosition = relativeThumbPosition;
      position = relativeThumbPosition;
      value = result + this.props.min;
    }
    this.setState({ position, value });
  }

  handlePanResponderEnd(e: SyntheticTouchEventLike, gestureState: Object) {
    if (this.props.vertical) {
      this.previousPosition -= gestureState.dy;
    } else {
      this.previousPosition += gestureState.dx;
    }
    if (this.previousPosition < 0) this.previousPosition = 0;
    if (this.previousPosition > this.trackSize)
      this.previousPosition = this.trackSize;

    this.props.onValueChange(this.state.value);
  }

  handleMove(e: SyntheticTouchEventLike, gestureState: Object) {
    let position;
    if (this.props.vertical) {
      position = this.previousPosition - gestureState.dy;
    } else {
      position = this.previousPosition + gestureState.dx;
    }

    if (position < -1) position = 0;
    if (position > this.trackSize + 1) position = this.trackSize;

    const roundedValue = Math.round(
      position / this.trackSize * this.numberOfSteps,
    );
    const computedPosition = roundedValue / this.numberOfSteps * this.trackSize;

    this.setState({
      position: computedPosition,
      value: roundedValue + this.props.min,
    });
  }

  convertToInitialPosition(value: number) {
    const roundedValue = Math.round(value);
    const position = value / this.numberOfSteps * this.trackSize;
    this.previousPosition = position;
    this.setState({ position, value: roundedValue });
  }

  render() {
    const {
      size,
      vertical,
      labels,
      lineStyle,
      min,
      max,
      thumbStyle,
      markerStyle,
      color,
      hideMarkers,
      lineContainerHeight,
      showValueLabel,
    } = this.props;

    let valueInTrackRange = this.state.value <= max && this.state.value >= min;

    return (
      <View
        style={{
          width: size,
          justifyContent: 'space-around',
          alignItems: vertical ? 'center' : undefined,
          flexDirection: vertical ? 'row' : 'column',
        }}
      >
        <View style={{ flex: vertical && labels ? 1 : 0 }} />
        {showValueLabel && (
          <CustomText
            style={{
              position: vertical ? 'absolute' : undefined,
              textAlign: 'center',
              fontWeight: 'bold',
              left: vertical ? size/2 - 40 : 0,
            }}
          >
            {this.state.value !== -1000 ? this.state.value : ' ' }
          </CustomText>
        )}
        <View
          style={{
            flex: vertical ? (labels ? 0.2 : 1) : 0, // If slider set to vertical, but no label assigned
            alignItems: 'center',
            margin: 5,
          }}
        >
          <View
            style={{
              width: size,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ rotate: vertical ? '270deg' : '0deg' }],
            }}
          >
            <View
              style={{
                height: lineContainerHeight,
                width: size,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                {...this.trackPanResponder.panHandlers}
                ref={container => {
                  this.trackContainer = container;
                }}
                hitSlop={{ top: 10, bottom: 30, left: 30, right: 10 }}
                style={{
                  width: this.trackSize,
                  height: markerStyle
                    ? markerStyle.height
                    : StyleSheet.flatten(styles.defaultMarkerStyle).height,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SliderLine
                  style={[styles.defaultTrackStyle, lineStyle]}
                  width={this.trackSize}
                />
                {!hideMarkers &&
                  this.numberOfSteps <= 10 && (
                    <SliderMarkers
                      markerCount={this.numberOfSteps}
                      width={this.trackSize}
                      style={[
                        styles.defaultMarkerStyle,
                        markerStyle,
                        {
                          backgroundColor: valueInTrackRange
                            ? '#b3b3b3'
                            : color,
                        },
                      ]}
                    />
                  )}
              </View>
              {this.state.value >= min && (
                <View
                  style={[styles.thumbContainer, { left: this.state.position }]}
                >
                  <View
                    style={[thumbStyle, { backgroundColor: color }]}
                    {...this.panResponder.panHandlers}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        {labels && (
          <SliderLabels size={size} labels={labels} vertical={vertical} />
        )}
      </View>
    );
  }
}

const SliderLine = ({
  style,
  width,
}: {
  style: View.propTypes.style,
  width: number,
}) => (
  <View pointerEvents="none" style={styles.trackContainer}>
    <View style={[{ width }, style]} />
  </View>
);

const SliderMarkers = ({
  markerCount,
  width,
  style,
}: {
  markerCount: number,
  width: number,
  style: View.propTypes.style,
}) => (
  <View
    pointerEvents="none"
    style={{
      width,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    {[...Array(markerCount + 1)].map((element, index) => (
      <View key={index} style={style} />
    ))}
  </View>
);

const SliderLabels = ({
  size,
  labels,
  vertical,
}: {
  size: number,
  labels: Array<string>,
  vertical?: boolean,
}) => (
  <View
    style={{
      flex: vertical ? 1 : 0,
    }}
  >
    <View
      style={{
        top: vertical ? undefined : 0,
        width: vertical ? undefined : size,
        flexDirection: vertical ? 'column' : 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        height: vertical ? size : 20,
      }}
    >
      {labels.map((label, i) => (
        <CustomText style={{ textAlign: 'center' }} key={i}>
          {label}
        </CustomText>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  trackDefault: {
    height: 1,
    backgroundColor: 'black',
  },
  trackContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  thumbContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
  },
  defaultMarkerStyle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  defaultTrackStyle: {
    backgroundColor: '#b3b3b3',
    height: 1,
  },
});

export default Slider;
