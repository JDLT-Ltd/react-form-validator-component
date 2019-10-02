import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react'
import { sortData, filterSortAndSliceData } from '../util/filterFunctions'
import { DataTableContextProvider } from '../common/DataTableContext'
import { formatFilters } from '../common/formatFilters'
import MainTable from './Table'

const DataTable = ({
  shouldFilterAndSortOnTheClient = false,
  columns,
  data,
  dataLength,
  headerData,
  isLoading,
  offset = 0,
  initialPageSize = 10,
  emptyTableDescription = 'No records found',
  loadingTableDescription = 'Loading...',
  isError,
  sortable = true,
  fetchDataQuery,
  defaultFilterValues = {},
  setFilters,
  setSortValues,
  defaultSortValues = { direction: 'ascending', sortBy: '' }
}) => {
  const [pageData, setPageData] = useState([])
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [activeSort, setActiveSort] = useState(defaultSortValues ? defaultSortValues.sortBy : null)
  const [sortDirection, setSortDirection] = useState(defaultSortValues.direction)
  const [allData, setAllData] = useState([])
  const [headerDataActiveSortObject, setHeaderDataActiveSortObject] = useState({})
  const [totalDataLength, setTotalDataLength] = useState(0)
  const ref = useRef(true)

  const [isLoadingDataFromWithinTableComponent, setIsLoadingDataFromWithinTableComponent] = useState(false)

  useEffect(
    () => {
      const headerDataObject = Object.values(headerData).find(datum => datum && datum.propKey === activeSort)
      if (headerDataObject) {
        setHeaderDataActiveSortObject(headerDataObject.filterType)
      }
    },
    [activeSort, headerData]
  )

  useEffect(
    () => {
      if (!shouldFilterAndSortOnTheClient && data && !ref.current) {
        setTotalDataLength(dataLength)
        setPageData(data)
      }
    },
    [dataLength, shouldFilterAndSortOnTheClient, data]
  )

  const filterAndSortData = useCallback(
    data => {
      const activeSortObject = Object.values(headerData).find(datum => datum.propKey === activeSort)

      const filteredSortedAndSlicedData = filterSortAndSliceData(
        offset,
        pageSize,
        data,
        formatFilters(defaultFilterValues),
        {
          sortBy: activeSort,
          direction: sortDirection,
          dataType: (activeSortObject || {}).filterType
        }
      )
      const { data: filteredData, totalDataLengthWithGivenFilters } = filteredSortedAndSlicedData
      setPageData(filteredData)
      setTotalDataLength(totalDataLengthWithGivenFilters)
      const sortedAllData = sortData(data, activeSort, sortDirection, (activeSortObject || {}).filterType)
      return setAllData(sortedAllData)
    },
    [activeSort, sortDirection, headerData, defaultFilterValues, offset, pageSize]
  )

  useLayoutEffect(
    () => {
      if (data && data.length > 0 && ref.current) {
        ref.current = false
        if (shouldFilterAndSortOnTheClient) {
          const activeSortObject = Object.values(headerData).find(datum => datum.propKey === activeSort)
          if (defaultFilterValues) {
            filterAndSortData(data)
          } else {
            const sortedAllData = sortData(data, activeSort, sortDirection, (activeSortObject || {}).filterType)
            setPageData(sortedAllData.slice(offset, pageSize + offset))
            setTotalDataLength(sortedAllData.length)
            return setAllData(sortedAllData)
          }
        } else {
          setPageData(data)
          setTotalDataLength(dataLength)
        }
      }
    },
    [
      data,
      dataLength,
      filterAndSortData,
      defaultFilterValues,
      shouldFilterAndSortOnTheClient,
      offset,
      pageSize,
      columns,
      sortDirection,
      headerData,
      activeSort,
      setPageData,
      setAllData
    ]
  )

  useEffect(
    () => {
      if (!data && ref.current) {
        ref.current = false
        setIsLoadingDataFromWithinTableComponent(true)
        const getDataAndDataCount = async () => {
          const { data: fetchedData, dataCount } = await fetchDataQuery(
            offset,
            shouldFilterAndSortOnTheClient ? null : pageSize,
            defaultFilterValues,
            {
              sortBy: activeSort,
              direction: sortDirection
            }
          )
          if (shouldFilterAndSortOnTheClient) filterAndSortData(fetchedData)
          else {
            setPageData(fetchedData)
            setTotalDataLength(dataCount)
          }
          setIsLoadingDataFromWithinTableComponent(false)
        }
        getDataAndDataCount()
      }
    },
    [
      data,
      shouldFilterAndSortOnTheClient,
      activeSort,
      fetchDataQuery,
      defaultFilterValues,
      offset,
      pageSize,
      sortDirection,
      dataLength,
      filterAndSortData
    ]
  )

  return (
    <DataTableContextProvider>
      <MainTable
        defaultFilterValues={defaultFilterValues}
        setSort={setSortValues}
        setFilters={setFilters}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        setPageData={setPageData}
        totalDataLength={totalDataLength}
        setTotalDataLength={setTotalDataLength}
        isLoading={isLoading || isLoadingDataFromWithinTableComponent}
        columns={columns}
        setActiveSort={setActiveSort}
        activeSort={activeSort}
        allData={allData}
        setAllData={setAllData}
        headerData={headerData}
        loadingTableDescription={loadingTableDescription}
        pageSize={pageSize}
        emptyTableDescription={emptyTableDescription}
        pageData={pageData}
        isError={isError}
        shouldFilterAndSortOnTheClient={shouldFilterAndSortOnTheClient}
        sortable={sortable}
        headerDataActiveSortObject={headerDataActiveSortObject}
        fetchDataQuery={fetchDataQuery}
        setPageSize={setPageSize}
      />
    </DataTableContextProvider>
  )
}

export default DataTable
