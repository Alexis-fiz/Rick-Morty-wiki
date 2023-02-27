import { Outlet, Link } from "react-router-dom";
import styles from './Header.module.css';
export default function Header() {
  return (
    <section>
      <header className={styles.headerContainer}>
        <Link className={styles.headerTitle} to='/characters' >The Rick and Morty Wiki</Link>
      </header>            
      <Outlet />
    </section>
  )
}