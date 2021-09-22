import styled from 'styled-components'
import startImage from '../assets/img/big_start.png'
import okImage from '../assets/img/big_ok1.png'
import winImage from '../assets/img/big_ok2.png'
import phoneImage from '../assets/img/big_phone.png'
import thinkImage1 from '../assets/img/big_think1.png'
import thinkImage2 from '../assets/img/big_think2.png'
import angryImage from '../assets/img/big_angry.png'
import halfAngryImage from '../assets/img/big_halfAngry.png'
import { useEffect, useRef } from 'react'

const StyledImg = styled.img`
  height: 20rem;
  @media (max-width: 750px) {
    height: 10rem;
  }
`

export const AkinatorImage: React.FC<Props> = ({currentStep, progress, isWin, isGameGoing}) => {

  const progressPrev = useRef<number>(0)
  useEffect(() => {
    progressPrev.current = progress
  }, [progress])

  const progressDifference = progressPrev.current - progress
  const chooseImage = () => {
    if (!isGameGoing || currentStep === 1){
      return startImage
    } else {
      if (isWin) return winImage
      if (progressDifference > 15 && currentStep > 15) return angryImage
      if (progress <= 50 && currentStep > 20) return halfAngryImage
      if (progress <= 30) return thinkImage1
      if (progress <= 50) return thinkImage2
      if (progress > 80) return phoneImage
      if (progress > 50) return okImage
    }
  }

  return (
    <StyledImg src={chooseImage()} alt="" />
  )
}

type Props = {
  currentStep: number
  progress: number
  isWin: boolean
  isGameGoing: boolean
}
