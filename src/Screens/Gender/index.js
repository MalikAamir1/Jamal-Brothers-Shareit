import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {
  Button,
  Checkbox,
  Headline,
  RadioButton,
  Text,
} from 'react-native-paper';
import COLORS from 'src/Assets/Style/Color';
import ButtonComp from 'src/Components/Reusable Component/Button';
import {styles} from './style';
import SafeArea from 'src/Components/Reusable Component/Safearea';
import Heading from '../../Components/ReusableComponent/Heading';
import RadioBtn from '../../Components/RadioButton';

function Gender({navigation}) {
  return (
    <SafeArea>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <View style={styles.containerText}>
          <ButtonComp
            mode={'outlined'}
            justify={'center'}
            align={'center'}
            btnHeight={65}
            icon={'chevron-back'}
            radius={15}
            topMargin={5}
            press={() => navigation.goBack()}
          />
        </View>
        <View style={styles.containerText}>
          <ButtonComp
            mode={'text'}
            justify={'center'}
            align={'center'}
            btnHeight={50}
            btnText={'Skip'}
            fontStyle={'bold'}
            fontSize={16}
            rightMargin={5}
            topMargin={16}
          />
        </View>
      </View>

      <Heading
        Stylefont={'normal'}
        Fontweight={'700'}
        Fontsize={34}
        txtAlign={'left'}
        ml={'8%'}
        mt={'5%'}
        p={10}
        lh={40}
        Heading={'I am a'}
      />

      <RadioBtn />

      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'row',
        }}>
        <ButtonComp
          btnwidth={'80%'}
          btnHeight={56}
          btnText={'Continue'}
          txtColor={COLORS.white}
          justify={'center'}
          align={'center'}
          fontSize={16}
          radius={15}
          fontStyle={'700'}
          txtwidth={'100%'}
          press={() => navigation.navigate('interest')}
        />
      </View>
    </SafeArea>
  );
}

export default Gender;
