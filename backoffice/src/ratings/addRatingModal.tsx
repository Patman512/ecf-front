import React, { FC, useState } from 'react';
import { Badge, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { addRating } from './api';
import { AddRatingParams } from './types';

interface AddRatingModalProps {
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const AddRatingModal: FC<AddRatingModalProps> = (props) => {
    const [formData, setFormData] = useState({ rating: 5, approved: true });

    const changeHandler = (event: any) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = () => {
        addRating(formData as AddRatingParams, (error) => {
            if (error) {
                return props.onError(error);
            }

            props.onSave();
            return props.onClose();
        });
    };

    const canSubmit = () => {
        const formDataKeys = Object.keys(formData);

        return (
            formDataKeys.length &&
            formDataKeys.includes('rating') &&
            formDataKeys.includes('name') &&
            formData['name'].length
        );
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Ajout de note et commentaire</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card key={'addRating'} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Note</Form.Label>
                                <Form.Range min={1} max={5} defaultValue={5} name="rating" onChange={changeHandler} />
                                <Row>
                                    <Col style={{ textAlign: 'center' }}>
                                        <Badge pill bg="warning" text="dark">
                                            {formData.rating}
                                        </Badge>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" name="name" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Commentaire (facultatif)</Form.Label>
                                <Form.Control type="text" name="comment" onChange={changeHandler} as="textarea" />
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
