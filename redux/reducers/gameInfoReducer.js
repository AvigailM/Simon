import { ADD_GAME_SCORE} from '../actions'

const initialState = {
  scores: []
};

export default gameInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME_SCORE:
      console.log("ADD_GAME_SCORE",action.data)
      return Object.assign({}, state, { scores: action.data })  
    default:
      return state;
  }
};
