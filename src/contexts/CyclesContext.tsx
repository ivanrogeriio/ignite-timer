import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { cyclesReducer } from '../reducers/cycles/reducer';
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleFinishedAction,
} from '../reducers/cycles/actions';
import { differenceInSeconds } from 'date-fns';

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
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storageStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycle-state-1.0.0',
      );

      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON);
      }

      return initialState;
    },
  );

  const { cycles, activeCycleId } = cycleState;

  const activeCycle = cycles.find(
    (cycle: any) => cycle.id === activeCycleId,
  );

  const [amountSecondPast, setAmmountSecondPast] = useState(
    () => {
      if (activeCycle) {
        return differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        );
      }

      return 0;
    },
  );

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState);

    localStorage.setItem(
      '@ignite-timer:cycle-state-1.0.0',
      stateJSON,
    );
  }, [cycleState]);

  function sendSetAmmountSecondPastToHook(seconds: number) {
    setAmmountSecondPast(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleFinishedAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmmountSecondPast(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
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
