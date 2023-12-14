import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownComponent = props => {
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  let {data, defaultValue, setValue, value} = props;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 2,
            backgroundColor: '#404552',
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        // disable={true}
        itemContainerStyle={{color: '#7ACCCA', backgroundColor: '#404552'}}
        containerStyle={{
          backgroundColor: '#404552',
          marginTop: 3,
          borderColor: 'transparent',
          // borderRadius: 12,
          color: '#7ACCCA',
        }}
        data={data}
        itemTextStyle={{
          color: '#7ACCCA',
          backgroundColor: '#404552',
          margin: -22,
          padding: 12,
          
        }}
        // search
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? defaultValue : defaultValue}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        iconColor={'#7ACCCA'}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  //   container: {
  //     backgroundColor: '#404552',
  //     padding: 5,
  //     marginBottom: '10%',
  //     borderRadius: 50,
  //   },
  dropdown: {
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColorcolor: '#404552',
  },
  icon: {
    marginRight: 5,
    color: '#7ACCCA',
  },
  label: {
    position: 'absolute',
    backgroundColor: '#404552',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 18,
    color: '#7ACCCA',
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#7ACCCA',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#7ACCCA',
    backgroundColor: '#404552',
  },
  iconStyle: {
    width: 30,
    height: 30,
    color: '#7ACCCA',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#7ACCCA',
    backgroundColor: '#404552',
    // borderRadius:10
  },
});
