import React, { useState, useEffect } from "react";
import { Button, Form } from 'reactstrap';
import ContentWrapper from "../../shared/ContentWrapper/ContentWrapper";
import FilterContainer, { FilterFields } from "../../../containers/FilterContainer/FilterContainer";
import { useFetch } from "../../../hooks/useFetch";

import ContractsTable from "./table/ContractsTable";
import ContractsForm from "./popup/ContractsForm";

import { MonthNames, URLs, useReplaceParams } from '../../../constants';
import Paginator from "../../../components/Paginator/Paginator";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useUserManager } from "../../../hooks/useUserManager";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatesDropDown from "../../../components/StatesDropDown";
import FileDownloader from "../../../components/FileDownloader/FileDownloader";

const Contracts = props => {
    const replaceParams = useReplaceParams;
    const UserManager = useUserManager();

    let startYear = props?.startYear || 2015;
    const yearList = Array(parseInt(new Date().getFullYear() + 1) - startYear).fill().map(() => startYear++);

    let initialMonth = parseInt(new Date().getMonth()) + 1;
    let initialYear = parseInt(new Date().getFullYear());
    initialYear = initialMonth === 1 ? initialYear - 1 : initialYear
    initialMonth = initialMonth === 1 ? 12 : initialMonth - 1;

    const [params, setParams] = useState({
        year: initialYear,
        month: initialMonth,
        number: '',
        company: '',
        state: 'all',
        nocache: new Date().getTime(),
        pg: 1,
        orderBy: '',
        orderDir: 'asc'
    });

    const [formModalIsOpen, setFormModalIsOpen] = useState(false);
    const [formModalTitle, setModalTitle] = useState('Cadastrar Contrato');
    const [contractData, setContractData] = useState({});

    //Consulta de dados de levantamentos
    let { data, error, last_page } = useFetch(replaceParams(URLs.contracts.list, params));
    const [isLoading, setIsLoading] = useState(!data && !error);
    useEffect(() => {
        setIsLoading(!data && !error);
    }, [data, error]);

    const handleYearChange = e => setParams({ ...params, ...{ year: e.target.value, pg: 1 } });
    const handleMonthChange = e => setParams({ ...params, ...{ month: e.target.value, pg: 1 } });
    const handleContractNumberChange = e => setParams({ ...params, ...{ number: e.target.value, pg: 1 } });
    const handleCompanyNameChange = e => setParams({ ...params, ...{ company: e.target.value, pg: 1 } });
    const handleStateChange = e => setParams({ ...params, ...{ state: e.target.value, pg: 1 } });
    const handleOrderBy = (orderBy, orderDir) => setParams({ ...params, ...{ orderBy: orderBy, orderDir: orderDir, pg: 1 } });

    const updateRequest = () => {
        setParams({ ...params, ...{ nocache: new Date().getTime() } });
    }
    /**
     * Formulário de cadastro de registro
     */
    function openFormModal() { setFormModalIsOpen(true); }
    function closeFormModal() { setFormModalIsOpen(false); }
    const handleNewContract = e => {
        e.preventDefault();
        setContractData({});
        setModalTitle("Cadastrar Contrato");
        setFormModalIsOpen(true);
    }
    const handleUpdateContract = (contract) => {
        setContractData(contract);
        setModalTitle("Editar Contrato");
        setFormModalIsOpen(true);
    }

    const handleNavigateFirst = e => setParams({ ...params, ...{ pg: 1 } });
    const handleNavigateLast = e => setParams({ ...params, ...{ pg: last_page } });
    const handleNavigateNext = e => setParams({ ...params, ...{ pg: data?.length > 0 ? params.pg + 1 : params.pg } });
    const handleNavigatePrevious = e => setParams({ ...params, ...{ pg: params.pg > 1 ? params.pg - 1 : 1 } });

    return (
        <ContentWrapper className="contracts" title="Contratos">
            <FilterContainer title="Filtros">
                <FilterFields>
                    <Form className="login d-flex mb-3 flex-wrap">
                        <fieldset className="col-2">
                            <label htmlFor="year">Ano</label>
                            <select name="year" id="filter-year" defaultValue={initialYear} onChange={handleYearChange} >
                                {
                                    yearList.map((year, key) => <option key={key} value={year} >{year}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="col-2">
                            <label htmlFor="month">Mês</label>
                            <select name="month" id="filter-month" defaultValue={initialMonth} onChange={handleMonthChange} >
                                {
                                    Object.keys(MonthNames).map((id, key) => <option key={key} value={id}>{MonthNames[id]}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="col-1">
                            <label htmlFor="filterByState">UF</label>
                            <StatesDropDown onChange={handleStateChange} name="filterByState" />
                        </fieldset>
                        <fieldset className="col-2">
                            <label htmlFor="contractNumber">Contrato</label>
                            <input type="text" name="contractNumber" value={params?.number} onChange={handleContractNumberChange} />
                        </fieldset>
                        <fieldset className="col-2">
                            <label htmlFor="companyName">Empresa</label>
                            <input type="text" name="companyName" value={params?.company} onChange={handleCompanyNameChange} />
                        </fieldset>
                        <fieldset className=''>
                            {
                                !UserManager.checkPermission('contracts') ? '' :
                                    <React.StrictMode>
                                        <Button type="submit" onClick={handleNewContract} outline color='custom' className="btn btn-primary btn-icon-left">
                                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                            Novo Contrato
                                        </Button>
                                    </React.StrictMode>
                            }
                        </fieldset>
                        <fieldset className=''>
                            {
                                !UserManager.checkPermission('contracts') ? '' :
                                    <React.StrictMode>
                                        <Button type="submit" onClick={handleNewContract} outline color='custom' className="btn btn-primary btn-icon-left">
                                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                            Email
                                        </Button>
                                    </React.StrictMode>
                            }
                        </fieldset>
                        <fieldset className="col-1">
                            {isLoading && <LoadingSpinner />}
                        </fieldset>
                    </Form>
                </FilterFields>
            </FilterContainer>
            <div className="page-content">
                <div className="col-12 d-flex flex-row-reverse justify-content-between align-items-center">
                    <Paginator
                        pg={params.pg}
                        last_page={last_page}
                        hasPrevious={params.pg > 1}
                        hasNext={(last_page !== null && last_page > params.pg) || (last_page === null && data?.length > 0)}
                        handleNavigateFirst={handleNavigateFirst}
                        handleNavigateNext={handleNavigateNext}
                        handleNavigatePrevious={handleNavigatePrevious}
                        handleNavigateLast={handleNavigateLast}
                    />
                    {URLs.contracts.export &&
                        <div className="d-flex">
                            <FileDownloader url={replaceParams(URLs.contracts.export, { ...params, ...{ ext: 'pdf' } })} filename="contratos" label="Exportar PDF" extension="pdf" />
                            <FileDownloader url={replaceParams(URLs.contracts.export, { ...params, ...{ ext: 'csv' } })} filename="contratos" label="Exportar CSV" extension="csv" className="mx-2" />
                        </div>
                    }
                </div>
                <ContractsTable data={data} permissions={UserManager.permissions}
                    handleOrderBy={handleOrderBy}
                    openModal={openFormModal}
                    handleNewRecord={handleNewContract}
                    handleUpdateRecord={handleUpdateContract}
                />
                <Paginator
                    pg={params.pg}
                    last_page={last_page}
                    hasPrevious={params.pg > 1}
                    hasNext={(last_page !== null && last_page > params.pg) || (last_page === null && data?.length > 0)}
                    handleNavigateFirst={handleNavigateFirst}
                    handleNavigateNext={handleNavigateNext}
                    handleNavigatePrevious={handleNavigatePrevious}
                    handleNavigateLast={handleNavigateLast}
                />
                <ContractsForm updateRequest={updateRequest} modalIsOpen={formModalIsOpen} contractData={contractData} closeModal={closeFormModal} title={formModalTitle} />
            </div>
        </ContentWrapper>
    )
}

export default Contracts;
