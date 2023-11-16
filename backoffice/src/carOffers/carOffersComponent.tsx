import React, { FC } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { CarOffer } from './types';

interface CarOffersComponentProps {
    carOffers: CarOffer[];
    addCarOffer: () => void;
}

export const CarOffersComponent: FC<CarOffersComponentProps> = (props) => {
    const renderCarOffers = (carOffers: CarOffer[]) => {
        return carOffers.map((carOffers) => {
            const { id, title, sold } = carOffers;

            return (
                <ListGroup.Item key={id}>
                    <Row>
                        <Col md="9">{title}</Col>
                        <Col md="3" style={{ textAlign: 'end' }}>
                            <Badge bg={sold ? 'success' : 'warning'}>{sold ? 'Vendue' : 'En vente'}</Badge>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        });
    };

    return (
        <>
            <Card bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Card.Header>
                    <Card.Title style={{ textAlign: 'center' }}>Annonces</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {renderCarOffers(props.carOffers)}
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={props.addCarOffer}>Ajouter</Button>
                </Card.Footer>
            </Card>
        </>
    );
};
