import React from "react";

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onAddTaskSubmit = (e) => {
        e.preventDefault();
        const name = this.state.name;
        const userLogin = sessionStorage.getItem("userLogin");
        fetch("http://localhost:8090/add-task", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name: name, userLogin: userLogin})
        })
            .then(res => res.json())
            .then(result => {
                if (!result.errors) {
                    window.location.replace("http://localhost:3000/tasks");
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
                <h2>Add task</h2>
                <form onSubmit={this.onAddTaskSubmit}>
                    <label htmlFor="name">Task name</label>
                    <input name="name" type="text" className="form-control" id="task-name"
                           onChange={this.handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default AddTask;