# SingleOptionList

![Screenshot of button](./screenshots/singleoptionlist.png)

### Usage

\*Note that the screenshot uses defaultIcons and colors.primary

```js
...
import { ScrollView, Image } from 'react-native';
import { SingleOptionList } from 'react-native-usit-ui';

...

const data = [
  { id: 'a', text: 'Tellus' },
  { id: 'b', text: 'Mercury' },
  { id: 'c', text: 'Pluto' },
  { id: 'd', text: 'Uranus' },
  {
    id: 'e',
    text: 'Saturn',
    subText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do        eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  { id: 'f', text: 'Jupiter' },
  { id: 'g', text: 'Venus' },
];

const defaultIcons = {
  // Icons from react-native-vector-icons could also be used in the same pattern
  checked: (color: string) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <RadioChecked color={color} />
    </View>
  ),
  unchecked: (color: string) => (
    <View style={{ backgroundColor: 'white', borderRadius: 11 }}>
      <RadioUnchecked color={color} />
    </View>
  ),
};
...

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SingleOptionList
          items={data}
          color="#f4414d" // Note that HEX value is required, due to opacity design
          icons={defaultIcons} // If not specified, default icons are used
          defaultSelected="c"
          onChange={result => console.log(result)}
        />
      </ScrollView>
    );
  }
```

### API

| Prop              | Default        |                                                 Type                                                  | Description                                                                   |
| :---------------- | :------------- | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------- |
| items             | `null`         |                                           `Array<ListItem>`                                           | Data element to be inserted                                                   |
| onChange          | `() => {}`     |                                   `(id: string ⎮ number>) => void`                                    | Callback with result whenever you click on a list element                     |
| onTextInputChange | `() => {}`     |                                       `(input: string) => void`                                       | Callback with input when this element is listed with `textInput={true}`       |
| color             | `#2294A8`      |                                               `string`                                                | Color of the button                                                           |
| icons             | `defaultIcons` | `{ checked: (color: string) => React.Component<_>, unchecked:(color: string) => React.Component<_> }` | Icons should be added as an object. Can be react-native-vector-icons or Image |
| scrollDisabled       | `false`        | `boolean`                     | Whether scrollView should be scrollable or not. |

```js
type ListItem = {
  id: string | number,
  text: string,
  subText?: string,
  textInput?: boolean, // Only one element may have this set to true
  inputPlaceholder?: string,
};
```
