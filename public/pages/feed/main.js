export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <form class="container-feed">
    <label for="page-feed">
      <input id="email" class="btn" placeholder='example@example.com' type='email'>
    </label>
    <label for="page-password">
      <input id="password" class="btn" placeholder='Digite sua senha' type='password'>
    </label>  
      <button id='login-btn' class='login-btn'>Login</button>
      <button id='google-btn' class='login-btn'>Google</button>
      <p>Ainda não tem conta?<a href='#register'>Registre-se!</a></p>
    </form>



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