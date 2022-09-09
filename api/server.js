var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');

const employees = [
    {
        name: 'Doug Lime',
        controls: [2, 3],
        id: 1
    },
    {
        name: 'Lin Cheng',
        controls: [4, 5, 6],
        id: 2
    },
    {
        name: 'Bob Welp',
        controls: [7, 8, 9],
        id: 3
    },
    {
        name: 'Dakota Stein',
        controls: [],
        id: 4
    },
    {
        name: 'Mongo K',
        controls: [],
        id: 5
    },
    {
        name: 'Dew Dong',
        controls: [],
        id: 6
    },
    {
        name: 'Mort Dog',
        controls: [],
        id: 7
    },
    {
        name: 'Forman Go',
        controls: [],
        id: 8
    },
    {
        name: 'Dew Kelg',
        controls: [],
        id: 9
    }
];

const schema = buildSchema(`
    
  
    type Employee {
        id: ID
        name: String
        controls: [Int]
    }

    input NewEmployee {
        id: ID
        name: String!
        controls: [Int]
    }

    type Query {
        getAllEmployees: [Employee]
        getEmployee(id: ID): Employee
    }

    type Mutation {
        createEmployee(input: NewEmployee): Employee
    }
`);
const createEmployee = (input) => {
    const id = employees[employees.length - 1].id + 1;
    const controls = input.controls || [];
    return {
        id,
        controls,
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
