import React, { Fragment } from 'react'
import { Responsive, Pagination, Menu, Icon } from 'semantic-ui-react'

const PaginationFooter = ({
  numPages,
  shouldFilterAndSortOnTheClient,
  handlePageChangeOnClient,
  handlePageChangeOnServer,
  activePage,
  handlePageChangeOnClientOnMobile,
  handlePageChangeOnServerOnMobile,
  offset
}) => {
  return (
    <Fragment>
      <Responsive
        as={Pagination}
        minWidth={769}
        style={{ float: 'right' }}
        totalPages={numPages}
        onPageChange={(e, data) =>
          shouldFilterAndSortOnTheClient ? handlePageChangeOnClient(data) : handlePageChangeOnServer(data)
        }
        activePage={activePage > numPages ? numPages : activePage}
        siblingRange={1}
        boundaryRange={1}
        prevItem={{ content: '⟨', disabled: activePage === 1 }}
        nextItem={{ content: '⟩', disabled: activePage === numPages }}
        firstItem={{ content: '«', disabled: activePage === 1 }}
        lastItem={{ content: '»', disabled: activePage === numPages }}
      />
      <Responsive as={Menu} pagination maxWidth={768}>
        <Menu.Item
          disabled={offset === 0 || activePage === 1}
          icon
          position={'left'}
          onClick={() =>
            shouldFilterAndSortOnTheClient
              ? handlePageChangeOnClientOnMobile('first')
              : handlePageChangeOnServerOnMobile('first')
          }
        >
          <Icon name="angle double left" />
        </Menu.Item>
        <Menu.Item
          as="a"
          disabled={offset === 0 || activePage === 1}
          icon
          position={'left'}
          onClick={() =>
            shouldFilterAndSortOnTheClient
              ? handlePageChangeOnClientOnMobile('left')
              : handlePageChangeOnServerOnMobile('left')
          }
        >
          <Icon name="chevron left" />
        </Menu.Item>
        <Menu.Item
          disabled={activePage >= numPages}
          icon
          position={'right'}
          onClick={() =>
            shouldFilterAndSortOnTheClient
              ? handlePageChangeOnClientOnMobile('right')
              : handlePageChangeOnServerOnMobile('right')
          }
        >
          <Icon name="chevron right" />
        </Menu.Item>
        <Menu.Item
          as="a"
          disabled={activePage >= numPages}
          icon
          position={'right'}
          onClick={() =>
            shouldFilterAndSortOnTheClient
              ? handlePageChangeOnClientOnMobile('last')
              : handlePageChangeOnServerOnMobile('last')
          }
        >
          <Icon name="angle double right" />
        </Menu.Item>
      </Responsive>
    </Fragment>
  )
}

export default PaginationFooter
