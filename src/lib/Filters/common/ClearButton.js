import React, { useContext } from 'react'
import { Form } from 'semantic-ui-react'
import { DataTableContext } from '../../common/DataTableContext'

const ClearButton = props => {
  const { propKey, content, disabled } = props
  const { clearFilter } = useContext(DataTableContext)
  return (
    <Form.Button
      size="small"
      floated={'right'}
      onClick={() => clearFilter(propKey)}
      content={content || 'Clear'}
      disabled={disabled}
    />
  )
}

export default ClearButton
