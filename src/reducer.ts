import { StateType, ActionsType, CharacterType, WinType } from './types';

export const initialState = {
  character: 'sber' as CharacterType,
  isGameGoing: false as boolean,
  question: 'Привет, я Акинатор' as string,
  answers: ['Да', 'Нет', 'Не знаю', 'Возможно, частично', 'Скорее нет, не совсем'] as string[],
  isFetching: false as boolean,
  currentStep: 0 as number,
  progress: 0 as number,
  win: null as null | WinType
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
  switch (action.type) {
    case 'SET_CHARACTER':
      return {...state, character: action.characterId}
    case 'START_GAME':
      return {...state, isGameGoing: true, win: null}
    case 'FINISH_GAME':
      return {...state, isGameGoing: false}
    case 'SET_FETCHING':
      return {...state, isFetching: action.flag}
    case 'WIN_PERSON':
      const questionText = action.win ? `Кажется это ${action.win.name} (${action.win.description})` : state.question
      return {...state, win: action.win, question: questionText}
    case 'SET_QUESTION':
      return {...state, question: action.text}
    case 'SET_STEP':
      return {...state, currentStep: action.step}
    case 'NEW_QUESTION':
      return {
        ...state,
        question: action.question,
        // answers: action.answers,
        progress: action.progress,
        currentStep: action.currentStep + 1
      }
    default: return state
  }
}

export const actions = {
  setCharacter: (characterId: CharacterType) => ({ type: 'SET_CHARACTER', characterId } as const),
  startGame: () => ({ type: 'START_GAME' } as const),
  setQuestion: (text: string) => ({ type: 'SET_QUESTION', text } as const),
  setStep: (step: number) => ({ type: 'SET_STEP', step } as const),
  finishGame: () => ({ type: 'FINISH_GAME' } as const),
  setFetching: (flag: boolean) => ({ type: 'SET_FETCHING', flag } as const),
  setWin: (win: null | WinType) => ({ type: 'WIN_PERSON', win } as const),
  setNewQuestion: (question: string, answers: string[], currentStep: number, progress: number) => (
    { type: 'NEW_QUESTION', question, answers, currentStep, progress } as const
  ),
}