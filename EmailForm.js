import React, { useState } from "react";
import { Row, Col, Button, Form, InputGroup, Label, DropdownItem } from 'reactstrap';
import { URLs, useReplaceParams } from '../../../../constants';

import Modal from 'react-modal';
import { ErrorMessage, Field, Formik } from 'formik';
import InputMask from 'react-input-mask';

import * as yup from 'yup';
import { useFetch } from "../../../../hooks/useFetch";
import { useUserManager } from "../../../../hooks/useUserManager";
import Api from "../../../../services/Api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import DropDown from "../../../../components/Autocomplete/DropDown";

import "./ContractsForm.scss";
import { useToasts } from "react-toast-notifications";

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
const ContractsForm = (props) => {
    const replaceParams = useReplaceParams;
    const { addToast } = useToasts();

    const UserManager = useUserManager();
    const token = UserManager.token;

    const [modalErrorMessage, setModalErrorMessage] = useState('');
    const [modalSuccessMessage, setModalSuccessMessage] = useState('');

    const states = useFetch(replaceParams(URLs.services.states.list, {}));
    
    const status_list = useFetch(URLs.contracts.status);

    const handleContractSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const method = values.id ? 'put' : 'post';
        const url = replaceParams(URLs.contracts.index, { id: values.id ? `${values.id}` : '' });
        //console.log(url);

        Api({
            method: method,
            url: url,
            data: values,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //console.log('RESPONSE: ', response.status, response.data);
                if (response.data && response.status === 200) {
                    addToast(response.data.message, { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 });
                    setModalSuccessMessage('');
                    setModalErrorMessage('');
                    props?.updateRequest();
                    props?.closeModal();
                } else {
                    setModalSuccessMessage('');
                    setModalErrorMessage(response.data.message);
                }
                setSubmitting(false);
            })
            .catch(err => {
                const msg = err?.data?.message || err?.response?.data?.message || 'Erro inesperado ao tentar alterar os dados do contrato.';
                setModalSuccessMessage('');
                setModalErrorMessage(msg);
                setSubmitting(false);
            })
    };

    const handleStateChange = (state, values, setValues) => {
        setValues({ ...values, ...{ state: state, highway: '' } });
    }

    /**
     * Consulta por empresas
     */
    const [companiesSuggestions, setCompaniesSuggestions] = useState([]);
    const [company_name, setCompanyName] = useState(props?.contractData?.company || '');
    const onCompaniesSuggestionsFetchRequested = async ({ value, reason }) => {
        if (reason !== 'input-changed') return;
        try {
            Api({
                method: 'get',
                url: replaceParams(URLs.contracts.companies, { company: value }),
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setCompaniesSuggestions(response.data);
                })
                .catch(err => {
                    const msg = err?.data?.message || err?.response?.data?.message || 'Erro inesperado ao tentar alterar os dados da empresa.';
                    setModalSuccessMessage('');
                    setModalErrorMessage(msg);
                })
        } catch (error) {
            console.log(error)
        }
    }


    /**
     * Consulta por usuários
     */
    const [selectedUsers, setSelectedUsers] = useState(props?.contractData?.users || []);
    const [usersSuggestions, setUsersSuggestions] = useState([]);
    const onUserSuggestionsFetchRequested = async ({ value, reason }) => {
        if (reason !== 'input-changed') return;
        try {
            Api({
                method: 'get',
                url: replaceParams(URLs.contracts.users, { name: value }),
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUsersSuggestions(response.data);
                })
                .catch(err => {
                    const msg = err?.data?.message || err?.response?.data?.message || 'Erro inesperado ao tentar alterar os dados do usuário.';
                    setModalSuccessMessage('');
                    setModalErrorMessage(msg);
                    //                setSubmitting(false);
                })
        } catch (error) {
            console.log(error)
        }
    }
    //Adiciona o usuário à lista de acesso
    const handleUserSuggestionSelected = (suggestion, values, setValues) => {
        if (values === null || setValues === null) return;

        if (!values.users.includes(suggestion.id)) {
            const sUsers = selectedUsers.concat([suggestion]);
            setSelectedUsers(sUsers);
            setValues({ ...values, ...{ users: sUsers.map(user => user.id) } });
        }
        setUsersSuggestions([]);
        return suggestion.name;
    }
    //Render the suggested user list
    const renderUserSuggestion = suggestion => {
        return (
            <DropdownItem tag="label" className="suggestion-item" key={suggestion.id}>
                {suggestion.name}
            </DropdownItem>
        )
    }
    //Remove a selected user from list
    const onRemoveUserClick = (user_id, values, setValues) => {
        const sUsers = selectedUsers.filter(user => user.id !== user_id);
        setSelectedUsers(sUsers);
        setValues({ ...values, ...{ users: sUsers.map(user => user.id) } });
    }

    const dateIsValid = date => {
        const val = `${date}`;
        const arr = val.split('/');
        if (arr.length < 3) return false;

        const cleared = val.replace(/\D/g, "");
        const d = new Date(arr[2], arr[1], arr[0]);
        const isValid = (cleared === '' || (!isNaN(d.getTime()) && cleared.length === 8));
        return isValid;
    }
    const daysBetween = (date1, date2) => {
        date1 = `${date1}`.replace(/[^0-9 ]/g, "");
        date2 = `${date2}`.replace(/[^0-9 ]/g, "");
        if (date1.length < 8 || date2.length < 8) return true;

        const arr1 = [date1.substr(0, 2), date1.substr(2, 2), date1.substr(4)];
        const d1 = new Date(arr1[2], arr1[1], arr1[0]);

        const arr2 = [date2.substr(0, 2), date2.substr(2, 2), date2.substr(4)];
        const d2 = new Date(arr2[2], arr2[1], arr2[0]);
        //console.log('d2 - d1', d2 - d1);
        return d2 - d1;
    }

