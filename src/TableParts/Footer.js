import React from 'react'
import { Table, List, Grid, Dropdown } from 'semantic-ui-react'
import { filterSortAndSliceData } from '../util/filterFunctions'
import PaginationFooter from './Pagination'

const TableFooter = ({
  allData,
  setTotalDataLength,
  activeSort,
  columnLength,
  activeFilters,
  setPageData,
  pageSize,
  totalDataLength,
  activePage,
  setActivePage,
  offset,
  setOffset,
  sortDirection,
  isLoading,
  setPageSize,
  pageData,
  headerData,
  shouldFilterAndSortOnTheClient,
  fetchDataQuery
}) => {
  const activeSortObject = Object.values(headerData).find(datum => datum && datum.propKey === activeSort)
  const numPages = Math.ceil(totalDataLength / pageSize)

  const scrollToTop = () => {
    const topDiv = document.querySelector('.nav_breadcrumb')

    if (topDiv) topDiv.scrollIntoView(true)
  }

  const handlePageChangeOnServerOnMobile = async direction => {
    const indexOfFirstResultOnPrevPage = (activePage - 1) * pageSize - pageSize
    const indexOfFirstResultOnNextPage = activePage * pageSize
    const indexOfFirstResultOnLastPage = numPages * pageSize - pageSize

    scrollToTop()
    switch (direction) {
      case 'right': {
        setActivePage(activePage + 1)
        activePage + 1 !== numPages ? setOffset((activePage + 1) * pageSize) : setOffset(indexOfFirstResultOnNextPage)
        const fetchedData = await fetchDataQuery(indexOfFirstResultOnNextPage, pageSize, activeFilters, {
          sortBy: activeSort,
          direction: sortDirection
        })
        return fetchedData ? setPageData(fetchedData.data) : null
      }

      case 'left': {
        setActivePage(activePage - 1)
        setOffset(indexOfFirstResultOnPrevPage)
        const fetchedData = await fetchDataQuery(indexOfFirstResultOnPrevPage, pageSize, activeFilters, {
          sortBy: activeSort,
          direction: sortDirection
        })
        return fetchedData ? setPageData(fetchedData.data) : null
      }
      case 'first': {
        setActivePage(1)
        setOffset(0)
        const fetchedData = await fetchDataQuery(0, pageSize, activeFilters, {
          sortBy: activeSort,
          direction: sortDirection
        })
        return fetchedData ? setPageData(fetchedData.data) : null
      }
      case 'last': {
        setActivePage(numPages)
        setOffset(indexOfFirstResultOnLastPage)
        const fetchedData = await fetchDataQuery(indexOfFirstResultOnLastPage, pageSize, activeFilters, {
          sortBy: activeSort,
          direction: sortDirection
        })
        return fetchedData ? setPageData(fetchedData.data) : null
      }
      default:
        return null
    }
  }

  const handlePageChangeOnClientOnMobile = direction => {
    const indexOfFirstResultOnNextPage = activePage * pageSize
    const indexOfFirstResultOnPrevPage = (activePage - 1) * pageSize - pageSize
    const indexOfFirstResultOnLastPage = numPages * pageSize - pageSize

    scrollToTop()

    switch (direction) {
      case 'right': {
        setActivePage(activePage + 1)
        setOffset(indexOfFirstResultOnNextPage)

        const filteredSortedAndSlicedData = filterSortAndSliceData(
          indexOfFirstResultOnNextPage,
          pageSize,
          allData,
          activeFilters,
          {
            sortBy: activeSort,
            direction: sortDirection,
            dataType: (activeSortObject || {}).filterType
          }
        )
        const { totalDataLengthWithGivenFilters, data: nextPage } = filteredSortedAndSlicedData
        return setDataAndDataLength(nextPage, totalDataLengthWithGivenFilters)
      }
      case 'left': {
        setActivePage(activePage - 1)
        setOffset(indexOfFirstResultOnPrevPage)
        const filteredSortedAndSlicedData = filterSortAndSliceData(
          indexOfFirstResultOnPrevPage,
          pageSize,
          allData,
          activeFilters,
          {
            sortBy: activeSort,
            direction: sortDirection,
            dataType: (activeSortObject || {}).filterType
          }
        )
        const { totalDataLengthWithGivenFilters, data: prevPage } = filteredSortedAndSlicedData
        return setDataAndDataLength(prevPage, totalDataLengthWithGivenFilters)
      }
      case 'first': {
        setActivePage(1)
        setOffset(0)
        const filteredSortedAndSlicedData = filterSortAndSliceData(0, pageSize, allData, activeFilters, {
          sortBy: activeSort,
          direction: sortDirection,
          dataType: (activeSortObject || {}).filterType
        })
        const { totalDataLengthWithGivenFilters, data: firstPage } = filteredSortedAndSlicedData
        return setDataAndDataLength(firstPage, totalDataLengthWithGivenFilters)
      }
      case 'last': {
        setActivePage(numPages)
        setOffset(indexOfFirstResultOnLastPage)
        const filteredSortedAndSlicedData = filterSortAndSliceData(
          indexOfFirstResultOnLastPage,
          pageSize,
          allData,
          activeFilters,
          {
            sortBy: activeSort,
            direction: sortDirection,
            dataType: (activeSortObject || {}).filterType
          }
        )
        const { totalDataLengthWithGivenFilters, data: lastPage } = filteredSortedAndSlicedData
        return setDataAndDataLength(lastPage, totalDataLengthWithGivenFilters)
      }
      default:
        return null
    }
  }

  const handlePageChangeOnClient = ({ activePage: currentPage }) => {
    const indexOfFirstResultOnNextPage = (currentPage - 1) * pageSize
    const indexOfFirstResultOnPrevPage = currentPage * pageSize - pageSize

    if (activePage < currentPage) {
      setActivePage(currentPage)
      setOffset(indexOfFirstResultOnNextPage)
      const filteredSortedAndSlicedData = filterSortAndSliceData(
        indexOfFirstResultOnNextPage,
        pageSize,
        allData,
        activeFilters,
        {
          sortBy: activeSort,
          direction: sortDirection,
          dataType: (activeSortObject || {}).filterType
        }
      )
      const { totalDataLengthWithGivenFilters, data: nextPage } = filteredSortedAndSlicedData
      return setDataAndDataLength(nextPage, totalDataLengthWithGivenFilters)
    } else if (activePage > currentPage) {
      setActivePage(currentPage)
      setOffset(indexOfFirstResultOnPrevPage)
      const filteredSortedAndSlicedData = filterSortAndSliceData(
        indexOfFirstResultOnPrevPage,
        pageSize,
        allData,
        activeFilters,
        {
          sortBy: activeSort,
          direction: sortDirection,
          dataType: (activeSortObject || {}).filterType
        }
      )
      const { totalDataLengthWithGivenFilters, data: prevPage } = filteredSortedAndSlicedData
      return setDataAndDataLength(prevPage, totalDataLengthWithGivenFilters)
    }
  }

  const handlePageChangeOnServer = async data => {
    const { activePage: currentPage } = data

    const indexOfFirstResultOnNextPage = (currentPage - 1) * pageSize
    const indexOfFirstResultOnPrevPage = currentPage * pageSize - pageSize

    if (activePage < currentPage) {
      setActivePage(currentPage)
      setOffset(indexOfFirstResultOnNextPage)
      const fetchedData = await fetchDataQuery(indexOfFirstResultOnNextPage, pageSize, activeFilters, {
        sortBy: activeSort,
        direction: sortDirection
      })
      if (fetchedData) setPageData(fetchedData.data)
    } else if (activePage > currentPage) {
      setActivePage(currentPage)
      setOffset(indexOfFirstResultOnPrevPage)
      const fetchedData = await fetchDataQuery(indexOfFirstResultOnPrevPage, pageSize, activeFilters, {
        sortBy: activeSort,
        direction: sortDirection
      })
      if (fetchedData) setPageData(fetchedData.data)
    }
  }

  const setDataAndDataLength = (data, dataLength) => {
    setPageData(data)
    setTotalDataLength(dataLength)
  }

  const updatePageSize = async value => {
    setActivePage(1)
    setOffset(0)
    setPageSize(value)

    if (shouldFilterAndSortOnTheClient) {
      const filteredAndSortedData = filterSortAndSliceData(0, value, allData, activeFilters, {
        sortBy: activeSort,
        direction: sortDirection,
        dataType: (activeSortObject || {}).filterType
      })
      return setDataAndDataLength(filteredAndSortedData.data, filteredAndSortedData.totalDataLengthWithGivenFilters)
    } else {
      const fetchedData = await fetchDataQuery(0, value, activeFilters, {
        sortBy: activeSort,
        direction: sortDirection
      })
      if (fetchedData) setPageData(fetchedData.data)
    }
  }

  return !isLoading ? (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan={columnLength}>
          <Grid stackable doubling>
            <Grid.Row columns="equal">
              <Grid.Column verticalAlign="middle" key="pageSize">
                <List verticalAlign={'middle'} horizontal={window.innerWidth > 400} divided={window.innerWidth > 400}>
                  <List.Item>
                    Show{' '}
                    <Dropdown
                      upward
                      floating
                      inline
                      options={[
                        { key: 10, value: 10, text: '10' },
                        { key: 20, value: 20, text: '20' },
                        { key: 50, value: 50, text: '50' },
                        { key: 100, value: 100, text: '100' }
                      ]}
                      defaultValue={pageSize}
                      onChange={(e, { value }) => updatePageSize(value)}
                    />
                    records
                  </List.Item>
                  <List.Item style={{ lineHeight: '1.5rem' }}>{`Showing ${
                    pageData.length > 0 ? offset + 1 : 0
                  } to ${offset + pageData.length} of ${totalDataLength} ${
                    totalDataLength > 0 ? 'records' : 'record'
                  }`}</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column textAlign={'center'}>
                <PaginationFooter
                  numPages={numPages}
                  shouldFilterAndSortOnTheClient={shouldFilterAndSortOnTheClient}
                  handlePageChangeOnClient={handlePageChangeOnClient}
                  handlePageChangeOnServer={handlePageChangeOnServer}
                  activePage={activePage}
                  handlePageChangeOnClientOnMobile={handlePageChangeOnClientOnMobile}
                  handlePageChangeOnServerOnMobile={handlePageChangeOnServerOnMobile}
                  offset={offset}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  ) : null
}

export default TableFooter
