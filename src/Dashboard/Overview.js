import React, { Component } from "react";
import { Alert, Card } from 'tabler-react';

class Overview extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <Card
                    title="Card title"
                    body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            deleniti fugit incidunt, iste, itaque minima neque pariatur
            perferendis sed suscipit velit vitae voluptatem. A consequuntur,
            deserunt eaque error nulla temporibus!`}
                />
                <Card
                    title="Card title"
                    body={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            deleniti fugit incidunt, iste, itaque minima neque pariatur
            perferendis sed suscipit velit vitae voluptatem. A consequuntur,
            deserunt eaque error nulla temporibus!`}
                />
                <Alert type="warning" isDismissible>
                    Lorem ipsum dolar sit amet, consectetur adipisicing elit.
        </Alert>
            </div>
        )
    }
}

export default Overview;