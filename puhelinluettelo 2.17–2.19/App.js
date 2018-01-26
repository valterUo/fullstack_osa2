import React from 'react';
import PersonService from './services/persons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons:[],
      newName: '',
      newNumber: '',
      filter: '',
      filteredPersons: [],
      message: ''
    }
  }

  componentWillMount() {
    PersonService
      .getAll()
      .then(response => {
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

    PersonService.create(personObject)
    .then(response => {
      this.setState({message: `Lisättiin '${personObject.name}'.`})
      this.componentWillMount()
      setTimeout(() => {
        this.setState({message: null})
      }, 3000)
    })

  } else {
    if(window.confirm(`Nimi '${personObject.name}' on jo luettelossa, korvataanko vanha numero uudella?`)) {
      const thePerson = this.state.persons.filter(person => person.name === this.state.newName)
      PersonService.update(thePerson[0].id, personObject).then(response => {
        this.componentWillMount()
        this.setState({message: `Numero päivitettiin henkilölle '${personObject.name}'.`})
        setTimeout(() => {
          this.setState({message: null})
        }, 1000)
      }).catch(error => {
                PersonService.create(personObject)
        .then(response => {
      this.setState({message: `Henkilö '${personObject.name}' oli aikaisemmin poistettu listalta. Lisätty uudelleen.`})
      this.componentWillMount()
      setTimeout(() => {
        this.setState({message: null})
      }, 3000)
    })
      })
    this.setState({ newName: '',
    newNumber: ''})
    }
  }
  }

  filterPerson = (event) => {
    const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()) === true)
    this.setState({
      filteredPersons: filteredPersons
    })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter: event.target.value}, function () {
      this.filterPerson()
  })  
  }

  handleClick = (param, e) => {
    console.log(param)
    if (window.confirm("Do you really want to delete?")) { 
      PersonService.destroy(param).then(response => {
        console.log(response)
        this.componentWillMount()
        this.setState({message: `Henkilö poistettiin.`})
        setTimeout(() => {
          this.setState({message: null})
        }, 3000)
      })

    }
  }

  printPersons = () => {
    if(this.state.filter === '' || this.state.filter === undefined || this.state.filter === 'undefined' || this.state.filteredPersons === null || (this.state.filteredPersons.length === 0 && this.state.filter === '') || typeof this.state.filteredPersons === 'undefined') {
      return (
        this.state.persons.map(person => <p key = {person.name}>{person.name} {person.number} <button onClick = {this.handleClick.bind(this, person.id)}>Poista</button></p>)
        
      )
    }
    if (this.state.filter !== '' && this.state.filter !== 'undefined') {
      console.log(this.state.filter)
    return(
      this.state.filteredPersons.map(person => <p key = {person.name}>{person.name} {person.number}</p>)
    )
  }
  return (
    this.state.persons.map(person => <p key = {person.name}>{person.name} {person.number} <button onClick = {this.handleClick.bind(this, person.id)}>Poista</button></p>)
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
        <Notification message = {this.state.message}/>
        {this.printPersons()}
        </div>
    )
  }
}

const Notification = ({ message }) => {
  if (message === null || message === '') {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App