import { logout, createPost, timeline } from './data.js'

export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = ` <div><nav id=''><button id='logout-btn' class="feed-btn-logout">Logout</button></nav>
  <main><form class="container-feed">
  <label for="page-feed">
    <input id="post-input" class="btn" placeholder='O que você está pensando' type='text'>
  </label>
    <button id='post-btn' type='submit' class="feed-btn-postar">Postar</button>      
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
    allPosts.innerHTML = arrayPosts.map(post => `<div class='templete'>
    <p>${post.text}</p> <br />
    <p>${post.email} ${post.date}</p> <br />
    <button id='like-btn'><img class='likes' src='../../assets/001-paw.png' width='30'>${post.likes}</button>'
    </div>`).join("")
  }

  return container;
};


