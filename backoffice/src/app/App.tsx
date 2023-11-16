import React, { FC, useEffect, useState } from 'react';
import { AddCarOfferModal, CarOffer, CarOffersComponent, Equipment } from '../carOffers';
import { EditOpeningHoursModal, OpeningHour, OpeningHoursComponent } from '../openingHours';
import { AddRatingModal, ManageRatingsModal, Rating, RatingsComponent } from '../ratings';
import { Service, ServicesComponent, ManageServicesModal, AddServiceModal } from '../services';
import { getHomePageData } from './api';
import { Button, Col, Container, Modal, Row, Toast, ToastContainer } from 'react-bootstrap';
import { LoginModal } from '../authentication';
import { AddUserModal } from '../accounts';

enum ModalContent {
    addCarOffer = 1,
    manageRatings,
    addRating,
    manageServices,
    addService,
    editOpeningHours,
    addUser
}

export const App: FC = () => {
    const [carOffers, setCarOffers] = useState<CarOffer[]>([]);
    const [equipmentsList, setEquipmentsList] = useState<Equipment[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
    const [loginModalShow, setLoginModalShow] = useState<boolean>(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [errorShow, setErrorShow] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const fetchData = () => {
        getHomePageData((error, homePageData) => {
            if (error) {
                if (error.message === 'Forbidden') {
                    setLoginModalShow(true);
                }

                return setError(error.message);
            }

            if (!homePageData) {
                return setError('Unexpected error.');
            }

            const { carOffers, equipmentsList, ratings, services, openingHours } = homePageData;

            setCarOffers(carOffers);
            setEquipmentsList(equipmentsList);
            setRatings(ratings);
            setServices(services);
            setOpeningHours(openingHours);
            setLoginModalShow(false);
        });
    };

    useEffect(() => fetchData, []);

    const onModalClose = () => {
        setModalShow(false);
        setModalContent(null);
    };

    const onModalError = (error: Error) => {
        setError(error.message);
        setErrorShow(true);
    };

    const renderModalContent = (modalContent: ModalContent | null) => {
        switch (modalContent) {
            case ModalContent.addCarOffer:
                return (
                    <AddCarOfferModal
                        equipmentsList={equipmentsList}
                        onClose={onModalClose}
                        onSave={fetchData}
                        onError={onModalError}
                    />
                );
            case ModalContent.addRating:
                return <AddRatingModal onClose={onModalClose} onSave={fetchData} onError={onModalError} />;
            case ModalContent.manageRatings:
                return (
                    <ManageRatingsModal
                        ratings={ratings}
                        onClose={onModalClose}
                        onSave={fetchData}
                        onError={onModalError}
                    />
                );
            case ModalContent.manageServices:
                return (
                    <ManageServicesModal
                        services={services}
                        onClose={onModalClose}
                        onSave={fetchData}
                        onError={onModalError}
                    />
                );
            case ModalContent.addService:
                return <AddServiceModal onClose={onModalClose} onSave={fetchData} onError={onModalError} />;
            case ModalContent.editOpeningHours:
                return (
                    <EditOpeningHoursModal
                        openingHours={openingHours}
                        onClose={onModalClose}
                        onSave={fetchData}
                        onError={onModalError}
                    />
                );
            case ModalContent.addUser:
                return <AddUserModal onClose={onModalClose} onSave={fetchData} onError={onModalError} />;
            default:
                return;
        }
    };

    return (
        <>
            <ToastContainer position="top-end" className="position-fixed">
                <Toast onClose={() => setErrorShow(false)} show={errorShow} delay={3000} autohide bg="danger">
                    <Toast.Body>Erreur: {error}</Toast.Body>
                </Toast>
            </ToastContainer>
            <LoginModal show={loginModalShow} onValidate={fetchData} onError={onModalError} />
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
                fullscreen="lg-down"
            >
                {renderModalContent(modalContent)}
            </Modal>
            <Container>
                <Row>
                    <Col md="9" style={{ textAlign: 'end' }}>
                        <h1>Console d&apos;administration GVP</h1>
                    </Col>
                    <Col md="3" style={{ textAlign: 'end' }}>
                        <Button
                            onClick={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.addUser);
                            }}
                            style={{ marginTop: '10px' }}
                        >
                            Ajouter un utilisateur
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <ServicesComponent
                            services={services}
                            manageServices={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.manageServices);
                            }}
                            addService={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.addService);
                            }}
                        />
                    </Col>
                    <Col lg="6">
                        <CarOffersComponent
                            carOffers={carOffers}
                            addCarOffer={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.addCarOffer);
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <OpeningHoursComponent
                            openingHours={openingHours}
                            edit={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.editOpeningHours);
                            }}
                        />
                    </Col>
                    <Col lg="6">
                        <RatingsComponent
                            ratings={ratings}
                            manageRatings={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.manageRatings);
                            }}
                            addRating={() => {
                                setModalShow(true);
                                setModalContent(ModalContent.addRating);
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
