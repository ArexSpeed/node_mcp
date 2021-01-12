const _data = require('./lib/data.js')

const test = (crud, dir, file, data, callback ) => {
  switch (crud){
    case 'create':
      return  _data.create(dir, file, data, callback)
    case 'read':
      return _data.read(dir, file, callback)
    case 'update':
      return _data.update(dir,file,data,callback)
    case 'delete':
      return _data.delete(dir,file,callback)
    default:
      console.log('Something was wrong')
  }
}

module.exports = test;

//Testing in index.js 
// Testing
// @TODO delete this
// _data.create('test', 'newFile1', {'foo': 'bar'}, (err) => {
//   console.log('this was the error',err)
// })
//Test read
// _data.read('test', 'newFile1',(err,data) => {
//   console.log('this was the error',err, 'and this was the data', data)
// })
//Test update
// _data.update('test', 'newFile1', {'fizz': 'buzz'}, (err) => {
//   console.log('this was the error',err)
// })
//Test delete
// _data.delete('test', 'newFile1', (err) => {
//   console.log('this was the error',err)
// })