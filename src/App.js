import React, { useState, useEffect } from "react";
import "./styles.css";

const url = "https://api.github.com"; // assign link to a variable (Murat's style for clean code)

export default function App() {
  const [users, setUsers] = useState([]); // initialise the state of the app and set to an empty array
  const [search, setSearch] = useState(""); // initial the search to an empty string. we use an empty string cos the searchQuery will be tracked by the userInput

  useEffect(() => {
    // here we made the api call and set the endpoint to users
    fetch(`${url}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []); // we use dependency array to control when the app should render

  // console.log(

  function handleClick() {
    // we want the search result to display when the user clicks the search button
    fetch(`${url}/users/${search}`)
      .then((res) => res.json())
      .then((data) => setUsers([data]))
      .catch((error) => console.log(error));
  }

  function handleChange(event) {
    setSearch(event.target.value); // Here we listen for the event (user interaction on the page, button etc). We use the event handler to trigger a re-render to the state
  }

  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="App">
      <input
        placeholder="search user"
        onChange={handleChange}
        value={search}
        className="input"
      />
      <button onClick={handleClick}> search</button>

      <p>Results: </p>

      {filteredUsers.map((
        user // then we mapped through the filtered data an then displayed it to the UI
      ) => (
        <div key={user.id}>
          <h2>{user.login}</h2>
          <img src={user.avatar_url} alt={`${user.login} avatar`} />
          <a href={user.html_url}> View profile</a>
        </div>
      ))}
    </div>
  );
}
