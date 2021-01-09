import React from 'react';

class InputField extends React.Component{

  render(){
    return (
      <div className="inputField">
        
        <input
          className='input'
          name = {this.props.name}
          required = 'required'
          id = {this.props.id}
          type = {this.props.type}
          placeholder={this.props.placeholder}
          value ={this.props.value}
          onChange = {(e) => this.props.onChange(e.target.value)}
          onKeyPress={(e) => this.props.onKeyPress(e)}
        />

      </div>
    );  
  }
}

export default InputField;
