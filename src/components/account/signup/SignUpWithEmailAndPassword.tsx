import styles from "./SignUpWithEmailAndPassword.module.css";
import { useInput } from "../../../hooks";
import { FormEvent, useState } from "react";
import {
  checkIfEmailHasBeenRegistered,
  validateUsernameInput,
} from "../../../utils/helpers";
import { signUpWithEmailNPassword } from "../../../config/firebase";

const SignUpWithEmailAndPassword = () => {
  const [signUpFeedback, setSignUpFeedback] = useState("");
  const {
    inputValue: usernameInput,
    onChange: usernameInputOnChange,
    onReset: usernameInputOnReset,
  } = useInput({
    inputValidate: validateUsernameInput,
  });

  const {
    inputValue: emailInput,
    onChange: emailInputOnChange,
    onReset: emailInputOnReset,
  } = useInput({
    inputValidate: (inputValue: string) =>
      inputValue.trim().length > 3 && inputValue.includes("@"),
  });
  const {
    inputValue: passwordInput,
    onChange: passwordInputOnChange,
    onReset: passwordInputOnReset,
  } = useInput({
    inputValidate: (inputValue: string) => inputValue.trim().length > 0,
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailExisted = await checkIfEmailHasBeenRegistered(emailInput);
    if (emailExisted) {
      setSignUpFeedback("Email has already been taken.");
      return;
    }

    await signUpWithEmailNPassword(emailInput, passwordInput, usernameInput);
    setSignUpFeedback("");
    usernameInputOnReset();
    emailInputOnReset();
    passwordInputOnReset();
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.formBody}>
        <div className={styles.formControl}>
          <input
            type="username"
            id="username"
            className={styles.input}
            value={usernameInput}
            onChange={usernameInputOnChange}
            required
          />
          <label htmlFor="username" className={styles.label}>
            username
          </label>
        </div>
        <div className={styles.formControl}>
          <input
            className={styles.input}
            type="email"
            id="email"
            required
            value={emailInput}
            onChange={emailInputOnChange}
          />
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
        </div>
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
        <button className={styles.formBtn} type="submit">
          sign up
        </button>
      </div>

      {signUpFeedback && (
        <p className={styles.signUpFeedback}>{signUpFeedback}</p>
      )}
    </form>
  );
};

export default SignUpWithEmailAndPassword;
