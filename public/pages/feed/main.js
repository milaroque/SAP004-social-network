export const feed = () => {
    const container = document.createElement('div');
  
    container.innerHTML = `
        <form>
          <input id='post' placeholder='O que você está pensando' type='text'>
          <button id='login-btn'>Postar</button>
          <button id='google-btn'>Logout</button>
        </form>
      `;
  
  /*   const email = container.querySelector('#email');
    const password = container.querySelector('#password');
    const loginBtn = container.querySelector('#login-btn');
    const googleBtn = container.querySelector('#google-btn') */
  
  
   /*  loginBtn.addEventListener('click', (event) => {
      event.preventDefault();
      userLogin(email.value, password.value)
    });
  
    googleBtn.addEventListener('click', (event) => {
      event.preventDefault();
      loginGoogle()
    }) */
  
    return container;
  };