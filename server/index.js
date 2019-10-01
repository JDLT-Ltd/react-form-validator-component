const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const moment = require('moment')


const contactData = [
  { firstName: 'Charlotte', lastName: 'Morgan', company: 'JDLT', phone: '123', dob: new Date(2019, 1, 1, 10, 33, 30, 0), active: false }, 
  { firstName: 'Fabian', lastName: 'Feldberg', company: 'JDLT', phone: '321', dob: new Date(2019, 1, 1, 10, 33, 30, 0) , active: false},
  { firstName: 'Rich', lastName: 'Turner', company: 'JDLT', phone: '456', dob: new Date(2019, 1, 1, 10, 33, 30, 0) , active: false},
  { firstName: 'Fabian', lastName: 'Feldberg', company: 'Expo-e', phone: '750', dob: new Date(), active: false },
  { firstName: 'Rich', lastName: 'Turner', company: 'JDLT', phone: '456', dob: new Date(), active: false },
  { firstName: 'Ali', lastName: 'Khalil', company: 'JDLT', phone: '654', dob: new Date() , active: false},
  { firstName: 'Charlotte', lastName: 'Morgan', company: 'JDLT', phone: '123', dob: new Date() , active: false},
  { firstName: 'Fabian', lastName: 'Feldberg', company: 'Expo-e', phone: '321', dob: new Date() , active: false},
  { firstName: 'Rich', lastName: 'Tzanov', company: 'JDLT', phone: '456', dob: new Date(2018, 11, 24, 10, 33, 30, 0), active: true },
  { firstName: 'Ali', lastName: 'Morgan', company: 'JDLT', phone: '654', dob: new Date(2018, 11, 24, 10, 33, 30, 0) , active: true},
  { firstName: 'Charlotte', lastName: 'Morgan', company: 'Expo-e', phone: '123', dob: new Date(2018, 11, 24, 10, 33, 30, 0), active: true },
  { firstName: 'Fabian', lastName: 'Feldberg', company: 'JDLT', phone: '321', dob: new Date(2019, 2, 6, 10, 33, 30, 0) , active: true},
  { firstName: 'Rich', lastName: 'Tzanov', company: 'JDLT', phone: '456', dob: new Date(2019, 2, 6, 10, 33, 30, 0), active: true },
  { firstName: 'Ali', lastName: 'Morgan', company: 'Expo-e', phone: '654', dob: new Date(2019, 2, 6, 10, 33, 30, 0), active: true },
  { firstName: 'Rachel', lastName: 'Dolan', company: 'JDLT', phone: '123', dob: new Date(2019, 2, 6, 10, 33, 30, 0), active: true},
  { firstName: 'Fabian', lastName: 'Feldberg', company: 'Expo-e', phone: '321', dob: new Date() , active: true},
  { firstName: 'Rich', lastName: 'Tzanov', company: 'JDLT', phone: '456', dob: new Date(), active: true },
  { firstName: 'Rachel', lastName: 'Morgan', company: 'JDLT', phone: '654', dob: new Date() , active: true},
]

const schema = gql`
  type Query {
    list(offset: Int, limit: Int, filters: FilterInput, sort: SortInput
    ): Data
    getDataCount(offset: Int, limit: Int, filters: FilterInput, sort: SortInput
    ) : Int
  }

  scalar Date

  input SortInput {
    sortBy: String
    direction: SortDirection
  }

  enum SortDirection {
    ascending
    descending
  }

  input FilterInput {
    boolean: [BooleanFilterInput]
    text: [TextFilterInput]
    select: [SelectFilterInput]
    number: [NumberFilterInput]
    date: [DateFilterInput]
  }

  type Data {
    data: [Contacts]
    dataCount: Int
  }

  type Contacts {
    firstName: String,
    lastName: String,
    company: String,
    phone: String,
    dob: Date,
    active: Boolean
  }

  input BooleanFilterInput {
    key: String 
    value: BooleanFilter
  }

  input BooleanFilter {
    active: Boolean 
    type: FilterType 
    value: BooleanFilterOptions
  }

  input BooleanFilterOptions {
    checked: Boolean 
    indeterminate: Boolean 
  }

  input DateFilterInput {
    key: String 
    value: DateFilter 
  }

  input DateFilter {
    active: Boolean 
    type: FilterType 
    value: DateFilterOptions
  }

  input DateFilterOptions {
    dateEnd: Date
    dateStart: Date
  }

  input TextFilterInput {
    key: String
    value: TextFilter
  }

  input TextFilter {
    value: String
    active: Boolean 
    type: FilterType
  }

  input NumberFilterInput {
    key: String 
    value: NumberFilter
  }

input NumberFilter {
  active: Boolean 
  type: FilterType 
  value: NumberFilterOptions
}

input NumberFilterOptions {
  numberEq: String 
  numberGt: String 
  numberLt: String 
}
  
input SelectFilterInput {
  key: String 
  value: SelectFilter
}

input SelectFilter {
  active: Boolean
  type: FilterType 
  value: [SelectFilterOptions]
}

input SelectFilterOptions {
  key: String
  value: Boolean
}
  
  enum FilterType {
    select
    text
    date
    number
    boolean
  }
`


