import React from 'react'
import { Icon, Button } from 'semantic-ui-react'
import moment from 'moment'

export const columns = [
  { propKey: 'firstName' },
  { propKey: 'lastName' },
  { propKey: 'company' },
  { propKey: 'phone', render: contact => <strong>{contact.phone}</strong> },
  { propKey: 'dob', render: contact => moment(contact.dob).format('DD-MM-YYYY') },
  { propKey: 'active', render: contact => (contact.active ? <Icon name="thumbs up" /> : <Icon name="thumbs down" />) },
  {
    renderMultiple: [
      data => <Icon key={'edit-action'} as={Button} content="Edit" onClick={() => console.log('data ', data)} />,
      data => (
        <Icon
          key={'delete-action'}
          as={Button}
          color="red"
          content="Delete"
          onClick={() => console.log('data ', data)}
        />
      )
    ]
  }
]

export const headerData = [
  { content: 'First Name', filterType: 'text', propKey: 'firstName' },
  { content: 'Last name', filterType: 'text', propKey: 'lastName' },
  { content: 'Company', filterType: 'select', propKey: 'company', selectValues: ['JDLT', 'Expo-e'] },
  { content: 'phone', filterType: 'number', propKey: 'phone' },
  { content: 'DOB', filterType: 'date', propKey: 'dob' },
  { content: 'Active', filterType: 'boolean', propKey: 'active' },
  { content: '', filterType: '', propKey: '' }
]
