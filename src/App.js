import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [content, setContent] = useState([]);

  const getCat = () => {
    fetch('https://api.thecatapi.com/v1/images/search', {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContent(data);
      })
    .catch((err) => {
      console.log(err.message);
    });
  }

  useEffect(() => {
    getCat();
  }, []);

  return (

    // Retorno da API:
    // {
    //   "id": "3v5",
    //   "url": "https://cdn2.thecatapi.com/images/3v5.jpg",
    //   "width": 500,
    //   "height": 375
    // }

    <div>
      <h1>The cat API 🐈‍⬛</h1>
      {
        content.map((cat) => (
          <div key={ cat.id }>
            <p><b>Id:</b> { cat.id }</p>
            <img
              src={ cat.url }
              alt={ cat.id }
              style={{ width: "500px", height: "500px" }}
            />
            <p><b>Url:</b> { cat.url }</p>
            <p><b>Width:</b> { cat.width }</p>
            <p><b>Heigth:</b> { cat.height }</p>
            <button
              onClick={ getCat }
              style={{ padding: "10px", width: "500px", backgroundColor: "#696969", border: "solid 1.5px transparent", borderRadius: "5px", fontSize: "35px", fontWeight: "bold"  }}
              onMouseOver={(e) => e.target.style.backgroundColor = "	#404040"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#696969"}
            >
              NOVO GATO 🐈
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default App;
