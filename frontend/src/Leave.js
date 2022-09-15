import React,{Component} from 'react';
import {variables} from './Variables';
import './Dashboard.css';
import './View.css';

export class Leave extends Component{
    constructor(props){
        super(props);

        this.state={
            leaves:[],
            managers:[],
            employees:[],
            modalTitle:"",
            LeaveId:0,
            EmpId:"",
            ManagerId:"",
            FromDate:"",
            ToDate:"",
            LeaveType:"",
            LeaveDescription:"",
            Status:""

        }
    }

    refreshList(){

        fetch(variables.API_URL+'LeaveOne')
        .then(response=>response.json())
        .then(data=>{
            this.setState({leaves:data});
        });

    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeEmpId =(e)=>{
        this.setState({EmpId:e.target.value});
    }
    changeManagerId =(e)=>{
        this.setState({ManagerId:e.target.value});
    }
    changeFromDate =(e)=>{
        this.setState({FromDate:e.target.value});
    }
    changeToDate =(e)=>{
        this.setState({ToDate:e.target.value});
    }
    changeLeaveType =(e)=>{
        this.setState({LeaveType:e.target.value});
    }
    changeLeaveDescription =(e)=>{
        this.setState({LeaveDescription:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Leave",
            LeaveId:0,
            EmpId:"",
            ManagerId:"",
            FromDate:"",
            ToDate:"",
            LeaveType:"",
            LeaveDescription:""
        });

    }

    editClick(lms){
        this.setState({
            modalTitle:"Edit Leave",
            LeaveId:lms.LeaveId,
            EmpId:lms.EmpId,
            ManagerId:lms.ManagerId,
            FromDate:lms.FromDate,
            ToDate:lms.ToDate,
            LeaveType:lms.LeaveType,
            LeaveDescription:lms.LeaveDescription
        });
    }

    createClick(){
        fetch(variables.API_URL+'LeaveOne',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //LeaveId:this.state.LeaveId,
                EmpId:this.state.EmpId,
                ManagerId:this.state.ManagerId,
                FromDate:this.state.FromDate,
                ToDate:this.state.ToDate,
                LeaveType:this.state.LeaveType,
                LeaveDescription:this.state.LeaveDescription
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'LeaveOne',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                leaveId:this.state.LeaveId,
                EmpId:this.state.EmpId,
                ManagerId:this.state.ManagerId,
                FromDate:this.state.FromDate,
                ToDate:this.state.ToDate,
                LeaveType:this.state.LeaveType,
                LeaveDescription:this.state.LeaveDescription
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }



    // deleteClick=async(id)=>
    // {
    //     const URLToFetch = variables.API_URL + "Leave/" + id.toString();

    //     await fetch((URLToFetch),
    //     {
    //         method: "DELETE",
    //         header:{
    //             'Accept':'application/json',
    //             'Content-Type': "application/json",

    //         }


    //     }).then(async(response)=>{await response.text().then((result)=>
    //     {

    //         if(response.status !== 200)
    //             alert(result);
    //         else if(response.status === 401)
    //             alert('failed');
    //     })});      
    // };

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'LeaveOne/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }



    render(){
        const {
            leaves,
            modalTitle,
            LeaveId,
            EmpId,
            ManagerId,
            FromDate,
            ToDate,
            LeaveType,
            LeaveDescription,
            Status
        }=this.state;

        return(
<div class="container" >
    <header>
    <h3 className="d-flex justify-content-center header-1">Welcome to Leave Management System</h3>
    </header>
    <marquee>Hexaware Technologies pvt.ltd</marquee>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Leave
    </button>
    <table className="table table-striped table-hover">
    <thead className="table-dark">
    <tr>
        <th>
            LeaveId
        </th>
        <th>
            EmployeeId
        </th>
        <th>
            ManagerId
        </th>
        <th>
            Start Date
        </th>
        <th>
            End Date
        </th>
        <th>
            Leave Type
        </th>
        <th>
            Description
        </th>
        <th>
            Status
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {leaves.map(lms=>
            <tr key={lms.LeaveId}>
                <td>{lms.LeaveId}</td>
                <td>{lms.EmpId}</td>
                <td>{lms.ManagerId}</td>
                <td>{lms.FromDate}</td>
                <td>{lms.ToDate}</td>
                <td>{lms.LeaveType}</td>
                <td>{lms.LeaveDescription}</td>
                <td>{lms.Status}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(lms)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(lms.LeaveId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">EmpId</span>
            <input type="text" className="form-control"
            required
            value={EmpId}
            onChange={this.changeEmpId}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">ManagerId</span>
            <input type="text" className="form-control"
            value={ManagerId}
            onChange={this.changeManagerId}/>
        </div>

       

        <div className="input-group mb-3">
            <span className="input-group-text">Start Date</span>
            <input type="date" className="form-control"
            value={FromDate}
            onChange={this.changeFromDate}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">End Date</span>
            <input type="date" className="form-control"
            value={ToDate}
            onChange={this.changeToDate}/>
        </div>
        
        <div className="input-group mb-3">
            <span className="input-group-text">Leave Type</span>
            
            <select className="form-select"
            onChange={this.changeLeaveType}
            value={LeaveType}>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
                <option>Maternity Leave</option>
                <option>Paternity Leave</option>

            </select>
        </div>
        
        <div className="input-group mb-3">
            <span className="input-group-text">Leave Description</span>
            <input type="text" className="form-control"
            value={LeaveDescription}
            onChange={this.changeLeaveDescription}/>
        </div>
        </div>
        </div>



    {LeaveId===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

    {LeaveId!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>

<a class="btn btn-primary m-2 float" href="/#/View" role="button">Back to Home</a>
</div>
        )
    }
}