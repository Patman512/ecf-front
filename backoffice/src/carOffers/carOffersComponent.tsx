import React, { FC } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { CarOffer } from './types';

interface CarOffersComponentProps {
    carOffers: CarOffer[];
    addCarOffer: () => void;
}

export const CarOffersComponent: FC<CarOffersComponentProps> = (props) => {
    const renderCarOffers = (carOffers: CarOffer[]) => {
        return carOffers.map((carOffers) => {
            const { id, title } = carOffers;

            return <ListGroup.Item key={id}>{title}</ListGroup.Item>;
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
