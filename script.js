// Variáveis necessárias para que a aplicação funcione;
const paperType = ['newspaper', 'magazine1', 'magazine2'];
const fontSize = ['medium', 'big', 'reallybig'];
const rotation = ['rotateleft', 'rotateright'];
const slanting = ['skewleft', 'skewright'];
const allClasses = [paperType, fontSize, rotation, slanting];
const button = document.getElementById('criar-carta');
const inputText = document.getElementById('carta-texto');
const wordCount = document.getElementById('carta-contador');
const paragraph = document.getElementById('carta-gerada');
const spanCollection = document.getElementsByTagName('span');
// Função que gera um índice aleatório;
function randomIndexGenerator(n) {
  const rng = Math.round(Math.random() * n);
  return rng;
}
// Funções que retornam uma classe de seu respectivo tipo aleatória;
function classSetter() {
  const newArray = [];
  for (let i = 0; i <= 3; i += 1) {
    const arrayGetter = allClasses[i];
    const newIndex = randomIndexGenerator(arrayGetter.length - 1);
    newArray[i] = (arrayGetter[newIndex]);
  }
  console.log(newArray);
  return newArray;
}
// Função que gera o span e atribui uma classe aleatoriamente a ele;
function spanGenerator() {
  const newSpan = document.createElement('span');
  const newClassArray = classSetter();
  for (let i = 0; i < newClassArray.length; i += 1) {
    newSpan.classList.add(newClassArray[i]);
  }
  return newSpan;
}
// Função que recebe o valor do input e separa os elementos;
function valueConverter() {
  const inputValue = inputText.value;
  const valueArray = inputValue.split(' ');
  return valueArray;
}
// Função que compara a classe atual com a nova gerada e remove a anterior;
function classResetter(span) {
  const spanClasses = span.classList;
  const newArray = [];
  for (let i = 0; i <= 3; i += 1) {
    const arrayGetter = allClasses[i];
    let newIndex = randomIndexGenerator(arrayGetter.length - 1);
    while (spanClasses[i] === arrayGetter[newIndex]) {
      newIndex = randomIndexGenerator(arrayGetter.length - 1);
    }
    newArray.push(arrayGetter[newIndex]);
  }
  return newArray;
}
// Função handler do event listener dos spans;
function spanHandler(e) {
  const span = e;
  const spanClasses = e.classList;
  const newClassesArray = classResetter(span);
  for (let i = 3; i >= 0; i -= 1) {
    spanClasses.remove(spanClasses[i]);
    spanClasses.add(newClassesArray[3 - i]);
  }
}
// Função que cria o event listener dos spans;
function spanListener() {
  for (let i = 0; i < spanCollection.length; i += 1) {
    spanCollection[i].addEventListener('click', (event) => spanHandler(event.target));
  }
}
// Função que ancora os novos spans e adiciona o texto a eles;
function spanAppend() {
  const words = valueConverter();
  if (!words[0]) {
    wordCount.innerText = '0';
    paragraph.innerText = 'Por favor, digite o conteúdo da carta.';
    return;
  }
  paragraph.innerText = '';
  wordCount.innerText = `${words.length}`;
  for (let i = 0; i < words.length; i += 1) {
    const span = spanGenerator();
    span.innerText = `${words[i]}`;
    paragraph.appendChild(span);
  }
  spanListener();
}
// Função que cria o event listener do botão de gerar carta;
function buttonListener() {
  button.addEventListener('click', spanAppend);
}
// Listener do carregamento da página;
window.onload = () => {
  buttonListener();
};
