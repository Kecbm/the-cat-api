import React, { useEffect, useState } from 'react';
import { z } from 'zod';

// Esquema de validação utilizando Zod
const dataSchema = z.array(
  z.object({
    id: z.string().nonempty(),
    url: z.string().url().nonempty(),
    width: z.number(),
    height: z.number(),
  })
);

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // Tempo em milissegundos para exibir a frase "Carregando..."
    }, 3000);

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search', { method: "GET" });
        const result = await response.json();

        // Verificando se os dados são válidos
        const validatedData = dataSchema.parse(result);
        console.log('Validação dos dados: ', validatedData);

        setData(validatedData);
      } catch (error) {
        console.log('Erro de validação: ', error.message);
        setError('⚠️ A aplicação está passando por instabilidade momentânea. Tente novamente mais tarde.');
      }
    };
    
    fetchData();
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  if (error) {
    return <div>{error}</div>;
  }

  // !data
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Renderizando a aplicação corretamente com os dados válidos
  return (
    <div>
      <h1>THE CAT API 🐈‍⬛</h1>
      {
        data.map((cat) => (
          <div key={ cat.id }>
            <img
              src={ cat.url }
              alt={ cat.id }
              style={{ width: "500px", height: "500px" }}
            />
            <p><b>Id:</b> { cat.id }</p>
            <p><b>Url:</b> { cat.url }</p>
            <p><b>Width:</b> { cat.width }</p>
            <p><b>Heigth:</b> { cat.height }</p>
            <button
              onClick={ handleReload }
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
};

export default Home;
