import styles from './loadingStyle.module.scss'

const Loading = () => {
  return (
    <div className={styles['loading']}>
      <div className={styles['loading-cube']}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles['loading__side']}></div>
        ))}
      </div>
    </div>
  )
}

export default Loading
