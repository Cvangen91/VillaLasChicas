// src/components/ApiExample.jsx
import { useEffect, useState } from 'react';

function ApiExample() {
  const [posts, setPosts] = useState([]);      // data fra API
  const [loading, setLoading] = useState(true); // om vi holder på å hente
  const [error, setError] = useState(null);    // feil, hvis noe går galt

  useEffect(() => {
    async function fetchData() {
      try {
        // Dummy-API for testing: returnerer en liste med "posts"
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

        if (!response.ok) {
          throw new Error('Kunne ikke hente data');
        }

        const data = await response.json();
        setPosts(data);          // lagre data i state
      } catch (err) {
        setError(err.message);   // lagre feilmelding
      } finally {
        setLoading(false);       // ferdig å hente, uansett
      }
    }

    fetchData();
  }, []); // tom array => kjør bare én gang når komponenten monteres

  if (loading) {
    return <p>Laster data...</p>;
  }

  if (error) {
    return <p>En feil oppstod: {error}</p>;
  }

  return (
    <div>
      <h2>Eksempel på API-kall</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <br />
            <small>{post.body}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiExample;