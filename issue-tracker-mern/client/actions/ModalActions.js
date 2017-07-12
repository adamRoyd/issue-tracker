import * as types from './actionTypes';

export function openModal(modal){
    console.log('OPEN MODAL');
    console.log(modal);
    return{
        type:types.OPEN_MODAL,
        modal
    }
}

export function closeModal(){
    return{
        type:types.CLOSE_MODAL
    }
}
