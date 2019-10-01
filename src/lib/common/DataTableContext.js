import React, { useReducer, useState } from 'react'
import staticFilterMap from './staticFilterMap'

export const DataTableContext = React.createContext()

export const DataTableContextProvider = props => {
  const { children } = props
  const [filtersAreActive, setFiltersAreActive] = useState(false)

  const reducer = (state, action) => {
    const { type: actionType, payload } = action
    switch (actionType) {
      case 'clear':
      case 'init':
        const { propKey } = payload
        let { type: filterType } = payload
        filterType = filterType || state[propKey].type

        const newState = {
          ...state,
          [propKey]: {
            ...staticFilterMap[filterType].emptyValue,
            type: filterType
          }
        }

        return newState
      case 'set': {
        const { propKey, filter } = payload
        const { type: filterType } = state[propKey]
        const newState = {
          ...state,
          [propKey]: {
            value: filter,
            active: !staticFilterMap[filterType].isEmpty(filter),
            type: filterType
          }
        }

        setFiltersAreActive(true)
        return newState
      }
      default:
        break
    }
  }
  const [filters, dispatch] = useReducer(reducer, {})

  const value = {
    filters,
    setFilter: (propKey, filter) => dispatch({ type: 'set', payload: { propKey, filter } }),
    clearFilter: propKey => dispatch({ type: 'clear', payload: { propKey } }),
    initFilter: (propKey, type) => dispatch({ type: 'init', payload: { propKey, type } }),
    filtersAreActive,
    setFiltersAreActive
  }

  return <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>
}
