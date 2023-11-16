import React, { FC } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { Rating } from './types';

interface RatingsComponentProps {
    ratings: Rating[];
    manageRatings: () => void;
    addRating: () => void;
}

export const RatingsComponent: FC<RatingsComponentProps> = (props) => {
    const renderRecentRatings = (ratings: Rating[]) => {
        return ratings.map((ratingEntry) => {
            const { id, authorName, comment, rating, creationDateUnix } = ratingEntry;

            return (
                <Card key={id} bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Card.Header>
                        <Badge pill bg="warning" text="dark">
                            {rating}
                        </Badge>
                        &nbsp;{authorName}
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
                    <Card.Title style={{ textAlign: 'center' }}>Notes et commentaires</Card.Title>
                </Card.Header>
                <Card.Body>{renderRecentRatings(props.ratings)}</Card.Body>
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
