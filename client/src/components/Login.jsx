import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: ""};
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onLoginSubmit = (e) => {
        e.preventDefault();
        const userLogin = this.state.login;

        fetch("http://localhost:8090/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({login: userLogin})
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (!result.errors) {
                    sessionStorage.setItem('userLogin', userLogin);
                    window.location.replace("http://localhost:3000/");
                }
                throw new Error('Request failed');
            })
            .catch(error => {
                console.log("ERROR");
                console.log(error.toString());
            })

    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.onLoginSubmit}>
                    <label htmlFor="login">User Login</label>
                    <input name="login" type="text" className="form-control" id="login"
                           aria-describedby="loginHelp"
                           onChange={this.handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }


}

export default Login;