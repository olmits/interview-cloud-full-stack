import { useState } from 'react';
import {
  Header,
  Icon,
  Loader,
  Popup,
} from 'semantic-ui-react'
import { DataTable } from './components/DataTable'
import { Pagination } from './components/Pagination'
import { gql, useQuery } from '@apollo/client';

const GET_DEVICES_QUERY = gql`
  query GetDevices($input: GetDevicesInput!) {
    getDevices(input: $input) {
      id
      name
      userEmail
      version
      updatedDate
    }
  }
`;

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
    id: 'user',
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
    id: 'updated',
    header: 'Last Updated',
    render: (row) => row.updatedDate,
  },
];

const PAGE_SIZES = [10, 25, 50]


function App() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PAGE_SIZES[0]);

  const { data } = useQuery(GET_DEVICES_QUERY, {
    variables: {
      input: {
        pagination: {
          offset: (page - 1) * perPage,
          limit: perPage,
        },
      },
    },
  });

  return (
    <DataTable
      data={data?.getDevices || []}
      sortBy="user"
      columns={columns}
      sort={(columnId) => console.log({ columnId })}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={page}
          total={2}
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
