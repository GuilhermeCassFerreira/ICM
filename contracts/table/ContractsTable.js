import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Tr, Th } from '../../../../components/OrderedTable/OrderedTable';

const   EmailTable = props => {

    const data = props?.data;

    return (
        <>
            <Table striped bordered hover col="12">
                <thead>
                    <Tr handleOrderBy={props?.handleOrderBy || null} >
                        <Th param='number'>Contrato</Th>
                        <Th param='company'>Empresa</Th>
                        <Th param='uf' className="text-center" >UF</Th>
                        <Th param='ok'>Previsão (km)</Th>
                        <Th param='status' className="text-center" >Status</Th>
                        <Th param='start_date' className="text-center" >Dt. Início</Th>
                        <Th param='end_date' className="text-center" >Dt. Término</Th>
                        <Th param='users'>Usuários</Th>
                        <th param='contract'>Ação</th>
                    </Tr>
                </thead>
                <tbody>
                    {
                        data?.length > 0 ?
                            data?.map((record, id) => {
                                return (
                                    <tr key={id}>
                                        <td style={{ "whiteSpace": "nowrap" }}>{record?.number}</td>
                                        <td>{record?.company}</td>
                                        <td className={"text-center "}>{record?.state}</td>
                                        <td align="right">{record?.km?.toLocaleString('pt-BR', { minimumFractionDigits: 3 })}</td>
                                        <td align="center">{record?.status || ''}</td>
                                        <td align="center">{record?.start_date || ''}</td>
                                        <td align="center">{record?.end_date || ''}</td>
                                        <td>{record?.users?.map(user => <label key={user.id} className="badge badge-secondary badge-small mx-1">{user.name}</label>)}</td>
                                        <td className={"text-center "}>
                                            {
                                                !props.permissions?.contracts ? '' :
                                                    <React.StrictMode>
                                                        <button name="edit-contract" className="btn btn-primary btn-icon-small" title="Editar contrato"
                                                            onClick={() => { props?.handleUpdateRecord(record); }}>
                                                            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                                                        </button>
                                                    </React.StrictMode>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr key={0}><td colSpan={13} align="center">Nenhum registro retornado</td></tr>
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ContractsTable;
