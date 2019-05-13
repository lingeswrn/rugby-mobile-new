import * as sty from './PastDueInvoice.style';
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { View } from 'native-base';
import { Text } from 'lib/components';

export const PastDueInvoice = ({ invoices }) => {
  const recent = invoices[0];

  if (_.isEmpty(invoices)) return null;
  if (!recent.paid && recent.attempted) {
    return (
      <View style={ sty.container }>
        <View style={ sty.box }>
          <Text h4 primary style={ sty.title }>
            Unpaid invoice
          </Text>
          <Text>{`We will reattempt payment on ${moment(
            recent.next_payment_attempt,
            'X'
          ).format(
            'MMM D, YYYY'
          )}.  Make sure your payment form is up to date to avoid having your subscription cancelled.`}</Text>
        </View>
      </View>
    );
  }
  return null;
};
