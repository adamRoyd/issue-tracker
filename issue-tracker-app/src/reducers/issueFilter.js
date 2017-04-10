//taking a slice of the state (filter : show all) and reassigning the value.
//filter is defined in the action!

const issueFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_ISSUE_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default issueFilter;