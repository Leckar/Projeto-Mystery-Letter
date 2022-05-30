// Variáveis necessárias para que a aplicação funcione;
const classes = ['newspaper', 'magazine1', 'magazine2', 'medium', 'big', 'reallybig', 'rotateleft', 'rotateright', 'skewleft', 'skewright'];
const button = document.getElementById('criar-carta');
const inputText = document.getElementById('carta-texto');
const wordCount =  document.getElementById('carta-contador');
const paragraph = document.getElementById('carta-gerada');
const spanCollection = document.getElementsByTagName('span');
// Função que gera um índice aleatório;
function randomIndexGenerator() {
  return Math.round(Math.random() * 9);
}
// Função que gera o span e atribui uma classe aleatoriamente a ele;
function spanGenerator() {
  const index = randomIndexGenerator();
  const newSpan = document.createElement('span');
  newSpan.classList.add(classes[index]);
  return newSpan;
}
// Função que recebe o valor do input e separa os elementos;
function valueConverter() {
  const value = inputText.value;
  const valueArray = value.split(' ')
  return valueArray;
}
// Função que ancora os novos spans e adiciona o texto a eles;
function spanAppend() {
  const words = valueConverter();
  if (!words[0]) {
    wordCount.innerText = '0';
    return paragraph.innerText = 'Por favor, digite o conteúdo da carta.';
  }
  paragraph.innerText = '';
  wordCount.innerText = `${words.length}`
  for (let i = 0; i < words.length; i += 1) {
    const span = spanGenerator();
    span.innerText = `${words[i]}`
    paragraph.appendChild(span);
  }
  spanListener();
}
// Função handler do event listener dos spans;
function spanHandler(e) {
  let index = randomIndexGenerator();
  console.log(index);
  const span = e;
  console.log(span);
  const removedClass = span.classList[0];
  if (removedClass === classes[index]) {
    index = Math.abs(index - 1);
  }
  span.classList.remove(removedClass);
  span.classList.add(classes[index]);
}
// Função que cria o event listener dos spans;
function spanListener() {
  for (let i = 0; i < spanCollection.length; i += 1) {
    spanCollection[i].addEventListener('click', (event) => spanHandler(event.target));
  }
}
// Função que cria o event listener do botão de gerar carta;
function buttonListener() {
  button.addEventListener('click', spanAppend);
}
// Listener do carregamento da página;
window.onload = () => {
  buttonListener();
};