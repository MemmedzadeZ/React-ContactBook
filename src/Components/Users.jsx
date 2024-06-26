import React, { Component } from "react";

class Users extends Component {
  state = {
    contacts: [],
    name: "",
    phone: "",
  };
  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) {
      this.setState({ contacts: storedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (e) => {
    e.preventDefault();
    const { name, phone } = this.state;
    if (name && phone) {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, { name, phone }],
        name: "",
        phone: "",
      }));
    }
  };

  removeContact = (index) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((_, i) => i !== index),
    }));
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { contacts, name, phone } = this.state;
    return (
      <>
        <div className="App">
          <h1>Əlaqə Kitabı</h1>
          <form onSubmit={this.addContact}>
            <input
              type="text"
              placeholder="Ad"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              placeholder="Telefon nömrəsi"
              name="phone"
              value={phone}
              onChange={this.handleInputChange}
            />
            <button type="submit">Əlavə et</button>
          </form>
          <ul>
            {contacts.map((contact, index) => (
              <li key={index}>
                {contact.name}: {contact.phone}
                <button onClick={() => this.removeContact(index)}>Sil</button>
              </li>
            ))}
          </ul>
        </div>
        ;
      </>
    );
  }
}

export default Users;
