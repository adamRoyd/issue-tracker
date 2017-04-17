//taking a slice of the state (filter : show all) and reassigning the value.
//filter is defined in the action!

const issueFilter = (state = 'All', action) => {
  switch (action.type) {
    case 'SET_ISSUE_FILTER':
      return action.filter;
    case 'CHANGE_ISSUE_STATUS':
      return action.status;
    default:
      return state;
  }
};

export default issueFilter;