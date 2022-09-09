var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');

const employees = [
    {
        name: 'Doug Lime',
        id: 1,
        occupation: 'Owner'
    },
    {
        name: 'Lin Cheng',
        id: 2,
        occupation: 'Manager'
    },
    {
        name: 'Bob Welp',
        id: 3,
        occupation: 'Manager'
    },
    {
        name: 'Dakota Stein',
        id: 4,
        occupation: 'Engineer'
    },
    {
        name: 'Mongo K',
        id: 5,
        occupation: 'Engineer'
    },
    {
        name: 'Dew Dong',
        id: 6,
        occupation: 'Engineer'
    },
    {
        name: 'Mort Dog',
        id: 7,
        occupation: 'Engineer'
    },
    {
        name: 'Forman Go',
        id: 8,
        occupation: 'Engineer'
    },
    {
        name: 'Dew Kelg',
        id: 9,
        occupation: 'Engineer'
    }
];

const schema = buildSchema(`
    
  
    type Employee {
        id: Int
        name: String
        occupation: String
    }

    input NewEmployee {
        id: Int
        name: String!
        occupation: String!
    }

    type Query {
        getAllEmployees: [Employee]
        getEmployee(id: Int): Employee
    }

    type Mutation {
        createEmployee(input: NewEmployee): Employee
    }
`);

const createEmployee = (input) => {
    const id = employees[employees.length - 1].id + 1;
    return {
        id,
        ...input
    };
};

const root = {
    getAllEmployees: () => {
        return employees;
    },
    getEmployee: ({ id }) => {
        return employees.find((employee) => employee.id == id);
    },
    createEmployee: ({ input }) => {
        const employee = createEmployee(input);
        employees.push(employee);
        return employee;
    }
};

const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
