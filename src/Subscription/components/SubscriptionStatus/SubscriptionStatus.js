import * as sty from './SubscriptionStatus.style';

import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Text, View } from 'native-base';

export class SubscriptionStatus extends Component {
  constructor(props) {
    super(props);
  }

  renderSubscriptionCard(items) {
    return _.map(items, (item, index) => {
      if (!item.value) return null;
      return (
        <View
          key={ index }
          style={ sty.rowContainer }
        >
          <View>
            <Text style={ sty.itemLabel }>{ _.upperCase(item.label) }</Text>
          </View>
          <View style={ sty.valueWrapper }>{ item.value }</View>
        </View>
      );
    });
  }

  render() {
    const { subscription } = this.props;

    return (
      <View style={ sty.cardWrapper }>
        { this.renderSubscriptionCard([
          {
            label: 'current plan',
            value: (<Text>{ subscription.name }</Text>)
          }, {
            label: 'status',
            value: (
              <View style={ sty.statusWrapper }>
                <Text>{ subscription.status }</Text>
                <Icon
                  name='circle'
                  style={{
                    ...sty.statusIcon,
                    color: subscription.statusIconColor
                  }}
                />
              </View>
            )
          }, {
            label: 'rate',
            value: (
              <Text>
                { `${subscription.amount} /${subscription.interval}` }
              </Text>
            )
          }, {
            label: subscription.status === 'Trialing' ?
              'Trial Ends' : 'Next charge',
            value: (
              <Text>{ subscription.nextPayment }</Text>
            )
          }, {
            label: 'payment method',
            value: (subscription.source ?
              <Text>
                {`${subscription.cardType} | ****${
                  subscription.cardLast4}`}
              </Text> : null
            )
          }
        ])}
      </View>
    );
  }
}
