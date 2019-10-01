import React from 'react'

import DateFilter from '../Filters/DateFilter'
import SelectFilter from '../Filters/SelectFilter'
import NumberFilter from '../Filters/NumberFilter'
import TextFilter from '../Filters/TextFilter'
import BooleanFilter from '../Filters/BooleanFilter'

import { Table } from 'semantic-ui-react'

const TableHeader = ({ headerData, sortDirection, activeSort, handleSort, isLoading }) => {
  const getFilter = (filterType, propKey, selectValues) => {
    switch (filterType) {
      case 'select':
        return <SelectFilter propKey={propKey} filterValues={selectValues} />
      case 'text':
        return <TextFilter propKey={propKey} />
      case 'number':
        return <NumberFilter propKey={propKey} />
      case 'date':
        return <DateFilter propKey={propKey} />
      case 'boolean':
        return <BooleanFilter propKey={propKey} />
      default:
        return null
    }
  }
  const renderHeaderCells = headerRow => {
    return headerRow.map((row, i) => {
      if (!row) return null
      const { content, filterType, propKey, selectValues } = row
      return (
        <Table.HeaderCell
          key={`col-${i}`}
          sorted={!propKey ? null : activeSort === propKey ? sortDirection : null}
          className={!propKey ? null : 'header-cell'}
          onClick={e => {
            if (e.target.className.includes('header-cell') && !isLoading) handleSort(propKey, filterType)
          }}
        >
          {content}

          {filterType && getFilter(filterType, propKey, selectValues)}
        </Table.HeaderCell>
      )
    })
  }

  return renderHeaderCells(headerData)
}

export default TableHeader
