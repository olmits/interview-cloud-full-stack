import { useState } from 'react';
import {
  Header,
  Icon,
  Loader,
  Popup,
} from 'semantic-ui-react'
import { useQuery } from '@apollo/client';

import { DataTable } from './components/DataTable'
import { Pagination } from './components/Pagination'
import { PAGE_SIZES } from './helpers/constants';
import { GET_DEVICES_QUERY } from './helpers/queries';

const UpToDateIcon = () => {
  const icon = <Icon name="checkmark" color="green" />;
  return <Popup content="Up to Date" trigger={icon} />;
};

const UpdateInProgressIcon = () => {
  const icon = <Loader active inline size="tiny" />;
  return <Popup content="Update In Progress" trigger={icon} />;
}

const UnauthorizedUserIcon = () => {
  const icon = <Icon name="warning sign" color="yellow" />;
  return <Popup content="Not Authorized" trigger={icon} />;
}

const columns = [
  {
    id: 'status',
    render: (row) => row.iconExample && <UpdateInProgressIcon />,
    collapsing: true
  },
  {
    id: 'userEmail',
    header: 'User',
    render: (row) => (
      <>
        {row.userEmail}
        &nbsp;
        {row.iconExample && <UnauthorizedUserIcon />}
      </>
    ),
  },
  {
    id: 'name',
    header: 'Name',
    render: (row) => row.name,
  },
  {
    id: 'version',
    header: 'Firmware',
    render: (row) => row.version,
  },
  {
    id: 'updatedDate',
    header: 'Last Updated',
    render: (row) => row.updatedDate,
  },
];


function App() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZES[0]);
  const [order, setOrder] = useState({ orderBy: 'name', orderDirection: 'asc' });

  const { data, loading } = useQuery(GET_DEVICES_QUERY, {
    variables: {
      input: {
        pagination: {
          offset: (page - 1) * perPage,
          limit: perPage,
        },
        order,
      },
    },
  });

  if (loading) return <Loader active size="large" />

  return (
    <DataTable
      data={data.getDevices.results || []}
      sortBy="name"
      columns={columns}
      sort={(columnId) => console.log({ columnId })}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={page}
          total={Math.ceil(data.getDevices.total / perPage) || 0}
          size={perPage}
          sizes={PAGE_SIZES}
          setCurrent={setPage}
          setSize={setPerPage}
        />
      }
    />
  );
}

export default App;
