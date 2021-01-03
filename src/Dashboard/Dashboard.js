import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import './Dashboard.scss';
import { Card } from "tabler-react";

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.onClick = this.props.onClick;
    }
  render() {
    return (
      <div className="dashboard-main">
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
      </div>
    );
  }
}

export default Dashboard;
