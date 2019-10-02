import React, { useRef, useLayoutEffect, useContext, useState, useEffect } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { Form } from 'semantic-ui-react'
import { DataTableContext } from '../common/DataTableContext'
import FilterPopup from './common/FilterPopup'
import ClearButton from './common/ClearButton'
import moment from 'moment'

const DateFilter = props => {
  const filterType = 'date'
  const { propKey } = props
  const isFirstUpdate = useRef(true)
  const { filters, setFilter, initFilter } = useContext(DataTableContext)
  const [startDateObj, setStartDateObj] = useState(null)
  const [endDateObj, setEndDateObj] = useState(null)
  const ref = useRef(true)

  useEffect(
    () => {
      if (ref.current && filters[propKey] && filters[propKey].value) {
        setStartDateObj(filters[propKey].value.dateStart ? new Date(filters[propKey].value.dateStart) : null)
        setEndDateObj(filters[propKey].value.dateEnd ? new Date(filters[propKey].value.dateEnd) : null)
        ref.current = false
      }
    },
    [filters, propKey]
  )

  useLayoutEffect(
    () => {
      if (isFirstUpdate.current) {
        initFilter(propKey, filterType)
        isFirstUpdate.current = false
      }
    },
    [propKey, initFilter]
  )

  const today = new Date()

  const formatDateToUTC = date => {
    const momentDate = moment(date)
    const offset = momentDate.utcOffset()

    const utcMomentDate = momentDate.utc()

    const newDate = utcMomentDate.add(offset, 'minutes')
    return newDate
  }

  if (filters[propKey]) {
    const { active } = filters[propKey]
    const { dateStart, dateEnd } = filters[propKey].value
    return (
      <FilterPopup
        active={active}
        filterForm={
          <Form>
            <SemanticDatepicker
              onDateChange={date => {
                setStartDateObj(date)
                const newDate = formatDateToUTC(date)
                setFilter(propKey, { dateStart: date ? newDate : date, dateEnd: dateEnd })
              }}
              selected={dateStart ? startDateObj : null}
              maxDate={endDateObj || today}
              label="Start"
              format="DD-MM-YYYY"
              pointing="left"
              type="basic"
            />
            <SemanticDatepicker
              onDateChange={date => {
                setEndDateObj(date)
                const newDate = formatDateToUTC(date)
                setFilter(propKey, { dateStart: dateStart, dateEnd: date ? newDate : date })
              }}
              selected={dateEnd ? endDateObj : null}
              minDate={startDateObj}
              maxDate={today}
              label="End"
              format="DD-MM-YYYY"
              pointing="left"
              type="basic"
            />
            <ClearButton propKey={propKey} disabled={!active} />
          </Form>
        }
      />
    )
  }
  return null
}

export default DateFilter
