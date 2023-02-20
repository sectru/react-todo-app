import React from 'react'
import styles from "../styles/modules/title.module.scss";

function PageTitle({children}) {
  return (
    <p className={styles.title}>{children}</p>
  )
}

export default PageTitle