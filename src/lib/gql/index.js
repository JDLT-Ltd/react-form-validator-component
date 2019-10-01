import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})
const client = new ApolloClient({ cache, link })

const fetchData = gql`
  query list($offset: Int, $limit: Int, $filters: FilterInput, $sort: SortInput) {
    list(offset: $offset, limit: $limit, filters: $filters, sort: $sort) {
      data {
        firstName
        lastName
        company
        phone
        dob
        active
      }
      dataCount
    }
  }
`

export const fetchContacts = async (offset, limit, filters, sort) => {
  const {
    data: {
      list: { data, dataCount }
    }
  } = await client.query({ query: fetchData, variables: { offset, limit, filters, sort } })
  return { data, dataCount }
}
