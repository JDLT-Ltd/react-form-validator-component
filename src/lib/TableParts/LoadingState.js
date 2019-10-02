import React from 'react'
import { Table, Segment, Loader } from 'semantic-ui-react'

export const LoadingTable = ({ columnLength, loadingTableDescription }) => (
  <Table.Body key="loadingState">
    <Table.Row>
      <Table.Cell colSpan={columnLength}>
        <Segment vertical placeholder="true" basic textAlign="center">
          <Loader active content={loadingTableDescription} />
        </Segment>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
)
