import React, { useState } from 'react';//useState:criar estado para deixar de ser padrão sem proposito
import './conversor-moedas.css';
import {
  Jumbotron,//container da aplicação,Componente leve e flexível para mostrar o conteúdo do estilo da unidade nada de mais
   Button, 
   Form, //formulario.. campos de texto e talz
   Col, //icone e campo de texto..
   Spinner, //carregar a aplicação
   Alert, Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';//icones serem importados
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';//icone especifico >>
import ListarMoedas from './listar-moedas';
import axios from 'axios';

function ConversorMoedas() {//função principal

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3';//CRIA UMA URL COM access_key gerado no site do fixer só acessar

  const [valor, setValor] = useState('1');//valor inicial
  const [moedaDe, setMoedaDe] = useState('BRL');//estado do value moedaDe.. valor BRL inicial
  const [moedaPara, setMoedaPara] = useState('USD');
  const [exibirSpinner, setExibirSpinner] = useState(false);//padrão spinner não exibido falso
  const [formValidado, setFormValidado] = useState(false);//state do validated inicia falso
  const [exibirModal, setExibirModal] = useState(false);//mostra resultado inicia falso
  const [resultadoConversao, setResultadoConversao] = useState('');//inicia vazio
  const [exibirMsgErro, setExibirMsgErro] = useState(false);

  function handleValor(event) {//valor do formulario campo de texto
    setValor(event.target.value.replace(/\D/g, ''));//event.target.value:valor campo de texto,,replace(/\D/g, ''):expressoes regulares para não poder digitar letras, apenas numeros podem
  }

  function handleMoedaDe(event) {//moedaDe valor inicialmente começa a funcionar
    setMoedaDe(event.target.value);
  }

  function handleMoedaPara(event) {
    setMoedaPara(event.target.value);
  }

  function handleFecharModal(event) {//ao fechar modal 
    setValor('1');//retorna as configuraçoes padroes
    setMoedaDe('BRL');
    setMoedaPara('USD');
    setFormValidado(false);
    setExibirModal(false);
  }

  function converter(event) {//função converte a moeda
    event.preventDefault();//para a pagina não atualizar
    setFormValidado(true);//apos click converter validação state fica true gerando V verde de validação
    if (event.currentTarget.checkValidity() === true) {//se currentTarget:formulario for igual a true
      setExibirSpinner(true);//exibi spinner evitando multiplos clicks
      axios.get(FIXER_URL)//axios com get:http>implementa chamada ao fixer url, 
        .then(res => {//caso de sucesso
          const cotacao = obterCotacao(res.data);//res.data:data.fixer.io
          if (cotacao) {
            setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`);//valor da moedaDe igual coatação da moedapara
            setExibirModal(true);//exibe pr true
            setExibirSpinner(false);//sem spinner
            setExibirMsgErro(false);
          } else {
            exibirErro();
          }
        }).catch(err => exibirErro());
    }
  }

  function obterCotacao(dadosCotacao) {
    if (!dadosCotacao || dadosCotacao.success !== true) {//se não existir dados cotação ou se dados da cotação for diferente de true
      return false;//retorna falso, invalido
    }
    const cotacaoDe = dadosCotacao.rates[moedaDe];//dadosCotacao.rates:onde possui cotação do dinheiro no data.fixer.io, moedaDe: formulario
    const cotacaoPara = dadosCotacao.rates[moedaPara];//moedaPara:referencia outro formulario
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;//formula(1 dividido por primeiro moeda escolhida vezes segunda moeda)* tupo pelo valor escolhido
    return cotacao.toFixed(2);//toFixed: valor acima com 2 casas decimais
  }

  function exibirErro() {
    setExibirMsgErro(true);
    setExibirSpinner(false);
  }

  return (
    <div>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={exibirMsgErro}//em caso de erro gera um alerta
      >
        Erro obtendo dados de conversão, tente novamente.
      </Alert>
      <Jumbotron>
        <Form onSubmit={converter} noValidate validated={formValidado}//onSubmit: envio dos dados,, noValidate:popup validação bootstrap, validated:recebe valor booleano e correto validação
        >
          <Form.Row //formulario em linha
          >
            <Col sm="3"//colunas de cada formulario em linha q no total é 12 em linha dividindo por coluna quanto ocupa
            >
              <Form.Control //campo digitavel
                placeholder="0" //sem valor nada digitavel inicialmente
                value={valor} //valor dinamico
                onChange={handleValor}//atualizar valor
                required //validação html5
                />
            </Col>
            <Col sm="3">
              <Form.Control as="select" //campo de selecionar
                value={moedaDe}//value state função e onchange
                onChange={handleMoedaDe}>
                <ListarMoedas //colocando a lista de opçoes moedas pegas no arquivo
                />
              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" //centralizar elemento em linha
             style={{paddingTop:'5px'}}//duas {{colocar css}}
             >
              <FontAwesomeIcon icon={faAngleDoubleRight}//icone >>
               />
            </Col>
            <Col sm="3">
              <Form.Control as="select"
                value={moedaPara}
                onChange={handleMoedaPara}>
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit" //botão.. variant sucess cor botão verde, 
              data-testid="btn-converter">
                <span className={exibirSpinner ? null : 'hidden'}//span para exibir aplicação spinner, exibir spinner se for true retorna nulo se não hidden ocultar convertor-moeda.css arquivo
                >
                  <Spinner animation="border" size="sm" //carregamento sm:pequena
                  />
                </span>
                <span className={exibirSpinner ? 'hidden' : null}>
                  Converter
                </span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Modal show={exibirModal} //exibe o modal uma tela q mostra resultado conversão
        onHide={handleFecharModal} data-testid="modal"//
        >
          <Modal.Header closeButton //closeButton: aparece x do modal de fechar
          >
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body //resultadoConversao:onde sera renderizado o resultado de moeda
          >
            {resultadoConversao}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Nova conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

export default ConversorMoedas;//exporta return para web
