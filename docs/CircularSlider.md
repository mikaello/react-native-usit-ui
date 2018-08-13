# CircularSlider

![Screenshot of circular slider](./screenshots/circularSlider.png)

### Usage

```js
...
import { View } from 'react-native';
import { CircularSlider } from 'react-native-usit-ui';


...
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularSlider 
        ...
        />
      </View>
    )
  }
```

### API

| Prop              | Default   | Type       | Description                                                                                     |
| :---------------- | :-------- | :--------: | :---------------------------------------------------------------------------------------------- |
| onUpdate          | `?`       | `() => {}` | ...                                                                                             |
| startAngle        | `?`       | `number`   | Start angle for outer circle in radians. Values between 0 and 2 pi.                             |
| angleLength       | `?`       | `number`   | Circumference of circle segment shown. Values between 0 and 2 pi.                               |
| segments          | `5`       | `number`   | Number of segements for gradient color. More segements give a more fine grained gradient scale. |
| strokWidth        | `40`      | `number`   | Width of outer circle.                                                                          |
| radius            | `120`     | `number`   | Radius of circular slider.                                                                      |
| gradientColorFrom | `#ff9800` | `string`   | Start color for gradient scale.                                                                 |
| gradientColorTo   | `#ffcf00` | `string`   | Gradient scales from start color to this color.                                                 |
| showsClockFace    | `?`       | `boolean`  | If true, numbers 1 to 12 will show inside outer circle.                                         |
| clockFaceColor    | `#9d9d9d` | `string`   | Color of numbers 1 to 12.                                                                       |
| bgCircleColor     | `#171717` | `string`   | Color of start/end-points on outer circle.                                                      |
| stopIcon          | `?`       | `element`  | ...                                                                                             |
| startIcon         | `?`       | `element`  | ...                                                                                             |
|                   |           |            |                                                                                                 |