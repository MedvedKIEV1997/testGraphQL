import { gql } from '@apollo/client';

export const GET_ALL_EMPLOYEES = gql`
    query {
        getAllEmployees {
            id
            name
            occupation
        }
    }
`;

export const CREATE_NEW_EMPLOYEE = gql`
    mutation createEmployee($input: NewEmployee) {
        createEmployee(input: $input) {
            name
            occupation
        }
    }
`;
