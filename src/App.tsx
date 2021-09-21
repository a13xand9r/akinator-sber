import { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { GlobalStyles } from './components/GlobalStyle';
import { Button, Container } from '@sberdevices/plasma-ui';
import { AppHeader } from './components/AppHeader';
import { initializeAssistant, initAssistant } from './assistant';
import { createAssistant } from '@sberdevices/assistant-client';
import { initialState, reducer } from './reducer';
import { AkinatorImage } from './components/AkinatorImage';
import styled from 'styled-components';
import { CONTAINER_WIDTH } from './utils/constants';
import { Question } from './components/Question';

const AppContainer = styled.div`
  min-width: 40rem;
  max-width: ${CONTAINER_WIDTH}rem;
  display: flex;
  margin: 2rem auto;
  /* position: relative; */
  @media (max-width: 750px) {
    min-width: 0;
    width: 100%;
    max-width: 100%;
  }
`
const PlayButton = styled(Button)`
  display: block;
  margin: 3rem auto;
`

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const assistantRef = useRef<ReturnType<typeof createAssistant>>()
  useEffect(() => {
    assistantRef.current = initializeAssistant(() => {})
    initAssistant(dispatch, assistantRef.current as ReturnType<typeof createAssistant>)
  }, [])

  return (
    <div>
      <GlobalStyles character={state.character} />
      <Container>
        <AppHeader />
        <AppContainer>
          <AkinatorImage />
          <div>
            <Question text='Привет, я Акинатор' />
            {
              state.isGameGoing ?
                null :
                <PlayButton 
                view='accent'
                onClick={() => {}}
                >
                  Играть
                </PlayButton>
              }
          </div>
        </AppContainer>
      </Container>
    </div>
  )
}

export default App;