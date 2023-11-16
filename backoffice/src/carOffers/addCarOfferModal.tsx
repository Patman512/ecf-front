import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap';
import { AddCarOfferParams, CarOffer, Equipment } from './types';
import { addCarOffer, uploadFiles } from './api';

const formSchema = {
    title: 'text',
    description: 'textarea',
    priceInCents: 'number',
    manufacturer: 'text',
    model: 'text',
    year: 'number',
    mileageInKm: 'number',
    fuelType: 'text',
    gearboxType: 'text',
    carType: 'text',
    color: 'text',
    numberOfDoors: 'number',
    numberOfSeats: 'number',
    taxHorsePower: 'number',
    horsePower: 'number',
    equipments: 'equipments'
};

interface AddCarOfferModalModalProps {
    equipmentsList: Equipment[];
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const AddCarOfferModal: FC<AddCarOfferModalModalProps> = (props) => {
    const [formData, setFormData] = useState({});
    const [formValidated, setFormValidated] = useState(false);
    const [runValidation, setRunValidation] = useState(false);

    const changeHandler = (event: any) => {
        const { type } = event.target;

        if (type === 'checkbox') {
            const { id, checked } = event.target;
            const selectedEquipments: string[] = formData['equipments'] || [];

            if (checked) {
                selectedEquipments.push(id);
            } else {
                const index = selectedEquipments.findIndex((equipmentId: string) => equipmentId === id);
                selectedEquipments.splice(index, 1);
            }

            return setFormData({ ...formData, equipments: selectedEquipments });
        }

        const { name, value } = event.target;
        const verifiedValue = value === '' ? null : value;

        return setFormData({ ...formData, [name]: verifiedValue });
    };

    const submitHandler = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return setRunValidation(true);
        }

        return setFormValidated(true);
    };

    useEffect(() => {
        if (formValidated) {
            if (Object.keys(formData).includes('equipments')) {
                formData['equipments'] = formData['equipments'].join(',');
            }

            //TODO add authorId property from local storage to formData before calling the endpoint

            addCarOffer(formData as AddCarOfferParams, (error, carOfferId) => {
                if (error) {
                    return props.onError(error);
                }

                if (!carOfferId) {
                    return props.onError(new Error('Erreur inattendue.'));
                }

                //TODO handle file upload in HTTP request and file names
                uploadFiles({ carOfferId }, (error) => {
                    if (error) {
                        props.onError(error);
                    }

                    return props.onSave();
                });
            });
        }
    }, [formValidated]);

    const renderEquipmentsForm = (equipmentsList: Equipment[]) => {
        return equipmentsList.map((equipment) => {
            const { id, name } = equipment;

            return (
                <Form.Check
                    onChange={changeHandler}
                    inline
                    label={name}
                    type="checkbox"
                    id={id.toString()}
                    key={`checkbox#${id}`}
                />
            );
        });
    };

    const renderFormGroups = () => {
        return Object.keys(formSchema).map((key) => {
            const formType = formSchema[key] === 'textarea' ? 'text' : formSchema[key];
            const formAs = formSchema[key] === 'textarea' ? formSchema[key] : undefined;
            const isRequired = !['description', 'equipments'].includes(key);

            if (formType === 'equipments') {
                return (
                    <Accordion key="equipments" style={{ marginBottom: '20px' }}>
                        <Accordion.Item eventKey="equipments">
                            <Accordion.Header>Liste d&apos;équipements</Accordion.Header>
                            <Accordion.Body>{renderEquipmentsForm(props.equipmentsList)}</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                );
            }

            return (
                <Form.Group key={key} className="mb-3">
                    <Form.Label>{key}</Form.Label>
                    <Form.Control
                        type={formType}
                        name={key}
                        onChange={changeHandler}
                        as={formAs}
                        required={isRequired}
                    />
                    <Form.Control.Feedback type="invalid">{isRequired ? 'Champs requis.' : ''}</Form.Control.Feedback>
                </Form.Group>
            );
        });
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Ajout d&apos;une annonce</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={runValidation} onSubmit={submitHandler}>
                    {renderFormGroups()}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Photo principale</Form.Label>
                        <Form.Control
                            //required
                            type="file"
                            onChange={(e) => console.log(e.target.value, typeof e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Photos supplémentaires</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                    <Button
                        type="submit"
                        disabled={!Object.keys(formData).length}
                        variant="success"
                        style={{ marginRight: '10px' }}
                    >
                        Enregistrer
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </>
    );
};
