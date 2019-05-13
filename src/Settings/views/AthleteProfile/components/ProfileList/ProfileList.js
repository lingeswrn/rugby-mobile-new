import * as sty from './ProfileList.style';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  map as _map,
  upperCase as _upperCase
} from 'lodash';
import { Icon, List, ListItem, Separator, View } from 'native-base';
import { Text } from 'src/lib/components/Text';

import { getProfileListData } from './getProfileListData';

export class _ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined
    };
  }

  renderListItems(items) {
    return _map(items, (item) => {
      if (item.separator) {
        return (
          <Separator bordered
            key={ item.label }
            style={ sty.listSeparator }
          >
            <Text h3 inverse style={ sty.separatorLabel }>
              { _upperCase(item.label) }
            </Text>
          </Separator>
        );
      }

      // enables custom formatters for some items
      let format = (value) => value;
      if (item.format) {
        format = item.format;
      }

      return (
        <ListItem
          disabled={ item.disabled }
          key={ item.label }
          style={ sty.itemWrapper }
          onPress={ item.disabled
            ? undefined
            : () => this.props.history.push({ pathname: '/account/edit-item', state: item })
          }
        >
          <Text h6 style={ sty.itemLabel }>{ item.label }</Text>
          <View style={ sty.itemRightContainer }>
            <Text
              style={ item.disabled ? sty.itemValueDisabled : sty.itemValue }
            >
              { format(item.value) }
            </Text>
            <Icon
              name='chevron-right'
              style={ item.disabled ? sty.itemIconDisabled : sty.itemIcon }
            />
          </View>
        </ListItem>
      );
    });
  }

  render() {
    const {
      data,
      data: { appConfig, athleteProfile },
      editing
    } = this.props;
    return (
      <List button={ editing }>
        { this.renderListItems(
          getProfileListData({ data, appConfig, athleteProfile })
        ) }
      </List>
    );
  }
}

export const ProfileList = withRouter(_ProfileList);
