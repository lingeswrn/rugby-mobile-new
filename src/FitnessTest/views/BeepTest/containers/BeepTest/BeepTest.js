import * as sty from './BeepTest.style';
import _ from 'lodash';
import React, { Component } from 'react';
import KeepAwake from 'react-native-keep-awake';
import { View } from 'react-native';
import { SpinnerOverlay } from 'src/lib/components';
import { Icon, Button, Toast } from 'native-base';
import {
  Timer,
  ResultsOptions,
  Modal,
  StartTimerComponent
} from '../../components';

export class BeepTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testComplete: false,
      timerOpen: false,
      modalOpen: false,
      submitting: false
    };
  }

  confirmModal = () =>
    this.state.testComplete
      ? this.setState({ modalOpen: false })
      : this.setState({ modalOpen: false, timerOpen: false });
  cancelModal = () =>
    this.props.history.push('/fitness-tests', { skipFetchData: true });

  // called when everything is done
  stopTimer = (level, shuttle) => {
    this.setState({ timerOpen: false, testComplete: true });
    return this.props.updateCurrentBeepTest({ level, shuttle });
  };

  submitResults = (level, shuttle) => {
    this.setState({ submitting: true });
    return this.props.saveBeepTest({ level, shuttle })
    .then(() => {
      this.setState({ submitting: false });
      return _.isEmpty(this.props.all)
        ? this.props.history.push('/beep-test/completed')
        : this.props.history.push('/beep-test/summary');
    })
    .catch(err => {
      this.setState({ submitting: false });
      Toast.show({
        text: err.message,
        position: 'bottom',
        type: 'danger',
        duration: 2500
      });
    });
  };

  renderContent() {
    if (this.state.timerOpen) {
      return (
        <Timer
          LevelBeep={ this.props.LevelBeep }
          ShuttleBeep={ this.props.ShuttleBeep }
          timerOpen={ this.state.timerOpen }
          onStop={ this.stopTimer }
          startTimer={ () => this.setState({ timerOpen: true }) }
        />
      );
    }
    if (!this.state.timerOpen && this.state.testComplete) {
      return (
        <ResultsOptions
          submitResults={ this.submitResults }
          results={ this.props.results }
        />
      );
    }
    if (!this.state.timerOpen && !this.state.testComplete) {
      return (
        <StartTimerComponent
          modalOpen={ this.state.modalOpen }
          onPressManual={ () =>
            this.props.history.push('/beep-test/manual-entry')
          }
          onPressStart={ () => this.setState({ timerOpen: true }) }
        />
      );
    }
    return null;
  }

  render() {
    const { modalOpen, timerOpen, testComplete } = this.state;
    return (
      <View style={ sty.container }>
        <KeepAwake />
        <SpinnerOverlay visible={ this.state.submitting } />
        <Modal
          cancelText={ testComplete ? 'delete results' : 'cancel test' }
          confirmText={ testComplete ? 'continue' : 'restart' }
          cancel={ this.cancelModal }
          confirm={ this.confirmModal }
          modalOpen={ modalOpen }
        />
        <View style={ sty.header }>
          <Button
            disabled={ modalOpen }
            transparent
            onPress={ () =>
              !timerOpen && !testComplete
                ? this.props.history.push('/fitness-tests', {
                  skipFetchData: true
                })
                : this.setState({ modalOpen: true })
            }
          >
            <Icon name='close' style={ sty.icon } />
          </Button>
        </View>
        <View style={ sty.innerContainer }>{this.renderContent()}</View>
      </View>
    );
  }
}
