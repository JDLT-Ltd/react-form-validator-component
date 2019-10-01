import React from 'react'
import { Popup, Icon, Responsive } from 'semantic-ui-react'

const FilterPopup = props => {
  const { active, filterForm } = props
  return (
    <Popup
      trigger={
        <div style={{ display: 'inline' }}>
          <Responsive
            as={Icon}
            maxWidth={766}
            color={active ? 'teal' : null}
            name="filter"
            style={{ float: 'right', cursor: 'pointer' }}
          />
          <Responsive
            as={Icon}
            minWidth={767}
            color={active ? 'teal' : null}
            name="filter"
            style={{ paddingLeft: '0.5rem', cursor: 'pointer' }}
          />
        </div>
      }
      on="click"
      onOpen={e => e.stopPropagation()}
      onClose={e => e.stopPropagation()}
      content={filterForm}
      position={'bottom left'}
    />
  )
}

export default FilterPopup
