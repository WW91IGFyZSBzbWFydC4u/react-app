import React, { Component } from "react";
import { Card, Form } from 'tabler-react';

class AppProfile extends React.Component {
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
                            <Form.Input name="firstname" label="First Name" value="Jacob" disabled isInline />
                            <Form.Input name="lastname" label="Last Name" value="Miller" disabled isInline />
                            <Form.Input name="email" label="E-Mail" icon="mail" value="test@mail.com" disabled />
                            <Form.Input name="phone" label="Phone Number" id="Phone Number" icon="phone" value="0568045685" disabled />
                            <Form.Input name="registerDate" label="Registered since" icon="log-in" disabled value="08.05.2019" />
                            <Form.Input name="birthday" label="Birthday" disabled value="01.01.1970" />
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
                            <Form.Input name="withdrawalThreshold" label="Withdrawal Threshold" value={0.02 + " BTC"} icon="lock" disabled isInline />
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default AppProfile;