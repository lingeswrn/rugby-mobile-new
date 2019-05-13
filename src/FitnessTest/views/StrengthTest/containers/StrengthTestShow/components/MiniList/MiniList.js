import * as sty from './MiniList.style';
import { FlatList } from 'react-native';
import React, { Component } from 'react';
import { View } from 'native-base';
import { Text } from 'src/lib/components/Text';
import _ from 'lodash';
import { lbToKgModThree } from 'rbv-core/helpers';

export class MiniList extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: props.currentIndex };
  }

  handleUnits = lb => {
    if (isNaN(lb)) return lb;
    return this.props.units === 'metric' ? lbToKgModThree(lb) : lb;
  }

  getItemLayout = (data, index) => {
    const length = sty.itemWrapper.height;
    return { index, length, offset: index ? length * (index - 1) : 0 };
  };
  _keyExtractor = (item) => item.model.muscleGroup;
  getWrapperStyle(current, complete) {
    switch(true) {
      case (current): return sty.itemWrapperCurrent;
      case (complete): return sty.itemWrapperComplete;
      case (true): return sty.itemWrapperUpcoming;
      default: return sty.itemWrapper;
    }
  }
  scrollToIndex(index = 0) {
    this.flatList.scrollToIndex({ animated: true, index });
  }
  componentDidMount() { this.scrollToIndex(this.props.currentIndex); }
  getTextStyle(current, complete, style, isValue) {
    const successStyle = isValue ? sty.valueSuccess : sty.textSuccess;
    switch(true) {
      case (current): return style;
      case (complete):
        return { ...style, ...successStyle };
      default: return { ...style, ...sty.textDisabled };
    }
  }
  getData() {
    const { all, complete, muscleGroups } = this.props;
    const { currentIndex } = this.state;
    const activityList = _.concat([], all);
    if (!_.isEmpty(complete)) activityList.unshift(activityList.pop());
    return _.map(activityList, ({ model }, index) => ({
      complete, currentIndex, index, model, muscleGroups
    }));
  }
  // this is probably broken
  renderItem = ({ item }) => {
    const { complete, model, muscleGroups } = item;
    const { currentActivity } = this.props;
    const muscleGroup = _.find( muscleGroups, { _id: model.muscleGroup });
    let weight = '---';
    let reps = '--';
    let oneRepMax  = '---';
    const stats = _.find(complete, { muscleGroup: model.muscleGroup });
    const current = model.muscleGroup === currentActivity.muscleGroup;
    const isComplete = !_.isUndefined(stats);
    if (stats) {
      weight = stats.weight;
      reps = stats.reps;
      oneRepMax = stats.oneRepMax;
    }
    return (
      <View style={ this.getWrapperStyle(current, isComplete) }>
        <View style={ sty.itemContainerLeft }>
          <Text h5
            style={ this.getTextStyle(current, isComplete, sty.value, true) }
          >{ muscleGroup.name }</Text>
        </View>
        <View style={ sty.valueWrapper }>
          <View style={ sty.itemContainer }>
            <Text h5
              style={ this.getTextStyle(current, isComplete, sty.value) }
            >{ this.handleUnits(weight) }</Text>
          </View>
          <View style={ sty.itemContainer }>
            <Text h5
              style={ this.getTextStyle(current, isComplete, sty.value) }
            >{ reps }</Text>
          </View>
          <View style={ sty.itemContainer }>
            <Text h5
              style={ this.getTextStyle(current, isComplete, sty.maxValue) }
            >{ this.handleUnits(oneRepMax) }</Text>
          </View>
        </View>
      </View>
    );
  }
  renderLabel(labels) {
    return _.map(labels, (label, index) => (
      <View key={ index } style={ sty.colLabelWrapper }>
        <Text style={ sty.colLabel(labels.length) } h6 inverse>{ label }</Text>
      </View>
    ));
  }
  get LabelRow() {
    return (
      <View style={ sty.labelRowWrapper }>
        <View style={ sty.labelRowContainerLeft }>
          { this.renderLabel(['muscle group']) }
        </View>
        <View style={ sty.labelRowContainerRight }>
          { this.renderLabel(['weight', 'reps', '1-rep max']) }
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={ sty.wrapper }>
        { this.LabelRow }
        <FlatList ref={ (ref) => { this.flatList = ref; } }
          data={ this.getData() }
          getItemLayout={ this.getItemLayout }
          keyExtractor={ this._keyExtractor }
          renderItem={ this.renderItem }
        />
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { currentIndex } = nextProps;
    if (currentIndex !== this.props.currentIndex) {
      this.setState({ currentIndex });
      this.scrollToIndex(currentIndex);
    }
  }
}
