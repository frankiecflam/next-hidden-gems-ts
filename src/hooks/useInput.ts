import { ChangeEvent, useReducer } from "react";

const initialInputState = {
  inputValue: "",
  inputIsValid: false,
  inputIsTouched: false,
};

type StateType = typeof initialInputState;

interface Actions {
  change: { type: "Change"; value: string };
  blur: { type: "Blur"; inputValidate: (inputValue: string) => boolean };
  reset: { type: "Reset" };
}

type ObjectValues<T> = T[keyof T];

type ActionType = ObjectValues<Actions>;

const inputReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "Change":
      return {
        ...state,
        inputValue: action.value,
      };

    case "Blur":
      return {
        ...state,
        inputIsValid: action.inputValidate(state.inputValue),
      };

    case "Reset":
      return initialInputState;

    default:
      return initialInputState;
  }
};

interface UseInput {
  initialValue: string;
  inputValidate: (inputValue: string) => boolean;
}

const useInput = ({ initialValue, inputValidate }: UseInput) => {
  const [inputState, inputDispatch] = useReducer(inputReducer, {
    ...initialInputState,
    inputValue: initialValue,
    inputIsValid: inputValidate(initialValue),
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    inputDispatch({ type: "Change", value: e.target.value });
  };

  const handleInputBlur = () => {
    inputDispatch({ type: "Blur", inputValidate });
  };

  const handleInputReset = () => {
    inputDispatch({ type: "Reset" });
  };

  return {
    ...inputState,
    onChange: handleInputChange,
    onBlur: handleInputBlur,
    onReset: handleInputReset,
  };
};

export default useInput;
