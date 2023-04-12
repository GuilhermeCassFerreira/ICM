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
    //Adiciona o usuário à lista de acesso
    const handleCompanySuggestionSelected = (suggestion, values, setValues) => {
        if (values === null || setValues === null) return;
        setValues({ ...values, ...{ company_id: suggestion.id } });
        setCompanyName(suggestion.name);
        setCompaniesSuggestions([]);
        return suggestion.name;
    }
    //Render the suggested user list
    const renderCompaniesSuggestions = suggestion => {
        return (
            <DropdownItem tag="label" className="suggestion-item" key={suggestion.id}>
                {suggestion.name}
            </DropdownItem>
        )
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

    yup.addMethod(yup.string, "start_date", function (errorMessage) {
        return this.test(`test-start-date`, errorMessage, function (value) {
            const { path, createError } = this;
            const isValid = dateIsValid(value);
            return isValid ? true : createError({ path, message: errorMessage });
        });
    });
    yup.addMethod(yup.string, "end_date", function (errorMessage) {
        return this.test(`test-end-date`, errorMessage, function (value) {
            const { path, createError } = this;
            const isValid = dateIsValid(value);
            value = value ? value : '';
            return isValid || value === '' ? true : createError({ path, message: errorMessage });
        });
    });
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
        company_id: yup.number()
            .required('É necessário selecionar uma empresa.'),
        state: yup.string()
            .required('É necessário selecionar um estado.'),
        description: yup.string()
            .min(1, 'A descrição precisa ter ao menos 1 caracter.')
            .required('É necessário informar a descrição do contrato.'),
        status_id: yup.number()
            .required('É necessário selecionar uma situação.'),
        start_date: yup.string()
            .start_date('Formato de data inválido.')
            .required('É necessário informar a data de início.'),
        end_date: yup.string()
            .end_date('Formato de data inválido.')
            .biggerThen('A data final deve ser maior que a data inicial.')
    });

    const contractInitialValues = {
        id: props?.contractData?.id || '',
        number: props?.contractData?.number || '',
        state: props?.contractData?.state || '',
        company_id: props?.contractData?.company_id || '',
        description: props?.contractData?.description || '',
        status_id: props?.contractData?.status_id || '',
        start_date: props?.contractData?.start_date || '',
        end_date: props?.contractData?.end_date || '',
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
            isOpen={props?.modalIsOpen}
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
                            <div className="col-4 pl-1">
                                <Label htmlFor="state">UF</Label>
                                <Field as="select" name="state" className="col-12"
                                    defaultValue={formikProps?.values?.state || ''} value={formikProps?.values?.state || ''}
                                    onChange={e => handleStateChange(e.target.value, formikProps.values, formikProps.setValues)}
                                >
                                    <option value="" ></option>
                                    {
                                        (!states?.data?.map)
                                            ? <option value="" >Carregando lista de estados...</option>
                                            : (
                                                states?.data?.map((opt, id) => (
                                                    <option key={id} value={opt} defaultValue={props?.meshData?.state} >{opt}</option>
                                                ))
                                            )
                                    }
                                </Field>

                                <ErrorMessage component="span" name="state" className="text-error text-small" />
                            </div>
                        </InputGroup>


                        <InputGroup className="mb-3" >
                            <Label htmlFor="users" >Empresa</Label>
                            <DropDown className="col-12"
                                name="company_id"
                                placeholder="Buscar empresa"
                                selectedValue={company_name}
                                suggestions={companiesSuggestions}
                                onSuggestionsFetchRequested={onCompaniesSuggestionsFetchRequested}
                                renderSuggestion={renderCompaniesSuggestions}
                                getSuggestionValue={suggestion => {
                                    handleCompanySuggestionSelected(suggestion, formikProps.values, formikProps.setValues);
                                }}

                                formValues={formikProps.values}
                                onSetValues={formikProps.setValues}
                            />
                            <ErrorMessage component="span" name="company_id" className="text-error text-small" />
                        </InputGroup>
                        <InputGroup className="mb-3" >
                            <Label htmlFor="description">Descrição</Label>
                            <Field name="description" type="text" placeholder="Descrição do contrato" className="col-12" />
                            <ErrorMessage component="span" name="description" className="text-error text-small" />
                        </InputGroup>
                        <InputGroup className="mb-3" >
                            <Label htmlFor="users" >Situação</Label>
                            <Field as="select" name="status_id" className="col-12" >
                                <option value="" ></option>
                                {
                                    (!status_list?.data?.map)
                                        ? <option value="" >Carregando lista de situações</option>
                                        : (
                                            status_list?.data?.map((opt, id) => (
                                                <option key={id} value={opt.id} defaultValue={props?.userGroupData?.status_id} >{opt.name}</option>
                                            ))
                                        )
                                }
                            </Field>

                            <ErrorMessage component="span" name="status_id" className="text-error text-small" />
                        </InputGroup>
                        <InputGroup className="mb-3" >
                            <div className="col-6 pr-1">
                                <Label htmlFor="start_date">Data de início</Label>
                                <InputMask
                                    name="start_date"
                                    type="text"
                                    className="col-12"
                                    mask='99/99/9999'
                                    placeholder='DD/MM/YYYY'
                                    value={formikProps.values.start_date}
                                    onChange={({ target: { value } }) => formikProps.setValues({ ...formikProps.values, ...{ start_date: value } })}
                                />
                                <ErrorMessage component="span" name="start_date" className="text-error text-small" />
                            </div>
                            <div className="col-6 pl-1">
                                <Label htmlFor="end_date">Data de término</Label>
                                <InputMask
                                    name="end_date"
                                    type="text"
                                    className="col-12"
                                    mask='99/99/9999'
                                    placeholder='DD/MM/YYYY'
                                    value={formikProps.values.end_date}
                                    onChange={({ target: { value } }) => formikProps.setValues({ ...formikProps.values, ...{ end_date: value } })}
                                />
                                <ErrorMessage component="span" name="end_date" className="text-error text-small" />
                            </div>
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

export default ContractsForm;
