import React, { FC, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { Service } from './types';
import { deleteService, updateService } from './api';

interface ManageServicesModalProps {
    services: Service[];
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const ManageServicesModal: FC<ManageServicesModalProps> = (props) => {
    const [formData, setFormData] = useState({});

    const changeHandler = (event: any) => {
        const { id, name, value } = event.target;

        setFormData({ ...formData, [id]: { ...formData[id], [name]: value } });
    };

    const submitHandler = (event: any) => {
        const id = Number(event.target.id);
        const name = formData[id].name;
        const description =
            formData[id].description ?? props.services.find((service) => service.id === id)?.description;

        updateService({ id, name, description }, (error) => {
            if (error) {
                return props.onError(error);
            }

            return props.onSave();
        });
    };

    const renderForms = (services: Service[]) => {
        return services.map((services) => {
            const { id, name, description } = services;

            return (
                <Card key={`serviceForm#${id}`} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom du service</Form.Label>
                                <Form.Control
                                    id={id.toString()}
                                    type="text"
                                    name="name"
                                    onChange={changeHandler}
                                    defaultValue={name}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    id={id.toString()}
                                    type="text"
                                    name="description"
                                    onChange={changeHandler}
                                    as="textarea"
                                    defaultValue={description ?? ''}
                                />
                            </Form.Group>

                            <Button
                                onClick={submitHandler}
                                id={id.toString()}
                                disabled={
                                    !formData[id] ||
                                    (Object.keys(formData[id]).includes('name') && !formData[id].name.length)
                                }
                                variant="success"
                                style={{ marginRight: '10px' }}
                            >
                                Enregistrer
                            </Button>
                            <Button
                                onClick={() =>
                                    deleteService({ id }, (error) => {
                                        if (error) {
                                            return props.onError(error);
                                        }

                                        return props.onSave();
                                    })
                                }
                                variant="danger"
                            >
                                Supprimer
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            );
        });
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Gestion des services</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderForms(props.services)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </>
    );
};
