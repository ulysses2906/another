import React , { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../images/background.jpg'
import Axios from 'axios';



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

    .FormContainer{
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 20px;
        height: fit-content;
        border-radius: 10px;
        background: white;
        box-shadow: 0 0 10px gray;
    }

    .FormContainer h3{
        font-size: 25px;
        margin-bottom: 20px;
        color: red;
        text-align: center
    }

    .ButtonControl{
        width: fit-content;
        height: fit-content;
        margin: auto;
        margin-top: 14px;
    }

    .ButtonControl button{
        padding: 9px 13px;
        color: black;
        background: dodgerblue;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: .3s;
    }

    label{
        font-size: 13px;
        font-weight: 600;
    }

    p{
        color: dodgerblue;
      
    }
    
    .center{
        margin-bottom: 20px;
    }

    .center label{
        color: red;
    }

    .OptionControl{
        display: flex;
        margin: auto;
    }

    .OptionControl a{
        text-decoration: none;
        margin-top: 20px;
        border: 1px solid red;
        padding: 6px 13px;
        background: red;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        transition: .3s;
        margin-left: 10px;
    }

    .OptionControl .Yes{
        background: dodgerblue;
        border: none;
    }

    .OptionControl a:hover{
        box-shadow: 0 0 10px red;
    }

    .OptionControl .Yes:hover{
        box-shadow: 0 0 10px dodgerblue; 
    }

`;







export function DeletePage(props){
    const history = useHistory();
    const [viewDelete, setViewDelete] = useState([]);

    const deleteContact = (id) => {
        Axios.delete(`http://localhost:3001/deleteContact/${id}`)
        alert("Data Deleted");
        setTimeout(() => history.push("/"), 500)
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/viewContact/"+props.match.params.id).then((response) => {
            setViewDelete(response.data)
        })
       
    });

    return <Container>
         
         <div className="Navbar">
            <h2>React Project Assessment</h2>
        </div>
           
            <div className="FormContainer">
                

            <h3>Are you sure you want to delete this data?</h3>

                {viewDelete.map((vals, key) => {
                return (
                    <div className="center">
                        <div className="ContentControl">
                            <label>ID:&nbsp;&nbsp;</label>{vals.id}
                        </div>

                        <div className="ContentControl">
                            <label>Full Name:&nbsp;&nbsp;</label>{vals.fullName}
                        </div>

                        <div className="ContentControl">
                            <label>Email:&nbsp;&nbsp;</label>{vals.email}
                        </div>

                        <div className="ContentControl">
                            <label>Contact:&nbsp;&nbsp;</label>{vals.contactNumber}
                        </div>

                        <div className="ContentControl">
                            <label>Location:&nbsp;&nbsp;</label>{vals.location}
                        </div>

                        <div className="ContentControl bottom-space">
                            <label>Registered Date:&nbsp;&nbsp;</label>{vals.registeredDate}
                        </div>
                    </div>
                )
                })}



            {viewDelete.map((vals, key) => {
                return (    
                <div className="OptionControl">
                    <div className="LinkControl"><Link to="/" >Back</Link></div>
                    <div className="LinkControl"><Link className="Yes" onClick={() => {deleteContact(vals.id)}} to="/" >Yes</Link></div>
                </div>

                )
            })}

            </div>

    </Container>
}