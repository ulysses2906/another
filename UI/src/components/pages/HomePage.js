import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Background from '../images/background.jpg';
import Axios from 'axios';
import _ from 'lodash';
import { TablePagination } from '@material-ui/core';



const Container = styled.div`
    width: 100%;    
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${Background})no-repeat center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position: relative;

    .Navbar{
        width: 100%;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        background: dodgerblue;

    }

    .Navbar h2{
        color: white;
    }


    .TableContainer{
        width: 80%;
        height: fit-content;
        box-shadow: 0 0 5px gray;
        background: white;
    }

    table{
        width: 100%;
        border-collapse: collapse;
        
    }

    thead{
        background: dodgerblue;  
        
    }

    thead.TableHead{
        border: 1px solid lightblue;
    }

    th.TableButton button{
        font-size: 13px;
        padding: 9px 10px;
        font-weight: 600;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: .3s;
    }

    th.TableButton button a{
        color: dodgerblue;
        text-decoration: none;
    }

    th.TableButton button:hover{
        box-shadow: 0 0 5px white;
    }

    th.TableTitle{
        font-size: 23px;
    }

    th{
        font-size: 18px;
        padding: 10px 0px;
        color: white;
    }

    tr{
        
        border-bottom: 1px solid rgba(170, 169, 169, 0.282);
    }

    td{
        padding: 20px 5px;
        color: gray;
        text-align: center;
    }

    td a{
        text-decoration: none;
        color: white;
        border-radius: 5px;
    }

    td .blue{
        background: blue;
        padding: 5px 10px;
        transition: .3s;
    }

    td .blue:hover{
        color: yellow;
        box-shadow: 0 0 10px blue;
    }

    td .green{
        background: green;
        padding: 5px 10px;
        transition: .3s;
    }

    td .green:hover{
        color: yellow;
        box-shadow: 0 0 10px green;
    }

    td .red{
        background: red;
        padding: 5px 10px;
        transition: .3s;
    }

    td .red:hover{
        color: yellow;
        box-shadow: 0 0 10px red;
    }


    nav{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    nav ul{
        display: flex;
        list-style: none;
        color: white;
        margin-bottom: 10px;
    }

    nav ul li{
        padding: 2px 5px;
        color: black;
        background: white;
        border: 1px solid dodgerblue;
        cursor: pointer;
    }
    nav ul li.active-page{
        background: dodgerblue;
        color: white;
    }
    p{
        color: black;
    }

    .component{
        margin-left: 100px;
    }

    .Showing{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .Showing p{
        color: dodgerblue;
        font-size: 12;
    }

`;




export function HomePage(props){
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [contactList, setContactList] = useState([]);
   


    useEffect(() => {
        Axios.get("http://localhost:3001/contacts").then((response) => {
            setContactList(response.data)
        });
    }, []);





    return <Container>

        <div className="Navbar">
            <h2>React Project Assessment</h2>
        </div>

        <div className="TableContainer">
            <table>
                <thead className="TableHead">
                    <th colspan="2" className="TableTitle" >Contact List</th>
                    <th colspan="4"></th>
                    <th colspan="3" className="TableButton"><button><Link to="/AddPage">Add Contact</Link></button></th>
                </thead>
                <thead>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Location</th>
                    <th>Registered Date</th>
                    <th colspan="3">Action</th>
                </thead>
                <tbody>
                {contactList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, key) => {
                        return (
                            <tr>
                                <td>{val.id}</td>
                                <td>{val.fullName}</td>
                                <td>{val.email}</td>
                                <td>{val.contactNumber}</td>
                                <td>{val.location}</td>
                                <td>{val.registeredDate}</td>
                                <td><Link className="blue" to={'/ViewPage/' +val.id}>View</Link></td>
                                <td><Link className="green" to={'/UpdatePage/' +val.id}>Update</Link></td>
                                <td><Link className="red" to={'/DeletePage/' +val.id}>Delete</Link></td>
                            </tr>
                        )
                    })}
                </tbody>    
                
            </table>
            <div className="Showing">   
            <p>Showing</p>
            
            <TablePagination
                onPageChange={handleChangePage}
                rowsPerPageOptions={5}
                count={contactList.length}
                rowsPerPage={5}
                page={page}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
        </div>
    </Container>
}