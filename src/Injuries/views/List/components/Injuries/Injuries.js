import * as sty from './Injuries.style';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { View } from 'native-base';
import { InjuryCard } from 'src/Injuries/sharedComponents';
import { Text } from 'src/lib/components/Text';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

export class _Injuries extends Component {
  constructor(props) { super(props); }

  renderCards(items) {
    const { status } = this.props;
    return _.map(items, (item, index) => (
      <InjuryCard key={ index }
        handleEdit={ () => this.props.editInjury(item) }
        handleRemove={ () => this.props.removeInjury(item._id) }
        item={ item }
        wrapperStyle={ sty.cardWrapper }
        flipable={ status === 'new' ? true : false }
      />
    ));
  }

  render() {
    const { items, title, open, status, toggleOpen } = this.props;
    const empty = _.isEmpty(items);
    const active = (open && !empty);
    return (
      <View style={ sty.wrapper }>
        <TouchableOpacity style={ sty.titleWrapper(active) }
          activeOpacity={ 0.8 }
          disabled={ empty }
          onPress={ empty ? null : () => toggleOpen(status, open) }
        >
          <Text h1 style={ sty.title(active) }>{ title }</Text>
          <Text>
            <Text h1 style={ sty.countParen(active) }>{ '( '}</Text>
            <Text h1 style={ sty.countNumber(active) }>
              { `${items.length}` }
            </Text>
            <Text h1 style={ sty.countParen(active) }>{ ' )'}</Text>
          </Text>
        </TouchableOpacity>
        <Collapsible collapsed={ !open }
          style={ sty.listWrapper(active) }
        >
          { this.renderCards(items) }
        </Collapsible>
      </View>
    );
  }
}

export const Injuries = withRouter(_Injuries);
