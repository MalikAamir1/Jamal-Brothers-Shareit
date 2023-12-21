import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Header from '../../Components/ReusableComponent/Header';
import Heading from '../../Components/ReusableComponent/Heading';
import {Divider} from 'react-native-paper';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../../Assets/Style/Color';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MiniHeader from '../../Components/MiniHeader';

export default function Notification() {
  var notificatrion_data = [
    {
      date: '13 Nov 2022',
      status: 'Congratulation to you. You come in 2nd position',
      price: 'in the event journey Moon You Participated in and won $100',
    },
    {
      date: '14 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
    {
      date: '13 Nov 2022',
      status: 'Congratulation to you. You come in 2nd position',
      price: 'in the event journey Moon You Participated in and won $100',
    },
    {
      date: '14 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
    {
      date: '13 Nov 2022',
      status: 'Congratulation to you. You come in 2nd position',
      price: 'in the event journey Moon You Participated in and won $100',
    },
    {
      date: '14 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
    {
      date: '15 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
    {
      date: '16 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
    {
      date: '16 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
    {
      date: '18 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
    {
      date: '19 Nov 2022',
      status: 'Congratulation to you. You come in 3nd position',
      price: 'in the event journey Moon You Participated in and won $790',
    },
  ];
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  const navigation = useNavigation();
  return (
    <SafeArea>
      <View style={{marginHorizontal: '5%', paddingTop: '2%'}}>
        <View>
          {/* <Header /> */}
          <MiniHeader />
        </View>
        <View>
          <Heading
            mt={0}
            ml={5}
            Stylefont={'normal'}
            Fontweight={'700'}
            Fontsize={26}
            Heading={'Notifications'}
          />
        </View>
        <Divider
          style={{
            marginTop: 10,
            borderColor: COLORS.border_color,
            borderWidth: 1,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {notificatrion_data.map(item => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('title3');
                }}>
                <View style={{marginBottom: 10}}>
                  <Heading
                    mt={10}
                    ml={5}
                    Stylefont={'normal'}
                    Fontweight={'700'}
                    Fontsize={16}
                    Heading={`${item.date}`}
                  />
                  <InteractParagraph
                    p={`${item.status}`}
                    ml={5}
                    mt={10}
                    Fontsize={14}
                    colors={isDark?.isdark ? COLORS.white : COLORS.txtColor}
                  />
                  <InteractParagraph
                    p={`${item.price}`}
                    ml={5}
                    mt={10}
                    Fontsize={14}
                    colors={isDark?.isdark ? COLORS.white : COLORS.txtColor}
                  />
                </View>
                <Divider
                  style={{borderWidth: 1, borderColor: COLORS.border_color}}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </SafeArea>
  );
}
