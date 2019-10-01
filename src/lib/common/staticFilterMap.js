const staticFilterMap = {
  text: {
    emptyValue: { active: false, value: '' },
    isEmpty: value => value === ''
  },
  boolean: {
    emptyValue: {
      active: false,
      value: { indeterminate: true, checked: false }
    },
    isEmpty: value => value.indeterminate
  },
  number: {
    emptyValue: {
      active: false,
      value: { numberEq: '', numberLt: '', numberGt: '' }
    },
    isEmpty: value => Object.values(value).every(numberVal => numberVal === '')
  },
  date: {
    emptyValue: {
      active: false,
      value: { dateStart: null, dateEnd: null }
    },
    isEmpty: value => Object.values(value).every(dateVal => dateVal === null)
  },
  select: {
    emptyValue: {
      active: false,
      value: {}
    },
    isEmpty: value => {
      return Object.entries(value)
        .filter(
          selectValueArray => !selectValueArray.includes('indeterminate') && !selectValueArray.includes('checked')
        )
        .every(value => !!value[1])
    }
  }
}

export default staticFilterMap
