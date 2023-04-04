import { createContext, useContext, useState } from 'react'

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
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser no mínimo 60min')
    .max(60, 'O ciclo precisa ser no máximo 60min'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export const Home = () => {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const isSubmitDisabled = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
