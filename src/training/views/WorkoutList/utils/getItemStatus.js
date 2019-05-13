function getTypeByStatus(status) {
  switch(status) {
    case 'notStarted':
      return 'primary';
    case 'incomplete':
      return 'warning';
    case 'complete':
      return 'success';
    default:
      return 'info';
  }
}

export const getItemStatus = (currentDay, selected, workout, workoutType) => {
  const isCurrentDay = currentDay === workoutType;
  const isCollapsed = workoutType !== selected;
  const isFuture = (currentDay < workoutType);

  let weightliftingStatus = 'primary';
  let cardioStatus = 'primary';

  let workoutStatusType = 'primary';
  switch(true) {
    case workout && (
      (workout.status === 'complete' && workout.cardioStatus === 'complete') ||
      (workout.cardioStatus === 'complete')
    ):
      workoutStatusType = 'success';
      break;

    case workout &&
    (workout.status === 'incomlete' || workout.cardioStatus === 'incomplete'):
      workoutStatusType = 'warning';
      break;

    case isFuture:
      workoutStatusType = 'primary';
      break;

    default:
      workoutStatusType = 'info';
      break;
  }

  if (workout) {
    weightliftingStatus = getTypeByStatus(workout.status);
    cardioStatus = getTypeByStatus(workout.cardioStatus);
  }

  return {
    isCollapsed,
    isCurrentDay,
    isFuture,
    segmentStatusTypes: {
      cardio: cardioStatus,
      weightlifting: weightliftingStatus
    },
    workoutStatusType
  };
};
