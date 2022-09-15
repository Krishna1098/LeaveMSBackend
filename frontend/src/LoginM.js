import React, { Component } from 'react';
export class LoginM extends Component {

    render() {


        return (
            <div className="container">
            <div>
            <header>
            <h3 className="d-flex justify-content-center header-1">Sign In</h3>
            </header>
            </div>
               <div className="d-flex justify-content-center">
     
                <div className="p-3 w-30 bd-highlight">

                <div className="input-group mb-3">
            <span className="input-group-text">LoginId</span>
            <input type="text" className="form-control"
            value={"100"}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Password</span>
            <input type="text" className="form-control"
            value={"*******"}/>
        </div>


<a class="btn btn-primary p float-end" href="/#/manager" role="button">Login</a>
</div>
</div>

            </div>
        );
    }
}
// export default Login;
