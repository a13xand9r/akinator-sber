import { IconArrowLeft } from '@sberdevices/plasma-icons'
import { Body1, Button } from '@sberdevices/plasma-ui'
import styled from 'styled-components'

const AnswerButton = styled(Button)`
  display: block;
  width: 90%;
  margin: 0.5rem auto;
`
const ButtonsContainer = styled.div`
  margin-top: 1.5rem;
`
const BackButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AnswerButtons: React.FC<Props> = ({ answers, onAnswerClick, onBackClick, currentStep }) => {
  return (
    <ButtonsContainer>
      {
        answers.map((item, index) => (
          <AnswerButton
            key={index}
            size='m'
            view='secondary'
            onClick={() => onAnswerClick(index)}
          >
            <Body1>{item}</Body1>
          </AnswerButton>
        ))
      }
      {
        currentStep > 1 &&
        <AnswerButton
          view='clear'
          onClick={onBackClick}
        >
          <BackButtonContent>
            <IconArrowLeft />
            Назад
          </BackButtonContent>
        </AnswerButton>
      }
    </ButtonsContainer>
  )
}

type Props = {
  answers: string[]
  onAnswerClick: (index: number) => void
  onBackClick: () => void
  currentStep: number
}
