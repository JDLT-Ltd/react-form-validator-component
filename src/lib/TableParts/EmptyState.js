import React from 'react'
import { Table, Segment } from 'semantic-ui-react'

export const EmptyTable = ({ columnLength, emptyTableDescription }) => (
  <Table.Body key="emptyState">
    <Table.Row>
      <Table.Cell colSpan={columnLength}>
        <Segment vertical textAlign="center">
          {emptyTableDescription}
        </Segment>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
)
