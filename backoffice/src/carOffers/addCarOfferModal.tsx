import React, { FC, useState } from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap';
import { AddCarOfferForm, AddCarOfferParams, Equipment } from './types';
import { addCarOffer } from './api';

const formSchema = {
    formTitle: { fr: 'Titre', type: 'text' },
    formDescription: { fr: 'Description', type: 'textarea' },
    formPriceInEuros: { fr: 'Prix en Euros', type: 'number' },
    formManufacturer: { fr: 'Marque', type: 'text' },
    formModel: { fr: 'Modèle', type: 'text' },
    formYear: { fr: 'Année de mise en circulation', type: 'number' },
    formMileageInKm: { fr: 'Kilométrage', type: 'number' },
    formFuelType: { fr: 'Carburant', type: 'text' },
    formGearboxType: { fr: 'Type de boîte de vitesses', type: 'text' },
    formCarType: { fr: 'Type de véhicule', type: 'text' },
    formColor: { fr: 'Couleur', type: 'text' },
    formNumberOfDoors: { fr: 'Nombre de portes', type: 'number' },
    formNumberOfSeats: { fr: 'Nombre de places', type: 'number' },
    formTaxHorsePower: { fr: 'Nombre de chevaux fiscaux', type: 'number' },
    formHorsePower: { fr: 'Nombre de chevaux', type: 'number' },
    formEquipments: { fr: 'Equipements', type: 'equipments' }
};

interface AddCarOfferModalModalProps {
    equipmentsList: Equipment[];
    onClose: () => void;
    onSave: () => void;
    onError: (error: Error) => void;
}

export const AddCarOfferModal: FC<AddCarOfferModalModalProps> = (props) => {
    const [formData, setFormData] = useState<AddCarOfferForm | null>(null);
    const [runValidation, setRunValidation] = useState(false);

    const changeHandler = (event: any) => {
        const { type } = event.target;

        if (type === 'checkbox') {
            const { id, checked } = event.target;
            const selectedEquipments = formData?.formEquipments || [];

            if (checked) {
                selectedEquipments.push(id);
            } else {
                const index = selectedEquipments.findIndex((equipmentId: string) => equipmentId === id);
                selectedEquipments.splice(index, 1);
            }

            return setFormData({ ...(formData as AddCarOfferForm), formEquipments: selectedEquipments });
        }

        const { name, value } = event.target;
        const verifiedValue = value === '' ? null : value;

        return setFormData({ ...(formData as AddCarOfferForm), [name]: verifiedValue });
    };

    const submitHandler = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return setRunValidation(true);
        }

        const {
            formTitle,
            formDescription,
            formPriceInEuros,
            formManufacturer,
            formModel,
            formYear,
            formMileageInKm,
            formFuelType,
            formGearboxType,
            formCarType,
            formColor,
            formNumberOfDoors,
            formNumberOfSeats,
            formTaxHorsePower,
            formHorsePower,
            formEquipments
        } = formData as AddCarOfferForm; // Cannot be null because of form.checkValidity() above

        const params: AddCarOfferParams = {
            title: formTitle,
            description: formDescription ?? null,
            priceInCents: Number(formPriceInEuros) * 100,
            manufacturer: formManufacturer,
            model: formModel,
            year: Number(formYear),
            mileageInKm: Number(formMileageInKm),
            fuelType: formFuelType,
            gearboxType: formGearboxType,
            carType: formCarType,
            color: formColor,
            numberOfDoors: Number(formNumberOfDoors),
            numberOfSeats: Number(formNumberOfSeats),
            taxHorsePower: Number(formTaxHorsePower),
            horsePower: Number(formHorsePower),
            equipments: formEquipments ? formEquipments.join(',') : null
        };

        // TODO figure out why the endpoint does not send a response
        return addCarOffer(params, (error, response) => {
            console.log('Error: ', error, ' Response: ', response);
            if (error) {
                return props.onError(error);
            }

            if (!response?.carOfferId) {
                return props.onError(new Error('Erreur inattendue.'));
            }

            //TODO handle file upload in HTTP request and file names
            /*uploadFiles({ carOfferId: response.carOfferId }, (error) => {
                if (error) {
                    props.onError(error);
                }

                return props.onSave();
            });*/
            return props.onSave();
        });
    };

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
            const formLabel = formSchema[key].fr;
            const formType = formSchema[key].type === 'textarea' ? 'text' : formSchema[key].type;
            const formAs = formSchema[key].type === 'textarea' ? formSchema[key].type : undefined;
            const isRequired = !['formDescription', 'formEquipments'].includes(key);

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
                    <Form.Label>{formLabel}</Form.Label>
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
                    {/*<Form.Group controlId="formFile" className="mb-3">
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
    </Form.Group>*/}
                    <Button
                        type="submit"
                        disabled={!formData || !Object.keys(formData).length}
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
