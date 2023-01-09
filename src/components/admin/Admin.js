import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'

const Admin = () => {
  const navigate = useNavigate()
  const auth = getAuth()

  const onExit = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('loggedIn')
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='admin'>
      <button onClick={onExit}>Выйти</button>
    </div>
  )
}

export default Admin
