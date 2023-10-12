import style from './Form.module.css';
import {useForm} from 'react-hook-form';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.wrap}>
        <label className={style.label} htmlFor='email'>Email</label>
        <input 
          {...register('email', {
            required: {
              value: true,
              message: 'This field is required',
            },
            pattern: {
              value: /^.+@.+\..+$/,
              message: 'Incorrect email',
            }
          })}
          className={style.input}
          type='text'
          id='email'
          aria-invalid={!!errors.email}
         />
        {errors.email && <p className={style.error}>{errors.email.message}</p>}
      </div>

      <div className={style.wrap}>
        <label className={style.label} htmlFor='password'>Password</label>
        <input 
          {...register('password', {
            required: {
              value: true,
              message: 'This field is required',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
              message: 'Incorrect password',
            },
            minLength: {
              value: 6,
              message: 'Password is too short'
            }
          })}
          className={style.input}
          type='password'
          id='password'
          aria-invalid={!!errors.password}
         />
       {errors.password && <p className={style.error}>{errors.password.message}</p>}
      </div>

      <div className={style.wrapCheckbox}>
        <input 
          className={style.checkbox}
          type='checkbox'
          id='save'
          {...register('save')}
        />
        <label className={style.labelCheckbox} htmlFor='save'>Save Password</label>
      </div>
      <button className={style.submit} type='submit'>Sign in</button>
    </form>
  )
}