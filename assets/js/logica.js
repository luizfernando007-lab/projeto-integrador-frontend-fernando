/*
==========================================================
 +Foco — Aula 09: Analisador de atividades de estudo
 (dados -> classificar -> resumir)
==========================================================

 TEMA:          atividades de estudo cadastradas na plataforma +Foco
 ENTRADA:       horas de estudo disponíveis na semana (1 a 80), digitadas
                com prompt; depois títulos de atividades para consulta,
                até digitar "sair"
 PROCESSAMENTO: classificar cada atividade pela urgência do prazo
                (Urgente / Esta semana / Tranquila), indicar onde
                registrá-la conforme a categoria (switch) e resumir
                o conjunto (contar urgentes, somar horas, achar a maior)
 SAÍDA:         frases no console (template literal), relatório com
                console.table e um resumo final comparando as horas
                necessárias com as horas disponíveis

 PSEUDOCÓDIGO:
   1. Declarar o array de atividades
   2. Pedir as horas disponíveis e validar (null, vazio, NaN, faixa)
   3. Para cada atividade:
        classificar pelo prazo em dias (if / else if / else)
        escolher a orientação pela categoria (switch)
        atualizar contador de urgentes, acumulador de horas
        e a atividade mais longa (máximo)
   4. Mostrar o relatório com console.table e o resumo
   5. Enquanto o usuário não digitar "sair", buscar a atividade digitada

 TESTE DE MESA (3 primeiras voltas do for...of principal)
 ---------------------------------------------------------------------------
 volta | atividade                | prazo | faixa        | urgentes | totalHoras | maisLonga
 ------|--------------------------|-------|--------------|----------|------------|-------------------
   1   | Lista de Cálculo         |  2    | Urgente      |    1     | 0 + 4 = 4  | Lista de Cálculo (4h)
   2   | Seminário de História    | 10    | Tranquila    |    1     | 4 + 6 = 10 | Seminário de História (6h)
   3   | Prova de Física          |  5    | Esta semana  |    1     | 10 + 8 = 18| Prova de Física (8h)
 ---------------------------------------------------------------------------
 (conferir com as 3 primeiras linhas que o console.log mostra)
*/

// ---------- 1. DADOS ----------
// categoria usa os mesmos valores do <select> do formulário
const atividades = [
  { titulo: "Lista de Cálculo",         categoria: "atividades", horas: 4, prazoDias: 2 },
  { titulo: "Seminário de História",    categoria: "atividades", horas: 6, prazoDias: 10 },
  { titulo: "Prova de Física",          categoria: "calendario", horas: 8, prazoDias: 5 },
  { titulo: "Revisão em ciclos",        categoria: "pomodoro",   horas: 2, prazoDias: 1 },
  { titulo: "Montar cronograma do mês", categoria: "cronograma", horas: 1, prazoDias: 14 },
  { titulo: "Leitura de artigo",        categoria: "leitura",    horas: 3, prazoDias: 7 }
];

// ---------- 2. ENTRADA COM CONVERSÃO E VALIDAÇÃO ----------
function lerHorasDisponiveis() {
  const resposta = prompt("Quantas horas de estudo você tem disponíveis nesta semana? (1 a 80)");

  // Cancelar devolve null
  if (resposta === null) {
    alert("Entrada cancelada. Usando 10 horas.");
    return 10;
  }

  // Number("") vira 0, então o vazio precisa ser testado antes
  if (resposta.trim() === "") {
    alert("Nenhum valor digitado. Usando 10 horas.");
    return 10;
  }

  const numero = Number(resposta);

  if (Number.isNaN(numero)) {
    alert("Digite apenas números. Usando 10 horas.");
    return 10;
  }

  if (numero < 1 || numero > 80) {
    alert("O valor deve estar entre 1 e 80. Usando 10 horas.");
    return 10;
  }

  return numero;
}

// ---------- 3. CLASSIFICAÇÃO (if / else if / else) ----------
// A ordem importa: do menor prazo para o maior.
function classificarPrazo(prazoDias) {
  let faixa;

  if (prazoDias <= 2) {
    faixa = "Urgente";
  } else if (prazoDias <= 7) {
    faixa = "Esta semana";
  } else {
    faixa = "Tranquila";
  }

  return faixa;
}

// ---------- 4. SWITCH sobre a categoria (texto) ----------
function orientacaoDaCategoria(categoria) {
  let orientacao;

  switch (categoria) {
    case "cronograma":
      orientacao = "Ajuste no Cronograma";
      break;
    case "atividades":
      orientacao = "Registre em Atividades";
      break;
    case "calendario":
      orientacao = "Marque no Calendário Acadêmico";
      break;
    case "pomodoro":
      orientacao = "Agende ciclos de Pomodoro";
      break;
    default:
      orientacao = "Adicione manualmente";
  }

  return orientacao;
}

// Remove acentos e maiúsculas para a busca não falhar por detalhe de digitação
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ---------- 5. PROCESSAMENTO PRINCIPAL ----------
const horasDisponiveis = lerHorasDisponiveis();

let urgentes = 0;                  // contador
let totalHoras = 0;                // acumulador
let maisLonga = atividades[0];     // máximo (maior nº de horas)
const relatorio = [];

for (const atividade of atividades) {
  const faixa = classificarPrazo(atividade.prazoDias);
  const orientacao = orientacaoDaCategoria(atividade.categoria);

  if (faixa === "Urgente") {
    urgentes++;
  }

  totalHoras += atividade.horas;

  if (atividade.horas > maisLonga.horas) {
    maisLonga = atividade;
  }

  relatorio.push({
    atividade: atividade.titulo,
    prazo: `${atividade.prazoDias} dia(s)`,
    faixa: faixa,
    horas: atividade.horas,
    orientacao: orientacao
  });

  console.log(`${atividade.titulo}: prazo em ${atividade.prazoDias} dia(s) (${faixa}) - ${orientacao}`);
}

// ---------- 6. SAÍDA ----------
console.table(relatorio);

console.log(
  `Resumo: ${urgentes} atividade(s) urgente(s), ${totalHoras}h de estudo necessárias. ` +
  `Maior atividade: ${maisLonga.titulo} (${maisLonga.horas}h).`
);

if (totalHoras <= horasDisponiveis) {
  console.log(`Você tem ${horasDisponiveis}h disponíveis: dá para cumprir tudo com folga de ${horasDisponiveis - totalHoras}h.`);
} else {
  console.log(`Você tem ${horasDisponiveis}h disponíveis, mas precisa de ${totalHoras}h: faltam ${totalHoras - horasDisponiveis}h. Priorize as urgentes.`);
}

// ---------- 7. WHILE com palavra de saída ----------
let comando = prompt('Digite o título de uma atividade para consultar (ou "sair"):');

while (comando !== null && comando.trim().toLowerCase() !== "sair") {
  const busca = normalizar(comando.trim());
  let encontrada = null;

  for (const atividade of atividades) {
    if (busca !== "" && normalizar(atividade.titulo).includes(busca)) {
      encontrada = atividade;
      break;
    }
  }

  if (encontrada === null) {
    alert(`Nenhuma atividade encontrada para "${comando}".`);
  } else {
    alert(`${encontrada.titulo}: ${encontrada.horas}h, prazo em ${encontrada.prazoDias} dia(s) (${classificarPrazo(encontrada.prazoDias)}).`);
  }

  // A condição é atualizada DENTRO do laço (evita loop infinito)
  comando = prompt('Digite o título de uma atividade para consultar (ou "sair"):');
}

console.log("Consulta encerrada.");