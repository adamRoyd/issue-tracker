//a reducer takes in two things : the action, and a copy of current state.
//it spits out a new updated state.

const issueReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default issueReducer;