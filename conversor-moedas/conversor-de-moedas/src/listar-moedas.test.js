import React from 'react';
import ReactDOM from 'react-dom';// métodos específicos para o DOM que podem ser usados no nível superior de sua aplicação como uma válvula de escape para sair do modelo do React se você precisar.
import ListarMoedas from './listar-moedas';

describe('Teste do componente de listagem de moedas', () => {//função anonima ()=>

  it('deve renderizar o componente sem erros', () => {//ver se ta renderizando o componente
    const div = document.createElement('div');//chama a div para renderizar
    ReactDOM.render(<ListarMoedas />, div);
    ReactDOM.unmountComponentAtNode(div);//Retorna true se um componente foi desmontado e false se não tinha nenhum componente para desmontar.
  });

});
