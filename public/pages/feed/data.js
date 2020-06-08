export const logout = () => {
firebase.auth()
.signOut()
.then(()=> window.location.hash='#home');
} 

