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
  const userId = firebase.auth().currentUser.uid;
  const posts = {
    text: text,
    user: name,
    user_uid: userId,
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
  let likesPost = firebase.firestore().collection('post').doc(id);
  likesPost.update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
}

export const saveEditedPost = (id, text) => {
return firebase.firestore().collection("post").doc(id).update({
    text: text.value,
})
};



