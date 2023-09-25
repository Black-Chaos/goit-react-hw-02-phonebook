import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactsList } from 'components/ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = e => {
    e.preventDefault();
    if (this.state.contacts.some(({ name }) => name === e.target.name.value)) return alert(`${e.target.name.value} is already in contacts`);
    const contact = Object.fromEntries(new FormData(e.target).entries());
    contact.id = nanoid();
    this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
    e.target.reset();
  };

  handleFilter = (e) => this.setState({
    filter: e.target.value.toLowerCase(),
  });
  
  filteredContacts = () =>
    this.state.contacts.filter(({ name }) => name.toLowerCase().includes(this.state.filter));

  deleteContact = contactId => this.setState(({ contacts }) => ({contacts: contacts.filter(({ id }) => id !== contactId)}));

  render() {
    return (
      <>
        <h1 className="title">Phonebook</h1>
        <Container>
          <div className="form-container">
            <ContactForm handleSubmit={this.addContact} />
            <Filter val={this.state.filter} handleFilter={this.handleFilter} />
          </div>
          <div className="contacts-container">
            <h2 className="title">Contacts</h2>
            <ContactsList
              contacts={this.filteredContacts()}
              handleDelete={this.deleteContact}
            />
          </div>
        </Container>
      </>
    );
  }
}
