import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Switch} from 'react-native-paper';
// import { useDispatch } from 'react-redux';
// import {isDark} from '../../Store/slices';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../Assets/Style/Color';

function ThemeSwitch() {
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  // const reducerData = useSelector(state => state);
  const isDark = useSelector(state => state.isDark);

  async function fetchThemeMode() {
    const status = await AsyncStorage.getItem('isDark');
    const value = await JSON.parse(status);
    if (value === null || undefined) {
      setIsSwitchOn(true);
      console.log('Switch pbutton', value);
      dispatch(isDark(true));
    } else {
      setIsSwitchOn(value);
      console.log('Switch button', value);
      dispatch(isDark(value));
    }
  }
  useEffect(() => {
    fetchThemeMode();
  }, [toggle]);

  const onToggleSwitch = async () => {
    let Check = new Promise(async function (resolve, reject) {
      const value = JSON.stringify(!isSwitchOn);
      await AsyncStorage.setItem('isDark', value);
      if (value) {
        resolve();
      } else {
        reject();
      }
    });
    Check.then(async () => {
      setToggle(!toggle);
    });
  };

  return (
    <Switch
      value={isSwitchOn}
      color={isDark?.isdark ? COLORS.white : COLORS.dark}
      style={{transform: [{scaleX: 1.3}, {scaleY: 1.2}]}}
      onValueChange={onToggleSwitch}
    />
  );
}

export default ThemeSwitch;
