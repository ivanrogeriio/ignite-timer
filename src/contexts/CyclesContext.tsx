import {
  ReactNode,
  createContext,
  useReducer,
  useState,
} from 'react';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondPast: number;
  markCurrentCycleAsFinished: () => void;
  sendSetAmmountSecondPastToHook: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CycleState {
  cycles: Array<Cycle>;
  activeCycleId: string | null;
}

export const CyclesContext = createContext(
  {} as CycleContextData,
);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycleState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [
              ...state.cycles,
              action.payload.newCycle,
            ],
            activeCycleId: action.payload.newCycle.id,
          };

        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  interruptedDate: new Date(),
                };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };
      }
      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  );

  const { cycles, activeCycleId } = cycleState;

  const [amountSecondPast, setAmmountSecondPast] =
    useState(0);

  const activeCycle = cycles.find(
    (cycle: any) => cycle.id === activeCycleId,
  );

  function sendSetAmmountSecondPastToHook(seconds: number) {
    setAmmountSecondPast(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    });
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    });

    setAmmountSecondPast(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondPast,
        markCurrentCycleAsFinished,
        sendSetAmmountSecondPastToHook,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
