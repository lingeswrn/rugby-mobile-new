import _ from 'lodash';
import * as sty from './PrevBeepTest.style';
import React from 'react';
import moment from 'moment';
import { View, Icon } from 'native-base';
import { Text } from 'src/lib/components';
import { TouchableOpacity } from 'react-native';
import { BeepTestCard } from '../../../sharedComponents';

export const PrevBeepTest = ({ beepTest, viewHistory }) => {
  if (_.isEmpty(beepTest)) {
    return (
      <View>
        <View style={ sty.heading }>
          <Text style={ sty.headingText } h5>
            Beep Test
          </Text>
        </View>
        <Text style={ sty.emptyText }>No beep tests to display</Text>
      </View>
    );
  }
  const { completedAt, retestOn } = beepTest;
  return (
    <View>
      <View>
        <View style={ sty.heading }>
          <Text style={ sty.headingText } h5>
            Beep Test
          </Text>
          <Text style={ sty.headingDate }>
            {moment(completedAt).fromNow()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={ viewHistory }
          style={ sty.viewHistory }
        >
          <Text style={ sty.viewHistoryText }>View all beep tests</Text>
          <Icon style={ sty.icon } name='chevron-right' />
        </TouchableOpacity>
      </View>
      <BeepTestCard beepTest={ beepTest }/>
      {retestOn ? (
        <View style={ sty.reTakeContainer }>
          <Text style={ sty.reTakeDate }>
            {`Re-test recommended on ${moment(retestOn).format(
              'MMM D, YYYY'
            )}`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
