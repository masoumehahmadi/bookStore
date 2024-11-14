
import Header from '../Header/Header'
import styles from './LayOut.module.scss'
import { Outlet } from 'react-router-dom'
import AuthContextProvider from '../Context/Context'
 

export default function LayOut() {
  

  return (
    <>
    <AuthContextProvider>
    <nav className={styles.layout}>
      <Header />
    </nav>
    <Outlet />
    </AuthContextProvider>
    </>
    
  )
}
