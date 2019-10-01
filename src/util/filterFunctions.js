const moment = require('moment')

export const filterSortAndSliceData = (offset, limit, data, filters, sort) => {
  if (!offset && !limit) return { data: data, totalDataLengthWithGivenFilters: data.length }
  const { sortBy, direction, dataType } = sort
  if (Object.keys(filters).length === 0) {
    const sortedData = sortData(data, sortBy, direction, dataType)
    return {
      data: sortedData.slice(offset, limit + offset),
      totalDataLengthWithGivenFilters: data.length
    }
  }

  const activeFilters = Object.values(filters).reduce((acc, currentFilterArray) => {
    return [...acc, ...currentFilterArray.filter(currentFilter => currentFilter.value.active)]
  }, [])

  if (activeFilters.length === 0)
    return {
      data: sortData(data, sortBy, direction, dataType).slice(offset, limit + offset),
      totalDataLengthWithGivenFilters: data.length
    }

  const filteredData = applyActiveFilters(data, activeFilters)
  const sortedAndFilteredData = sortData(filteredData, sortBy, direction, dataType)
  return filteredData.length > offset
    ? {
        data: sortedAndFilteredData.slice(offset, limit + offset),
        totalDataLengthWithGivenFilters: filteredData.length
      }
    : { data: sortedAndFilteredData.slice(0, limit), totalDataLengthWithGivenFilters: filteredData.length }
}

export const sortData = (data, sortBy, direction, dataType) => {
  if (dataType === 'date') {
    return !direction
      ? data
      : direction === 'ascending'
      ? data.sort((a, b) => (moment(new Date(a[sortBy])) > moment(new Date(b[sortBy])) ? 1 : -1))
      : data.sort((a, b) => (moment(new Date(a[sortBy])) < moment(new Date(b[sortBy])) ? 1 : -1))
  }
  return !direction
    ? data
    : direction === 'ascending'
    ? data.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
    : data.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1))
}

const applyTextFilter = (datum, filter) =>
  datum[filter.key].toLocaleLowerCase().includes(filter.value.value.toLocaleLowerCase())

const applyNumberFilter = (datum, filter) => {
  const passesGreaterThanRequirement =
    !filter.value.value.numberGt || parseFloat(datum[filter.key]) >= parseFloat(filter.value.value.numberGt)
  const passesLessThanRequirement =
    !filter.value.value.numberLt || parseFloat(datum[filter.key]) <= parseFloat(filter.value.value.numberLt)
  const passesEqualToRequirement =
    !filter.value.value.numberEq || parseFloat(datum[filter.key]) === parseFloat(filter.value.value.numberEq)

  return passesGreaterThanRequirement && passesLessThanRequirement && passesEqualToRequirement
}

const selectFilterFunction = (datum, filter) => {
  const shouldBeExcluded = filter.value.value.reduce((acc, { key, value }) => {
    return !value ? [...acc, key] : [...acc]
  }, [])
  return shouldBeExcluded.length === 0 ? true : !shouldBeExcluded.includes(datum[filter.key])
}

const booleanFilterFunction = (datum, filter) => {
  return datum[filter.key] === filter.value.value.checked
}

const dateFilterFunction = (datum, filter) => {
  const dateToCompare = moment(new Date(datum[filter.key]))
  const startDate = filter.value.value.dateStart
  const endDate = filter.value.value.dateEnd

  return startDate && endDate
    ? dateToCompare.isBetween(moment(new Date(startDate)), moment(new Date(endDate))) ||
        dateToCompare.isSame(moment(new Date(startDate)), 'date')
    : startDate
    ? dateToCompare.isSameOrAfter(moment(new Date(startDate)))
    : endDate
    ? dateToCompare.isSameOrBefore(moment(new Date(endDate)))
    : true
}

const filterTypeMap = {
  text: applyTextFilter,
  number: applyNumberFilter,
  select: selectFilterFunction,
  boolean: booleanFilterFunction,
  date: dateFilterFunction
}

const applyActiveFilters = (data, filters) => {
  return data.filter(datum => filters.every(filter => filterTypeMap[filter.value.type](datum, filter)))
}
