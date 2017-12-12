# MenuButton

![Screenshot with 2 MenuButton](./screenshots/menubutton1.png)
![Screenshot with 4 MenuButton](./screenshots/menubutton2.png)

### Usage

```js
...
import { View } from 'react-native';
import { MenuButton } from 'react-native-usit-ui';

...
  render() {
    return
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 0.9 }}>
          <MenuButton />
          <MenuButton row disabled />
          <MenuButton color="#8a09ed" />
          <MenuButton
            row
            disabled
            color="#8a09ed"
            icon={<Icon name="add" size={40} color="#8a09ed" />}
          />
        </View>
      </View>
  }
```

### API

| Prop                  | Default                                                                           |         Type         | Description                                                                            |
| :-------------------- | :-------------------------------------------------------------------------------- | :------------------: | :------------------------------------------------------------------------------------- |
| text                  | `'Menu button'`                                                                   |       `string`       | text in button                                                                         |
| onPress               | `() => {}`                                                                        |     `() => void`     | action to occur when button is pressed                                                 |
| color                 | `#2294A8`                                                                         |       `string`       | color of the button and icons                                                          |
| setElementsHorizontal | `false`                                                                           |      `boolean`       | Set both the text and icon horizontal                                                  |
| fontSize              | `30`                                                                              |       `number`       | FontSize of text                                                                       |
| disabled              | `false`                                                                           |      `boolean`       | Invert the color of button and disable onPress on button                               |
| icon                  | `<MaterialIcons name="person" size={50} color={disabled ? color : colors.white}>` | `React.Component<*>` | Icon in button. Can be any component like react-native-vector-icons or Image component |