import * as sty from './SelectionOverlay.style';
import React, { Component } from 'react';
import _ from 'lodash';
import { ScrollView } from 'react-native';
import { View, List, ListItem } from 'native-base';
import { Button, Text, SceneContainer } from 'src/lib/components';

export class SelectionOverlay extends Component {
  constructor(props) {
    super(props);
  }

  renderTemplates() {
    return _.map(this.props.templates, (template, index) => {
      let style = sty.itemWrapper;
      let labelStyle = sty.itemLabel;
      if (this.props.activity.activityTemplate === template._id) {
        style = sty.itemWrapperSelected;
        labelStyle = sty.itemLabelSelected;
      }
      return (
        <ListItem
          key={ index }
          onPress={
            () => this.props.handleUpdate({ activityTemplate: template._id })
          }
          style={ style }
        >
          <Text h5 style={ labelStyle }>
            {template.name}
          </Text>
        </ListItem>
      );
    });
  }

  renderProfiles() {
    const {
      cardioTemplate,
      activity: { cardioProfile },
      profiles
    } = this.props;
    const selectableProfiles = _.isEmpty(cardioTemplate.profile)
      ? profiles
      : _.map(cardioTemplate.profile,
        _id => _.find(profiles, { _id })
      );
    return _.map(selectableProfiles, (profile, index) => {
      const selected = cardioProfile === profile._id;
      return (
        <ListItem
          key={ index }
          onPress={
            () => this.props.handleUpdate({ cardioProfile: profile._id })
          }
          style={ selected ? sty.itemWrapperSelected : sty.itemWrapper }
        >
          <Text h5
            style={ selected ? sty.itemLabelSelected : sty.itemLabel }
          >
            {profile.name}
          </Text>
        </ListItem>
      );
    });
  }

  render() {
    return (
      <View>
        <SceneContainer
          hideSceneFooter
          headerButtons={{ right: 'empty' }}
        >
          <ScrollView contentContainerStyle={ sty.listWrapper }>
            <View style={ sty.itemContainer }>
              <List style={ sty.listWrapper }>
                <ListItem itemDivider style={ sty.itemDividerWrapper }>
                  <Text h3 style={ sty.dividerLabel }>
                    {'Select an Activity'}
                  </Text>
                </ListItem>
                {this.renderTemplates()}
                <ListItem itemDivider style={ sty.itemDividerWrapper }>
                  <Text h3 style={ sty.dividerLabel }>
                    {'Select a Profile'}
                  </Text>
                </ListItem>
                {this.renderProfiles()}
              </List>
            </View>
          </ScrollView>
        </SceneContainer>
        <View style={ sty.buttonWrapper }>
          <Button
            bordered
            label={ 'start' }
            style={ sty.button }
            labelStyle={ sty.label }
            onPress={ this.props.onPressStart }
            disabled={
              !this.props.activity.activityTemplate ||
              !this.props.activity.cardioProfile
            }
          />
        </View>
      </View>
    );
  }
}
