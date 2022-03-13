import React, { useState, useEffect } from "react";
import Header from "./../layout/header";
import Footer from "./../layout/Footer";
import Navigation from "./navigation";
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable } from 'react-table'
import { getCerts } from "../helper/api";


const CertList = () => {
    const [data, setData] = useState([]);
    const columns = React.useMemo(
        () => [
        {
            Header: 'ID',
            accessor: 'studentId',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Test Date',
            accessor: 'testDate',
          },
          {
            Header: 'Valid Date',
            accessor: 'validDate',
          },
          {
            Header: 'Reading Score',
            accessor: 'reading',
          },
          {
            Header: 'Listening Score',
            accessor: 'listening',
          },
          {
            Header: 'Total Score',
            accessor: 'totalScore',
          },
          {
            Header: 'Upload Date',
            accessor: 'wrapTimestamp',
          },
        ],
        []
    )

    useEffect(async() => {
        await getData();
      }, []);

    const getData = async () => {
        const certs = await getCerts();
        setData(certs);
    }

    const handleClickOnRow = () => {
        console.log('aaaaaa');
    }


    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })

    console.log(data);
    return (
        <>
        <Header />
        <Navigation />
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <TableRow onClick={handleClickOnRow} {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </TableCell>
                        )
                    })}
                    </TableRow>
                )
                })}
            </TableBody>
            </MaUTable>
        <Footer />
        
        </>
    );
};

export default CertList;
