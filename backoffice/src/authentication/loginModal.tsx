import * as base64 from 'base-64';
import md5 from 'md5';
import React, { FC, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';

interface LoginModalProps {
    show: boolean;
    onValidate: () => void;
    onError: (error: Error) => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const [formData, setFormData] = useState<{ email: string; password: string }>({ email: '', password: '' });

    const changeHandler = (event: any) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = () => {
        const { email, password } = formData;
        const pwdHash = md5(password);
        const headerCredentials = base64.encode(`${email}:${pwdHash}`);
        const now = new Date();
        const token = {
            value: headerCredentials,
            expiry: now.getTime() + 600000 // 10 minutes
        };

        localStorage.setItem('token', JSON.stringify(token));

        return props.onValidate();
    };

    return (
        <Row>
            <Col lg="6">
                <Modal show={props.show} backdrop="static" keyboard={false} centered fullscreen animation={false}>
                    <Modal.Header>
                        <Modal.Title>Connexion à la console d&apos;administration GVP</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card key={'login'} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Adresse email</Form.Label>
                                        <Form.Control type="email" name="email" onChange={changeHandler} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control type="password" name="password" onChange={changeHandler} />
                                    </Form.Group>

                                    <Button
                                        onClick={submitHandler}
                                        disabled={!formData.email.length || !formData.password.length}
                                        variant="success"
                                        style={{ marginRight: '10px' }}
                                    >
                                        Connexion
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
};
