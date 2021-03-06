let users = [
  {id: 1, name: 'Adam'},
  {id: 2, name: 'Marta'},
  {id: 3, name: 'Kinga'},

]

//przypisywanie metod do obiektu
module.exports = {
  showUsers() {
    const names = users.map(user => user.name);
    console.log('Nasi uzytkownicy to: ');
    names.forEach(name => console.log(name))
  },
  showUserObj(id){
    console.log('szukany uzytkownik to: ')
    const user = users.find(user => id === user.id);
    console.log(user)
  },
  userListLength: users.length
}