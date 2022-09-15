import React,{Component} from 'react';


export class Contact extends Component{
    render(){
        return(
            <div className="container">
                <div>
                <header>
                <h3 className="d-flex justify-content-center header-1">Contact Us</h3>
                </header>
                </div>
                <form>
    <div className="d-flex justify-content-center">
     
     <div className="p-3 w-50 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input type="text" className="form-control" style={{ width: "500px" }}
/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input type="text" className="form-control"
           />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Ph no</span>
            <input type="text" className="form-control"
           />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Subject</span>
            <input type="text" className="form-control"
           />
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Message</span>
            <input type="text" className="form-control"
           />
        </div>

        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Submit</button>

       </div>





   </div>
   </form>

                <a class="btn btn-primary m-2 float-end" href="/#/View" role="button">Back to Home</a>
            </div>

        )
    }
}