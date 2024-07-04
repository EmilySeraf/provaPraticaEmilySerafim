import React, { useState, useEffect } from 'react';

export default function Clubs() {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await fetch('https://api.cartola.globo.com/clubes');
        if (!response.ok) {
          throw new Error('Erro ao buscar clubes');
        }
        const data = await response.json();
        const clubesArray = Object.values(data); 
        setClubes(clubesArray);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar clubes:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClubes();
  }, []);

  return (
    <div className="App">
        <br /><br />
        <div className='letra'>
        <h1>Clubes do Cartola FC:</h1>
        </div>
      <br />
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p> 
      ) : (
        <ul>
          {clubes.map((clube) => (
            <li key={clube.id}>
                <div className='imagens'>
                <img src={clube.escudos['60x60']}  key={clube.id + '-img'} />
              <div className='nomes'>
            <p>{clube.nome}</p>
            <p>{clube.apelido}</p>
              </div>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}