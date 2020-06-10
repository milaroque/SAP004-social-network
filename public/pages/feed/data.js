export const logout = () => {
  firebase.auth()
    .signOut()
    .then(function () {
      alert('Sessão encerrada!');
      window.location.hash = '#home';

      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
}
export const createPost = (text) => {
  firebase.firestore().collection("post").add({
    text: text,
    likes: 0,
    name: "Adriana",
    date: new Date().toLocaleString('pt-BR')
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  }); 
}

export const readPosts = (callback) => {
  firebase.firestore().collection("post")
    .onSnapshot(function(querySnapshot) {
        var posts = [];
        querySnapshot.forEach(function(doc) {
            posts.push(doc.data());
        });
        callback(posts)
    });
}