import { Outlet } from "react-router-dom";
import styles from './Header.module.css';
export default function Header() {
  return (
    <section>
      <header className={styles.headerContainer}>
        <h2 className={styles.headerTitle}>The Rick and Morty Wiki</h2>
      </header>            
      <Outlet />
    </section>
  )
}