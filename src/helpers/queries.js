import { gql } from '@apollo/client';

export const GET_DEVICES_QUERY = gql`
  query GetDevices($input: GetDevicesInput!) {
    getDevices(input: $input) {
      results {
        id
        name
        userEmail
        isAdmin
        version
        updatedDate
        isLatestVersion
      }
      total
    }
  }
`;