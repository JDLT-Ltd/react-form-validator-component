import React, { useContext, useLayoutEffect, useRef } from 'react'
import { Form } from 'semantic-ui-react'
import { DataTableContext } from '../common/DataTableContext'
import FilterPopup from './common/FilterPopup'
import ClearButton from './common/ClearButton'

const TextFilter = props => {
  const filterType = 'text'
  const { propKey } = props
  const isFirstUpdate = useRef(true)
  const { filters, setFilter, initFilter } = useContext(DataTableContext)

  useLayoutEffect(() => {
    if (isFirstUpdate.current) {
      initFilter(propKey, filterType)
      isFirstUpdate.current = false
    }
  }, [propKey, initFilter])

  if (filters[propKey]) {
    const { active } = filters[propKey]

    return (
      <FilterPopup
        active={active}
        className="preventPropogation"
        filterForm={
          <Form>
            <Form.Input
              icon="search"
              value={filters[propKey].value}
              onChange={(e, data) => setFilter(propKey, data.value)}
            />
            <ClearButton propKey={propKey} disabled={!active} />
          </Form>
        }
      />
    )
  }
  return null
}

export default TextFilter
