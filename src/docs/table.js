import React, { useState, useEffect, useCallback } from 'react'
import DataTable from '../lib/TableParts/index.js'
import { Container } from 'semantic-ui-react'
import { columns, headerData } from '../lib/data'
import { fetchContacts } from '../lib/gql'
// import common from 'common-react'

const shouldFilterAndSortOnTheClient = false
let offset = 0
let limit = 10
const filters = {}
const sort = { sortBy: 'lastName', direction: 'ascending' }

// const {
//   Util: { useApiService }
// } = common

const App = () => {
  const getData = useCallback(async (offset, limit, filters, sort) => {
    return await fetchContacts(offset, limit, filters, sort)
  }, [])

  // const [{ data: dataAndCount, isLoading: isLoadingContacts, setApiArguments: getContacts, isError }] = [
  //   useApiService(fetchContacts, shouldFilterAndSortOnTheClient ? [] : [offset, limit, filters, sort], null)
  // ]

  const [data, setData] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const [isLoadingData, setIsLoadingData] = useState(false)

  // useEffect(() => {
  //   if (dataAndCount) {
  //     const { data: fetchedData, dataCount } = dataAndCount
  //     const dataWithLinks = fetchedData.map(datum => {
  //       return { ...datum, __link: '/' }
  //     })
  //     setData(dataWithLinks)
  //     setDataLength(dataCount)
  //   }
  // }, [dataAndCount])

  // useEffect(() => {
  //   if (contactsCount) {
  //     setDataLength(contactsCount)
  //   }
  // }, [fetchedContacts, contactsCount])

  // const fetchData = useCallback(
  //   async (offset, limit, filters, sort) => await getContacts([offset, limit, filters, sort]),
  //   [getContacts]
  // )
  // const fetchDataCount = useCallback(
  //   async filters => {
  //     return await getContactsCount([filters])
  //   },
  //   [getContactsCount]
  // )

  // useEffect(() => {
  //   setIsLoadingData(true)
  //   const fetchAndSetData = async () => {
  //     const fetchedContacts = await getData(offset, limit, filters, sort)
  //     setData(fetchedContacts.data)
  //   }
  //   fetchAndSetData()
  //   setIsLoadingData(false)
  // }, [getData])

  // useEffect(() => {
  //   setIsLoadingDataCount(true)
  //   const fetchAndSetCount = async () => {
  //     const contactsCount = await getDataCount(filters)
  //     setDataLength(contactsCount)
  //   }
  //   fetchAndSetCount()
  //   setIsLoadingDataCount(false)
  // }, [getDataCount])

  const fetchData = useCallback(
    async (offset, limit, filters, sort) => {
      setIsLoadingData(true)
      const { data, dataCount } = await getData(offset, limit, filters, sort)
      setIsLoadingData(false)
      return {
        data,
        dataCount
      }
    },
    [getData]
  )
  // const fetchDataWithUseApiService = useCallback(
  //   async (offset, limit, filters, sort) => getContacts([offset, limit, filters, sort]),
  //   [getContacts]
  // )

  return (
    <Container style={{ paddingTop: '5rem' }}>
      <DataTable
        // data={data}
        columns={columns}
        headerData={headerData}
        defaultSortValues={sort}
        fetchDataQuery={fetchData}
        initialPageSize={limit}
        offset={offset}
        // dataLength={dataLength}
        isLoading={isLoadingData}
        emptyTableDescription={'No contacts found'}
        loadingTableDescription={'Loading contacts'}
        shouldFilterAndSortOnTheClient={shouldFilterAndSortOnTheClient}
      />
    </Container>
  )
}

export default App
