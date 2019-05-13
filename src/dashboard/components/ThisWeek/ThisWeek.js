import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { SceneContainer } from 'src/lib/elements';

export class ThisWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 4
    };
  }
  render() {
    return (
      // #STYLES
      <View>
        <View style={ { flexDirection: 'row', marginBottom: 10 } }>
          <View>
            <View style={ { backgroundColor: 'yellow', padding: 5, marginBottom: 10 } }>
              <Text style={ [styles.boxText, styles.boxTextLabel] }>
                Workouts
              </Text>
              <Text style={ [styles.boxText, styles.boxTextData] }>
                5/6
              </Text>
            </View>
            <View style={ { backgroundColor: 'blue', padding: 5 } }>
              <Text style={ [styles.boxText, styles.boxTextLabel] }>
                Avg. Sleep
              </Text>
              <Text style={ [styles.boxText, styles.boxTextData] }>
                6:27
              </Text>
            </View>
          </View>
          <View
            style={ { flex: 1, marginLeft: 5, padding: 10, backgroundColor: '#fff' } }
            onLayout={ (event) => {
              this.setState({
                containerWidth: event.nativeEvent.layout.width
              });
            } }>
            <View style={ { marginBottom: 10 } }>
              <Text style={ { textAlign: 'center' } }>
                Nutrition Summary
              </Text>
            </View>
            <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
              <View style={ { width: (this.state.containerWidth / 2) } } />
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { fontSize: 10, textAlign: 'center' } }>
                  Total
                </Text>
              </View>
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { fontSize: 10, textAlign: 'center' } }>
                  vs. Avg
                </Text>
              </View>
            </View>
            <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
              <View style={ { width: (this.state.containerWidth / 2) } }>
                <Text style={ styles.nutriLabelText }>
                  Calories In
                </Text>
              </View>
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { textAlign: 'center' } }>
                  15.2K
                </Text>
              </View>
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { textAlign: 'center' } }>
                  +6.8 %
                </Text>
              </View>
            </View>
            <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
              <View style={ { width: (this.state.containerWidth / 2) } }>
                <Text style={ styles.nutriLabelText }>
                  Calories Out
                </Text>
              </View>
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { textAlign: 'center' } }>
                  14.7K
                </Text>
              </View>
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { textAlign: 'center' } }>
                  +2.2 %
                </Text>
              </View>
            </View>
            <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
              <View style={ { width: (this.state.containerWidth / 2) } }>
                <Text style={ { fontWeight: '600' } }>
                  Net Calories
                </Text>
              </View>
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { textAlign: 'center' } }>
                  +538
                </Text>
              </View>
              <View style={ { width: (this.state.containerWidth / 4) } }>
                <Text style={ { textAlign: 'center' } }>
                  +38 %
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text>
          bottom half [chart]
        </Text>
      </View>
      );
  }
}
// #STYLES
const styles = StyleSheet.create({
  boxText: {
    color: 'white',
    textAlign: 'center'
  },
  boxTextLabel: {
    fontSize: 8
  },
  boxTextData: {
    fontSize: 24
  },
  nutriLabelText: {
    fontWeight: '100'
  }
});
