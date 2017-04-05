//a reducer takes in two things : the action, and a copy of current state.
//it spits out a new updated state.

export default function postReducer(state = [], action) {
    console.log(state,action);
    return state;
}
