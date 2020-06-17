import {
  logout, createPost, timeline, deletePost, likePost, saveEditedPost,profile,} from './data.js';
export const feed = () => {
  const container = document.createElement('div');
container.innerHTML = ` <div class='fundo'>
  <div class='navbar'><button id='logout-btn' class="feed-btn-logout"><img class='exit' src='../../assets/exit.png'></button>
  <figure class='img-nav'><img class='img-nav' src='../../assets/logo-sos.png'></figure> 
  </div>
<section>
  <form  id='form' class='postfeed'>
    <div class='profile'><h1 id='name'>Nome</h1></div>
      <label for="page-feed" class='postcont'>
      <div id='privacy'>
      <input type="radio" name="privacy" id="public" class="btn-privacy" value="public" checked><img class='public btn-privacy' src='../../assets/public.png'>
      <input type="radio" name="privacy" id="private" class="btn-privacy" value="private" checked><img class='private btn-privacy' src='../../assets/private.png'>
      </div>  
      <input id="post-input" class="btn post" placeholder=' O que você está pensando' type='text'>
          <button id='post-btn' type='submit' class="feed-btn-postar">Compartilhar</button>
      </label>
  </form>
</section>
<main id='all-posts'>
</main>
<footer>
</footer>
</div>
`
}

  const logoutBtn = container.querySelector('#logout-btn');
  const postBtn = container.querySelector('#post-btn');
  const allPosts = container.querySelector('#all-posts');
  const inputPost = container.querySelector('#post-input');
  const form = container.querySelector('#form');
  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
  postBtn.addEventListener('click', (event) => {
    event.preventDefault(); //console.log(form.privacy.value)
    createPost(inputPost.value,form.privacy.value);
    allPosts.innerHTML = '';
    timeline(templatePost);
    inputPost.value = '';
  });

 const templatePost = (arrayPosts) => {
    allPosts.innerHTML = '';
    arrayPosts.map(post => {
      const template = document.createElement('div');
      template.classList.add('template');
      template.innerHTML = `
      <div class='postedfeed'>
    <p id ='datePost'class='posted-for'>${post.user}, em ${post.date}</p>
    <form id='privacy' class='privacy'>
    <input type="radio" name="privacy" id="public" class="btn-privacy" value="public" checked><img class='public btn-privacy' src='../../assets/public.png'>
    <input type="radio" name="privacy" id="private" class="btn-privacy" value="private" checked><img class='private btn-privacy' src='../../assets/private.png'>
    </form>
    <button id='delete-btn' class ='delet-btn'data-id= ${post.id}><img class='close' src='../../assets/close.png'></button>
    <textarea id='text-area' data-id=${post.id} class='post' disabled>${post.text}</textarea>    
    <div class='bnt-space'>
    <button id='comment-btn' class ='comment-btn' data-id= ${post.id}><img class='likes size' src='../../assets/comment.png' width='20'></button> <br>
    <button id='edit-btn' class='edit size' data-id= ${post.id}><img class='save size' src='../../assets/edit.png'></button>
    <button id='save-btn' class='save size' data-id= ${post.id}><img class='save size' src='../../assets/tick.png'></button>
    <button id='like-btn' class='likes-btn size' data-id= ${post.id}>
    <img class='likes size' src='../../assets/001-paw.png' width='20'>${post.likes}</button>'
    </div>
    <div class='comments-area' id='all-comments' style="display: none;">
    <textarea>olar</textarea>
    </div>
    </div>` 

    allPosts.appendChild(template);

    const commentBtn = template.querySelector('#comment-btn');
      commentBtn.addEventListener('click', ()=>{
        template.querySelector('.comments-area').style.display='flex';
      })
  
  
    const likeBtn = template.querySelector("#like-btn");
    const deleteBtn = template.querySelector('#delete-btn');
    const editBtn = template.querySelector("#edit-btn");
    const saveBtn = template.querySelector('#save-btn');
    const privacyBtn = template.querySelector('#privacy')
    const datePost = template.querySelector('#datePost')
    saveBtn.style.display = 'none';
    privacyBtn.style.display = 'none';

      if (post.userUid === firebase.auth().currentUser.uid) {      
      deleteBtn.addEventListener('click', (event) => {
        event.preventDefault();
        deletePost(deleteBtn.dataset.id);
      })

      const editPost = () => {
        const textArea = template.querySelector('#text-area');
        textArea.disabled = false;
        textArea.style.color = 'black';
        
      };

      editBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editPost(editBtn.dataset.id)
        saveBtn.style.display = 'flex'
        privacyBtn.style.display = 'flex'
        datePost.style.display = 'none'
      })

      saveBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const textArea = template.querySelector('#text-area');
        textArea.disabled = true;        
        saveEditedPost(saveBtn.dataset.id, textArea)
      })
    }else {
      editBtn.style.display = 'none';
      deleteBtn.style.display = 'none';
      privacyBtn.style.display = 'none';
      datePost.style.display = 'flex'
      
      likeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        likePost(likeBtn.dataset.id);
      })

    }
    }).join('');
  };
  timeline(templatePost, likePost, deletePost, saveEditedPost,)
  return container;
};

