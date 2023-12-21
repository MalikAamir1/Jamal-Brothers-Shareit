import React from 'react';
import {View, Text, Image, Pressable, Dimensions} from 'react-native';
import styles from './style';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import COLORS from '../../Assets/Style/Color';
import WinnerImage from '../../Assets/Images/winner/ill-2.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InteractAvatar from '../../Components/ReusableComponent/Avatar';
import AvatarImage from '../../Assets/Images/AvtarImages/avt.png';
import {useNavigation} from '@react-navigation/native';
import Header from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import MiniHeader from '../../Components/MiniHeader';

export default function Winner() {
  const navigation = useNavigation();

  return (
    <SafeArea>
      <View style={styles.conatiner}>
        {/* head section */}

        {/* <Header cen={'winner'} /> */}
        <MiniHeader title={'Winner'} />
        {/* head section */}
        {/* Body section */}
        <View style={{height: '100%'}}>
          <View style={{height: '30%'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginRight: '5%',
                marginLeft: '5%',
              }}>
              <View
                style={{
                  right: Dimensions.get('window').width / 10,
                  top: 60,
                }}>
                <Icon
                  name="share"
                  size={35}
                  style={{transform: [{rotateY: '180deg'}]}}
                  color={COLORS.icon__color}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 0.65,
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    top: Dimensions.get('window').height / 22,
                    right: 5,
                  }}>
                  <InteractAvatar
                    size={Dimensions.get('screen').width / 12}
                    src={
                      'https://1.bp.blogspot.com/-btoCpOKUtb8/XsgcWulz0_I/AAAAAAAAVGo/sBnFx5eBUWc39KnRcasrxnNibVuAkmZ3ACLcBGAsYHQ/s1600/whatsapp%2Bdp%2Bimages%2Bfor%2Bboys%2B%252819%2529.jpg'
                    }
                  />
                </View>
                <View>
                  <InteractAvatar
                    size={Dimensions.get('screen').width / 12}
                    src={
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtL8kKqdfrbOw1y43X10svR6aA9sCbTQ6g7Q&usqp=CAU '
                    }
                  />
                </View>
                <View
                  style={{
                    top: Dimensions.get('window').height / 18,
                    left: 5,
                  }}>
                  <InteractAvatar
                    size={Dimensions.get('screen').width / 12}
                    src={
                      'https://1.bp.blogspot.com/-btoCpOKUtb8/XsgcWulz0_I/AAAAAAAAVGo/sBnFx5eBUWc39KnRcasrxnNibVuAkmZ3ACLcBGAsYHQ/s1600/whatsapp%2Bdp%2Bimages%2Bfor%2Bboys%2B%252819%2529.jpg'
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  left: Dimensions.get('window').width / 10,

                  top: 60,
                }}>
                <Icon
                  name="share"
                  size={35}
                  color={COLORS.icon__color}
                  style={{shadowColor: 'gray'}}
                />
              </View>
            </View>
            <Image
              source={WinnerImage}
              style={{
                width: Dimensions.get('window').width / 2,
                height: Dimensions.get('window').height / 4,
                alignSelf: 'center',
              }}
            />
          </View>
          {/* Body Text */}
          <View style={{marginTop: Dimensions.get('screen').height / 20}}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <InteractParagraph p={'Story:'} Fontsize={20} fw={'bold'} />
              <InteractParagraph p={' Journey Moon'} Fontsize={20} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <InteractParagraph p={'Start Date:'} Fontsize={20} fw={'bold'} />
              <InteractParagraph p={' 12 Dec 2021'} Fontsize={20} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <InteractParagraph p={'Entry Fee:'} Fontsize={20} fw={'bold'} />
              <InteractParagraph p={' $5'} Fontsize={20} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <InteractParagraph p={'Top Prize:'} Fontsize={20} fw={'bold'} />
              <InteractParagraph p={' $270'} Fontsize={20} />
            </View>
          </View>
          {/* Body Text */}
        </View>

        {/* Body section */}
      </View>
    </SafeArea>
  );
}
