import {
  useContextMonths,
  useContextMonthsPropGetters,
} from '@rehookify/datepicker';
 
export const Months = ({onSelectMonth}:any) => {
  const { months } = useContextMonths();
  const { monthButton } = useContextMonthsPropGetters();
 
  // this is not required but will give more context
  const year = months[0].$date.getFullYear();
 
  return (
    <section>
      <header>{year}</header>
      <ul>
        {months.map((dpMonth) => (
          <li key={dpMonth.$date.toDateString()}>
            <button onClick={(event)=> {
              event.preventDefault()
              console.log('month button ', dpMonth)
              onSelectMonth(dpMonth)
              return {...monthButton(dpMonth)}
            }}>
              {dpMonth.month}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}