import { useEffect, useState } from 'react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { HandPalm, Play } from '@phosphor-icons/react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/Countdown'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser no mínimo 60min')
    .max(60, 'O ciclo precisa ser no máximo 60min'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activatedCycleId, setActivatedCycleId] = useState<string | null>(null)
  const [ammountSecondPast, setAmmountSecondPast] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activatedCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - ammountSecondPast : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activatedCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setAmmountSecondPast(totalSeconds)
          clearInterval(interval)
        } else {
          setAmmountSecondPast(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activatedCycleId])

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

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const isSubmitDisabled = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />

        <CountDown />

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
