import { Button } from '@sberdevices/plasma-ui'
import { Dispatch, useState } from 'react'
import styled from 'styled-components'
import { actions } from '../reducer'
import { ActionsType } from '../types'
import { PlayButton } from './PlayButton'

const WinImg = styled.img`
  display: block;
  margin: 1rem auto;
  height: 15rem;
  @media (max-width: 750px) {
    height: auto;
    width: 98%;
  }
`

const YesNoContainer = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 70%;
  justify-content: space-around;
  @media (max-width: 750px) {
    width: 90%;
  }
`

const StyledButton = styled(Button)`
  display: block;
  width: 7rem;
  @media (max-width: 750px) {
    width: 5.5rem;
  }
`

export const WinWindow: React.FC<Props> = ({onFinishGame, onWrong, picture, dispatch}) => {
  const [isShowContinue, setIsShowContinue] = useState(false)

  const onNoClick = () => {
    if (isShowContinue){
      onFinishGame(false)
    } else {
      dispatch(actions.setQuestion('Продолжить?'))
      setIsShowContinue(true)
    }
  }
  const onYesClick = () => {
    if (isShowContinue) {
      onWrong()
    } else {
      onFinishGame(true)
    }
  }

  return (
    <div>
      <WinImg src={picture} alt="" />
      <YesNoContainer>
        <StyledButton
          view='accent'
          onClick={onYesClick}
        >
          Да
        </StyledButton>

        <StyledButton
          view='warning'
          onClick={onNoClick}
        >
          Нет
        </StyledButton>
      </YesNoContainer>
    </div>
  )
}

type Props = {
  dispatch: Dispatch<ActionsType>
  onFinishGame: (isWin: boolean) => void
  onWrong: () => void
  picture: string
}