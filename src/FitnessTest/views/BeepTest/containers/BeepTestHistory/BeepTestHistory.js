import * as sty from './BeepTestHistory.style';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { SceneContainer, Text } from 'src/lib/components';
import { View } from 'native-base';
import { BeepTestCard } from '../../../sharedComponents';

export const BeepTestHistory = (props) => {
  const beepTests = _.reverse(
    _.sortBy(props.beepTests, ['completedAt'])
  );
  return (
    <SceneContainer
      title={ 'Beep Tests' }
      headerButtons={{
        left: { icon: 'angle-left', to: {
          pathname: '/fitness-tests', state: { skipFetchData: true }
        }}
      }}
    >
      {_.isEmpty(beepTests) ? (
        <Text style={ sty.noTests }>No beep tests to show</Text>
      ) : (
        <View>
          {_.map(beepTests, (test, index) => {
            return (
              <View key={ index }>
                <View style={ sty.titleContainer }>
                  <Text
                    h4
                    style={ sty.title }
                  >{`Beep test completed on ${moment(test.completedAt).format(
                      'MMM D, YYYY'
                    )}`}</Text>
                </View>
                <BeepTestCard beepTest={ test } />
              </View>
            );
          })}
        </View>
      )}
    </SceneContainer>
  );
};
