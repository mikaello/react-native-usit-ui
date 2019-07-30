import React, { PureComponent, PropTypes } from 'react';
import { G, Circle, Text, Line } from 'react-native-svg';
import { range } from 'lodash';

export default class ClockFace extends PureComponent {
  /*
    static propTypes = {
        r: PropTypes.number,
        stroke: PropTypes.string,
    }
    */

  render() {
    const { r, stroke } = this.props;
    const faceRadius = r - 10;
    const textRadius = r - 26;

    return (
      <G>
        {range(48).map(i => {
          const cos = Math.cos(((2 * Math.PI) / 48) * i);
          const sin = Math.sin(((2 * Math.PI) / 48) * i);

          return (
            <Circle
              key={i}
              fill="rgba(255,255,255,0.7)"
              cx={cos * faceRadius}
              cy={sin * faceRadius}
              r={i % 4 === 0 ? 3 : 2}
            />
          );
        })}
        <G transform={{ translate: '-0, 4' }}>
          {range(12).map((h, i) => (
            <Text
              key={i}
              fill={stroke}
              fontSize="12"
              textAnchor="middle"
              x={
                textRadius *
                Math.cos(((2 * Math.PI) / 12) * i - Math.PI / 2 + Math.PI / 6)
              }
              y={
                textRadius *
                Math.sin(((2 * Math.PI) / 12) * i - Math.PI / 2 + Math.PI / 6)
              }
            >
              {h + 1}
            </Text>
          ))}
        </G>
      </G>
    );
  }
}
