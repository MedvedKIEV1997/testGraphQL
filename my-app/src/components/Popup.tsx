import { useState } from 'react';
import {
    ApolloQueryResult,
    OperationVariables,
    useMutation
} from '@apollo/client';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    TextField
} from '@mui/material';

import { CREATE_NEW_EMPLOYEE } from '../gql';

type PopupProps = {
    open: boolean;
    handleClose: () => void;
    refetch: (
        variables?: Partial<OperationVariables> | undefined
    ) => Promise<ApolloQueryResult<any>>;
};

const Popup = ({ open, handleClose, refetch }: PopupProps) => {
    const [newEmployee] = useMutation(CREATE_NEW_EMPLOYEE);
    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const handleSubmit = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        if (name === '' || occupation === '') return;
        try {
            setDisabled(true);
            await newEmployee({
                variables: {
                    input: {
                        name,
                        occupation
                    }
                }
            });
            setName('');
            setOccupation('');
            refetch();
            setDisabled(false);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <TextField
                        required
                        margin="normal"
                        name="fullName"
                        label="Full Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        required
                        margin="normal"
                        name="occupation"
                        label="Occupation"
                        value={occupation}
                        onChange={(event) => setOccupation(event.target.value)}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    disabled={disabled}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={disabled}
                    color="primary"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
