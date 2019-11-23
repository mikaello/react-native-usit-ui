// @flow
import React from 'react';
import Svg, { G, Polygon, Text } from 'react-native-svg';

const Banner = ({
  primary,
  secondary,
  tertiary,
  bannerTitle,
}: {
  primary: string,
  secondary: string,
  tertiary: string,
  bannerTitle: string,
}) => (
  <Svg height="47" width="293" viewBox="0 0 293 47">
    <G
      id="Banner-dialogboks"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <Polygon
        id="Fill-1"
        fill={tertiary}
        points="233 0.177 233 39.377 293 39.377 279.4 19.777 293 0.177"
      />
      <Polygon
        id="Fill-2"
        fill={secondary}
        points="233.149994 0.1719 266.539994 4.9979 256.828994 4.9979 233.149994 4.9979"
      />
      <Polygon
        id="Fill-3"
        fill={secondary}
        points="233.149994 4.9974 256.828994 4.9974 266.539994 4.9974 233.149994 0.1714"
      />
      <Polygon
        id="Fill-5"
        fill={tertiary}
        points="0.0004 0.177 13.5994 19.777 0.0004 39.377 59.9994 39.377 59.9994 0.177"
      />
      <Polygon
        id="Fill-6"
        fill={secondary}
        points="59.8477 0.1719 26.4577 4.9979 36.1687 4.9979 59.8477 4.9979"
      />
      <Polygon
        id="Fill-7"
        fill={secondary}
        points="26.4577 4.9974 36.1687 4.9974 59.8477 4.9974 59.8477 0.1714"
      />
      <G>
        <Polygon
          id="Fill-8"
          fill={primary}
          points="26.2 47.377 266.2 47.377 266.2 4.977 26.2 4.977"
        />
        <Text
          fill="white"
          x="146.5"
          y="37"
          fontSize="25"
          fontWeight="300"
          textAnchor="middle"
        >
          {bannerTitle}
        </Text>
      </G>
    </G>
  </Svg>
);

export default Banner;
