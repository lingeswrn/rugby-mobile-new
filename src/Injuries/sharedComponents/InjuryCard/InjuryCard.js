import * as sty from './InjuryCard.style';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { View } from 'native-base';
import { Button, Text } from 'src/lib/components';
import FlipCard from 'react-native-flip-card';

export class InjuryCard extends Component {
  constructor(props) { super(props); }

  render() {
    const {
      flipable,
      handleEdit,
      handleRemove,
      item: { bodyPart, type, occurredOn, reportedPainLevel },
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
        <View style={ sty.frontWrapper }>
          <Text h3 primary style={ sty.title }>
            { _.isEmpty(bodyPart) ? null : `${bodyPart.name} ` }
            { `${type}` }
          </Text>
          <Text style={ sty.subtitle }>
            { moment(occurredOn).isValid ?
              moment(occurredOn).format('DD MMMM, YYYY') : null }
          </Text>
          <View style={ sty.footer }>
            <View style={ sty.footerSectionWrapper }>
              <Text h5 style={ sty.footerLabel }>{ 'Reported Pain Level: ' }</Text>
              <Text h5 primary>{ `${reportedPainLevel || null}` }</Text>
            </View>
          </View>
        </View>
        <View style={ sty.backWrapper }>
          <Text h3 primary>{ 'Actions' }</Text>
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

InjuryCard.defaultProps = {
  flipable: true,
  item: {
    bodyPart: {},
    muscleGroup: {},
    assessedBy: {},
    createdBy: {}
  },
  match: {},
  wrapperStyle: {}
};
