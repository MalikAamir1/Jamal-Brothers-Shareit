import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, StyleSheet, Text, Dimensions} from 'react-native';
import {Line, Svg} from 'react-native-svg';

const TimerCircle = props => {
  // const [seconds, setSeconds] = useState(60); // Replace 60 with the initial value of your timer
  const intervalRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 60; // Adjust this value based on your circle size (number of lines)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      props.setSeconds(prevSeconds => Math.max(0, prevSeconds - 1));
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const progress = animatedValue.interpolate({
      inputRange: [0, 60], // Replace 60 with the maximum seconds value
      outputRange: [0, circumference],
    });

    Animated.timing(animatedValue, {
      toValue: props.seconds,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      animatedValue.setValue(0);
    };
  }, [props.seconds]);

  const circleSize = 180; // Adjust this value based on your desired circle size
  const textPosition = circleSize / 2; // Center the text based on the circle size

  return (
    <View style={styles.container}>
      <Svg height={circleSize} width={circleSize}>
        {/* Render small lines */}
        {Array.from({length: 60}, (_, index) => {
          const angle = (360 * (index / 60)) % 360;
          const x1 =
            circleSize / 2 +
            (circleSize / 2 - 16) * Math.cos((angle * Math.PI) / 180);
          const y1 =
            circleSize / 2 +
            (circleSize / 2 - 16) * Math.sin((angle * Math.PI) / 180);
          const x2 =
            circleSize / 2 +
            (circleSize / 2) * Math.cos((angle * Math.PI) / 180);
          const y2 =
            circleSize / 2 +
            (circleSize / 2) * Math.sin((angle * Math.PI) / 180);

          return (
            <Line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={3} // Adjust the stroke width to your preference
              stroke={index < props.seconds ? 'black' : '#7ACCCA'} // Update the stroke color conditionally
            />
          );
        })}
        {/* Add text in the center */}
        <View
          style={{
            // backgroundColor: 'pink',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: 135,
            height: 135,
            borderRadius: 67,
            borderWidth: 2,
            borderColor: 'black',
            top: 22,
            // flex: 1,
          }}>
          <Text
            style={{
              fontSize: 24.95,
              alignContent: 'center',
              // backgroundColor: 'red',
              // flex: 1,
              alignSelf: 'center',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              textAlignVertical: 'center',
              top: 55,
              fontWeight: 'bold',
              color: '#ffffff',
            }}
            x={textPosition}
            y={textPosition + 8} // Adjust the value to vertically center the text
            // textAnchor="middle"
            fontSize={29}
            fontWeight="bold"
            fill="#514C4A">
            {`00:${props.seconds < 10 ? `0${props.seconds}` : props.seconds}`}
          </Text>
        </View>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});

export default TimerCircle;
