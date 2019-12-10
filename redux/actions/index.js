
export const ADD_GAME_SCORE = 'ADD_GAME_SCORE'

export const addGameScore = (method,  data = {}) => {
    return {
      type: ADD_GAME_SCORE,
      method,
      data
    }
  }
