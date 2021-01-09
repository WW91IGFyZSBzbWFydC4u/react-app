import React, { Component } from "react";
import { Card, Form } from 'tabler-react';

class AppProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            mail: "",
            phone: "",
            creationdate: "",
            birthday: "",
            walletSec: ""
        }
    }

    async componentDidMount() {
        try {
            let res = await fetch('/profile', {
                method: 'post',
                headers: {
                    'Accept': 'applcication/json',
                    'Content-Type': 'applcication/json'
                }
            });

            let result = await res.json();

            console.log('profile')
            if (result.success) {

                this.setState({ firstname: result.data[0].firstname })
                this.setState({ lastname: result.data[0].lastname })
                this.setState({ mail: result.data[0].mail })
                this.setState({ phone: result.data[0].phone })
                this.setState({ creationdate: result.data[0].creationdate })
                this.setState({ birthday: result.data[0].birthday })
                this.setState({ walletSec: result.data[0].walletsec })

                console.log(this.state)

            }

            this.forceUpdate();
        }
        catch (e) {
            console.log('exc')
            console.log(e)
        }

    }

    render() {
        return (
            <div className="dashboard">
                <Card>
                    <Card.Status color="blue" side />
                    <Card.Header>
                        <Card.Title>Profile</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Input name="firstname" label="First Name" value={this.state.firstname} disabled isInline />
                            <Form.Input name="lastname" label="Last Name" value={this.state.lastname} disabled isInline />
                            <Form.Input name="email" label="E-Mail" icon="mail" value={this.state.mail} disabled />
                            <Form.Input name="phone" label="Phone Number" id="Phone Number" icon="phone" value={this.state.phone} disabled />
                            <Form.Input name="registerDate" label="Registered since" icon="log-in" disabled value={this.state.creationdate.substring(0,10)} />
                            <Form.Input name="birthday" label="Birthday" disabled value={this.state.birthday.substring(0,10)} />
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Status color="yellow" side />
                    <Card.Header>
                        <Card.Title>Wallet Security</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Input name="withdrawalThreshold" label="Withdrawal Threshold" value={this.state.walletSec} icon="lock" disabled isInline />
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default AppProfile;