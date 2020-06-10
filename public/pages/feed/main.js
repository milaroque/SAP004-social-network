import {logout, createPost, readPosts }  from './data.js'

export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <form class="container-feed">
    <label for="page-feed">
      <input id="post" class="btn" placeholder='O que você está pensando' type='text'>
    </label>
      <button id='post-btn' type='submit' class="feed-btn-postar">Postar</button>
      <button id='logout-btn' class="feed-btn-logout">Logout</button>
    </form>
    <div id='postar'>olaaa</div>
    <div id='date' class=''date></div>
`;

  const logoutBtn = container.querySelector('#logout-btn');
  const postBtn = container.querySelector('#post-btn');
  const post = container.querySelector('#post');
  const areaposts = container.querySelector('#postar');
  const data = container.querySelector('#date');
  const now = new Date;
  //const dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");

  logoutBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    logout();
  });

  postBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createPost(post.value);
    areaposts .innerHTML = "";
    readPosts(postTemplate);
    
  });
  const postTemplate = (array) => {
    areaposts.innerHTML = array.map(post => `<p>${post.text}</p>`).join("");
      }   
  return container;
};

