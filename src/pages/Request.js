import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import '../css/Request.css'

// Esquema de validação utilizando Zod
const dataSchema = z.array(
  z.object({
    id: z.string().nonempty(),
    url: z.string().url().nonempty(),
    width: z.number(),
    height: z.number(),
  })
);

const Request = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputId, setInputId] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [InputWidth, setInputWidth] = useState(0);
  const [inputHeight, setInputHeight] = useState(0);

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

//   const handleReload = () => {
//     window.location.reload();
//   };

  const handleChangeInputId = (event) => {
    setInputId(event.target.value);
  }

  const handleChangeInputUrl = (event) => {
    setInputUrl(event.target.value);
  }

  const handleChangeInputWidth = (event) => {
    setInputWidth(event.target.value);
  }

  const handleChangeInputHeight = (event) => {
    setInputHeight(event.target.value);
  }

  const handleButtonClick = () => {
    const dataUserSent = [
        {
            "id": inputId,
            "url": inputUrl,
            "width": InputWidth,
            "height": inputHeight
        }
    ]

    try {
        // Verificando se os dados que o usuário digitou são válidos
        const validatedData = dataSchema.parse(dataUserSent);
        console.log('Validação dos dados: ', dataUserSent);

        setData(validatedData);
    } catch (error) {
    console.log('Erro de validação: ', error.message);
    setError('⚠️ A aplicação está passando por instabilidade momentânea. Tente novamente mais tarde.');
    }
  }

  if (error) {
    return <div id="error-request"><h2>{error}</h2></div>;
  }

  // !data
  if (isLoading) {
    return (
        <div id="loading-request">
          <h2>Carregando ...</h2>
          {' '}
          <h1>🐈⏳</h1>
        </div>
    )
  }

  // Renderizando a aplicação corretamente com os dados válidos
  return (
    <div>
      <h1>THE CAT API 🐈‍⬛</h1>
      {
        data?.map((cat) => (
          <div key={ cat.id }>
            <img
              src={ cat.url }
              alt={ cat.id }
              id="img-request"
            />
            <div id="inputs-request">
                <label htmlFor="inputId" className="label-request"><b>Id:</b></label>
                <input type="text" id="inputId" defaultValue={ cat.id } onChange={ handleChangeInputId } className="input-request" />

                <label htmlFor="inputUrl" className="label-request"><b>Url:</b></label>
                <input type="text" id="inputUrl" defaultValue={ cat.url } onChange={ handleChangeInputUrl } className="input-request" />

                <label htmlFor="inputWidth" className="label-request"><b>Width:</b></label>
                <input type="number" id="inputWidth" defaultValue={ cat.width } onChange={handleChangeInputWidth} className="input-request" />

                <label htmlFor="inputHeight" className="label-request"><b>Height:</b></label>
                <input type="number" id="inputHeight" defaultValue={ cat.height } onChange={ handleChangeInputHeight } className="input-request" />
            </div>
            <button
              onClick={ handleButtonClick }
              id="btn-request"
            >
              VERIFICAR DADOS
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default Request;
