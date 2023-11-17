import React, { FC } from 'react';
import { Badge, Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { approveRating } from './api';
import { Rating } from './types';

interface ManageRatingsModalProps {
    ratings: Rating[];
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const ManageRatingsModal: FC<ManageRatingsModalProps> = (props) => {
    const submitHandler = (ratingId: number) => {
        return () =>
            approveRating({ ratingId }, (error) => {
                if (error) {
                    return props.onError(error);
                }

                return props.onSave();
            });
    };

    const renderRatings = (ratings: Rating[]) => {
        return ratings
            .sort((a, b) => b.creationDateUnix - a.creationDateUnix)
            .map((ratingEntry) => {
                const { id, authorName, comment, rating, creationDateUnix, approved } = ratingEntry;

                return (
                    <Card key={id} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Card.Header>
                            <Row>
                                <Col md="4">
                                    <Badge pill bg="warning" text="dark">
                                        {rating}
                                    </Badge>
                                </Col>
                                <Col md="4" style={{ textAlign: 'center' }}>
                                    {authorName}
                                </Col>
                                <Col md="4" style={{ textAlign: 'end' }}>
                                    <Button
                                        onClick={submitHandler(id)}
                                        disabled={approved}
                                        variant="success"
                                        style={{ marginRight: '10px' }}
                                    >
                                        {approved ? 'Approuvé' : 'Approuver'}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>{comment}</Card.Body>
                        <Card.Footer style={{ textAlign: 'end' }}>
                            {new Date(creationDateUnix * 1000).toLocaleDateString('fr-FR')}
                        </Card.Footer>
                    </Card>
                );
            });
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Gestion des commentaires</Modal.Title>
            </Modal.Header>
            <Modal.Body>{renderRatings(props.ratings)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </>
    );
};
