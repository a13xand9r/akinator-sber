import { useEffect, useReducer, useRef } from 'react';
import './styles/App.css';
import './styles/transition.css';
import { GlobalStyles } from './components/GlobalStyle';
import { Container } from '@sberdevices/plasma-ui';
import { AppHeader } from './components/AppHeader';
import { initAssistant } from './assistant';
import { createAssistant } from '@sberdevices/assistant-client';
import { actions, initialState, reducer } from './reducer';
import { AkinatorImage } from './components/AkinatorImage';
import styled from 'styled-components';
import { CONTAINER_WIDTH } from './utils/constants';
import { Question } from './components/Question';
import { AnswerButtons } from './components/AnswerButtons';
import { CSSTransition } from 'react-transition-group';
import { Loader } from './components/Loader';
import { WinWindow } from './components/WinWindow';
import { PlayButton } from './components/PlayButton';

const AppContainer = styled.div`
  min-width: 40rem;
  max-width: ${CONTAINER_WIDTH}rem;
  display: flex;
  margin: 2rem auto;
  @media (max-width: 750px) {
    margin-top: 1rem;
    min-width: 0;
    width: 100%;
    max-width: 100%;
  }
`
const ContentContainer = styled.div`
  width: 25rem;
  @media (max-width: 750px) {
    width: 100%;
  }
`

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [aki, setAki] = useState<Akinator | null>(null)
  // const [wrongPersonId, setWrongPersonId] = useState<null | string>(null)

  const assistantRef = useRef<ReturnType<typeof createAssistant>>()
  useEffect(() => {
    assistantRef.current = initAssistant(dispatch)
  }, [])

  const onStartGame = async () => {
    dispatch(actions.setFetching(true))
    // setAki(await runAkinator())
    // if (aki) {
    //   dispatch(actions.setNewQuestion(
    //     aki.question as string,
    //     aki.answers as string[],
    //     aki.currentStep,
    //     aki.progress
    //   ))
    //   dispatch(actions.startGame())
    // }
    assistantRef.current?.sendAction({ type: 'START_GAME', payload: {} })
  }
  const onAnswerClick = async (index: number) => {
    dispatch(actions.setFetching(true))
    // if (aki){
    //   nextStep(dispatch, aki, index as AnswerType, wrongPersonId)
    // }
    assistantRef.current?.sendAction({ type: 'USER_ANSWER', payload: { answer: index } })
  }
  const onBackClick = () => {
    dispatch(actions.setFetching(true))
    assistantRef.current?.sendAction({ type: 'GO_BACK', payload: {} })
  }
  const onWrong = () => {
    dispatch(actions.setFetching(true))
    assistantRef.current?.sendAction({ type: 'WRONG_GUESS', payload: {} })
  }
  const onFinishGame = (isWin: boolean) => {
    // dispatch(actions.setFetching(true))
    dispatch(actions.finishGame())
    dispatch(actions.setStep(0))
    dispatch(actions.setWin(null))
    dispatch(actions.setQuestion('One more time?'))
    assistantRef.current?.sendAction({ type: 'FINISH_GAME', payload: {isWin} })
  }

  return (
    <div>
      <GlobalStyles character={state.character} />
      <Container>
        <AppHeader />
        <AppContainer>
          <AkinatorImage
            currentStep={state.currentStep}
            progress={state.progress}
            isWin={!!state.win}
            isGameGoing={state.isGameGoing}
          />
          <ContentContainer>
            <Question
              isWin={!!state.win}
              text={state.question}
              step={state.currentStep}
            />
            {
              !state.win ? (
              state.isGameGoing ?
                <AnswerButtons
                  answers={state.answers}
                  currentStep={state.currentStep}
                  onAnswerClick={onAnswerClick}
                  onBackClick={onBackClick}
                /> :
                <PlayButton
                  view='accent'
                  onClick={onStartGame}
                >
                  Play
                </PlayButton>
              ) :
              <WinWindow
                dispatch={dispatch}
                picture={state.win.picture}
                onFinishGame={onFinishGame}
                onWrong={onWrong}
              />
            }
          </ContentContainer>
          <CSSTransition
            in={state.isFetching}
            timeout={200}
            classNames='loader'
            unmountOnExit
          >
            <Loader />
          </CSSTransition>
        </AppContainer>
      </Container>
    </div>
  )
}

export default App;