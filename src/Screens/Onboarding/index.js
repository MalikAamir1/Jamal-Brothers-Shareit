import React, {useEffect} from 'react';
import {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {styles} from './style';
import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import BorderingBorder from '../../Components/BorderingBorder';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {useDispatch, useSelector} from 'react-redux';
import {BackHandler} from 'react-native';
import {addPro} from '../../redux/reducers/profile';

const OnBording = () => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  // const reducerData = useSelector(state => state);
  const dispatch = useDispatch();

  const nxtBtn = () => {
    setCount(count + 1);
    // console.log(count)
    if (count == 2) {
      setCount(0);
      navigation.navigate('termAndCOndition');
    }
  };

  return (
    <>
      <SafeArea>
        <View style={{flex: 1}}>
          <Swiper
            onIndexChanged={i => {
              console.log(i);
              setCount(i);
            }}
            index={count}
            showsButtons={false}
            autoplay={false}
            loop={false}
            // scrollEnabled={false}
            animated={true}
            bounces={true}
            // height={Dimensions.get('window').width}
          >
            <View>
              <BorderingBorder
                head={'On Boarding 1 Primary Text'}
                para={
                  'Lörem ipsum tirde pår, poloska nys. Syl kroktigt nyläng nyledes för att.'
                }
              />
            </View>
            <View>
              <BorderingBorder
                head={'On Boarding 2 Primary Text'}
                para={
                  'Lörem ipsum tirde pår, poloska nys. Syl kroktigt nyläng nyledes för att.'
                }
              />
            </View>
            <View>
              <BorderingBorder
                head={'On Boarding 3 Primary Text'}
                para={
                  'Lörem ipsum tirde pår, poloska nys. Syl kroktigt nyläng nyledes för att.'
                }
              />
            </View>
          </Swiper>

          <View style={styles.mainBtn}>
            <ButtonComp
              btnwidth={120}
              btnHeight={40}
              color={COLORS.border_color}
              txtColor={COLORS.dark}
              mode={'contained'}
              justify={'center'}
              align={'center'}
              btnText={'Skip'}
              fontStyle={'bold'}
              fontSize={16}
              radius={10}
              bg={COLORS.white}
              press={() => navigation.navigate('termAndCOndition')}
            />
            <ButtonComp
              btnwidth={120}
              btnHeight={40}
              txtColor={COLORS.white}
              mode={'contained'}
              justify={'center'}
              align={'center'}
              btnText={count == 2 ? 'Continue' : 'Next'}
              fontStyle={'bold'}
              fontSize={16}
              press={nxtBtn}
              radius={10}
              bg={COLORS.primary}
            />
          </View>
        </View>
      </SafeArea>
    </>
  );
};

export default OnBording;
