import React,{Component} from 'react';
import {variables} from './Variables';
import './Dashboard.css';
import './View.css';


export class Manager extends Component{
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
            NoOfDays:"",
            Status:"",
            LeaveIdFilter:"",
            leavesWithoutFilter:[]

        }
    }
    FilterFn(){
        var LeaveIdFilter=this.state.LeaveIdFilter;

        var filteredData=this.state.leavesWithoutFilter.filter(
            function(lms){
                return lms.LeaveId.toString().toLowerCase().includes(
                    LeaveIdFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({leaves:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.leavesWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({leaves:sortedData});
    }

    changeLeaveIdFilter = (e)=>{
        this.state.LeaveIdFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){

        fetch(variables.API_URL+'LeaveOne')
        .then(response=>response.json())
        .then(data=>{
            this.setState({leaves:data,leavesWithoutFilter:data});
        });

    }

    componentDidMount(){
        this.refreshList();
    }
    
    // changeEmpId =(e)=>{
    //     this.setState({EmpId:e.target.value});
    // }
    // changeManagerId =(e)=>{
    //     this.setState({ManagerId:e.target.value});
    // }
    // changeFromDate =(e)=>{
    //     this.setState({FromDate:e.target.value});
    // }
    // changeToDate =(e)=>{
    //     this.setState({ToDate:e.target.value});
    // }
    // changeLeaveType =(e)=>{
    //     this.setState({LeaveType:e.target.value});
    // }
    // changeLeaveDescription =(e)=>{
    //     this.setState({LeaveDescription:e.target.value});
    // }
    changeStatus=(e)=>{
        this.setState({Status:e.target.value});
    }



    editClick(lms){
        this.setState({
            modalTitle:"View Details",
            LeaveId:lms.LeaveId,
            EmpId:lms.EmpId,
            ManagerId:lms.ManagerId,
            // FromDate:lms.FromDate,
            // ToDate:lms.ToDate,
            LeaveType:lms.LeaveType,
            NoOfDays:lms.NoOfDays,
            LeaveDescription:lms.LeaveDescription,
            Status:lms.Status
        });
    }




    updateClick(){
        fetch(variables.API_URL+'LeaveOne/ManId',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                leaveId:this.state.LeaveId,
                EmpId:this.state.EmpId,
                ManagerId:this.state.ManagerId,
                // FromDate:this.state.FromDate,
                // ToDate:this.state.ToDate,
                LeaveType:this.state.LeaveType,
                LeaveDescription:this.state.LeaveDescription,
                Status:this.state.Status
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





    render(){
        const {
            leaves,
            modalTitle,
            LeaveId,
            EmpId,
            FromDate,
            ToDate,
            LeaveType,
            NoOfDays,
            LeaveDescription,
            Status
        }=this.state;

        return(
<div class="container">
    <header>
    <h3 className="d-flex justify-content-center header-1">Welcome to Leave Management System</h3>
    </header>
    <marquee>Hexaware Technologies pvt.ltd</marquee>
    <a class="btn btn-primary m-2 float-end" href="/" role="button">LogOut</a>
    <a class="btn btn-primary m-2 float" href="/#/chart" role="button">Analytics</a>
    <table className="table table-striped">
    <thead class="table-dark">
    <tr>
                            <th>
                                <div className="d-flex flex-row">


                                    <input className="form-control m-2"
                                        onChange={this.changeLeaveIdFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('LeaveId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('LeaveId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div>
            LeaveId
        </th>
        <th>
            EmployeeId
        </th>
        <th>
            Start Date
        </th>
        <th>
            End Date
        </th>
        <th>
            LeaveType
        </th>
        <th>
            Description
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
                <td>{lms.FromDate}</td>
                <td>{lms.ToDate}</td>
                <td>{lms.LeaveType}</td>
                <td>{lms.LeaveDescription}</td>
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
            value={EmpId}
 //           onChange={this.changeEmpId}
           />
        </div>

       

        {/* <div className="input-group mb-3">
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
        </div> */}
        
        <div className="input-group mb-3">
            <span className="input-group-text">Leave Type</span>
            
            <input type="text" className="form-control"
            value={LeaveType}/>
                {/* <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
                <option>Maternity Leave</option>
                <option>Paternity Leave</option>

            </select> */}
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">NoOfDays</span>
            <input type="text" className="form-control"
            value={NoOfDays}
 //           onChange={this.changeLeaveDescription}
              />
        </div>
        
        <div className="input-group mb-3">
            <span className="input-group-text">Leave Description</span>
            <input type="text" className="form-control"
            value={LeaveDescription}
 //           onChange={this.changeLeaveDescription}
              />
        </div>


        <div className="input-group mb-3">
            <span className="input-group-text">Status</span>
            
            <select className="form-select"
            onChange={this.changeStatus}
            value={Status}>
                <option>On Hold</option>
                <option>Approved</option>
                <option>Denied</option>
            </select>
        </div>
        </div>
        </div>



        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Acknowledge</button>

   </div>

</div>
</div> 
</div>



</div>
        )
    }
}