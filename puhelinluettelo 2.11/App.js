import React from 'react';
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons:[],
      newName: '',
      newNumber: '',
      filter: '',
      people: []
    }
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const names = this.state.persons.map(person => person.name)
    if (names.indexOf(this.state.newName) === -1) {
      const persons = this.state.persons.concat(personObject)

    this.setState({
      persons: persons,
      newName: '',
      newNumber: ''
    })
  } else {
    alert("Nimi on jo luettelossa.")
    this.setState({ newName: ''})
  }
  }

  filterPerson = (event) => {
    const people = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()) === true)
    this.setState({
      people: people
    })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
     this.setState({filter: event.target.value})
    this.filterPerson()
  }

  printPersons = () => {
    if(this.filter == '' || this.state.people == null || (this.state.people.length == 0 && this.state.filter == '') || typeof this.state.people == 'undefined') {
      return (
        this.state.persons.map(person => <p key = {person.name}>{person.name} {person.number}</p>)
      )
    } else if (this.filter != '') {
    return(
      this.state.people.map(person => <p key = {person.name}>{person.name} {person.number}</p>)
    )
  } 
  return (
    this.state.persons.map(person => <p key = {person.name}>{person.name} {person.number}</p>)
  )
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
           Rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange}></input>
            </div>
          </form>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.printPersons()}
      </div>
    )
  }
}

export default App