import React from "react";
import './Tasks.css'

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tasks: []}
    }

    fetchData = () => {
        const userLogin = sessionStorage.getItem("userLogin");
        if (userLogin != null) {
            fetch(`http://localhost:8090/tasks?login=${userLogin}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res =>
                res.json()
            ).then(result => {
                this.setState({tasks: Array.from(result.tasks)});
            }).catch(error => {
                console.log("ERROR");
                console.log(error.toString());
            });
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    onCompleteTask = (e, taskName) => {
        e.preventDefault();
        const userLogin = sessionStorage.getItem("userLogin");
        fetch('http://localhost:8090/complete-task', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({taskName: taskName, userLogin: userLogin})
        })
            .then(res => {
                if (!res.errors) {
                    window.location.replace("http://localhost:3000/tasks");
                }
                throw new Error('Request failed.')
            })
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        return (
            <div>
                <h1>Tasks</h1>
                <ul id="all-tasks">
                    {
                        React.Children.toArray(this.state.tasks.map(t =>
                            <li key={t.name}>
                                {t.completed ? (
                                    <div className='completed-task'>{t.name}</div>
                                ) : (
                                    <div>
                                        <div>{t.name}</div>
                                        <button onClick={e => this.onCompleteTask(e, t.name)}>complete</button>
                                    </div>
                                )}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Tasks;