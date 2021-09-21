import { createSmartappDebugger, createAssistant } from '@sberdevices/assistant-client'
import { Dispatch } from 'react'
import { actions } from './reducer'

export const initializeAssistant = (getState: () => any) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_ASSISTANT_TOKEN ?? '',
      initPhrase: 'Запусти игра акинатор',
      getState
    })
  }
  return createAssistant({ getState })
}

export const initAssistant = (
  dispatch: Dispatch<any>,
  assistant: ReturnType<typeof createAssistant>,
  ) => {
  assistant.on('data', ({ smart_app_data, type, character }: any) => {
    if (smart_app_data) {
      dispatch(smart_app_data)
    }
    if (type === 'character') dispatch(actions.setCharacter(character.id))
  })
}