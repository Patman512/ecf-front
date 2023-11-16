import React, { FC, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { addService } from './api';

interface AddServiceModalProps {
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const AddServiceModal: FC<AddServiceModalProps> = (props) => {
    const [formData, setFormData] = useState<{ name: string; description?: string }>({ name: '' });

    const changeHandler = (event: any) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = () => {
        addService(formData, (error) => {
            if (error) {
                return props.onError(error);
            }

            props.onSave();
            return props.onClose();
        });
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Ajout de service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card key={'addService'} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom du service</Form.Label>
                                <Form.Control type="text" name="name" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description (facultatif)</Form.Label>
                                <Form.Control type="text" name="description" onChange={changeHandler} as="textarea" />
                            </Form.Group>

                            <Button
                                onClick={submitHandler}
                                disabled={!formData.name.length}
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
