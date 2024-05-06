import React from 'react'
import styles from './Membership.module.css'

export const Membership = () => {
  return (
    <div className={styles.membershipContainer + ' membership-container'}>
      {/* <div className={styles.sectionName + " section-name"}><h4>Membership info</h4></div> */}
      <div className={styles.columnedSection + " columned-mebership-section"}>
        <div className={styles.membership + " membership"}>
          <span>Matches Spring 2024</span>
        </div>
        <div className={styles.paymentinfo + " paymentinfo"}>
          <span>Plan Details</span>
        </div>
      </div>
    </div>
  )
}
