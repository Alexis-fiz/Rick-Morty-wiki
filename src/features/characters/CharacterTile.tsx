import { Link } from "react-router-dom";

import styles from './Characters.module.css'

export default function CharacterTile({character}: any) {
    const statusColor = character.status === 'Alive' ? {backgroundColor: 'rgb(85, 204, 68)'}: {backgroundColor: 'rgb(214, 61, 46)'};
    return (
        <li key={character.id} className={styles.listItem} >
          <img className={styles.tileImage} src={character.image} alt={character.name} />
          <div className={styles.mainTile}>
            <Link className={styles.tileTitle} to={`/characters/${character.id}`}>{character.name}</Link>
            <div className={styles.status}>
                <span className={styles.statusIcon} style={statusColor}/>
                <span>{character.status} - {character.species}</span>
            </div>
            <p className={styles.subTitle}>Last known location:</p>
            <Link className={styles.tileLink} to={`/characters/${character.id}`}>{character.location.name}</Link>
            <p className={styles.subTitle}>First seen in:</p>
            <Link className={styles.tileLink} to={`/characters/${character.id}`}>{character.firstEpisode.name}</Link>

          </div>
        </li>
    )
}