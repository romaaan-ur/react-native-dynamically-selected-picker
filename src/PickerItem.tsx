import React, { FC } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";

interface Props {
  label: string;
  style: StyleProp<ViewStyle>;
  itemColor: any;
  allItemsColor: any;
  fontSize: number;
  fontFamily: string;
}

export const PickerItem: FC<Props> = ({
  label,
  style,
  itemColor,
  allItemsColor,
  fontSize,
  fontFamily = "Arial",
}) => {
  return (
    <View style={style}>
      <Text
        style={{
          fontSize: fontSize,
          color: itemColor ? itemColor : allItemsColor,
          fontFamily: fontFamily,
        }}
      >
        {label}
      </Text>
    </View>
  );
};
