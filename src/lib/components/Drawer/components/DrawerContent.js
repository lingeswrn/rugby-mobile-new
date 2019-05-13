import * as sty from './DrawerContent.style';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { ScrollView } from 'react-native';
import {
  Body, Icon, List, ListItem, Text, View
} from 'native-base';
import { Button } from 'src/lib/components';
import { config } from 'src/config';
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNavigate(pathname) {
    const { history, handleCloseDrawer } = this.props;
    handleCloseDrawer();
    history.push(pathname);
  }

  handleReportBug = () => {
    this.props.handleCloseDrawer();
    this.props.handleReportBug();
  }
  renderRows(items) {
    return _.map(items, ({ to, icon, label, onPress }, index) => (
      <ListItem key={ index }
        style={ sty.listItemWrapper }
        onPress={ to ? () => this.handleNavigate(to) : onPress }
      >
        <Body>
          <Text style={ sty.itemLabel }>{ _.upperCase(label) }</Text>
        </Body>
        <Icon
          name={ icon }
          style={ sty.icon }
        />
      </ListItem>
    ));
  }
  render() {
    return (
      <View
        style={ sty.wrapper }
      >
        <ScrollView>
          <List button>
            { this.renderRows(_.concat(config.drawerItems, [
              {
                label: 'report an issue',
                icon: 'bug',
                onPress: this.handleReportBug
              }
            ])) }
          </List>
        </ScrollView>
        <View style={ sty.buttonWrapper }>
          <Button onPress={ this.props.handleSignOut }
            primary
            label='sign out'
          />
        </View>
      </View>
    );
  }
}

export const DrawerContent = withRouter(Content);
