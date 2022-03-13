import React from 'react';
import styles from '../QuotePage/QuotePage.module.scss';

const QuotePage = () => {
    return (
            <div className={styles.quotepage}>
                <div className={styles.quote}>
                    
                    <p className={styles.quoteParagraph}><span className={styles.quoteMark}>,,</span> I don't want to protect the environment. I want to create a world where the environment doesn't need protecting.<span className={styles.quoteMark}>”</span></p>
                    
                </div>
            </div>
    )
}

export default QuotePage;