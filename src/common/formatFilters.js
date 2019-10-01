export const formatFilters = filtersObject => {
  return Object.entries(filtersObject).reduce((acc, currentFilter) => {
    const colName = currentFilter[0]
    const colFilters = currentFilter[1]
    const colFilterType = currentFilter[1].type
    const colFilterValue = currentFilter[1].value
    const colFilterIsActive = currentFilter[1].active
    if (!colFilterIsActive) return acc

    if (colFilterType === 'select') {
      const innerKeyAndValue = Object.entries(colFilterValue).map(([key, value]) => ({ key, value }))
      const innerKeyAndValueExcludingIndeterminate = innerKeyAndValue.filter(
        filterValue => filterValue.key !== 'checked' && filterValue.key !== 'indeterminate'
      )
      return Object.keys(acc).includes(colFilterType)
        ? {
            ...acc,
            [colFilterType]: [
              ...acc[colFilterType],
              {
                key: colName,
                value: {
                  ...colFilters,
                  value: [...innerKeyAndValueExcludingIndeterminate]
                }
              }
            ]
          }
        : {
            ...acc,
            [colFilterType]: [
              {
                key: colName,
                value: {
                  ...colFilters,
                  value: [...innerKeyAndValueExcludingIndeterminate]
                }
              }
            ]
          }
    } else {
      if (colFilterType === 'boolean') delete colFilterValue.indeterminate
      return Object.keys(acc).includes(colFilterType)
        ? {
            [colFilterType]: [...acc[colFilterType], { key: colName, value: colFilters }]
          }
        : { ...acc, [colFilterType]: [{ key: colName, value: colFilters }] }
    }
  }, {})
}
