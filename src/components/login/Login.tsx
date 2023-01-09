import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../firebase'

function Login() {
  const navigate = useNavigate()
  const auth = getAuth(app)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/admin')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      })
  }

  return (
    <div className='log-reg'>
      <div className='log-reg__container'>
        <form onSubmit={handleSubmit} className='log-reg__form'>
          <div className='log-reg__label-container'>
            <div className='log-reg__label'>
              <p className='log-reg__text'>E-mail</p>
              <input onChange={handleEmail} name='email' className='log-reg__input' type='email' required></input>
            </div>
            <div className='log-reg__label'>
              <p className='log-reg__text'>Пароль</p>
              <input
                onChange={handlePassword}
                name='password'
                className='log-reg__input'
                type='password'
                required
              ></input>
            </div>
          </div>
          <div className='log-reg__submit-container'>
            <button className='log-reg__submit'>Войти</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
