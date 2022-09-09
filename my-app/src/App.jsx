import { useEffect, useState } from 'react';
import {
    Grid,
    Table,
    TableHeaderRow,
    SearchPanel,
    Toolbar,
    TableSummaryRow
} from '@devexpress/dx-react-grid-material-ui';
import {
    SortingState,
    IntegratedSorting,
    IntegratedFiltering,
    IntegratedSummary,
    SummaryState,
    SearchState
} from '@devexpress/dx-react-grid';
import { Paper, Button } from '@mui/material';
import { useQuery } from '@apollo/client';

import { GET_ALL_EMPLOYEES } from './gql';
import Popup from './Popup';

// Grid component is temporarily bugged in ts

const App = () => {
    const { data, loading, refetch } = useQuery(GET_ALL_EMPLOYEES);
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const totalSummaryItems = [{ columnName: 'id', type: 'count' }];
    const columns = [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'occupation', title: 'Occupation' }
    ];

    useEffect(() => {
        if (!loading) {
            setEmployees(data.getAllEmployees);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper>
            <Grid rows={employees} columns={columns}>
                <SearchState />
                <SortingState />
                <SummaryState totalItems={totalSummaryItems} />
                <IntegratedSummary />
                <IntegratedSorting />
                <IntegratedFiltering />
                <Toolbar />
                <SearchPanel />
                <Table />
                <TableSummaryRow />
                <TableHeaderRow showSortingControls />
            </Grid>
            <Button onClick={handleClickOpen}>Add new employee</Button>
            <Popup open={open} handleClose={handleClose} refetch={refetch} />
        </Paper>
    );
};

export default App;
