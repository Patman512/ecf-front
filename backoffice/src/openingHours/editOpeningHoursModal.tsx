import React, { FC, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { OpeningHour } from './types';
import { editOpeningHours } from './api';

interface EditOpeningHoursModalProps {
    openingHours: OpeningHour[];
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const EditOpeningHoursModal: FC<EditOpeningHoursModalProps> = (props) => {
    const [formData, setFormData] = useState({});

    const changeUpdateHandler = (event: any) => {
        const { id, name, value } = event.target;
        const verifiedValue = value === '' ? null : value;

        setFormData({ ...formData, [id]: { ...formData[id], [name]: verifiedValue } });
    };

    const submitUpdateHandler = () => {
        const editedOpeningHours: OpeningHour[] = Object.keys(formData).map((idStr) => {
            const id = Number(idStr);
            const dayFromProps = props.openingHours.find((day) => day.id === id);
            const dayOfWeek = dayFromProps?.dayOfWeek;
            const openingTime =
                formData[idStr].openingTime !== undefined ? formData[idStr].openingTime : dayFromProps?.openingTime;
            const closingTime =
                formData[idStr].closingTime !== undefined ? formData[idStr].closingTime : dayFromProps?.closingTime;
            const breakStartTime =
                formData[idStr].breakStartTime !== undefined
                    ? formData[idStr].breakStartTime
                    : dayFromProps?.breakStartTime;
            const breakEndTime =
                formData[idStr].breakEndTime !== undefined ? formData[idStr].breakEndTime : dayFromProps?.breakEndTime;

            return { id, dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime } as OpeningHour;
        });

        editOpeningHours({ openingHours: editedOpeningHours }, (error) => {
            if (error) {
                return props.onError(error);
            }

            props.onSave();
            return props.onClose();
        });
    };

    const renderForms = (openingHours: OpeningHour[]) => {
        return openingHours.map((day) => {
            const { id, dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime } = day;

            return (
                <Card key={`dayForm#${id}`} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Card.Header>
                        <Card.Title style={{ textAlign: 'center' }}>{dayOfWeek}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ouverture</Form.Label>
                                        <Form.Control
                                            id={id.toString()}
                                            type="text"
                                            name="openingTime"
                                            onChange={changeUpdateHandler}
                                            defaultValue={openingTime ?? ''}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fermeture</Form.Label>
                                        <Form.Control
                                            id={id.toString()}
                                            type="text"
                                            name="closingTime"
                                            onChange={changeUpdateHandler}
                                            defaultValue={closingTime ?? ''}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Début de pause</Form.Label>
                                        <Form.Control
                                            id={id.toString()}
                                            type="text"
                                            name="breakStartTime"
                                            onChange={changeUpdateHandler}
                                            defaultValue={breakStartTime ?? ''}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Fin de pause</Form.Label>
                                        <Form.Control
                                            id={id.toString()}
                                            type="text"
                                            name="breakEndTime"
                                            onChange={changeUpdateHandler}
                                            defaultValue={breakEndTime ?? ''}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            );
        });
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Modification des horaires d&apos;ouverture</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderForms(props.openingHours)}</Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={submitUpdateHandler}
                    disabled={!Object.keys(formData).length}
                    variant="success"
                    style={{ marginRight: '10px' }}
                >
                    Enregistrer
                </Button>
                <Button variant="secondary" onClick={props.onClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </>
    );
};
