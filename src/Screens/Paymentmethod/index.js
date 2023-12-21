import React, {useState} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../../Components/ReusableComponent/Button';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import coins from '../../Assets/Images/Header/coins.png';
import COLORS from '../../Assets/Style/Color';
import {RadioButton} from 'react-native-paper';
import Addcard from '../../Assets/Images/Iconimage/addcard.png';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import Radio from '../../Components/RadioShareIt';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {useDispatch, useSelector} from 'react-redux';
import MiniHeader from '../../Components/MiniHeader';

export default function Paymentmethod() {
  const [checked, setChecked] = React.useState('first');
  const card = [
    {
      cardicon: 'cc-visa',
      cardname: 'Visa',
      check: 'first',
    },
    {
      cardicon: 'credit-card',
      cardname: 'Credit Card',
      check: 'Second',
    },
    {
      cardicon: 'cc-mastercard',
      cardname: 'Master',
      check: 'third',
    },
  ];

  const navigation = useNavigation();
  const isDark = useSelector(state => state.isDark);
  // const reducerData = useSelector(state => state);

  const renderItem = ({item}) => {
    return (
      <View style={styles.body__item}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <FontAwesome
            color={isDark?.isdark ? COLORS.white : COLORS.primary}
            name={item.cardicon}
            size={25}
          />
          <InteractParagraph
            p={item.cardname}
            ml={10}
            fw={'bold'}
            Fontsize={20}
          />
        </View>
        <View style={{backgroundColor: 'dark', marginRight: -26}}>
          <Radio
            press={() => setChecked(item.check)}
            status={checked === item.check ? 'checked' : 'unchecked'}
            val={'Sexual content'}
          />
        </View>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return (
      <>
        <View style={styles.body__item}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Image source={Addcard} size={25} />
            <InteractParagraph
              p={'Add card'}
              ml={10}
              fw={'bold'}
              Fontsize={20}
            />
          </View>
          <View style={{padding: 5}}>
            <Ionicons
              name="add-circle-outline"
              size={22}
              color={COLORS.blue__color}
              onPress={() => {
                navigation.navigate('addcreditcard');
              }}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        {/* head section */}
        {/* <Header cen={'Payment Method'}/> */}
        <MiniHeader title={'Payment Method'} />
        {/* head section */}
        {/* body section */}
        <View>
          <View style={styles.body__head}>
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                alignItems: 'center',
              }}>
              <Icon
                name="payments"
                size={35}
                color={isDark?.isdark ? COLORS.white : COLORS.primary}
              />
              <InteractParagraph
                p={'Payment Method'}
                fw={'bold'}
                Fontsize={23}
                ml={10}
              />
            </View>
            <View>
              <Ionicons name={'pencil'} size={22} color={COLORS.blue__color} />
            </View>
          </View>
          <View style={styles.list__item}>
            <FlatList
              data={card}
              ListFooterComponent={ListFooterComponent}
              renderItem={renderItem}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <InteractParagraph p={'Amount'} fw={'bold'} Fontsize={17} />
            <InteractParagraph
              p={'$ 1000'}
              colors={COLORS.border_color}
              fw={'bold'}
            />
          </View>
          <View style={{marginTop: 5}}>
            <View style={{height: 50, marginTop: 10}}>
              <Button
                btnText={'Confirm & Go to home'}
                bg={COLORS.primary}
                radius={10}
                txtColor={COLORS.white}
                press={() => navigation.navigate('bottombar')}
              />
            </View>
            <View style={{height: 50, marginTop: 10}}>
              <Button
                btnText={'Cancel'}
                radius={10}
                shadow={'transparent'}
                press={() => navigation.navigate('setting')}
                topMargin={'5%'}
                txtColor={isDark?.isdark ? COLORS.white : COLORS.dark}
              />
            </View>
          </View>
        </View>
        {/* body section */}
      </View>
    </SafeArea>
  );
}
