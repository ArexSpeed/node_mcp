console.log('jestem w module notes');

console.log('exports', exports);
console.log('dirname', __dirname); //sciezka do katalogu
console.log('filename', __filename); //sciezka do pliku
console.log('require', require);
console.log('module', module); //caly modul


module.exports = {
  txt: 'cos zwrocone z modulu notes'
}