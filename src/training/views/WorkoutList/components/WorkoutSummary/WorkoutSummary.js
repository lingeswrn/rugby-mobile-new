import * as sty from './WorkoutSummary.style';
import React, { Component } from 'react';
import { Card, Text, View } from 'native-base';


export class WorkoutSummary extends Component {
  constructor(props) {
    super(props);
  }
  renderSummaryKPIs(metrics) {
    return metrics.map((metric) => {
      return (
        <View key={ metric.label } style={ sty.itemContainer }>
          <Text style={ sty.value }>{ metric.value }</Text>
          <Text style={ sty.label }>{ metric.label }</Text>
        </View>
      );
    });
  }

  render() {
    const { template } = this.props.training.workout;
    const activities = template.weightliftingActivityTemplates;
    return (
      <Card style={ sty.card }>
        { this.renderSummaryKPIs([
          { label: 'ACTIVITIES', value: activities.length },
          { label: 'MINUTES', value: template.estimatedDuration },
          { label: 'MET', value: '--' },
        ]) }
      </Card>
    );
  }
}
