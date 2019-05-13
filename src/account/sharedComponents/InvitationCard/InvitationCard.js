import * as sty from './InvitationCard.style';
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { View } from 'native-base';
import { Button, Text } from 'src/lib/components';
import FlipCard from 'react-native-flip-card';

export class InvitationCard extends Component {
  constructor(props) { super(props); }

  render() {
    const {
      handleAccept,
      handleReject,
      item: { organization, createdAt, response },
      wrapperStyle
    } = this.props;
    const atCapacity = true;
    return (
      <FlipCard
        alignHeight
        alignWidth
        clickable={ response === 'pending' }
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
            { _.isEmpty(organization) ? null : `${organization.name} ` }
          </Text>
          <Text style={ sty.subtitle }>
            { moment(createdAt).isValid ?
              moment(createdAt).format('DD MMMM, YYYY') : null }
          </Text>
          <View style={ sty.footer }>
            <View style={ sty.footerSectionWrapper }>
              <Text h5 style={ sty.footerLabel }>{ 'Response:' }</Text>
              <Text h5 primary>{ `${response || null}` }</Text>
            </View>
          </View>
        </View>
        <View style={ sty.backWrapper }>
          <Text h3 primary>{ 'Actions' }</Text>
          { atCapacity
            ? <Text style={ sty.atCapacity }>
              This organization is currently at full capacity
            </Text>
            :  <View style={ sty.backButtons }>
              { _.isFunction(handleAccept) ?
                <Button label='accept'
                  icon='check-square'
                  info
                  large={ false }
                  style={ sty.backSideButton }
                  onPress={ handleAccept }
                  disabled={ atCapacity }
                />
                : null }
              { _.isFunction(handleReject) ?
                <Button label='reject'
                  icon='trash'
                  large={ false }
                  primary
                  style={ sty.backSideButton }
                  onPress={ handleReject }
                />
                : null }
            </View>
          }
        </View>
      </FlipCard>
    );
  }
}

InvitationCard.defaultProps = {
  flipable: true,
  item: {
    organization: {},
    createdAt: {}
  },
  match: {},
  wrapperStyle: {}
};
