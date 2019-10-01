import React, { useContext, useRef, useLayoutEffect } from 'react'
import { Form, Checkbox, Divider } from 'semantic-ui-react'
import { DataTableContext } from '../common/DataTableContext'
import FilterPopup from './common/FilterPopup'
import ClearButton from './common/ClearButton'

const SelectFilter = props => {
  const filterType = 'select'
  const { propKey, filterValues } = props
  const isFirstUpdate = useRef(true)

  const { filters, setFilter, initFilter } = useContext(DataTableContext)

  useLayoutEffect(() => {
    if (isFirstUpdate.current) {
      initFilter(propKey, filterType)
      isFirstUpdate.current = false
    }
  }, [propKey, initFilter, filterValues])

  const areAllCheckBoxValuesTrue = newCheckBoxValues => {
    const checkBoxValues = Object.entries(newCheckBoxValues).filter(
      checkBoxValueArray => !checkBoxValueArray.includes('indeterminate') && !checkBoxValueArray.includes('checked')
    )
    return checkBoxValues.every(value => value[1])
  }

  const areAllCheckBoxValuesFalse = newCheckBoxValues => {
    const checkBoxValues = Object.entries(newCheckBoxValues).filter(
      checkBoxValueArray => !checkBoxValueArray.includes('indeterminate') && !checkBoxValueArray.includes('checked')
    )
    return checkBoxValues.length === filterValues.length && checkBoxValues.every(value => !value[1])
  }

  const createCheckboxes = () => {
    return filterValues.map((value, i) => (
      <Form.Field key={`selectCb-${i}`}>
        <Checkbox
          label={value}
          onChange={(e, data) => {
            const { checked } = data
            const newCheckBoxValues = {
              ...filters[propKey].value,
              [value]: checked
            }
            const allValuesAreTrue = areAllCheckBoxValuesTrue(newCheckBoxValues)
            const allValuesAreFalse = areAllCheckBoxValuesFalse(newCheckBoxValues)
            const newValueOfCheckedAndIndeterminate = allValuesAreTrue
              ? { checked: true, indeterminate: false }
              : allValuesAreFalse
              ? { checked: false, indeterminate: false }
              : { indeterminate: true }
            setFilter(propKey, {
              ...newCheckBoxValues,
              ...newValueOfCheckedAndIndeterminate
            })
          }}
          checked={filters[propKey].value[value] !== false}
        />
      </Form.Field>
    ))
  }

  const updateAllCheckboxes = checked =>
    filterValues.reduce((acc, currValue) => {
      return { ...acc, [currValue]: checked }
    }, {})

  if (filters[propKey]) {
    const { active } = filters[propKey]

    return (
      <FilterPopup
        active={active}
        filterForm={
          <Form>
            <Form.Field>
              <Checkbox
                defaultChecked
                indeterminate={filters[propKey].value.indeterminate}
                onChange={(e, data) => {
                  const { indeterminate, checked } = data
                  setFilter(propKey, {
                    ...filters[propKey].value,
                    indeterminate: indeterminate,
                    checked: checked,
                    ...updateAllCheckboxes(checked)
                  })
                }}
                checked={filters[propKey].value.checked}
              />
            </Form.Field>
            {createCheckboxes()}
            <Divider />
            <ClearButton propKey={propKey} content={'Reset'} disabled={!active} />
          </Form>
        }
      />
    )
  }
  return null
}

export default SelectFilter
