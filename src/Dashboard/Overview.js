import React, { Component } from "react";
import { Table, Card, Grid, StatsCard, Icon } from 'tabler-react';
import { ChevronsRight, ChevronsLeft } from 'react-feather';
import C3Chart from "react-c3js";
import 'c3/c3.css';
import './Dashboard.scss';

const data = {
    x: 'x',
    xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
    columns: [
    ],
};

const axis = {
    x: {
        type: 'timeseries',
        tick: {
            count: 10,
            format: '%Y-%m-%d'
        }
    }
};

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: {
                amount: [],
                type: [],
                address: []
            },
            usdbtc: 0,
            walletvalue: 0,
            totalbtc: 0.0
        }
    }

    async componentDidMount() {
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
                this.state.transactions.amount.push(result.data[i].amount)
                this.state.transactions.type.push(result.data[i].type)
                this.state.transactions.address.push(result.data[i].address)

                if (result.data[i].type == 1) {
                    this.state.totalbtc += result.data[i].amount
                }
                else {
                    this.state.totalbtc -= result.data[i].amount
                }
                console.log(this.state.totalbtc)
            }
            console.log('end btc calc')
            console.log('start get conversion')
            let res2 = await fetch('https://blockchain.info/tobtc?currency=USD&value=1')
            let result2 = await res2.json()
            console.log(result2)
            console.log('end get conversion')
            this.state.usdbtc = Number.parseFloat(1 / result2).toFixed(2);
            this.state.walletvalue = Number.parseFloat(this.state.totalbtc * this.state.usdbtc).toFixed(2)
            this.forceUpdate();
            console.log('start get chartvalues')
            let res3 = await fetch('/usdbtc', {
                method: 'post',
                headers: {
                    'Accept': 'applcication/json',
                    'Content-Type': 'applcication/json'
                }
            });

            let result3 = await res3.json();

            var datetimeArr = ['x']
            var rateArr = ['USD']

            for (var j = 0; j < result3.data.length; j++) {
                datetimeArr.push(result3.data[j].date)
                rateArr.push(result3.data[j].rate)
            }

            data.columns.push(datetimeArr)
            data.columns.push(rateArr)

            console.log('end get chartvalues')

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
                <div className="mainChart">
                    <div className="walletValue">
                        <Card
                            title="BTC Value"
                            body={
                                <C3Chart data={data} axis={axis} />
                            }
                        />
                    </div>
                    <div className="transactions">
                        <Card
                            title="Most Recent Transactions"
                        >
                            <Table id="dynamictable"
                                highlightRowOnHover={true}
                                headerItems={[{ content: "Amount" }, { content: "Type" }, { content: "Address" }]}
                                bodyItems={
                                    [
                                        {
                                            item: [
                                                { content: this.state.transactions.amount[0] },
                                                { content: this.state.transactions.type[0] ? <ChevronsLeft color="green" /> : <ChevronsRight color="red" /> },
                                                { content: this.state.transactions.address[0] },
                                            ],
                                        },
                                        {
                                            item: [
                                                { content: this.state.transactions.amount[1] },
                                                { content: this.state.transactions.type[1] ? <ChevronsLeft color="green" /> : <ChevronsRight color="red" /> },
                                                { content: this.state.transactions.address[1] },
                                            ],
                                        },
                                        {
                                            item: [
                                                { content: this.state.transactions.amount[2] },
                                                { content: this.state.transactions.type[2] ? <ChevronsLeft color="green" /> : <ChevronsRight color="red" /> },
                                                { content: this.state.transactions.address[2] },
                                            ],
                                        },
                                        {
                                            item: [
                                                { content: this.state.transactions.amount[3] },
                                                { content: this.state.transactions.type[3] ? <ChevronsLeft color="green" /> : <ChevronsRight color="red" /> },
                                                { content: this.state.transactions.address[3] },
                                            ],
                                        },
                                        {
                                            item: [
                                                { content: this.state.transactions.amount[4] },
                                                { content: this.state.transactions.type[4] ? <ChevronsLeft color="green" /> : <ChevronsRight color="red" /> },
                                                { content: this.state.transactions.address[4] },
                                            ],
                                        },
                                        {
                                            item: [
                                                { content: this.state.transactions.amount[5] },
                                                { content: this.state.transactions.type[5] ? <ChevronsLeft color="green" /> : <ChevronsRight color="red" /> },
                                                { content: this.state.transactions.address[5] },
                                            ],
                                        },
                                    ]
                                }
                            />
                        </Card>
                    </div>
                </div>
                <Card
                    title="Stats"
                    body={
                        <div className="substats">
                            <Grid.Row cards>
                                <Grid.Col>
                                    <StatsCard layout={1} movement={0} total={this.state.usdbtc} label="USD/BTC" />
                                </Grid.Col>
                                <Grid.Col>
                                    <StatsCard layout={1} movement={0} total={this.state.walletvalue + " $"} label="Wallet Value" />
                                </Grid.Col>
                                <Grid.Col>
                                    <StatsCard layout={1} movement={0} total={this.state.totalbtc.toFixed(8)} label="Total BTC in Wallet" />
                                </Grid.Col>
                            </Grid.Row>
                        </div>
                    }
                />
            </div>
        )
    }
}

export default Overview;