import React, { Fragment } from 'react'
import { Table } from 'semantic-ui-react'
import { EmptyTable } from './EmptyState'
import { LoadingTable } from './LoadingState'

const TableBody = ({ pageData, columns, isLoading, isError, loadingTableDescription, emptyTableDescription }) => (
  <Fragment>
    {isLoading ? (
      <LoadingTable columnLength={columns && columns.length} loadingTableDescription={loadingTableDescription} />
    ) : (pageData.length === 0 && !isLoading) || isError ? (
      <EmptyTable emptyTableDescription={emptyTableDescription} columnLength={columns && columns.length} />
    ) : (
      <Table.Body>
        {pageData.map((datum, i) => (
          <Table.Row
            key={`row-${i}`}
            onClick={() => (datum.__link ? (window.location.pathname = datum.__link) : null)}
            style={datum.__link ? { cursor: 'pointer' } : null}
          >
            {columns.map((column, i) => {
              if (!column) return null
              return (
                <Table.Cell key={`cell-${i}`} collapsing={!!column.renderMultiple}>
                  {column.render
                    ? column.render(datum)
                    : column.renderMultiple
                    ? column.renderMultiple.map(renderFunc => renderFunc(datum))
                    : datum[column.propKey]}
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    )}
  </Fragment>
)

export default TableBody
