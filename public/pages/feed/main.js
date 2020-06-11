import {
  logout, createPost, timeline, deletePost, likePost,
} from './data.js';

export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = `
  <nav id='' class='navbar'>
  <button id='logout-btn' class="feed-btn-logout">Logout</button>
</nav>
<section>
  <form class='class='postfeed'>
    <div class='profile'>mmm</div>
      <label for="page-feed" class='postcont'>
        <input id="post-input" class="btn post" placeholder='O que você está pensando' type='text'>
        <button id='post-btn' type='submit' class="feed-btn-postar">Postar</button> 
      </label>         
  </form>
</section>  
<main id='all-posts'> 
</main>
<footer>
</footer>
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
    allPosts.innerHTML = '';
    timeline(templatePost);
    inputPost.value = '';
  });

  const templatePost = (arrayPosts) => {
    allPosts.innerHTML = '';
    arrayPosts.map(post => {
      const template = document.createElement('div');
      template.innerHTML = `
      <div class='postedfeed'>
    <div class='post'>${post.text}</div>
    <div>Postado por: ${post.user}, em ${post.date}</div>
    <button id='like-btn' data-id= ${post.id}><img class='likes' src='../../assets/001-paw.png' width='30'>${post.likes}</button>'</div>
    <button id='delete-btn' data-id= ${post.id}>Deletar</button>
    `
      allPosts.appendChild(template);

      const deleteBtn = template.querySelector('#delete-btn');
      deleteBtn.addEventListener('click', (event) => {
        event.preventDefault();
        deletePost(deleteBtn.dataset.id);
      })
      const likeBtn = template.querySelector("#like-btn");
      likeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        likePost(likeBtn.dataset.id);

      
      })
      
    }).join('');

  };

  return container;
};
