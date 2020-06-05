import{ logout} from './data.js'

export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = `<nav><ul><li class="btnmenu">
  <button id="button-menu" class="button-menu"><span class="icon-tipo"></span></button>
  <ul class="submenu-options-yellow">
    <li></ul></nav>
    <form class="container-feed">
    <label for="page-feed">
      <input id="post" class="btn" placeholder='O que você está pensando' type='text'>
    </label>
      <button id='post-btn' class="feed-btn-postar">Postar</button>
      <button id='logout-btn' class="logout-btn">Logout</button>
    </form>
`;
const logoutBtn = container.querySelector('#logout-btn');
const postBbtn = container.querySelector('#feed-btn');
  
logoutBtn.addEventListener('click', (event) =>{
    event.preventDefault();

    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
    logout()
  }});
  });
return container
};
