import styled from 'styled-components'
import startImage from '../assets/img/big_start.png'

const StyledImg = styled.img`
  width: 20rem;
  /* position: absolute;
  left: -20rem; */
`

export const AkinatorImage = () => {
  return (
    <StyledImg src={startImage} alt="" />
  )
}
