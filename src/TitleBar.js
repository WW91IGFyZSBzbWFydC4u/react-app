import React from 'react';


class TitleBar extends React.Component {
    constructor(props){
        super(props)
        this.onClick = this.props.onClick;
    }
    render() {
        return (
        <div class="title" id="title">
            <img src='./cryptowallet_d_gr.png' width="40" height="40"/>
            <h1>CryptoWallet</h1>
        </div>
        );
    }
}

export default TitleBar;