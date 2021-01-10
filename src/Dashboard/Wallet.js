import React from "react";
import Dashboard from './Dashboard';
import './Dashboard.scss';
import { Table, Button, Form } from 'tabler-react';
import { Modal } from 'react-bootstrap';


class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.modalShow = false;
        this.modalShowWD = false;
        this.state = {
            fields: {},
            walletvalue: 0,
            totalbtc: 0,
            approved: {
                address: [],
                date: []
            },
            walletSec: 0
        }

    }

    renderApproved() {
        let obj = this.state.approved;
        let cnt = 0
        console.log(obj.length)
        try {
            return Object.keys(obj).map(function () {
                console.log(cnt)
                console.log('approvingwall')
                console.log(obj.address[cnt])
                console.log(obj.date[cnt])
                console.log(obj.date[cnt].substring(0,10))
                return (
                    <Table.Row>
                        <Table.Col>{obj.address[cnt]}</Table.Col>
                        <Table.Col>{obj.date[cnt++].substring(0,10)}</Table.Col>
                    </Table.Row>
                )
            })
        }
        catch (e) {
            console.log(e)
            return;
        }
    }


    async componentWillMount() {
        try {
            let res = await fetch('/overview', {
                method: 'post',
                headers: {
                    'Accept': 'applcication/json',
                    'Content-Type': 'applcication/json'
                }
            });

            let result = await res.json();
            console.log('start btc calc')
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].type == 1) {
                    this.state.totalbtc += result.data[i].amount
                }
                else {
                    this.state.totalbtc -= result.data[i].amount
                }
            }
            console.log(this.state.totalbtc)
            console.log('end btc calc')
            console.log('start get conversion')
            let res2 = await fetch('https://blockchain.info/tobtc?currency=USD&value=1')
            let result2 = await res2.json()
            console.log(result2)
            console.log('end get conversion')
            this.state.usdbtc = Number.parseFloat(1 / result2).toFixed(2);
            this.state.walletvalue = Number.parseFloat(this.state.totalbtc * this.state.usdbtc).toFixed(2)

            console.log(this.state.usdbtc)
            console.log(this.state.walletvalue)

            let res3 = await fetch('/approvedWallets', {
                method: 'post',
                headers: {
                    'Accept': 'applcication/json',
                    'Content-Type': 'applcication/json'
                }
            });

            let result3 = await res3.json();
            console.log("result")
            console.log(result3)
            console.log(result3.data.length)

            for (var k = 0; k < result3.data.length; k++) {
                this.state.approved.address.push(result3.data[k].address)
                this.state.approved.date.push(result3.data[k].approveDate)

                //this.state.approved.address.push(result3.data[k].address)
                //this.state.approved.date.push(result3.data[k].approveDate);
            }

            console.log("filled approved state:")
            console.log(this.state.approved)

            this.forceUpdate();
        }
        catch (e) {
            console.log('exc')
            console.log(e)
        }

    }

    onWDsubmit = (event) => {
        event.preventDefault();
        let fields = this.state.fields;

        console.log(fields['address'])
        console.log(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(fields['address']))
        console.log(fields['amount'])
        console.log(/^\d+(.\d+)*$/.test(fields['amount']))

        // Address
        if (!/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(fields['address'])) {
            // Reset Address
            alert('Enter a valid BTC Address')
            return;
        }

        if (!/^\d+(.\d+)*$/.test(fields['amount'])) {
            alert('Enter a valid numeric amount to pay out')
            return;
        }


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
                this.setState({ walletSec: result.data[0].walletsec })
                console.log(this.state)

            }

            this.forceUpdate();
        }
        catch (e) {
            console.log('exc')
            console.log(e)
        }

        document.getElementById("divHint").style.display = "inline-block";
        return;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    switchModalShow() {
        this.modalShow = !this.modalShow;
        console.log("modalshow = " + this.modalShow)
        this.forceUpdate();
        return;
    }

    switchModalWDShow() {
        this.modalShowWD = !this.modalShowWD;
        console.log("modalshow = " + this.modalShowWD)
        this.forceUpdate();
        return;
    }

    USD(value, USDexchange) {
        return value * USDexchange;
    }

    render() {
        console.log('render called')
        return (
            <div className="dashboard">
                <div className="table">
                    <Table highlightRowOnHover={true}>
                        <Table.Header>
                            <Table.ColHeader>Type</Table.ColHeader>
                            <Table.ColHeader>Friendly Name</Table.ColHeader>
                            <Table.ColHeader>Address</Table.ColHeader>
                            <Table.ColHeader>Value</Table.ColHeader>
                            <Table.ColHeader>Value in USD</Table.ColHeader>
                            <Table.ColHeader>Actions</Table.ColHeader>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Col>
                                    <h4>BTC</h4>
                                </Table.Col>
                                <Table.Col>Long-Time-Storage</Table.Col>
                                <Table.Col>bc1qm6qv2jdgjmt4krahrw9wpcyt5mmt7g8h5hz0av</Table.Col>
                                <Table.Col>{this.state.totalbtc.toFixed(8)} BTC</Table.Col>
                                <Table.Col>{this.state.walletvalue} $</Table.Col>
                                <Table.Col>
                                    <Button onClick={() => this.switchModalShow()} color="primary">Deposit</Button>
                                    <Button onClick={() => this.switchModalWDShow()} color="secondary">Withdraw</Button>
                                </Table.Col>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    <h4>Approved Addresses</h4>
                    <Table>
                        <Table.Header>
                            <Table.ColHeader>Address</Table.ColHeader>
                            <Table.ColHeader>Approval Date</Table.ColHeader>
                        </Table.Header>
                        <Table.Body>
                            {this.renderApproved()}
                        </Table.Body>
                    </Table>
                </div>
                <div classname="modalD" >
                    <Modal show={this.modalShow} aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Deposit to Wallet
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>To deposit to this wallet, please use the following address:</p>
                            <p><b>bc1qm6qv2jdgjmt4krahrw9wpcyt5mmt7g8h5hz0av</b></p>
                            <p> </p>
                            <p>Note: For safety reasons it is required to deposit a set amount of BTC to enable withdrawing to a new address.</p>
                            <p>This process only needs to be done once.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.switchModalShow()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div classname="modalWD" >
                    <Modal show={this.modalShowWD} aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Withdraw from Wallet
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div classname="withdrawalForm">
                                <Form onSubmit={this.onWDsubmit.bind(this)}>
                                    <Form.FieldSet>
                                        <Form.Input id="address" name="address" label="Address" placeholder="Receiving Address" maxLength="35" icon="credit-card" type="text"
                                            onChange={this.handleChange.bind(this, "address")} />
                                        <Form.Input id="amount" name="amount" label="Amount" placeholder="(BTC) Withdrawal Amount" icon="dollar-sign"
                                            onChange={this.handleChange.bind(this, "amount")} required />
                                        <Button name="submit" type="submit" color="primary">Withdraw</Button>
                                    </Form.FieldSet>
                                    <div id="divHint">
                                        <p>For safety reasons it is required to approve new addresses before withdrawing is allowed.</p>
                                        <p>A new address is approved by a deposit surpassing the configured limit ({this.state.walletSec} BTC).</p>
                                        <p><b>Approved Addresses have no withdrawal limit.</b></p>
                                    </div>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.switchModalWDShow()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }


}

export default Wallet;