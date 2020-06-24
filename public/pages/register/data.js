export const registerLogin = (email, password, name, location) => {
  if (email === '' || password === '' || name === '' || location === ''){
    alert('Preencha os campos em branco');
  }else{
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then( ()=> firebase.auth().currentUser.updateProfile({ displayName: name }))
    .then(() => {
      window.location.hash = ('#feed');
      const uid = firebase.auth().currentUser.uid;
      const user = {
        location: location,
        emailUser: email,
        user_uid: firebase.auth().currentUser.uid,
        name: name,
      };
      firebase.firestore().collection('users').doc(uid).set(user);
    })
    .catch((error) => {
      console.log(error)
    });
<<<<<<< HEAD
};
=======
  };
};
>>>>>>> 1b890158df7eaef7d7ff1ddb33cc9dac802e1913
