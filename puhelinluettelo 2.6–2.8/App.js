import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '040123456' }
      ],
      newName: '',
      newNumber: ''
    }
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

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({newNumber: event.target.value})
  }

  printPersons = () => {
    return(
    this.state.persons.map(person => <p key = {person.name}>{person.name} {person.number}</p>)
    )
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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