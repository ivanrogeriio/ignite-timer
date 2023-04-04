import { ReactNode, createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activatedCycleId: string | null
  ammountSecondPast: number
  markCurrentCycleAsFinished: () => void
  sendSetAmmountSecondPastToHook: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextData)

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activatedCycleId, setActivatedCycleId] = useState<string | null>(null)
  const [ammountSecondPast, setAmmountSecondPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activatedCycleId)

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

  function createNewCycle(data: CreateCycleData) {
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

    // reset()
  }

  function interruptCurrentCycle() {
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

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activatedCycleId,
        ammountSecondPast,
        markCurrentCycleAsFinished,
        sendSetAmmountSecondPastToHook,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
