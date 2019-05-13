import * as sty from './Membership.style';
import * as actions from '../../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Toast } from 'native-base';
import { SceneContainer, Text, SpinnerOverlay } from 'src/lib/components';

import { CancelUserSubscription } from '../../components';

class _Membership extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  cancelSubscription = () => {
    this.setState({ loading: true });
    return this.props.cancelSubscription()
    .then(() => this.setState({ loading: false }))
    .catch((err) => {
      this.setState({ loading: false });
      Toast.show({
        text: err.message,
        position: 'bottom',
        type: 'danger',
        duration: 4000
      });
    });
  };

  render() {
    const { organization, userSubscription } = this.props;
    return (
      <SceneContainer title='membership' scrollEnabled={ false }>
        <SpinnerOverlay visible={ this.state.loading } />
        <View style={ sty.container }>
          <Text h5>your membership is managed by an organization</Text>
        </View>
        {userSubscription ? (
          <CancelUserSubscription
            cancelSubscription={ this.cancelSubscription }
          />
        ) : null}
      </SceneContainer>
    );
  }
}

const mapStateToProps = ({
  user,
  subscription: { groupSubscription, userSubscription }
}) => ({
  organization: user.organizations.active,
  subscription: groupSubscription,
  user: user.data,
  userSubscription
});
export const Membership = connect(
  mapStateToProps,
  actions
)(_Membership);
