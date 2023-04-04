import { createContext, useState } from 'react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { HandPalm, Play } from '@phosphor-icons/react'

import { FormProvider, useForm } from 'react-hook-form'

import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/Countdown'

import { zodResolver } from '@hookform/resolvers/zod'

import * as zod from 'zod'

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
  ammountSecondPast: number
  markCurrentCycleAsFinished: () => void
  sendSetAmmountSecondPastToHook: (seconds: number) => void
}

export const CyclesContext = createContext({} as CycleContextData)

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser no mínimo 60min')
    .max(60, 'O ciclo precisa ser no máximo 60min'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activatedCycleId, setActivatedCycleId] = useState<string | null>(null)

  const [ammountSecondPast, setAmmountSecondPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activatedCycleId)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function sendSetAmmountSecondPastToHook(seconds: number) {
    setAmmountSecondPast(seconds)
  }

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])

    setActivatedCycleId(id)

    setAmmountSecondPast(0)

    reset()
  }

  function handleInterruptCycle() {
    setActivatedCycleId(null)

    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activatedCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const isSubmitDisabled = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activatedCycleId,
            ammountSecondPast,
            markCurrentCycleAsFinished,
            sendSetAmmountSecondPastToHook,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={32} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!isSubmitDisabled} type="submit">
            <Play size={32} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
