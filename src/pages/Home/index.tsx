import { createContext, useEffect, useState } from 'react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { HandPalm, Play } from '@phosphor-icons/react'

import { useForm } from 'react-hook-form'

import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/Countdown'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextData {
  activeCycle: Cycle | undefined
  activatedCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CycleContextData)

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activatedCycleId, setActivatedCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activatedCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activatedCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])

  //   setActivatedCycleId(id)

  //   setAmmountSecondPast(0)

  //   reset()
  // }

  // function handleInterruptCycle() {
  //   setActivatedCycleId(null)

  //   setCycles((state) =>
  //     state.map((cycle) => {
  //       if (cycle.id === activatedCycleId) {
  //         return { ...cycle, interruptedDate: new Date() }
  //       } else {
  //         return cycle
  //       }
  //     }),
  //   )
  // }

  // const isSubmitDisabled = watch('task')

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */ action="">
        <CyclesContext.Provider
          value={{ activeCycle, activatedCycleId, markCurrentCycleAsFinished }}
        >
          <NewCycleForm />

          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={32} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            /* disabled={!isSubmitDisabled} */ type="submit"
          >
            <Play size={32} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
