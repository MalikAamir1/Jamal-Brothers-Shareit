import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Headline} from 'react-native-paper';
import COLORS from 'src/Assets/Style/Color';
import AvatarComponent from 'src/Components/Avatar';
import ButtonComp from 'src/Components/Reusable Component/Button';
import Input from 'src/Components/Reusable Component/input';
import {styles} from './style';
import SafeArea from 'src/Components/Reusable Component/Safearea';
import Heading from '../../Components/ReusableComponent/Heading';
import ThemeSwitch from '../../Components/SwitchButton';
import BasicBtn from '../../Components/ReusableComponent/ButtonBasic';

function ProfileDetails({navigation}) {
  return (
    <SafeArea>
      <ScrollView>
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
            topMargin={5}
          />
        </View>

        <Heading
          Stylefont={'normal'}
          Fontweight={'700'}
          Fontsize={34}
          txtAlign={'left'}
          ml={'3%'}
          mt={'5%'}
          p={10}
          Heading={' Profile Details'}
        />
        <View style={styles.avatar}>
          <AvatarComponent />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Input
            outline={'#E8E6EA'}
            width={'80%'}
            top={'10%'}
            mode={'outlined'}
            label={'First name'}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Input
            outline={'#E8E6EA'}
            width={'80%'}
            top={'2%'}
            mode={'outlined'}
            label={'Last name'}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: '4%',
          }}>
          <BasicBtn
            btnText={'Choose birthday date'}
            icon={'calendar-outline'}
            txtColor={COLORS.primary}
            fontSize={15}
            fontStyle={'700'}
            iconSize={21}
            bgcolor={'#EDF9E5'}
            //  ml={'10%'} -- you can use it if you need margin left
            //  rightMargin={'10%'} -- you can use it if you need margin Right
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            marginTop: '15%',
            bottom: 20,
          }}>
          <ButtonComp
            btnwidth={'80%'}
            btnHeight={56}
            btnText={'Confirm'}
            txtColor={COLORS.white}
            justify={'center'}
            align={'center'}
            fontSize={16}
            radius={15}
            fontStyle={'700'}
            txtwidth={'100%'}
            press={() => navigation.navigate('gender')}
          />
        </View>
        <ThemeSwitch />
      </ScrollView>
    </SafeArea>
  );
}

export default ProfileDetails;
