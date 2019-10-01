import React, { useContext, useLayoutEffect, useRef } from 'react'
import { Form, Checkbox } from 'semantic-ui-react'
import { DataTableContext } from '../common/DataTableContext'
import FilterPopup from './common/FilterPopup'
import ClearButton from './common/ClearButton'

const BooleanFilter = props => {
  const filterType = 'boolean'
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
    const { indeterminate, checked } = filters[propKey].value
    const { active } = filters[propKey]
    return (
      <FilterPopup
        active={active}
        filterForm={
          <Form>
            <Form.Field>
              <Checkbox
                indeterminate={indeterminate}
                onChange={(e, data) => {
                  const { indeterminate, checked } = data
                  setFilter(propKey, {
                    indeterminate: indeterminate,
                    checked: checked
                  })
                }}
                checked={checked}
              />
            </Form.Field>
            <ClearButton propKey={propKey} disabled={!active} />
          </Form>
        }
      />
    )
  }
  return null
}

export default BooleanFilter
