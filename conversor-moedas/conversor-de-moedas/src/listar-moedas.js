import React from 'react';

function ListarMoedas() {//lista de moedas q ficará no form select

  const MOEDAS = [ //http://fixer.io
		{ "sigla": "AUD", "descricao": "Dólar australiano" },
		{ "sigla": "BGN", "descricao": "Lev búlgaro" },
		{ "sigla": "BRL", "descricao": "Real brasileiro" },
		{ "sigla": "CAD", "descricao": "Dólar canadense" },
		{ "sigla": "CHF", "descricao": "Franco suíço" },
		{ "sigla": "CNY", "descricao": "Yuan Chinês" },
		{ "sigla": "CZK", "descricao": "Coroa República Tcheca" },
		{ "sigla": "DKK", "descricao": "Coroa dinamarquesa" },
		{ "sigla": "EUR", "descricao": "Euro" },
		{ "sigla": "GBP", "descricao": "Libra Esterlina" },
		{ "sigla": "HKD", "descricao": "Dólar de Hong Kong" },
		{ "sigla": "HRK", "descricao": "Coroa Croácia" },
		{ "sigla": "HUF", "descricao": "Florim húngaro" },
		{ "sigla": "IDR", "descricao": "Rupia indonésia" },
		{ "sigla": "ILS", "descricao": "Novo shekel israelense" },
		{ "sigla": "INR", "descricao": "Rupia indiana" },
		{ "sigla": "JPY", "descricao": "Iene japonês" },
		{ "sigla": "KRW", "descricao": "Won sul-coreano" },
		{ "sigla": "MXN", "descricao": "Peso mexicano" },
		{ "sigla": "MYR", "descricao": "Malásia Ringgit" },
		{ "sigla": "NOK", "descricao": "Coroa Noruega" },
		{ "sigla": "NZD", "descricao": "Dólar da Nova Zelândia" },
		{ "sigla": "PHP", "descricao": "Peso filipino" },
		{ "sigla": "PLN", "descricao": "Złoty Polónia" },
		{ "sigla": "RON", "descricao": "Leu romeno" },
		{ "sigla": "RUB", "descricao": "Belarus Ruble" },
		{ "sigla": "SEK", "descricao": "Coroa Suécia" },
		{ "sigla": "SGD", "descricao": "Dólar de Singapura" },
		{ "sigla": "THB", "descricao": "Baht Tailândia" },
		{ "sigla": "TRY", "descricao": "Lira turca" },
		{ "sigla": "USD", "descricao": "Dólar dos Estados Unidos" },
		{ "sigla": "ZAR", "descricao": "Rand África do Sul" }
	];

  function compare(moeda1, moeda2) {//função compare(2 parametros)  OBS:deixar em ordem alfabetica
    if (moeda1.descricao < moeda2.descricao) {//se moeda 1 for menor moeda 2 em descrição
      return -1;//retorna -1
    } else if (moeda1.descricao > moeda2.descricao) {//se não 1
      return 1;
    }
    return 0;//senão ultimo caso iguais retorna 0
  }

  return MOEDAS.sort(compare).map(moeda => //para retornar a algo,, sort:ordenar(função compare)map:iterar por todos elementos e ve cada uma das linhas mapeando moedas,,
    <option value={moeda.sigla} key={moeda.sigla} //moeda.descrição:sigla
	>
      {moeda.descricao}
    </option>
  );

}

export default ListarMoedas;//exportar para outros arquivos
