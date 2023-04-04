import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, InputGroup, Label, Row } from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-modal';
import { URLs } from "../../../../constants";
import { useUserManager } from "../../../../hooks/useUserManager";
import Api from "../../../../services/Api";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const ContractsBlock = (props) => {

    const UserManager = useUserManager();
    const token = UserManager.token;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState('');
    const [modalSuccessMessage, setModalSuccessMessage] = useState('');

    const modalTitle = props?.userData?.status === 1 ? "Inativar usuário" : "Ativar usuário?";
    const modalLabel = props?.userData?.status === 1 ? "INATIVAR" : "ATIVAR";

    const handleBlockConfirm = userData => {
        setIsSubmitting(true);
        const url = (userData.status === 1 ? URLs.users.block : URLs.users.unblock).replace('{id}', userData.id);
        Api({
            method: 'put',
            url: url,
            data: {},
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.status === 200) {
                    setModalSuccessMessage(response.data.message);
                    setModalErrorMessage('');
                    props?.updateRequest();
                    props?.closeModal();
                } else {
                    setModalSuccessMessage('');
                    setModalErrorMessage(response.data.message);
                    setIsSubmitting(false);
                }
            })
            .catch(err => {
                const msg = err?.data?.message || err?.response?.data?.message || 'Erro inesperado ao tentar alterar os dados do usuário.';
                setIsSubmitting(false);
                setModalSuccessMessage('');
                setModalErrorMessage(msg);
            })
    };

    const afterOpenModal = () => {
        setIsSubmitting(false);
        setModalErrorMessage('');
        setModalSuccessMessage('');
    }


    //Funções de alteração dos dados do usuário
    return (
        <Modal
            isOpen={props?.modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={props?.closeModal}
            style={customStyles}
            contentLabel={modalTitle}
            className=""
            ariaHideApp={false}
        >
            <h2>{props?.title}</h2>
            <Row>
                <Col>
                    <h3>Tem certeza que deseja {modalLabel} o usuário <strong>"{props?.userData?.name}"</strong>? </h3>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    {modalErrorMessage && <p className="mb-1 text-error text-small">{modalErrorMessage}</p>}
                    {modalSuccessMessage && <p className="mb-1 text-success text-small">{modalSuccessMessage}</p>}
                </Col>
            </Row>
            <Row>
                <Col>
                    <React.StrictMode>
                        <Button type="submit" className="mx-2" color="danger" onClick={props?.closeModal}>Cancelar</Button>
                        <Button type="submit" className="mx-2" color="primary" onClick={() => handleBlockConfirm(props?.userData)} disabled={isSubmitting} >Confirmar</Button>
                    </React.StrictMode>
                </Col>
            </Row>
        </Modal>
    )
}

export default ContractsBlock;
