import * as sty from './MatchCard.style';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { View } from 'native-base';
import { Button, Text } from 'src/lib/components';
import FlipCard from 'react-native-flip-card';

export class MatchCard extends Component {
  constructor(props) { super(props); }

  renderListItems(items) {
    return _.map(items, ({ label, value }, index) => {
      if (_.isEmpty(value)) return null;
      return (
        <View style={ sty.itemWrapper(label) } key={ index }>
          <Text h5 style={ sty.itemLabel }>{ label }</Text>
          <Text h5 style={ sty.itemValue }>{ value }</Text>
        </View>
      );
    });
  }

  render() {
    const {
      flipable,
      handleEdit,
      handleRemove,
      hideDate,
      item: {
        arriveAtTime, date, location, locationType,
        matchStartTime, opponent
      },
      wrapperStyle
    } = this.props;
    return (
      <FlipCard
        alignHeight
        alignWidth
        clickable={ flipable }
        flip={ false }
        flipHorizontal
        friction={ 10 }
        flipVertical={ false }
        perspective={ 1000 }
        style={ [sty.wrapper, wrapperStyle] }
        useNativeDriver
      >
        <View>
          { hideDate ? null : <Text h3 primary style={ sty.title }>
            { moment(date).format('dddd, D MMMM, YYYY') }
          </Text>}
          <View style={ sty.subtitleContainer }>
            <Text h5 style={ sty.subtitle }>{
              `vs. ${opponent}`
            }</Text>
            <Text style={ sty.locationType }>
              {`| ${_.toUpper(locationType)}`}
            </Text>
          </View>
          { this.renderListItems([
            { label: 'start time', value: moment(matchStartTime).format('hh:mm A') },
            { label: 'arrive by', value: moment(arriveAtTime).format('hh:mm A') },
            { label: 'field', value: location.description }
          ]) }
        </View>
        <View style={ sty.backWrapper }>
          <Text h3>{ 'Actions' }</Text>
          <View style={ sty.backContainer }>
            { _.isFunction(handleEdit) ?
              <Button label='edit'
                icon='pencil-square-o'
                info
                large={ false }
                style={ sty.backSideButton }
                onPress={ handleEdit }
              />
              : null }
            { _.isFunction(handleRemove) ?
              <Button label='remove'
                icon='trash'
                large={ false }
                primary
                style={ sty.backSideButton }
                onPress={ handleRemove }
              />
              : null }
          </View>
        </View>
      </FlipCard>
    );
  }
}

MatchCard.defaultProps = {
  flipable: true,
  match: {},
  wrapperStyle: {}
};
