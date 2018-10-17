import * as types from './actionTypes';

export function toggleArea(area) {
    return {
        type: types.TOGGLE_AREA,
        area
    };
}
