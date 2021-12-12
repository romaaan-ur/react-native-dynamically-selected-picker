# react-native-dynamically-selected-picker

React Native Picker for Android and IOS with dynamically updating selected items on scroll.
Fork from [react-native-dynamically-selected-picker]( https://github.com/sosog/react-native-dynamically-selected-picker), converted class component to functional and add types.


![](README/android.gif)
![](README/ios.gif)
# Basic usage

```
import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";

import { DynamicallySelectedPicker } from "../src/DynamicallySelectedPicker";
import { PickerItemInt } from "../src/types";

export const Example = () => {
  const windowWidth = Dimensions.get("window").width;

  const items = [
    {
      value: 1,
      label: "Item 1",
    },
    {
      value: 2,
      label: "Item 2",
    },
    {
      value: 3,
      label: "Item 3",
    },
    {
      value: 4,
      label: "Item 4",
    },
    {
      value: 5,
      label: "Item 5",
    },
  ] as PickerItemInt[];

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <DynamicallySelectedPicker
        items={items}
        handleScroll={({ index, item }) => {
          setSelectedItemIndex(index);
        }}
        // onMomentumScrollBegin={({index, item}) => {
        //   this.updateSelectedItem(index);
        // }}
        // onMomentumScrollEnd={({index, item}) => {
        //   this.updateSelectedItem(index);
        // }}
        // onScrollBeginDrag={({index, item}) => {
        //   this.updateSelectedItem(index);
        // }}
        // onScrollEndDrag={({index, item}) => {
        //   this.updateSelectedItem(index);
        // }}
        height={300}
        width={windowWidth}
      />
      <View style={{ marginTop: 50 }}>
        <Text>Selected item index {selectedItemIndex}</Text>
      </View>
    </View>
  );
};


```

## Properties

| Prop           |     Default     |   Type   | Description                                                                                                 |
| :------------- | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| items     |     [{value: 0, label: 'No items', itemColor: 'red'}]       |  `Array<object>` | - |
| onScroll     |      -       |  `func` | Returns selected item object and selected index  |
| onMomentumScrollBegin     |      -       |  `func` | Returns selected item object and selected index  |
| onMomentumScrollEnd     |      -       |  `func` | Returns selected item object and selected index  |
| onScrollBeginDrag     |      -       |  `func` | Returns selected item object and selected index  |
| onScrollEndDrag     |      -       |  `func` | Returns selected item object and selected index  |
| initialSelectedIndex          |        0        | `number` | Set index number of initial item.                                                                              |
| transparentItemRows   |     3      |  `number`  | Set number of items at top and bottom of selected index.                                                                |
| width   |     300      |  `number`  | -                                                                |
| height   |     300      |  `number`  | -                                                                |
| allItemsColor          |      #000       |  `string`  | - |
| selectedItemBorderColor          |      '#cecece'       |  `string`  | - |
| fontSize          |      -       |  `number`  | - |
| fontFamily          |     'Arial'       |  `string`  | - |
| topGradientColors | [...] |  `Array<string>`  | See default value in source.                                                          
| bottomGradientColors | [...] |  `Array<string>`  | See default value in source.                                                            |
