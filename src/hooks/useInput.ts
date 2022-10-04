import { ChangeEvent, useReducer } from "react";

const initialInputState = {
  inputValue: "",
  inputIsValid: false,
  inputIsTouched: false,
};

type StateType = typeof initialInputState;

enum ACTIONS {
  "change" = "CHANGE",
  "blur" = "BLUR",
  "reset" = "RESET",
}

type ActionType = {
  type: ACTIONS;
  value?: string;
  inputValidate?: (inputValue: string) => boolean;
};

const inputReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTIONS.change:
      return {
        ...state,
        inputValue: action.value!,
      };

    case ACTIONS.blur:
      return {
        ...state,
        inputIsValid: action.inputValidate!(state.inputValue),
      };

    case ACTIONS.reset:
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
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    inputDispatch({ type: ACTIONS.change, value: e.target.value });
  };

  const handleInputBlur = () => {
    inputDispatch({ type: ACTIONS.blur, inputValidate });
  };

  const handleInputReset = () => {
    inputDispatch({ type: ACTIONS.reset });
  };

  return {
    ...inputState,
    onChange: handleInputChange,
    onBlur: handleInputBlur,
    onReset: handleInputReset,
  };
};

export default useInput;
