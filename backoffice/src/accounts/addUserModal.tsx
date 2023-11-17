import md5 from 'md5';
import React, { FC, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { addUser } from './api';
import { AddUserFormData } from './types';

interface AddUserModalProps {
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const AddUserModal: FC<AddUserModalProps> = (props) => {
    const [formData, setFormData] = useState({ accountType: 2 });

    const changeHandler = (event: any) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = () => {
        const { firstName, lastName, email, password, accountType } = formData as AddUserFormData;
        const pwdHash = md5(password);
        const input = { firstName, lastName, email, pwdHash, accountType };

        addUser(input, (error) => {
            if (error) {
                return props.onError(error);
            }

            props.onSave();
            return props.onClose();
        });
    };

    const canSubmit = () => {
        const formDataKeys = Object.keys(formData);
        const requiredProperties = ['firstName', 'lastName', 'email', 'password', 'accountType'];

        return (
            formDataKeys.length &&
            requiredProperties.every((prop) => formDataKeys.includes(prop)) &&
            formDataKeys.every((key) => formData[key].length)
        );
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Ajout d&apos;un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card key={'addUser'} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control type="text" name="firstName" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" name="lastName" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Adresse email</Form.Label>
                                <Form.Control type="email" name="email" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" name="password" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Type d&apos;utilisateur</Form.Label>
                                <Form.Select name="accountType" onChange={changeHandler}>
                                    <option value={2}>Employé</option>
                                    <option value={1}>Administrateur</option>
                                </Form.Select>
                            </Form.Group>

                            <Button
                                onClick={submitHandler}
                                disabled={!canSubmit()}
                                variant="success"
                                style={{ marginRight: '10px' }}
                            >
                                Enregistrer
                            </Button>
                            <Button onClick={props.onClose} variant="secondary">
                                Annuler
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </>
    );
};
