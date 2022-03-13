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
import CheckBox from '@material-ui/core/Checkbox';
import _ from 'lodash';


const CheckList = () => {
    const [data, setData] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);

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
        const checkList = certs.map((cert) => {
            return {
                ...cert,
                checked: false,
            }
        })
        setData(checkList);
    }

    const handleClickOnRow = () => {
        console.log('aaaaaa');
    }

    const handleCheckAll = () => {
        setIsCheckAll(!isCheckAll);
        const listClone = _.cloneDeep(data);
        _.map(listClone, function (o) {
        _.set(o, 'checked', !isCheckAll);
        });
        setData(() => listClone);
    }

    const handleCheck = (e, index) => {
        console.log(e.target.value, index)
        const listClone = _.cloneDeep(data);
        listClone[index].checked = !listClone[index].checked;
        setData(() => _.cloneDeep(listClone));
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
                    <CheckBox checked={isCheckAll} onClick={handleCheckAll}></CheckBox>
                    {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableHead>
            <TableBody checkboxSelection>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <TableRow {...row.getRowProps()}>
                            <CheckBox id={i.toString()} checked={isCheckAll || data[i].checked} onClick={(e) => handleCheck(e, i)}></CheckBox>
                            {row.cells.map(cell => {
                                return (
                                    <>
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    </>
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

export default CheckList;
