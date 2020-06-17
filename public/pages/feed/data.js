export const logout = () => {
  firebase.auth()
    .signOut()
    .then(function () {
      alert('Sessão encerrada!');
      window.location.hash = '#home';
    })
    .catch(function (error) {
      // An error happened.
    });
}
const getUrlPhoto = () => { //não exportei esta função pois ela será utilizada apenas neste escopo.
  return firebase.auth().currentUser.photoURL; //Esqueci de dar o carai do return antes do Firebase
}
export const createPost = (text, privacy) => {
  const posts = {
    text,
    user: firebase.auth().currentUser.displayName,
    userUid: firebase.auth().currentUser.uid,
    likes: 0,
    comments: 0,
    date: new Date().toLocaleString('pt-BR'),
    privacy
  };

  firebase.firestore()
    .collection('post').add(posts)
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
}

export const timeline = (callback) => {
  firebase.firestore().collection('post')
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      const posts = [];
      querySnapshot.forEach(function (doc) {
        if (doc.data().privacy === 'public' || doc.data().userUid === firebase.auth().currentUser.uid) { 
          posts.push({ id: doc.id, userUid: doc.userUid, ...doc.data()})
        };
      });
      callback(posts);
    });
}

export const deletePost = (id) => {
  firebase.firestore().collection('post').doc(id).delete().then(function () {
    console.log('Document successfully deleted!');
  }).catch(function (error) {
    console.error('Error removing document: ', error);
  });
}

export const likePost = (id) => {
  let likesPost = firebase.firestore().collection('post').doc(id);
  likesPost.update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
}

export const saveEditedPost = (id, text /* privacy */) => {
return firebase.firestore().collection("post").doc(id).update({
    text: text.value,
    /* privacy: privacy.value, */
})
};


export const createComment = (text) => {
  const comment = {
    text: text,
    user: firebase.auth().currentUser.displayName,
    userUid: firebase.auth().currentUser.uid,
    date: new Date().toLocaleString('pt-BR'),
  };

  firebase.firestore()
    .collection('comments').add(comment)
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
}

export const loadComments = (callback) => {
  firebase.firestore().collection('comments')
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      const comment = [];
      querySnapshot.forEach(function (doc) {
        comment.push({ id: doc.id, userUid: doc.userUid, ...doc.data() });
      });
      callback(comment);
    });
}



export const profile =()=>{
const user = firebase.auth().currentUser;


if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
if (user != null) {
  user.providerData.forEach(function (profile) {
  console.log("Sign-in provider: " + profile.providerId);
  console.log("  Provider-specific UID: " + profile.uid);
  console.log("  Name: " + profile.displayName);
  console.log("  Email: " + profile.email);
  console.log("  Photo URL: " + profile.photoURL);
});
}}}

export const updateUserProfile = () =>{
  var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
}

