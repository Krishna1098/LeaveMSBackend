import React,{Component}from 'react';
import './Dashboard.css';
import './View.css';

import {variables} from './Variables';


export class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state={
        
            employees:[],
            Empid:0,
            EmpName:"",
            Email:"",
            Department:"",
            Designation:"",
            Location :""

        }
    }
    refreshList(){

        fetch(variables.API_URL+'Employees')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
        });

    }
    componentDidMount(){
        this.refreshList();
    }






    render(){
        const {
            employees,   
            Empid,
            EmpName,
            Email,
            Department,
            Designation,
            Location 
        }=this.state;
        return(
            <div className="container">
                <header>
                <h3 className="d-flex justify-content-center header-1">Welcome to Leave Management System</h3>
                </header>
                <marquee>Hexaware Technologies pvt.ltd</marquee>

                <div>
                    <table className="table table-striped table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>Employee Id</th>
                                <th>Employee Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp=>
                            <tr key={emp.Empid}>
                                <td>{emp.Empid}</td>
                                <td>{emp.EmpName}</td>
                                <td>{emp.Email}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.Designation}</td>
                                <td>{emp.Location}</td>
                            </tr>

                                
                                )}
                        </tbody>
                    </table>
                </div>
                <a class="btn btn-primary p float" href="/#/loginOne" role="button">Employee Login</a>
                <a class="btn btn-primary p float-end" href="/#/login" role="button">Manager Login</a>
            </div>
        )
    }
}

