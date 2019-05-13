import * as sty from './SetList.style';
import React, { Component } from 'react';
import _ from 'lodash';
import { FlatList } from 'react-native';
import { View } from 'native-base';
import { ListItem } from './subComponents';
import { SupersetChart } from '../SupersetChart';

export class SetList extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
  }

  getData() {
    const {
      currentSet: { setIndex },
      model,
      target: { reps },
      template: { activity }
    } = this.props;
    return _.map(reps, (rep, index) => ({
      setIndex,
      setNumber: index + 1,
      targetReps: rep,
      userReps: model.reps[index],
      userWeight: model.weightBySet[index],
      trainingType: activity.trainingType
    }));
  }

  getItemLayout = (data, index) => {
    return { index, length: 57, offset: index ? 57 * (index - 1) : 0 };
  };

  onPressItem = (index) => this.props.onSelectItem(index);
  _keyExtractor = (item) => item.setNumber;
  renderItem = ({ item, ...rest }) => (
    <ListItem
      item={{ ...item, ...rest }}
      units={ this.props.units }
      onPress={ this.onPressItem }
    />
  );

  componentWillReceiveProps(nextProps) {
    const { currentSet: { setIndex }, template: { isSuperset }} = nextProps;
    const oldSetIndex = this.props.currentSet;
    const wasSuperset = this.props.template.isSuperset;
    if ((oldSetIndex !== setIndex) && !isSuperset && !wasSuperset) {
      this.flatList.scrollToIndex({ animated: true, index: setIndex });
    }
  }

  render() {
    const { template, currentSet, target } = this.props;
    if (template.isSuperset) {
      return (
        <SupersetChart currentSet={ currentSet.setNumber }
          totalSets={ target.sets }
        />
      );
    }

    return (
      <View style={ sty.wrapper }>
        <FlatList
          ref={ (ref) => { this.flatList = ref; } }
          data={ this.getData() }
          extraData={ this.state }
          getItemLayout={ this.getItemLayout }
          keyExtractor={ this._keyExtractor }
          renderItem={ this.renderItem }
        />
      </View>
    );
  }
}

SetList.defaultProps = {
  currentSet: {},
  model: {},
  target: {},
  template: {}
};
