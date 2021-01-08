import React, { Component } from "react";
import { Table, Card, Grid, StatsCard } from 'tabler-react';
import C3Chart from "react-c3js";
import 'c3/c3.css';
import './Dashboard.scss';



const data = {
    x: 'x',
    xFormat: '%Y-%m-%d',
    columns: [
        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 130, 340, 200, 500, 250, 350]
    ],
};

const axis = {
    x: {
        type: 'timeseries',
        tick: {
            format: '%Y-%m-%d'
        }
    }
};

class Overview extends React.Component {
    async componentDidMount() {
        console.log("mounted")
        try {
            let res = await fetch('/overview', {
                method: 'post',
                headers: {
                    'Accept': 'applcication/json',
                    'Content-Type': 'applcication/json'
                }
            });
            let result = await res.json();
            console.log(result.success)

        }
        catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <div className="dashboard">
                <div className="mainChart">
                    <div className="walletValue">
                        <Card
                            title="Wallet Value"
                            body={
                                <C3Chart data={data} axis={axis} />
                            }
                        />
                    </div>
                    <div className="transactions">
                        <Card>
                            <Table highlightRowOnHover={true}>
                                <Table.Header>
                                    <Table.ColHeader>Amount</Table.ColHeader>
                                    <Table.ColHeader>Transaction Type</Table.ColHeader>
                                    <Table.ColHeader>Address</Table.ColHeader>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Col><i>0.04</i></Table.Col>
                                        <Table.Col>inc</Table.Col>
                                        <Table.Col>bc1qm*hz0av</Table.Col>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Card>
                    </div>
                </div>
                <Card
                    title="Stats"
                    body={
                        <div className="substats">
                            <Grid.Row cards>
                                <Grid.Col>
                                    <StatsCard layout={1} movement={5} total={30583 + " $"} label="USD/BTC" />
                                </Grid.Col>
                                <Grid.Col>
                                    <StatsCard layout={1} movement={0} total={42384 + " $"} label="Wallet Value" />
                                </Grid.Col>
                                <Grid.Col>
                                    <StatsCard layout={1} movement={0} total={1.72542} label="Total BTC in Wallet" />
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