import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import splash from '../../Assets/Images/splash/launch_screen.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';

const Splash = () => {
  return (
    <ImageBackground
      source={require('../../Assets/Images/newimages/bgImg2.png')}
      resizeMode="cover"
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Image style={{width: 370, height: 370}} source={splash} />
        <InteractParagraph
          p={'shareitstoryapp.com'}
          // txtAlign={'center'}
          pAlign={'flex-end'}
          fw={'bold'}
          Fontsize={20}
        />
      </View>
    </ImageBackground>
  );
};

export default Splash;
