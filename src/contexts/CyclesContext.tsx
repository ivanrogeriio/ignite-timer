import { ReactNode, createContext, useReducer, useState } from 'react'

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
  amountSecondPast: number
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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])

  const [activatedCycleId, setActivatedCycleId] = useState<string | null>(null)
  const [amountSecondPast, setAmmountSecondPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activatedCycleId)

  function sendSetAmmountSecondPastToHook(seconds: number) {
    setAmmountSecondPast(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activatedCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activatedCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    // setCycles((state) => [...state, newCycle])

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    setActivatedCycleId(id)

    setAmmountSecondPast(0)

    // reset()
  }

  function interruptCurrentCycle() {
    setActivatedCycleId(null)

    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activatedCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activatedCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activatedCycleId,
        amountSecondPast,
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
