import React, {useState} from 'react';
import {View, Image, ScrollView, Pressable} from 'react-native';
import styles from './style';
import Button from '../../Components/ReusableComponent/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../Assets/Style/Color';
import coins from '../../Assets/Images/Header/coins.png';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
// import Radio from '../../Components/RadioSharelt';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import MiniHeader from '../../Components/MiniHeader';
import Radio from '../../Components/RadioShareIt';
export default function Story2({
  reportStory,
  isReportScreen,
  setIsReportScreen,
}) {
  const [checked, setChecked] = useState(0);
  const navigation = useNavigation();
  const [selectedVal, setSelectedVal] = useState('');
  const reportReason = [
    {val: 'Sexual content', id: 1},

    {
      id: 2,
      val: 'Violent or repulsive content',
    },
    {
      id: 3,
      val: 'Hateful or abusive content',
    },
    {
      id: 4,
      val: 'Harassment or bullying',
    },
    {
      id: 5,
      val: 'Harmful or dangerous act',
    },
    {
      id: 6,
      val: 'Child abuse',
    },
    {
      id: 7,
      val: 'Promotes terrorism',
    },
    {
      id: 8,
      val: 'Spam or misleading',
    },
    {
      id: 9,
      val: 'Infringes my rights',
    },
    {
      id: 10,
      val: 'Captions issue',
    },
  ];
  console.log('selectedVal', selectedVal);

  return (
    <SafeArea>
      <ScrollView style={{flexGrow: 1, flex: 1, paddingBottom: '25%'}}>
        <View style={styles.conatiner}>
          {/* head section */}
          {/* <Header cen={'Report'} /> */}
          {/* <MiniHeader title={'Report'} /> */}
          {/* head section */}
          <View style={{marginHorizontal: '4%', marginTop: 20}}>
            <InteractParagraph p={'Report Story'} Fontsize={21} />
            <ScrollView>
              {reportReason.map((val, ind) => {
                return (
                  <>
                    <Radio
                      radio_text={val.val}
                      press={() => {
                        setSelectedVal(val.val);
                        setChecked(val.id);
                      }}
                      status={checked === val.id ? 'checked' : 'unchecked'}
                      val={val}
                      antDesign={'questioncircleo'}
                    />
                  </>
                );
              })}
              {/* <Radio
                radio_text={'Sexual content'}
                press={() => setChecked('first')}
                status={checked === 'first' ? 'checked' : 'unchecked'}
                val={'Sexual content'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Violent or repulsive content'}
                press={text => {
                  console.log('testingRadio:', text);
                  setChecked('second');
                }}
                status={checked === 'second' ? 'checked' : 'unchecked'}
                val={'Violent or repulsive content'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Hateful or abusive content'}
                press={() => setChecked('third')}
                status={checked === 'third' ? 'checked' : 'unchecked'}
                val={'Hateful or abusive content'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Harassment or bullying'}
                press={() => setChecked('fourth')}
                status={checked === 'fourth' ? 'checked' : 'unchecked'}
                val={'Harassment or bullying'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Harmful or dangerous act'}
                press={() => setChecked('fifth')}
                status={checked === 'fifth' ? 'checked' : 'unchecked'}
                val={'Harmful or dangerous act'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Child abuse'}
                press={() => setChecked('sixth')}
                status={checked === 'sixth' ? 'checked' : 'unchecked'}
                val={'Child abuse'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Promotes terrorisum'}
                press={() => setChecked('seventh')}
                status={checked === 'seventh' ? 'checked' : 'unchecked'}
                val={'Promotes terrorisum'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Spam or misleading'}
                press={() => setChecked('eight')}
                status={checked === 'eight' ? 'checked' : 'unchecked'}
                val={'Spam or misleading'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Infringes my rights'}
                press={() => setChecked('nine')}
                status={checked === 'nine' ? 'checked' : 'unchecked'}
                val={'Infringes my rights'}
                antDesign={'questioncircleo'}
              />
              <Radio
                radio_text={'Captions issue'}
                press={() => setChecked('ten')}
                status={checked === 'ten' ? 'checked' : 'unchecked'}
                val={'Captions issue'}
                antDesign={'questioncircleo'}
              /> */}
            </ScrollView>
            {/* buttons section */}
            <View style={styles.button__style}>
              <Button
                btnText={'Cancel'}
                txtColor={COLORS.primary}
                shadow={'transparent'}
                // press={() => navigation.navigate('title1')}
                press={() => setIsReportScreen(false)}
                bg={COLORS.white}
                radius={10}
                btnwidth={'35%'}
              />
              <Button
                btnText={'Send'}
                bg={COLORS.primary}
                txtColor={COLORS.white}
                radius={10}
                btnwidth={'35%'}
                leftMargin={'5%'}
                // press={() => navigation.navigate('title1')}
                press={() => reportStory(selectedVal)}
              />
            </View>
            {/* buttons section */}
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
}
