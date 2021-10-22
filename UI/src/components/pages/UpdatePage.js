import React , { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../images/background.jpg'
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
        padding: 20px 0px;
        height: fit-content;
        border-radius: 10px;
        background: white;
        box-shadow: 0 0 10px gray;
    }

    .FormContainer h3{
        font-size: 25px;
        margin-bottom: 20px;
        color: dodgerblue;
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

    .ButtonControl a{
        padding: 8px 13px;
        text-decoration: none;
        margin: 10px;
        color: black;
        background: dodgerblue;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: .3s;
    }

    .ButtonControl button:hover{
        box-shadow: 0 0 5px black;
    }

    .ButtonControl a.RedButton{
        background: red;
    }

    .ButtonControl a.RedButton:hover{
        box-shadow: 0 0 10px red;
    }

    select{
        width: 100%;
        padding: 5px 0px;
        color: black;
        padding-left: 5px;
        margin-top: 3px;
        margin-bottom: 7px;
    }

    label{
        font-size: 13px;
        font-weight: 600;
    }

    p{
        color: red;
        font-size: 13px;
        text-align: center;
        margin-top: 5px;
    }

`;



const InputControl = styled.div`
    display: block; 

    input{
        width: 97%;
        padding: 5px 0px;
        color: black;
        padding-left: 5px;
        margin-top: 3px;
        margin-bottom: 7px;
    }

    label{
        font-size: 12px;
        color: dodgerblue;
        font-weight: 600;
    }

`; 








const DataToUpdate = styled.div`
    width: 20%;
    margin-bottom: 150px;
    padding: 20px 0px;
    height: fit-content;
    background: white;
    margin-left: 15px;
    box-shadow: 0 0 10px gray;
    display: flex;
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    flex-direction: column;

    .DataControl{
        
    }
`;






const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const today = new Date(); 
const yesterday = new Date(Date.now()-86400000); 
const tomorrow = new Date(new Date(today)+ 86400);

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name field cannot be blank").matches(/^[aA-zZ\s]+$/, "Full Name field accept characters values only").max(30,"Full Field field accept up to 45 in size only"),
    email: Yup.string().email("Email Address field should have email domain").required("Email Address field cannot be blank").max(45, "Email Address field accept up to 45 in size only"),
    contactNumber: Yup.string().required("Contact Number field cannot be blank").matches(phoneRegExp, 'Phone number is not valid').max(11, "Contact Number field accept up to 11 in size only"),
    location: Yup.string().required("Location field cannot be blank"),
    registeredDate: Yup.date().nullable()
    .transform((curr, orig)=> orig === '' ? null : curr)
    .required('Registered Date field cannot be blank')
    .min(yesterday, 'Registered Date field accepts current date only')
    .max(tomorrow, 'Registered date field accepts current date only')
})

export function UpdatePage(props){

    const history = useHistory();

    const [viewUpdateContact, setViewUpdateContact] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/viewContact/"+props.match.params.id).then((response) => {
            setViewUpdateContact(response.data)
        })
       
    });

    const onSubmit = async (values, id) => {
        
        const { value, ...data } = values;

        const response = Axios.put("http://localhost:3001/updateContact/"+props.match.params.id, data).catch((err) => {
            if(err && err.response)
            console.log("Error: ", err);
            
        })

        if(response && response.data){
            
        }
        alert("Data Successfully Updated");
        setTimeout(() => history.push("/"), 500)
    }

    const formik = useFormik({
        initialValues: {
            id: '',
            fullName: '',
            email: '',
            contactNumber: '',
            location: '',
            registeredDate: '',
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
      
    })

    

    return <Container>

        <div className="Navbar">
            <h2>React Project Assessment</h2>
        </div>
         
         {viewUpdateContact.map((vals, key) => {
                return (
 
            <div className="FormContainer">
                <h3>Update Contact</h3>
                <form onSubmit={formik.handleSubmit}>
                <InputControl>
                    <label>Full Name:</label>
                    <input 
                    type="text" 
                    name="fullName" 
                    value={formik.values.fullName} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Last Name, First Name, Middle Initial"
                    />
                    <p>{formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ""}</p>
                </InputControl>

                <InputControl>
                    <label>Email:</label>
                    <input 
                    type="text" 
                    name="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="example@gmail.com"
                    />
                     <p>{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</p>
                </InputControl>

                <InputControl>
                    <label>Contact Number:</label>
                    <input 
                    type="text" 
                    name="contactNumber" 
                    value={formik.values.contactNumber} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="09770367286"
                    />
                     <p>{formik.touched.contactNumber && formik.errors.contactNumber ? formik.errors.contactNumber : ""}</p>
                </InputControl>

                <InputControl>
                    <label>Location:</label>
                    <select 
                    name="location"  
                    value={formik.values.location} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    >
                        <option value="" disabled selected hidden>Select Location</option>
                        <option>Manila</option>
                        <option>Cebu</option>
                    </select>
                     <p>{formik.touched.location && formik.errors.location ? formik.errors.location : ""}</p>
                </InputControl>

                <InputControl>
                    <label>Registered Date:</label>
                    <input type="date" name="registeredDate" value={formik.values.registeredDate} onChange={formik.handleChange}/>
                    <p>{formik.touched.registeredDate && formik.errors.registeredDate ? formik.errors.registeredDate : ""}</p>
                </InputControl>
                <div className="ButtonControl"><Link to="/" className="RedButton">Back</Link><button >Update Contact</button></div>
                </form>
            </div>
            )
        })}

        <DataToUpdate>

            <h2>Data to update</h2>

                {viewUpdateContact.map((vals, key) => {
                return (
                    <div className="DataControl">
                        <label>{vals.fullName}</label><br/>
                        <label>{vals.email}</label><br/>
                        <label>{vals.contactNumber}</label><br/>
                        <label>{vals.location}</label><br/>
                        <label>{vals.registeredDate}</label><br/>
                    </div>
                    )
                })}
        </DataToUpdate>

    </Container>
}