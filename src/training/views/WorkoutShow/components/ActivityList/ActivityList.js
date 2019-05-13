import * as sty from './ActivityList.style';
import React, { Component } from 'react';
import { List, ListItem, Text, View } from 'native-base';
import { map as _map } from 'lodash';
export class ActivityList extends Component {
  constructor(props) {
    super(props);
  }

  renderSetsReps(template = {}) {
    const { reps = [], isSuperset } = template;
    if (isSuperset) {
      return (
        <View style={ sty.labelContainer }>
          <Text style={ sty.label }>SUPERSET</Text>
        </View>
      );
    }
    return (
      <View style={ sty.statItemWrapper }>
        <View style={ sty.itemContainer }>
          <Text style={ sty.value }>
            { reps.length }
          </Text>
          <Text style={ sty.label }>Sets</Text>
        </View>
        <View style={ sty.itemContainer }>
          <Text style={ sty.value }>
            { reps[0] }</Text>
          <Text style={ sty.label }>Reps</Text>
        </View>
      </View>
    );
  }

  renderListItems(activities) {
    return _map(activities, ({ template }, prop) => {
      const { activity } = template;
      return (
        <ListItem
          key={ prop }
          style={ sty.itemWrapper }
        >
          <View style={ sty.itemContainerLeft }>
            <Text style={ sty.value }>{ activity.name }</Text>
          </View>
          { this.renderSetsReps(template) }
        </ListItem>
      );
    });
  }

  render() {
    const { all } = this.props.queue;

    return (
      <View>
        <View style={ sty.listWrapper }>
          <Text style={ sty.listTitle }>
            {'Today\'s Activities'}
          </Text>
        </View>
        <List style={ sty.card }>
          { this.renderListItems(all) }
        </List>
      </View>
    );
  }
}
