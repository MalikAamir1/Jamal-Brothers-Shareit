import React from 'react';
import {View, Image, TextInput, ScrollView, Pressable} from 'react-native';
import styles from './style';
import Button from '../../Components/ReusableComponent/Button';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import coins from '../../Assets/Images/Header/coins.png';
import COLORS from '../../Assets/Style/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider, Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import {useDispatch, useSelector} from 'react-redux';

export default function Addcreditcard() {
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Header cen={'Add Card'} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body__head}>
            <InteractParagraph
              p={'Add a credit or debit card'}
              Fontsize={20}
              fw={'bold'}
            />
          </View>
          <View style={styles.txt__fields}>
            <View style={styles.text__field}>
              <InteractParagraph
                p={'Card number'}
                mb={5}
                Fontsize={15}
                txt_colors="#757575"
              />
              <TextInput
                style={styles.txt}
                underlineColorAndroid="transparent"
              />
            </View>
            <Divider />
            <View style={styles.text__field}>
              <InteractParagraph
                p={'MM/YY'}
                mb={5}
                Fontsize={15}
                txt_colors="#757575"
              />
              <TextInput
                style={styles.txt}
                underlineColorAndroid="transparent"
              />
            </View>
            <Divider />
            <View style={styles.text__field}>
              <InteractParagraph
                p={'cvc'}
                mb={5}
                Fontsize={15}
                txt_colors="#757575"
              />
              <TextInput
                style={styles.txt}
                underlineColorAndroid="transparent"
              />
            </View>
            <Divider />
            <View style={styles.text__field}>
              <InteractParagraph
                p={'Name of the card holder'}
                mb={5}
                Fontsize={15}
                txt_colors="#757575"
              />
              <TextInput
                style={styles.txt}
                underlineColorAndroid="transparent"
              />
            </View>
            <Divider />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={isDark?.isdark ? COLORS.white : COLORS.primary}
              uncheckedColor={isDark?.isdark ? COLORS.white : COLORS.primary}
              // unCheckedcolor
            />
            <InteractParagraph
              p={'Save this card for a faster checkout next time'}
              Fontsize={15}
            />
          </View>
          <View style={{marginVertical: 15}}>
            <Button
              btnText={'Done'}
              radius={10}
              bg={COLORS.primary}
              txtColor={COLORS.white}
              fontStyle={'700'}
              press={() => navigation.navigate('paymentmethod')}
            />

            <Button
              btnText={'Cancel'}
              radius={10}
              shadow={'transparent'}
              press={() => navigation.navigate('setting')}
              topMargin={'5%'}
              txtColor={isDark?.isdark ? COLORS.white : COLORS.primary}
            />
          </View>
        </ScrollView>

        {/* body section */}
      </View>
    </SafeArea>
  );
}
