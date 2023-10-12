import { useState } from 'react';
import style from './Form.module.css';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDitry] = useState(false);
  const [password, setpassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDirty, setPasswordDitry] = useState(false);
  const [checkErrorForm, setCheckErrorForm] = useState(false);
  const [save, setSave] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const validEmail = (value) => {
    setEmailError(/^.+@.+\..+$/.test(value));
  }

  const handleEmail = ({target}) => {
    setEmail(target.value);
    validEmail(target.value);
  };

  const validPassword = (value) => {
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value));
  }

  const handlePassword = ({target}) => {
    setpassword(target.value);
    validPassword(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailError || !passwordError) {
      setCheckErrorForm(true);
      return;
    }

    setIsPending(true);
    console.log({email, password, save});
  }

  const handleSave = ({target}) => {
    setSave(target.checked);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.wrap}>
        <label className={style.label} htmlFor='email'>Email</label>
        <input 
          className={style.input}
          type='text'
          id='email'
          name='email'
          value={email}
          onChange={handleEmail}
          onBlur={() => {
            setEmailDitry(true);
          }}
          disabled={isPending}
         />
        {!emailError && emailDirty && <p className={style.error}>Error</p>}
      </div>

      <div className={style.wrap}>
        <label className={style.label} htmlFor='password'>Password</label>
        <input 
          className={style.input}
          type='password'
          id='password'
          name='email'
          value={password}
          onChange={handlePassword}
          onBlur={() => {
            setPasswordDitry(true);
          }}
          disabled={isPending}
         />
        {!passwordError && passwordDirty && <p className={style.error}>Error</p>}
      </div>

      <div className={style.wrapCheckbox}>
        <input 
          className={style.checkbox}
          type='checkbox'
          id='save'
          name='save'
          onChange={handleSave}
          checked={save}
          disabled={isPending}
        />
        <label className={style.labelCheckbox} htmlFor='save'>Save Password</label>
      </div>

      {isPending ? (
        <p className={style.pending}>Отправка</p> 
      ) : (<button className={style.submit} type='submit'>Sign in</button>)}
      {checkErrorForm && (!passwordError || !emailError) && (
        <p className={style.errorSubmit}>Error</p>
      )}
    </form>
  )
}