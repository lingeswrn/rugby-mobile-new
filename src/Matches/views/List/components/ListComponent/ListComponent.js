import * as sty from './ListComponent.style';
import React, { Component } from 'react';
import _ from 'lodash';
import { View } from 'native-base';
import { Text } from 'src/lib/components';
import { MatchCard } from 'src/Matches/sharedComponents';

export class ListComponent extends Component {
  constructor(props) { super(props); }

  renderCards(items, type) {
    return _.map(_.reverse(items), (item, index) => (
      <MatchCard key={ index }
        handleEdit={ () => this.props.editMatch(item) }
        handleRemove={ () => this.props.removeMatch(item._id) }
        item={ item }
        flipable={ type === 'user' }
        wrapperStyle={ sty.cardWrapper }
      />
    ));
  }

  render() {
    const { items, title, type } = this.props;
    return (
      <View style={ sty.wrapper }>
        <View style={ sty.titleWrapper }>
          <Text h3 inverse>{ title }</Text>
        </View>
        <View style={ sty.listWrapper }>
          { this.renderCards(items, type) }
        </View>
      </View>
    );
  }
}
