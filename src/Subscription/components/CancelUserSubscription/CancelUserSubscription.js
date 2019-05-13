import * as sty from './CancelUserSubscription.style';
import React from 'react';
import { Button, Text } from 'src/lib/components';
import { View } from 'native-base';

export const CancelUserSubscription = ({ cancelSubscription }) => {
  return (
    <View style={ sty.container }>
      <Text style={ sty.text }>
        It looks like you are still paying for a Rugby Vault subscription. Would
        you like to cancel it?
      </Text>
      <Button label='cancel subscription' onPress={ cancelSubscription }/>
    </View>
  );
};
