import React from 'react';
import {View, Image} from 'react-native';

const RatingStars = ({rating}) => {
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          key={i}
          source={
            i < rating
              ? require('../../Assets/Images/newimages/goldenstar.png')
              : require('../../Assets/Images/newimages/blackstar.png')
          }
          style={{
            width: 14.89,
            // height: 14.31,
            marginRight: 5,
          }}
        />,
      );
    }

    return stars;
  };

  return <View style={{flexDirection: 'row'}}>{renderStars()}</View>;
};

export default RatingStars;
