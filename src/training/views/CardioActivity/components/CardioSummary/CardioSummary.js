import * as sty from './CardioSummary.style';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { View, List, ListItem } from 'native-base';
import { Button, Text } from 'src/lib/components';
import moment from 'moment';
import 'moment-duration-format';

export class Summary extends Component {
  constructor(props) { super(props); }
  renderSummary(items) {
    return _.map(items, (item, index) => (
      <ListItem key={ index } style={ sty.itemWrapper }>
        <Text h5 style={ sty.itemLabel }>{ item.label }</Text>
        <Text h4 style={ sty.itemValue }>{ item.value }</Text>
      </ListItem>
    ));
  }

  render() {
    const {
      activity: { activityTemplate, cardioProfile, current: { cardioSegments }},
      workout: { cardioSegmentsComplete, cardioDuration }
    } = this.props;
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.itemContainer }>
          <List style={ sty.listWrapper }>
            <ListItem itemDivider style={ sty.itemDividerWrapper }>
              <Text h1 style={ sty.dividerLabel }>{ 'overview' }</Text>
            </ListItem>
            { this.renderSummary([
              { label: 'Activity', value: activityTemplate.name },
              { label: 'Cardio Profile', value: cardioProfile.name },
              {
                label: 'Completed Segments',
                value: `${cardioSegmentsComplete} of ${cardioSegments.length}`
              },
              {
                label: 'Time',
                value: `${moment.duration(cardioDuration, 'seconds').format('mm:ss')}`
              },
            ])}
          </List>
        </View>
        <View style={ sty.buttonWrapper }>
          <Button label={ 'done' }
            onPress={ () => this.props.history.push('/weekly-routine') }
            style={ sty.button }
          />
        </View>
      </View>
    );
  }
}

export const CardioSummary = withRouter(Summary);
