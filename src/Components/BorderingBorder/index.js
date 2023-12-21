import React from 'react';
import {View, Image} from 'react-native';
import logo from '../../Assets/Images/logo/logo.png';
import {styles} from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import SafeArea from '../ReusableComponent/SafeArea';
import InteractParagraph from '../ReusableComponent/Paragraph';
import onBordingImageMain from '../../Assets/Images/OnBorderingImages/onBordingImageMain.png';
import Heading from '../ReusableComponent/Heading';

export default function BorderingBorder(props) {
  return (
    <>
      <SafeArea>
        <View style={{flex: 1}}>
          <Image style={styles.logoImg} source={logo} />
          <Image style={styles.onBorderingImg} source={onBordingImageMain} />
          <Heading
            Stylefont={'normal'}
            Fontweight={'700'}
            Fontsize={24}
            txtAlign={'center'}
            // ml={'6%'}
            // mt={'5%'}
            p={10}
            lh={40}
            Heading={props.head}
          />
          <InteractParagraph
            pWidth={'85%'}
            Direction={'row'}
            pAlign={'center'}
            txtAlign={'center'}
            ml={'10%'}
            p={props.para}
          />
        </View>
      </SafeArea>
    </>
  );
}
