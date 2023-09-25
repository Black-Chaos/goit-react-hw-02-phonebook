import { ListByContacts, ContactItem } from "./ContactsList.styled";

export function ContactsList({ contacts, handleDelete }) {
  return (
    <ListByContacts>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <p>{name}</p>
          <p>{number}</p>
          <button
            className="btn"
            type="button"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </ContactItem>
      ))}
    </ListByContacts>
  );
}