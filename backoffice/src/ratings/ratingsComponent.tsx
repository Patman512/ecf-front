import React, { FC } from 'react';
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { Rating } from './types';

interface RatingsComponentProps {
    ratings: Rating[];
    manageRatings: () => void;
    addRating: () => void;
}

export const RatingsComponent: FC<RatingsComponentProps> = (props) => {
    const renderRecentRatingsToBeReviewed = (ratings: Rating[]) => {
        return ratings
            .filter((rating) => !rating.approved)
            .sort((a, b) => b.creationDateUnix - a.creationDateUnix)
            .slice(0, 2)
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
            <Card bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Card.Header>
                    <Card.Title style={{ textAlign: 'center' }}>Commentaires à revoir</Card.Title>
                </Card.Header>
                <Card.Body>{renderRecentRatingsToBeReviewed(props.ratings)}</Card.Body>
                <Card.Footer>
                    <Button onClick={props.manageRatings} style={{ marginRight: '10px' }}>
                        Gérer
                    </Button>
                    <Button onClick={props.addRating}>Ajouter</Button>
                </Card.Footer>
            </Card>
        </>
    );
};
