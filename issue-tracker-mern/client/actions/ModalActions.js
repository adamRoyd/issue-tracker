import * as types from './actionTypes';

export function openModal(modal){
    return{
        type:types.OPEN_MODAL,
        modal
    }
}

export function closeModal(){
    console.log("CLOSE MODAL");
    return{
        type:types.CLOSE_MODAL
    }
}
