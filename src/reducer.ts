import { StateType, ActionsType, CharacterType } from './types';

export const initialState = {
  character: 'sber' as CharacterType,
  isGameGoing: false as boolean,
  question: '' as string,
  answers: [] as string[],
  currentStep: 0 as number
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case 'SET_CHARACTER':
      return {...state, character: action.characterId}
    case 'START_GAME':
      return {...state, isGameGoing: true}
    case 'FINISH_GAME':
      return {...state, isGameGoing: false}
    case 'NEW_QUESTION':
      return {
        ...state,
        question: action.question,
        answers: action.answers,
        currentStep: action.currentStep
      }
    default: return state
  }
}

export const actions = {
  setCharacter: (characterId: CharacterType) => ({ type: 'SET_CHARACTER', characterId } as const),
  startGame: () => ({ type: 'START_GAME' } as const),
  finishGame: () => ({ type: 'FINISH_GAME' } as const),
  setNewQuestion: (question: string, answers: string[], currentStep: number) => (
    { type: 'NEW_QUESTION', question, answers, currentStep } as const
  ),
}