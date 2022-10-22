import styles from "./SignInWithEmailAndPassword.module.css";
import { useInput } from "../../../hooks";
import { FormEvent, useState } from "react";
import { signInWithEmailNPassword } from "../../../config/firebase";
import {
  checkIsUserCredentialType,
  checkIfEmailHasBeenRegistered,
} from "../../../utils/helpers";

const SignInWithEmailAndPassword = () => {
  const [formStage, setFormStage] = useState<1 | 2>(1);
  const [signInFeedback, setSignInFeedback] = useState("");

  const {
    inputValue: emailInput,
    onChange: emailInputOnChange,
    onReset: emailInputOnReset,
  } = useInput({
    initialValue: "",
    inputValidate: (inputValue: string) =>
      inputValue.trim().length > 3 && inputValue.includes("@"),
  });
  const {
    inputValue: passwordInput,
    onChange: passwordInputOnChange,
    onReset: passwordInputOnReset,
  } = useInput({
    initialValue: "",
    inputValidate: (inputValue: string) => inputValue.trim().length > 0,
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formStage === 1) {
      const emailExisted = await checkIfEmailHasBeenRegistered(emailInput);

      if (!emailExisted) {
        setSignInFeedback(
          "Sorry! We couldn't find any account with your email. Please sign up one with it instead."
        );
        return;
      }
      setSignInFeedback("");
      setFormStage(2);
      return;
    }

    const result = await signInWithEmailNPassword(emailInput, passwordInput);

    if (!checkIsUserCredentialType(result)) {
      setSignInFeedback("Your email or/and password are invalid!");
      return;
    }

    emailInputOnReset();
    passwordInputOnReset();
    setSignInFeedback("");
    setFormStage(1);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.formBody}>
        <div className={styles.formControl}>
          <input
            className={styles.input}
            type="email"
            id="email"
            required
            value={emailInput}
            onChange={emailInputOnChange}
            disabled={formStage !== 1}
          />
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
        </div>
        {formStage === 2 && (
          <div className={styles.formControl}>
            <input
              className={styles.input}
              type="password"
              id="password"
              required
              autoComplete="on"
              value={passwordInput}
              onChange={passwordInputOnChange}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
          </div>
        )}
        <button className={styles.formBtn} type="submit">
          {formStage === 1 ? "next" : "sign in"}
        </button>
      </div>
      {signInFeedback && (
        <p className={styles.signInFeedback}>{signInFeedback}</p>
      )}
    </form>
  );
};

export default SignInWithEmailAndPassword;
