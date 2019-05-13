import * as sty from './NutritionSources.style';
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Text } from 'lib/components';
import { Modal } from './Modal';

export class NutritionSources extends Component {
  constructor(props) {
    super(props);
    this.state = { img: undefined };
  }

  render() {
    return (
      <View style={ sty.container }>
        <View style={ sty.titleContainer }>
          <Text style={ sty.title }>
            NUTRITION RECOMMENDATIONS
          </Text>
        </View>
        <View style={ sty.buttons }>
          <Modal
            img={ this.state.img }
            close={ () => this.setState({ img: undefined }) }
          />

          <TouchableOpacity
            style={ sty.button }
            onPress={ () => this.setState({ img: 'carbs' }) }
          >
            <Icon style={ sty.icon } name='plus' />
            <Text style={ sty.buttonText } h4>
                carbs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ sty.button }
            onPress={ () => this.setState({ img: 'fat' }) }
          >
            <Icon style={ sty.icon } name='plus' />
            <Text style={ sty.buttonText } h4>
                  fat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ sty.button }
            onPress={ () => this.setState({ img: 'protein' }) }
          >
            <Icon style={ sty.icon } name='plus' />
            <Text style={ sty.buttonText } h4>
                    protein
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
