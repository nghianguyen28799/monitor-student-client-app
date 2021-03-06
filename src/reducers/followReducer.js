import { ADD_FOLLOW, DELETE_FOLLOW, EDIT_FOLLOW, INITIAL_FOLLOW } from '../actions/types';


const initialState = {
    infoStudentList: []
}

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOLLOW:
            // console.log(action);
            return {
                ...state,
                infoStudentList: state.infoStudentList.concat({
                    key: Math.random(),
                    data: action.data
                })   
            }
        case DELETE_FOLLOW:
            return {
                ...state,
                infoStudentList: state.infoStudentList.filter((item) => 
                    item.key !== key
                )  
            }

        case EDIT_FOLLOW:
            return {
                ...state,
                infoStudentList: state.infoStudentList
            }
        
        case INITIAL_FOLLOW:
            return {
                infoStudentList: [],
            }
        default:
            return state;
    }
}

export default followReducer;