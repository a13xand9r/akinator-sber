import { Card, CardBody, CardContent, TextBox } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { WinType } from '../types'

const StyledCard = styled(Card)`
  min-height: 4rem;
`
const StyledCardBody = styled(CardBody)`
  height: 100%;
`
const StyledCardContent = styled(CardContent)`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Question: React.FC<Props> = ({ text, step, isWin }) => {
  return (
    <StyledCard>
      <StyledCardBody>
        <StyledCardContent cover={false}>
          <TextBox>
            {
              `${step > 0 && !isWin ? step + '.' : ''} ${text}`
            }
          </TextBox>
        </StyledCardContent>
      </StyledCardBody>
    </StyledCard>
  )
}

type Props = {
  text: string
  step: number
  isWin: boolean
}