;

    yup.addMethod(yup.string, "biggerThen", function (errorMessage) {
        return this.test(`test-date-bigger-then`, errorMessage, function (value) {
            const { path, createError } = this;
            const start_date = this.parent?.start_date || '';
            const isValid = daysBetween(start_date, value) > 0;
            return isValid || value === '' ? true : createError({ path, message: errorMessage });
        });
    });

    const contractValidations = yup.object().shape({
        number: yup.string()
            .min(1, 'O número do contrato precisa ter ao menos 1 dígito.')
            .required('É necessário informar o número do contrato.'),
        assunto: yup.string()
            .min(1, 'A descrição precisa ter ao menos 1 caracter.')
            .required('É necessário informar a descrição do contrato.'),
        corpo: yup.string()
            .min(1, 'A descrição precisa ter ao menos 1 caracter.')
            .required('É necessário informar a descrição do contrato.'),

    });

    const contractInitialValues = {
        id: props?.contractData?.id || '',
        number: props?.contractData?.number || '',
        assunto: props?.contractData?.assunto || '',
        corpo: props?.contractData?.corpo || '',
        users: props?.contractData?.users?.map(user => user.id) || []
    }

    const afterOpenModal = () => {
        setModalErrorMessage('');
        setModalSuccessMessage('');

        setCompanyName(props?.contractData?.company || '');
        setSelectedUsers(props?.contractData?.users || []);
    }


    //Funções de alteração dos dados do usuário
    return (
        <Modal
            isOpen={props?.modalIsOpen}//é 
            onAfterOpen={afterOpenModal}
            onRequestClose={props?.closeModal}
            style={customStyles}
            contentLabel={props?.title}
            className=""
            ariaHideApp={false}
        >
            <Row>
                <Col className="col-12 d-flex align-items-center">
                    <h2 className="flex-grow-1">
                        {props?.title}
                    </h2>
                    <React.StrictMode>
                        <Button type="button" className="btn-modal-close mx-1" color="secondary" onClick={props?.closeModal} >
                            <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        </Button>
                    </React.StrictMode>
                </Col>
            </Row>
            <Formik
                initialValues={contractInitialValues}
                validationSchema={contractValidations}
                onSubmit={handleContractSubmit}
            >{formikProps => {
                return (
                    <Form onSubmit={formikProps.handleSubmit}>
                        {modalErrorMessage && <p className="mb-1 text-error text-small">{modalErrorMessage}</p>}
                        {modalSuccessMessage && <p className="mb-1 text-success text-small">{modalSuccessMessage}</p>}
                        <Field type="hidden" name="id" />

                        <InputGroup className="mb-3" >
                            <div className="col-8 pr-1">
                                <Label htmlFor="number">Número</Label>
                                <Field name="number" type="text" placeholder="Número do contrato" className="col-12" />
                                <ErrorMessage component="span" name="number" className="text-error text-small" />
                            </div>
                        </InputGroup>

                        <InputGroup className="mb-3" >
                            <Label htmlFor="assunto">Assunto</Label>
                            <Field name="description" type="text" placeholder="Assunto do Email" className="col-12" />
                            <ErrorMessage component="span" name="assunto" className="text-error text-small" />
                        </InputGroup>
                        <InputGroup className="mb-3" >
                            <Label htmlFor="corpo">Corpo</Label>
                            <Field name="description" type="text" placeholder="Corpo do email" className="col-12" />
                            <ErrorMessage component="span" name="corpo" className="text-error text-small" />
                        </InputGroup>

                        <InputGroup className="mb-3" >
                            <Label htmlFor="users" >Usuários</Label>
                            <DropDown className="col-12"
                                placeholder="Buscar usuário"
                                suggestions={usersSuggestions}
                                onSuggestionsFetchRequested={onUserSuggestionsFetchRequested}
                                renderSuggestion={renderUserSuggestion}
                                clearOnSelect={true}

                                formValues={formikProps.values}
                                onSetValues={formikProps.setValues}
                                getSuggestionValue={suggestion => {
                                    handleUserSuggestionSelected(suggestion, formikProps.values, formikProps.setValues);
                                }}
                            />
                            <ErrorMessage component="span" name="type_id" className="text-error text-small" />
                            <div className="selected-users-list" >
                                {selectedUsers.map((user, key) => {
                                    return (<div key={key}>
                                        <Field key={`f-` + key} name="users[]" type="hidden" value={user.id} />
                                        <Label key={`l-` + key} className="selected-user m-1" title={user.email}>
                                            {user.name}
                                            <FontAwesomeIcon icon={faTimes} className="m-1" title="Remover este usuário da lista"
                                                onClick={() => onRemoveUserClick(user.id, formikProps.values, formikProps.setValues)} />
                                        </Label>
                                    </div>)
                                })
                                }
                            </div>
                        </InputGroup>
                        <Row>
                            <Col className="mb-3 col-6" >
                                <React.StrictMode>
                                    <Button type="button" className="mx-2" color="danger" onClick={props?.closeModal}>Cancelar</Button>
                                    <Button type="submit" className="mx-2" color="primary" disabled={formikProps.isSubmitting}>Salvar</Button>
                                </React.StrictMode>
                            </Col>
                        </Row>
                    </Form>
                )
            }}</Formik>
        </Modal>
    )
}

export default EmailForm;
