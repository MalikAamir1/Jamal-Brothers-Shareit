import React, {useCallback} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {ToastAndroid} from 'react-native';
import {RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/SafeArea';
import NetInfo from '@react-native-community/netinfo';
import {useSelector, useDispatch} from 'react-redux';
import {GetLeagues} from '../../Store/Reducers/League';

//Refresh Leagues Code
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function NoInternet() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  //Internet State
  const [isInternet, setIsInternet] = useState(true);
  const checkInternet = () => {
    NetInfo.fetch().then(state => {
      con;
      sole.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsInternet(state.isConnected);
    });
  };

  // const {leagues} = useSelector(state => state);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    checkInternet();
    // dispatch(GetLeagues());

    wait(2000).then(() => {
      //disable refreshing
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    checkInternet();

    if (!isInternet) {
      ToastAndroid.show('No Internet Connection!', ToastAndroid.SHORT);
    }
  }, [isInternet]);

  return (
    <SafeArea>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            marginTop: '90%',
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <View style={{alignItems: 'center'}}>
          {/* <Text style={{fontSize: 20}}></Text> */}
          <Heading
            Stylefont={'normal'}
            Fontweight={'700'}
            Fontsize={20}
            Heading={'😔 Sorry No Internet'}
          />
        </View>
      </ScrollView>
    </SafeArea>
  );
}
