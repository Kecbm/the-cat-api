import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import '../css/Cats.css';

// Esquema de validação utilizando Zod
const dataSchema = z.array(
  z.object({
    id: z.string().nonempty(),
    url: z.string().url().nonempty(),
    width: z.number(),
    height: z.number(),
  })
);

const Cats = () => {
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
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10', { method: "GET" });
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
              id="img-cats"
            />
          </div>
        ))
      }
        <button
            onClick={ handleReload }
            id="btn-cats"
        >
            NOVOS GATOS 🐈
        </button>
    </div>
  );
};

export default Cats;
