import { actions, initialState } from './reducer';

export type StateType = typeof initialState

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>

export type CharacterType = 'sber' | 'joy' | 'eva'

export type WinType = {
  name: string
  description: string
  picture: string
}

export type AnswerType = 0 | 1 | 2 | 3 | 4