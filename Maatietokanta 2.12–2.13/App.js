import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filteredCountries: [],
      newFilter: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({newFilter: event.target.value}, function () {
      console.log(this.state.newFilter)
      this.filterCountries()
  }) 
  }

  handleClick(param, e) {
    this.setState({newFilter: param}, function () {
      console.log(this.state.newFilter)
      this.filterCountries()
  }) 
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({countries: response.data })
      })
  }

  filterCountries = () => {
    const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.newFilter.toLowerCase()) === true)
    this.setState({filteredCountries: filteredCountries})
  }

  printCountries = () => {
    if (typeof this.state.filteredCountries === 'undefined' || this.state.filteredCountries.length > '10') {
      return (
        <div>
          <p>Too many maches. Please, specify another filter.</p>
        </div>
      )
    }
    if(this.state.filteredCountries.length === 1){
      return (
      this.state.filteredCountries.map(country => 
        <div key = {country.numericCode}>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <img src= {country.flag} alt="the flag of the country" width="1000" height="600"></img>
        </div>)
      )
    }
    if(this.state.filteredCountries.length < '10' && this.state.filteredCountries > '1') {
      return (
        <div>
          {this.state.filteredCountries.map(country => <p key={country.numericCode} onClick={this.handleClick.bind(this, country.name)}>{country.name}</p>)}
          </div>
      )
    }
  }

  render() {
    return (
      <div>
        <form> Find countries: <input value={this.state.newFilter} onChange={this.handleNameChange}>
        </input> 
        </form>
        {this.printCountries()}
      </div>
    )
  }
}

export default App;
