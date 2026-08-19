import React from 'react';
import styles from './styles.module.css';

export default function HindiBox({children}) {
  return (
    <div className={styles.hindiBox}>
      <div className={styles.label}>Hindi mein samjhein</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
