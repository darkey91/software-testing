import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userLogin: ""}
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onRegisterSubmit = (e) => {
        e.preventDefault();
        const userLogin = this.state.userLogin;

        fetch("http://localhost:8090/register", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({login: userLogin})
        })
            .then(res => res.json())
            .then(result => {
                if (!result.errors) {
                    window.location.replace("http://localhost:3000/");
                }
                throw new Error('Request failed :(');
            })
            .catch(error => {
                console.log("ERROR");
                console.log(error.toString());
            });
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.onRegisterSubmit}>
                    <label htmlFor="login">User Login</label>
                    <input name="userLogin" type="text" className="form-control" id="login"
                           onChange={this.handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Register;