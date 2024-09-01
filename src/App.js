import {
  Header,
  Loader,
  Message,
} from 'semantic-ui-react'
import { useQuery } from '@apollo/client';

import { DataTable } from './components/DataTable'
import { Pagination } from './components/Pagination'
import {
  UpToDateIcon,
  UnauthorizedUserIcon,
  UpdateInProgressIcon,
} from './components/icons';
import { PAGE_SIZES } from './helpers/constants';
import { GET_DEVICES_QUERY } from './helpers/queries';
import useTable from './hooks/useTable';

const columns = [
  {
    id: 'status',
    render: (row) => {
      if (!row.updatedDate) return <UpdateInProgressIcon />;
      if (row.isLatestVersion) return <UpToDateIcon />;
    },
    collapsing: true
  },
  {
    id: 'userEmail',
    header: 'User',
    render: (row) => (
      <>
        {row.userEmail}
        &nbsp;
        {!row.isAdmin && <UnauthorizedUserIcon />}
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
    render: (row) => {
      if (!row.updatedDate) return "";
      const updatedDate = new Date(row.updatedDate);
      const todayDate = new Date();
      if (updatedDate.toDateString() === todayDate.toDateString()) return "Today";
      return updatedDate.toLocaleDateString("en-US");
    },
  },
];


function App() {
  const {
    page,
    perPage,
    orderBy,
    orderDirection,
    handleSetPage,
    handleSetPerPage,
    handeleSetOrder
  } = useTable();

  console.log("asdf", orderBy, orderDirection);

  const { data, error, loading } = useQuery(GET_DEVICES_QUERY, {
    variables: {
      input: {
        pagination: {
          offset: (page - 1) * perPage,
          limit: perPage,
        },
        order: {
          orderBy,
          orderDirection
        },
      },
    },
  });

  if (loading) return <Loader active size="large" />
  if (error) return <Message error header={error.message} />

  console.log("asdf", data.getDevices.results);

  return (
    <DataTable
      data={data.getDevices.results || []}
      sortBy={orderBy}
      sortDirection={orderDirection}
      columns={columns}
      sort={handeleSetOrder}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={page}
          total={Math.ceil(data.getDevices.total / perPage) || 0}
          size={perPage}
          sizes={PAGE_SIZES}
          setCurrent={handleSetPage}
          setSize={handleSetPerPage}
        />
      }
    />
  );
}

export default App;
