import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/redux-hook';
import { fetchLogin } from '../../redux/slices/login';
import { FormValues } from '../../interface/interfaces';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
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
    const data = await dispatch(fetchLogin(value));

    if (!data.payload) {
      alert('Не удалось авторизоваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (useAuth()) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className='flex w-96 flex-col items-center mt-5  mx-auto p-4 rounded-lg shadow-lg bg-white'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
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
        <button type='submit'>
          Вход
        </button>
      </form>
      <div className='w-full border-b border-slate-200 my-5 '></div>
      <Link to={'/register'}>Создать новый аккаунт</Link>
    </section>
  );
};
