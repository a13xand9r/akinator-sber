import { Dispatch } from 'react';
import { Aki } from 'aki-api'
import Akinator from 'aki-api/typings/src/Akinator';
import { ActionsType, AnswerType } from './types';
import { actions } from './reducer';

export const runAkinator = async () => {
  const region = 'ru';
  const childMode = false
  const aki = new Aki({ region, childMode });
  try {
    await aki.start();
    console.log('akinator run')
  } catch (error) {
    console.log('startAkinatorError', error)
  }
  return aki
}

export const checkWin = async (aki: Akinator, wrongPersonId: string | null) => {
  console.log('currentStep', aki.currentStep)
  console.log('progress', aki.progress)
  console.log('guessCount', aki.guessCount)
  console.log('\n')
  if (aki.progress > 85 || aki.currentStep >= 50){
    await aki.win()
    console.log('win')
    //@ts-ignore
    if (aki.answers[0].id === wrongPersonId){
      return false
    }
    return true
  }
  return false
}

export const nextStep = async (dispatch: Dispatch<ActionsType>,aki: Akinator, answer: AnswerType, wrongPersonId: string | null) => {
  try {
    await aki.step(answer)
    const isWin = await checkWin(aki, wrongPersonId)
    if (!isWin){
      dispatch(actions.setNewQuestion(
        aki.question as string,
        aki.answers as string[],
        aki.currentStep,
        aki.progress
      ))
    } else {
      dispatch(actions.setWin({
        //@ts-ignore
        name: aki.answers[0].name,
        //@ts-ignore
        description: aki.answers[0].description,
        //@ts-ignore
        picture: aki.answers[0].absolute_picture_path
      }))
    }
  } catch (error) {
    console.log('nextStepError', error)
  }
}