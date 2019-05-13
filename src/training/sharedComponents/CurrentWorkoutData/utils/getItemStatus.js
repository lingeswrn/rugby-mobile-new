function getStatusColor(status, noWeights) {
  let Status = status;
  if (noWeights) Status = 'complete';
  switch(Status) {
    case 'incomplete': return { type: 'warning', variant: 'dark' };
    case 'future': case 'complete': return { type: 'gray', variant: 'light' };
    default: return { type: 'text', variant: 'primary' };
  }
}

export const getItemStatus = (day) => {
  const { metadata, model, hasWeights } = day;
  const { isFuture } = metadata;
  const noWeights = !hasWeights;

  let cardioStatus = model.cardioStatus;
  let weightliftingStatus = model.status;
  let workoutStatus = 'notStarted';

  switch(true) {
    case model && (
      model.status === 'complete' &&
      (model.cardioStatus === 'complete' || noWeights)
    ): workoutStatus = 'complete'; break;
    case model &&
    (model.status === 'incomlete' || model.cardioStatus === 'incomplete'):
      workoutStatus = 'incomplete';
      break;
    case isFuture:
      workoutStatus = 'future';
      cardioStatus = 'future';
      weightliftingStatus = 'future';
      break;
    default: break;
  }

  return {
    segmentStatusTypes: {
      cardio: getStatusColor(cardioStatus),
      weightlifting: getStatusColor(weightliftingStatus, noWeights)
    },
    cardioStatus,
    weightliftingStatus,
    workoutStatus
  };
};