const sortData = (data, sortBy, direction) => {
  return !direction ? data :
  direction === 'ascending' ?
  data.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)) 
  : data.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1))
}

const resolvers = {
  Query: {
    list: (parent, {offset, limit, filters, sort }) => {

      if(!offset && !limit) return {data: contactData, dataCount: contactData.length}
      const { sortBy, direction} = sort
      if(Object.keys(filters).length === 0) {
        return {
        data: sortData(contactData, sortBy, direction).slice(offset, (limit + offset)),
        dataCount: contactData.length
      }
      }
     
      const activeFilters = Object.values(filters).reduce((acc, currentFilterArray) => {
        return currentFilterArray.some(currentFilter => currentFilter.value.active) ? 
        [...acc, ...currentFilterArray.filter(currentFilter => currentFilter.value.active) ]
        : [...acc]
      },[])

      if(activeFilters.length === 0) return {
        data: sortData(contactData, sortBy, direction).slice(offset, (limit + offset)),
        dataCount: contactData.length
      }
      
      const filteredData = applyActiveFilters(contactData, activeFilters)
     
     return filteredData.length > offset ? {data: sortData(filteredData, sortBy, direction).slice(offset, (limit + offset)), dataCount: filteredData.length} 
     : {data: sortData(filteredData, sortBy, direction).slice(0, limit), dataCount: filteredData.length}
    }, 
    getDataCount: (parent, {filters }) =>{
      if(!filters) return contactData.length
      if(Object.keys(filters).length === 0) return contactData.length
      
      const activeFilters = Object.values(filters).reduce((acc, currentFilterArray) => {
        return currentFilterArray.some(currentFilter => currentFilter.value.active) ? 
        [...acc, ...currentFilterArray.filter(currentFilter => currentFilter.value.active) ]
        : [...acc]
      },[])

      if(activeFilters.length === 0) return contactData.length
      
      const filteredData = applyActiveFilters(contactData, activeFilters)
     
     return filteredData.length 
    }
  }
}

const applyTextFilter = (datum, filter) => 
   datum[filter.key].toLocaleLowerCase().includes(filter.value.value.toLocaleLowerCase())


const applyNumberFilter = (datum, filter ) => {
  const passesGreaterThanRequirement = !filter.value.value.numberGt || parseFloat(datum[filter.key]) >= parseFloat(filter.value.value.numberGt)
  const passesLessThanRequirement = !filter.value.value.numberLt ||parseFloat(datum[filter.key]) <= parseFloat(filter.value.value.numberLt)
  const passesEqualToRequirement = !filter.value.value.numberEq ||parseFloat(datum[filter.key]) === parseFloat(filter.value.value.numberEq)

 return passesGreaterThanRequirement && passesLessThanRequirement && passesEqualToRequirement

}

const selectFilterFunction = (datum, filter) => {
  
  const shouldBeExcluded = filter.value.value.reduce((acc,{key, value}) => {
    return (!value) ? [...acc, key] : [...acc ]
    },[])
   
    return shouldBeExcluded.length === 0 ? true :  !shouldBeExcluded.includes(datum[filter.key])
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


const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

const app = express();
app.use(cors())

server.applyMiddleware({ app, path: '/graphql'})


app.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
});

