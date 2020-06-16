import {
  logout, createPost, timeline, deletePost, likePost, saveEditedPost
} from './data.js';
export const feed = () => {
  const container = document.createElement('div');
  container.classList.add('fundo')
  container.innerHTML = ` <div class='fundo'>
  <div class='navbar'><button id='logout-btn' class="feed-btn-logout"><img class='exit' src='../../assets/exit.png'></button>
  <figure class='img-nav'><img class='img-nav' src='../../assets/logo-sos.png'></figure> 
  </div>
<section>
  <form class='class='postfeed'>
    <div id='profile-template' class='profile'>Perfil</div>
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
</div>
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
      <p>${post.user}, em ${post.date}</p>
      <button id='delete-btn' class ='delet-btn'data-id= ${post.id}><img class='close' src='../../assets/close.png'></button>
      <textarea id='text-area' data-id=${post.id} class='post' disabled>${post.text}</textarea>    
      <button id='like-btn' data-id= ${post.id}>
      <img class='likes' src='../../assets/001-paw.png' width='30'>${post.likes}</button>'
      
      <button id='edit-btn' data-id= ${post.id}>Editar</button>
      <button id='save-btn' data-id= ${post.id}>Salvar</button>
      </div>
    `
      allPosts.appendChild(template);
    }).join('');
    const deleteBtn = allPosts.querySelector('#delete-btn');
    deleteBtn.addEventListener('click', (event) => {
      event.preventDefault();
      deletePost(deleteBtn.dataset.id);
    })
    const likeBtn = allPosts.querySelector("#like-btn");
    likeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      likePost(likeBtn.dataset.id);
    })
  const editPost = () => {
    const textArea = allPosts.querySelector('#text-area');
    textArea.disabled = false;
    textArea.style.color = 'black';
  };
  const editBtn = allPosts.querySelector("#edit-btn")
  editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    editPost(editBtn.dataset.id)
  })
  const saveBtn = allPosts.querySelector('#save-btn');
  saveBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const textArea = allPosts.querySelector('#text-area');
    textArea.disabled = true;
    saveEditedPost(saveBtn.dataset.id, textArea)
  })
};
  return container;
};