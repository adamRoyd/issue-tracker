import initialstate from './initialState';
import * as types from '../actions/actionTypes';

const headerReducer = (state = initialstate.headers, action) => {
    switch (action.type) {
        case types.SORT_ISSUES:
            return [
                ...state.map((header, i) => {
                    if (header.name == action.header.name) {
                        if (header.filter == 2 || header.filter == 0) {
                            return Object.assign({}, header, {
                                filter: 1,
                            });
                        } else {
                            return Object.assign({}, header, {
                                filter: 2,
                            });
                        }
                    } else {
                        return Object.assign({}, header, {
                            filter: 0,
                        });
                    }
                }),
            ];
        default:
            return state;
    }
};

// Get all issues
export const getHeaders = state => state.headers;

export default headerReducer;
