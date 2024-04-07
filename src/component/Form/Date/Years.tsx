import {
  useContextYears,
  useContextYearsPropGetters,
} from '@rehookify/datepicker';
 
export const Years = () => {
  const { years } = useContextYears();
  const {
    yearButton,
    // these prop-getters will switch between years pages
    nextYearsButton,
    previousYearsButton,
  } = useContextYearsPropGetters();
 
  return (
    <section>
      <header>
        <button onClick={(event)=>{
          event.preventDefault()
          return {...previousYearsButton()}
        }}
          aria-label="Previous years"
        >
          &lt;
        </button>
        <p>
          {`${years[0].year} - ${years[years.length - 1].year}`}
        </p>
        <button onClick={(event)=>{
          event.preventDefault()
          return {...nextYearsButton()}
        }}
          aria-label="Next years"
        >
          &gt;
        </button>
      </header>
      <ul>
        {years.map((dpYear) => (
          <li key={dpYear.$date.toDateString()}>
            <button onClick={(event)=> {
              event.preventDefault()
              return {...yearButton(dpYear)}
            }}>
              {dpYear.year}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}