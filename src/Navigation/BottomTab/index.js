import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Animated, TouchableOpacity, View} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../../Screens/GoogleLogin';
import GoogleSignUp from '../../Screens/GoogleSignUp';
import {styles} from './style';
import icon3 from '../../Assets/Images/BottomNavigation/icon3.png';
import COLORS from '../../Assets/Style/Color';
// import {Header} from '../../Screens/HomeScreen';
import Search from '../../Screens/Search';
import Writer from '../../Screens/Writer';
import WriterDraft from '../../Screens/WriterDraft';
import Navigation from '../Stack';
import Story2 from '../../Screens/Story2';
import Winner from '../../Screens/Winners';
import Contestprizes from '../../Screens/ContestPrizes';
import ForReader from '../../Screens/ForReader';
import Story from '../../Screens/Story';
import {useDispatch, useSelector} from 'react-redux';
import Notification from '../../Screens/Notification';
import Header from '../../Screens/HomeScreen';
import {Text} from 'react-native-paper';

const BottomBar = () => {
  const navigation = useNavigation();

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home';
        break;
      case 'Search':
        icon = 'search-sharp';
        break;
      case 'Winner':
        icon = 'podium-sharp';
        break;
      case 'Stories':
        icon = 'book';
        break;
    }

    return (
      <>
        <Ionicons
          name={icon}
          size={25}
          color={routeName === selectedTab ? COLORS.primary : 'grey'}
        />
        <Text
          style={{
            color: routeName === selectedTab ? COLORS.primary : 'grey',
            fontSize: 12,
          }}>
          {routeName}
        </Text>
      </>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    console.log('Rendering Tab Bar:', routeName, selectedTab);

    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  return (
    <View style={{flex: 1}}>
      <CurvedBottomBar.Navigator
        style={{
          backgroundColor: isDark?.isdark ? 'transparent' : 'transparent',
        }}
        strokeWidth={0.5}
        height={55}
        type={'DOWN'}
        circleWidth={55}
        bgColor={isDark?.isdark ? COLORS.darkMode : COLORS.white}
        initialRouteName="title1"
        tabBar={renderTabBar}
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('title5')}>
              <Ionicons
                name={'add'}
                style={{fontWeight: '900'}}
                color={COLORS.white}
                size={30}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        screenOptions={{headerShown: false}}>
        <CurvedBottomBar.Screen
          // options={{headerShown: false}}
          name="Home"
          position="LEFT"
          circlePosition="Left"
          component={Header}
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Search"
          // position="LEFT"
          position="LEFT"
          component={Search}
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Winner"
          component={Winner}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="Stories"
          component={Contestprizes}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="title5"
          component={WriterDraft}
          // position="RIGHT"
        />

        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="title10"
          component={Notification}
        />
      </CurvedBottomBar.Navigator>
      {/* </NavigationContainer> */}
    </View>
  );
};
export default BottomBar;
