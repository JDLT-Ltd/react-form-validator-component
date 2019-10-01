import React, { useContext, useLayoutEffect, useRef } from 'react'
import { Form, Divider, Input, Icon } from 'semantic-ui-react'
import { DataTableContext } from '../common/DataTableContext'
import FilterPopup from './common/FilterPopup'
import ClearButton from './common/ClearButton'

const NumberFilter = props => {
  const filterType = 'number'
  const { propKey } = props

  const isFirstUpdate = useRef(true)
  const { filters, setFilter, initFilter } = useContext(DataTableContext)

  useLayoutEffect(() => {
    if (isFirstUpdate.current) {
      initFilter(propKey, filterType)
      isFirstUpdate.current = false
    }
  }, [propKey, initFilter])

  const filterChange = (e, { name, value }) => {
    const { numberEq, numberGt, numberLt } = filters[propKey].value
    const newValue = {
      numberEq: numberEq,
      numberGt: numberGt,
      numberLt: numberLt
    }
    newValue[name] = value
    setFilter(propKey, newValue)
  }

  if (filters[propKey]) {
    const { active } = filters[propKey]
    const { numberEq, numberGt, numberLt } = filters[propKey].value
    return (
      <FilterPopup
        active={active}
        filterForm={
          <Form>
            <Input
              label=">="
              fluid
              icon={<Icon name="delete" link onClick={e => filterChange(e, { name: 'numberGt', value: '' })} />}
              type="number"
              onChange={filterChange}
              value={numberGt}
              max={numberLt}
              name="numberGt"
              disabled={numberEq !== ''}
            />
            <Divider hidden />
            <Input
              label="<="
              fluid
              icon={<Icon name="delete" link onClick={e => filterChange(e, { name: 'numberLt', value: '' })} />}
              type="number"
              onChange={filterChange}
              value={numberLt}
              min={numberGt}
              name="numberLt"
              disabled={numberEq !== ''}
            />
            <Divider horizontal>OR</Divider>
            <Input
              label="="
              fluid
              icon={<Icon name="delete" link onClick={e => filterChange(e, { name: 'numberEq', value: '' })} />}
              type="number"
              onChange={filterChange}
              value={numberEq}
              name="numberEq"
              disabled={numberGt !== '' || numberLt !== ''}
            />
            <Divider hidden />
            <ClearButton propKey={propKey} disabled={!active} />
          </Form>
        }
      />
    )
  }
  return null
}

export default NumberFilter
