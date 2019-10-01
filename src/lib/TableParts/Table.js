import React, { useState, useContext, useEffect, useCallback, Fragment } from 'react'
import { Table, Container } from 'semantic-ui-react'
import TableHeader from './Header'
import TableFooter from './Footer'
import TableBody from './TableBody'
import { DataTableContext } from '../common/DataTableContext'
import { filterSortAndSliceData } from '../util/filterFunctions'
import { formatFilters } from '../common/formatFilters'
import moment from 'moment'

const MainTable = ({
  setActiveSort,
  activeSort,
  allData,
  setPageData,
  isLoading,
  defaultSortIndex,
  headerData,
  columns,
  sortDirection,
  setSortDirection,
  loadingTableDescription,
  emptyTableDescription,
  pageData,
  pageSize,
  setTotalDataLength,
  totalDataLength,
  isError,
  sortable,
  setPageSize,
  shouldFilterAndSortOnTheClient,
  fetchDataQuery,
  headerDataActiveSortObject,
  setFilters,
  setSort
}) => {
  const { filters, filtersAreActive, setFiltersAreActive } = useContext(DataTableContext)
  const [activePage, setActivePage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [activeFilters, setActiveFilters] = useState({})
  const [tableShouldScroll, setTableShouldScroll] = useState(false)

  const handleSortOnClient = (columnName, filterType) => {
    setActiveSort(columnName)
    setActivePage(1)
    setOffset(0)

    if (sortDirection === 'ascending') {
      const sortedData =
        filterType === 'date'
          ? allData.slice().sort((a, b) => (moment(new Date(a[columnName])) < moment(new Date(b[columnName])) ? 1 : -1))
          : allData.slice().sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1))

      setPageData(sortedData.slice(0, pageSize + 0))
      setSortDirection('descending')
      if (setSort) setSort({ sortBy: columnName, direction: 'descending' })
    } else {
      const sortedData =
        filterType === 'date'
          ? allData.slice().sort((a, b) => (moment(new Date(a[columnName])) > moment(new Date(b[columnName])) ? 1 : -1))
          : allData.slice().sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1))

      setPageData(sortedData.slice(0, pageSize + 0))
      setSortDirection('ascending')
      if (setSort) setSort({ sortBy: columnName, direction: 'ascending' })
    }
  }

  const handleSortOnServer = columnName => {
    setFiltersAreActive(false)
    setActiveSort(columnName)
    if (sortDirection === 'ascending') {
      setSortDirection('descending')
      const fetchedData = fetchDataQuery(0, pageSize, activeFilters, {
        direction: 'descending',
        sortBy: columnName
      })
      if (fetchedData) {
        setPageData(fetchedData.data)
        setTotalDataLength(fetchedData.dataCount)
      }
      if (setSort) setSort({ sortBy: columnName, direction: 'descending' })
    } else {
      setSortDirection('ascending')
      const fetchedData = fetchDataQuery(0, pageSize, activeFilters, {
        direction: 'ascending',
        sortBy: columnName
      })
      if (fetchedData) {
        setPageData(fetchedData.data)
        setTotalDataLength(fetchedData.dataCount)
      }
      if (setSort) setSort({ sortBy: columnName, direction: 'ascending' })
    }
    setActivePage(1)
    setOffset(0)
  }

  const fetchFilteredDataAndDataCount = useCallback(
    async formattedFiltersObject => {
      if (shouldFilterAndSortOnTheClient) {
        const filteredSortedAndSlicedData = filterSortAndSliceData(offset, pageSize, allData, formattedFiltersObject, {
          sortBy: activeSort,
          direction: sortDirection,
          dataType: headerDataActiveSortObject
        })
        const { data, totalDataLengthWithGivenFilters } = filteredSortedAndSlicedData
        setPageData(data)
        return setTotalDataLength(totalDataLengthWithGivenFilters)
      } else {
        const fetchedData = await fetchDataQuery(offset, pageSize, formattedFiltersObject, {
          sortBy: activeSort,
          direction: sortDirection
        })
        if (fetchedData) {
          setPageData(fetchedData.data)
          setTotalDataLength(fetchedData.dataCount)
        }
      }
    },
    [
      shouldFilterAndSortOnTheClient,
      setTotalDataLength,
      setPageData,
      fetchDataQuery,
      offset,
      pageSize,
      allData,
      activeSort,
      sortDirection,
      headerDataActiveSortObject
    ]
  )
  useEffect(() => {
    const formattedFiltersObject = formatFilters(filters)
    setActiveFilters(formattedFiltersObject)

    setOffset(0)
    setActivePage(1)
  }, [filters, setActivePage])

  useEffect(() => {
    if (filtersAreActive) {
      const formattedFiltersObject = formatFilters(filters)
      fetchFilteredDataAndDataCount(formattedFiltersObject)
    }
  }, [fetchFilteredDataAndDataCount, filters, filtersAreActive])

  const getAndSetTableWidth = () => {
    const table = document.querySelector('.data-table-container')
    const tableOffsetLeft = table && table.offsetLeft
    const tableWidth = table && table.scrollWidth

    return tableWidth + tableOffsetLeft
  }

  const getAndSetScreenWidth = () => window.innerWidth

  useEffect(() => {
    const handleResize = () => {
      const tableWidth = getAndSetTableWidth()
      const screenWidth = getAndSetScreenWidth()
      setTableShouldScroll(tableWidth >= screenWidth)
    }
    window.addEventListener('resize', handleResize)
    if (!isLoading) {
      handleResize()
    }
  }, [isLoading])

  return (
    <Fragment>
      <Container
        fluid
        className="data-table-container"
        style={tableShouldScroll ? { overflowX: 'scroll', overflowY: 'hidden' } : {}}
        textAlign="center"
      >
        <Table selectable striped celled sortable={sortable}>
          <Table.Header>
            <Table.Row>
              <TableHeader
                headerData={headerData}
                sortDirection={sortDirection}
                defaultSortIndex={defaultSortIndex}
                activeSort={activeSort}
                handleSort={shouldFilterAndSortOnTheClient ? handleSortOnClient : handleSortOnServer}
                isLoading={isLoading}
              />
            </Table.Row>
          </Table.Header>
          <TableBody
            pageData={pageData}
            columns={columns}
            isLoading={isLoading}
            isError={isError}
            loadingTableDescription={loadingTableDescription}
            emptyTableDescription={emptyTableDescription}
          />

          <TableFooter
            isLoading={isLoading}
            sortDirection={sortDirection}
            activeSort={activeSort}
            headerData={headerData}
            activeFilters={activeFilters}
            activePage={activePage}
            setActivePage={setActivePage}
            offset={offset}
            setOffset={setOffset}
            totalDataLength={totalDataLength}
            columnLength={columns.length}
            pageSize={pageSize}
            pageData={pageData}
            setPageData={setPageData}
            allData={allData}
            setTotalDataLength={setTotalDataLength}
            setPageSize={setPageSize}
            shouldFilterAndSortOnTheClient={shouldFilterAndSortOnTheClient}
            fetchDataQuery={fetchDataQuery}
          />
        </Table>
      </Container>
    </Fragment>
  )
}

export default MainTable
