import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../redux/redux-hook';
import { fetchRegister } from '../../redux/slices/login';
import { FormValues } from '../../interface/interfaces';

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (value) => {
    const data = await dispatch(fetchRegister(value));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (useAuth()) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className='flex w-96 flex-col items-center mx-auto p-4 rounded-lg shadow-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className='w-max my-1.5 py-3.5 px-4 border rounded-md border-slate-200'
            type='text'
            placeholder='Электронная почта'
            {...register('email', {
              required: 'Это поле обязательно для заполнения',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Введите корректный email-адрес',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <input
            placeholder='Имя пользователя'
            className='w-max my-1.5 py-3.5 px-4 border rounded-md border-slate-200'
            type='text'
            {...register('fullName', {
              required: 'Это поле обязательно для заполнения',
              minLength: {
                value: 3,
                message:
                  'Имя пользователя должно содержать не менее 3 символов',
              },
            })}
          />
          {errors.fullName && <span>{errors.fullName.message}</span>}
        </div>

        <div>
          <input
            className='w-full my-1.5 py-3.5 px-4 border rounded-md border-slate-200'
            type='password'
            placeholder='Пароль'
            {...register('password', {
              required: 'Это поле обязательно для заполнения',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать не менее 6 символов',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type='submit'>Зарегистрироваться</button>
      </form>
      <div className='w-full border-b border-slate-200 my-5 '></div>
      <Link to={'/login'}>Войти в существующий аккаунт</Link>
    </section>
  );
};
