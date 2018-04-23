/*
 * Copyright (c) 2016, University of Oslo, Norway All rights reserved.
 *
 * This file is part of "UiO Software Information Inventory".
 *
 * "UiO Software Information Inventory" is free software: you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at
 * your option) any later version.
 *
 * "UiO Software Information Inventory" is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along with "UiO Software Information Inventory". If
 * not, see <http://www.gnu.org/licenses/>
 *
 * @flow
 *
 */
import * as React from 'react';
import { Svg, Circle, G, Path } from 'react-native-svg';
import { range } from 'lodash';

const SEGMENTS = 11;

type CircularSliderProps = {
  progress: number,
  radius: number,
  strokeWidth: number,
  color: string,
  bgCircleColor: string,
  children?: React.Node,
};

class ProgressCircle extends React.Component<CircularSliderProps> {
  static defaultProps = {
    progress: 0,
    radius: 120,
    strokeWidth: 25,
    color: '#ED6B9C',
    bgCircleColor: '#E9F2F5',
  };

  getContainerWidth() {
    const { strokeWidth, radius } = this.props;
    return strokeWidth + radius * 2 + 2;
  }

  render() {
    const {
      strokeWidth,
      radius,
      color,
      bgCircleColor,
      progress,
      children,
    } = this.props;
    const containerWidth = this.getContainerWidth();
    const progressInRadian = progress * (2 * Math.PI);

    return (
      <Svg
        viewBox={`0 -15 ${containerWidth} ${containerWidth + 30}`}
        height={containerWidth}
        width={containerWidth}
      >
        {/*
              ##### Circle
            */}

        <G
          transform={{
            translate: `${strokeWidth / 2 + radius + 1}, ${strokeWidth / 2 +
              radius +
              1}`,
          }}
        >
          <Circle
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke={bgCircleColor}
          />

          {children}

          {range(SEGMENTS).map(i => {
            const { fromX, fromY, toX, toY } = calculateArcCircle(
              i,
              SEGMENTS,
              radius,
              progressInRadian,
            );
            const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(2)} A ${radius} ${
              radius
            } 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(2)}`;

            return (
              <Path
                d={d}
                key={i}
                strokeWidth={strokeWidth}
                stroke={color}
                fill="transparent"
              />
            );
          })}
        </G>
      </Svg>
    );
  }
}

function calculateArcCircle(index0, segments, radius, angleLength0 = 0) {
  const angleLengthInRadian = angleLength0;

  const index = index0 + 1;
  const fromAngle = angleLengthInRadian / segments * (index - 1);
  const toAngle = angleLengthInRadian / segments * index;
  const fromX = radius * Math.sin(fromAngle);
  const fromY = -radius * Math.cos(fromAngle);
  const toX = radius * Math.sin(toAngle);
  const toY = -radius * Math.cos(toAngle);

  return {
    fromX,
    fromY,
    toX,
    toY,
  };
}

export default ProgressCircle;
