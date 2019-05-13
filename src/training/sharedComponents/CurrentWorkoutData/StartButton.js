import * as sty from './CurrentWorkoutData.style';
import React from 'react';
import { Button } from 'src/lib/components';
import { withRouter } from 'react-router';

export const Start = (props) => {
  const {
    history,
    itemStatus: { segmentStatusTypes },
    metadata: { isFuture, isCurrent },
    type,
    workout,
    workout: { hasInjury = false, injuryLimits = {}},
    workoutType
  } = props;
  const disabled = hasInjury && !injuryLimits[type];
  let status = undefined;
  let buttonData = {
    icon: 'play',
    label: isFuture ? 'START EARLY' : isCurrent ? 'START' : 'MAKE UP',
    large: !isFuture,
    onPress: () => props.setSelectedWorkoutType(workoutType)
    .then(() => history.push(`/workouts/${type}`))
  };

  if (workout) {
    status = type === 'cardio' ? workout.cardioStatus : workout.status;
    switch(status) {
      case 'complete':
        buttonData = {
          disabled: true,
          icon: 'check',
          label: 'FINISHED',
          onPress: () => {},
          large: true
        };
        break;
      case 'incomplete':
        buttonData = { ...buttonData,
          icon: 'circle-o-notch',
          label: 'RESUME',
          large: true
        };
        break;
      default: break;
    }
  }
  return(
    <Button
      disabled={ disabled }
      bordered
      iconRight
      labelStyle={ sty.buttonLabel(
        segmentStatusTypes[type], isFuture, disabled
      ) }
      iconStyle={ sty.startButtonIcon(segmentStatusTypes[type], disabled) }
      style={ sty.startButton(segmentStatusTypes[type], disabled) }
      { ...buttonData }
    />
  );
};
Start.defaultProps = {
  type: 'weightlifting',
  workout: {},
  itemStatus: { segmentStatusTypes: {}}
};
export const StartButton = withRouter(Start);
