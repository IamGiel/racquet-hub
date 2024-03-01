import React, { useEffect, useState } from 'react'
import styles from './Greet.module.css'

interface IGreet {
  name?:string
}
export const Greet = ({name}:IGreet) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/supplier-marketsearch-result', {
      method: 'GET',
      // body: new FormData(),
    })
    .then((res)=>console.log('res ', res))
    .catch((err)=>console.log('err ', err))
    .finally(()=>console.log('finally '))
  }, [data])
  
  return (
    <div className={styles.greetContainer + ' greetContainer'}>Greetings! {name}</div>
  )
}
