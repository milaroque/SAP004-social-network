import { logout, createPost, timeline } from './data.js'

export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = ` <div><nav id='' class='navbar'><button id='logout-btn' class="feed-btn-logout">Logout</button></nav>
  <div class='profile'>mmm</div>
  <main><form class="container-feed">
  <form class='class='postfeed'>
  <label for="page-feed" class='postcont'>
    <input id="post-input" class="btn post" placeholder='O que você está pensando' type='text'>
    <button id='post-btn' type='submit' class="feed-btn-postar">Postar</button> 
  </label>         
  </form>
  <section  id='all-posts'></section>
  </main>
  <footer></footer>      
`;

  const logoutBtn = container.querySelector('#logout-btn');
  const postBtn = container.querySelector('#post-btn');
  const allPosts = container.querySelector('#all-posts');
  const inputPost = container.querySelector('#post-input');

  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });

  postBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createPost(inputPost.value);
    allPosts.innerHTML = "";
    timeline(template);
    inputPost.value = "";

  });
  const template = (arrayPosts) => {
    allPosts.innerHTML = arrayPosts.map(post => `<div class='postedfeed'>
    <div class='post'>${post.text}</div>
    <div>Postado por: ${post.user}, em ${post.date}</div>
    <button id='like-btn'><img class='likes' src='../../assets/001-paw.png' width='30'>${post.likes}</button>'</div>
    
    `).join("")

    
  }

  return container;
};

