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
