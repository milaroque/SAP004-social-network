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

export const createPost = (text) => {
  const name = firebase.auth().currentUser.displayName;
  const posts = {
    text: text,
    user: name,
    likes: 0,
    comments: [],
    date: new Date().toLocaleString('pt-BR'),
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
        posts.push({ id: doc.id, ...doc.data() });
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
  var likesPost = firebase.firestore().collection('post').doc(id);
  likesPost.update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
}