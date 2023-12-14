import React from 'react';
import {Pressable, View} from 'react-native';
import {Avatar} from 'react-native-paper';

function InteractAvatar(props) {
  return (
    <View>
      <Pressable onPress={props.press}>
        <Avatar.Image
          size={props.size}
          source={{uri: props.src}}

          //  onTouchStart={props.onTouch}
        />
      </Pressable>
    </View>
  );
}

export default InteractAvatar;
