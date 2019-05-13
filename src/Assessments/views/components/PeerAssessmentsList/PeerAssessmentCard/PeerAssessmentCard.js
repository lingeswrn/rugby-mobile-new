import * as actions from 'src/Assessments/actions';
import * as sty from './PeerAssessmentCard.style';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { View, Icon, Toast } from 'native-base';
import { Text, Input, Button, validators, SpinnerOverlay } from 'src/lib/components';
import Collapsible from 'react-native-collapsible';
import Types from 'prop-types';

class _PeerAssessmentCard extends Component {
  onSubmit = (formData) =>
    this.props.editAssessment(this.props.activeId, formData)
    .then(() => this.props.setactiveId({}))
    .catch(err => Toast.show({
      text: err.message,
      position: 'bottom',
      type: 'danger',
      duration: 2500
    }));

  render() {
    const {
      setactiveId,
      activeId,
      invalid,
      submitting,
      handleSubmit
    } = this.props;
    const {
      createdBy,
      createdAt,
      user,
      _id
    } = this.props.assessment;
    const isExpanded = activeId === _id;
    return (
      <View style={ sty.container }>
        <SpinnerOverlay visible={ submitting }/>
        <View style={ sty.titleRowContainer }>
          <View>
            <Text h6>
              {`Peer Assessment of ${user.name.first} ${user.name.last}`}
            </Text>
            <Text style={ sty.createdBy }>
              {createdBy.name
                ? `Assigned by ${createdBy.name.first} ${
                  createdBy.name.last
                } on ${moment(createdAt).format('MMM D, YYYY')}`
                : `Assigned on ${moment(createdAt).format('MMM D, YYYY')}`}
            </Text>
          </View>
          <TouchableOpacity onPress={ () => setactiveId(_id) }>
            <Icon
              name={ isExpanded ? 'chevron-up' : 'chevron-down' }
              style={ sty.toDoIcon }
            />
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={ !isExpanded }>
          <View style={ sty.content }>
            <Field
              name='assessment'
              component={ Input }
              label='assessment'
              iconName='clipboard'
              multiline
              validate={ [validators.required] }
            />
            <Button
              disabled={ invalid || submitting }
              onPress={ handleSubmit(this.onSubmit) }
              style={ sty.button }
              label='send'
            />
          </View>
        </Collapsible>
      </View>
    );
  }
}
_PeerAssessmentCard.propTypes = {
  setactiveId: Types.func.isRequired,
  activeId: Types.string,
  invalid: Types.bool,
  assessment: Types.shape({
    createdBy: Types.object,
    createdAt: Types.string,
    user: Types.shape({
      name: Types.object,
      _id: Types.string.isRequired
    }),
    _id: Types.string.isRequired
  })
};
const form = 'peer-assessment:create';
const ConnectedForm = reduxForm({ form })(_PeerAssessmentCard);
export const PeerAssessmentCard = connect(
  null,
  actions
)(ConnectedForm);
