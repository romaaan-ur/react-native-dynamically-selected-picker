import React, {FC, useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {PickerItem} from './PickerItem';

import {styles} from './styles';
import {PickerItemInt} from './types';

interface Props {
  items: PickerItemInt[];
  handleScroll: (item: {index: number; item: PickerItemInt}) => void;
  onScrollBeginDrag?: () => void;
  onScrollEndDrag?: () => void;
  onMomentumScrollBegin?: () => void;
  onMomentumScrollEnd?: () => void;
  width?: number;
  height?: number;
  initialSelectedIndex?: number;
  transparentItemRows?: number;
  allItemsColor?: string;
  fontFamily?: string;
  fontSize?: number;
  selectedItemBorderColor?: string;
  topGradientColors?: string[];
  bottomGradientColors?: string[];
}

export const DynamicallySelectedPicker: FC<Props> = ({
  items = [{value: 0, label: 'No items', itemColor: 'red'}],
  handleScroll,
  width = 300,
  height = 180,
  initialSelectedIndex = 0,
  transparentItemRows = 1,
  allItemsColor = '#000',
  fontFamily = 'Arial',
  fontSize,
  selectedItemBorderColor = '#cecece',
  topGradientColors = [
    'rgba( 255, 255, 255, 1 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.5 )',
  ],
  bottomGradientColors = [
    'rgba( 255, 255, 255, 0.5 )',
    'rgba( 255, 255, 255, 0.7 )',
    'rgba( 255, 255, 255, 0.9 )',
    'rgba( 255, 255, 255, 1 )',
  ],
}) => {
  const [itemHeight, setItemHeight] = useState<number>(0);
  const [itemIndex, setItemIndex] = useState<number>(0);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let calcHeight = height / (transparentItemRows * 2 + 1);

    if (Platform.OS === 'ios') {
      calcHeight = Math.ceil(calcHeight);
    }

    setItemHeight(calcHeight);
    setItemIndex(initialSelectedIndex);

    scrollViewRef.current?.scrollTo({
      y: itemHeight * initialSelectedIndex,
    });
  }, [height, transparentItemRows, initialSelectedIndex, itemHeight]);

  const fakeItems = (n = 3) => {
    const itemsArr = [];
    for (let i = 0; i < n; i++) {
      itemsArr[i] = {
        value: -1,
        label: '',
      };
    }
    return itemsArr;
  };

  const allItemsLength = () => {
    return extendedItems().length - transparentItemRows * 2;
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const tempIndex = getItemTemporaryIndex(event);
    if (
      itemIndex !== tempIndex &&
      tempIndex >= 0 &&
      tempIndex < allItemsLength()
    ) {
      setItemIndex(tempIndex);
      handleScroll({index: tempIndex, item: items[tempIndex]});
    }
  };

  const getItemTemporaryIndex = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    return Math.round(event.nativeEvent.contentOffset.y / itemHeight);
  };

  const extendedItems = () => {
    return [
      fakeItems(transparentItemRows),
      ...items,
      ...fakeItems(transparentItemRows),
    ] as PickerItemInt[];
  };

  return (
    <View style={{height: height, width: width}}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={itemHeight}>
        {extendedItems().map((item: PickerItemInt, index: number) => (
          <PickerItem
            key={index}
            label={item.label}
            itemColor={item.itemColor}
            allItemsColor={allItemsColor}
            fontSize={fontSize ? fontSize : itemHeight / 2}
            fontFamily={fontFamily}
            style={[
              styles.listItem,
              {
                height: itemHeight,
              },
            ]}
          />
        ))}
      </ScrollView>
      <View
        style={[
          styles.gradientWrapper,
          {
            top: 0,
            borderBottomWidth: 1,
            borderBottomColor: selectedItemBorderColor,
          },
        ]}
        pointerEvents="none">
        <LinearGradient
          colors={topGradientColors}
          style={[
            styles.pickerGradient,
            {
              height: transparentItemRows * itemHeight,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.gradientWrapper,
          {
            bottom: 0,
            borderTopWidth: 1,
            borderTopColor: selectedItemBorderColor,
          },
        ]}
        pointerEvents="none">
        <LinearGradient
          colors={bottomGradientColors}
          style={[
            styles.pickerGradient,
            {height: transparentItemRows * itemHeight},
          ]}
        />
      </View>
    </View>
  );
};
