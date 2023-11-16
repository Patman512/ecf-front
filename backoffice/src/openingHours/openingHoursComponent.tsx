import React, { FC } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { OpeningHour } from './types';

interface OpeningHoursComponentProps {
    openingHours: OpeningHour[];
    edit: () => void;
}

export const OpeningHoursComponent: FC<OpeningHoursComponentProps> = (props) => {
    const tableContent = props.openingHours.reduce(
        (rows, openingHour) => {
            const { dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime } = openingHour;
            const textAlignValue = 'center';

            rows.days.push(<td style={{ textAlign: textAlignValue }}>{dayOfWeek}</td>);
            rows.hours.push(
                <td style={{ textAlign: textAlignValue }}>
                    {openingTime} - {breakStartTime ? `${breakStartTime}, ${breakEndTime} - ` : ''}
                    {closingTime}
                </td>
            );

            return rows;
        },
        { days: [] as JSX.Element[], hours: [] as JSX.Element[] }
    );

    const renderTableRows = (openingHours: OpeningHour[]) => {
        return openingHours.map((openingHour) => {
            const { id, dayOfWeek, openingTime, closingTime, breakStartTime, breakEndTime } = openingHour;

            if (!openingTime) {
                return;
            }

            return (
                <tr key={id}>
                    <td>{dayOfWeek}</td>
                    <td>
                        {openingTime} - {breakStartTime && breakEndTime ? `${breakStartTime}, ${breakEndTime} - ` : ''}
                        {closingTime}
                    </td>
                </tr>
            );
        });
    };

    return (
        <>
            <Card bg="light" style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Card.Header>
                    <Card.Title style={{ textAlign: 'center' }}>Jours et heures d&apos;ouverture</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Jours d&apos;ouverture</th>
                                <th>Horaires</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableRows(props.openingHours)}</tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={props.edit} style={{ marginRight: '10px' }}>
                        Modifier
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
};
