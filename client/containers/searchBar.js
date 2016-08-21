import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {term: "" };
    this.searchWithEnter = this.searchWithEnter.bind(this);
  }

  searchButton(){
    browserHistory.push('/search/' + this.state.term);
  }
  onInputChange(term) {
    this.setState({term: term});
  }
  searchWithEnter(event) {
    if(event.keyCode === 13) {
      browserHistory.push(`/search/${this.state.term}`);
    }
  }

  searchButton(){
    browserHistory.push(`/search/${this.state.term}`);
  }
  render(){
    return(
      <div>
        <div className="col-md-4 searchBar">
          <input type="text" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} onKeyUp={this.searchWithEnter} />
        </div>
        <div className="col-md-2 searchBar">
          <Button onClick={()=>this.searchButton()}>Search</Button>
        </div>
      </div>
    );
  }
}