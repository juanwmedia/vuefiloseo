import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCYEeh53jR1wXK74Pf9ORfH5HrjuwsC_4w",
    authDomain: "vuefiloseo.firebaseapp.com",
    databaseURL: "https://vuefiloseo.firebaseio.com",
    projectId: "vuefiloseo",
    storageBucket: "",
    messagingSenderId: "828256265477",
    appId: "1:828256265477:web:ea97ffe3ae6db625"
};

firebase.initializeApp(config);

// Accesos
const db = firebase.firestore();
const auth = firebase.auth();
const usuario = auth.currentUser;

// Colecciones de documentos
const usuariosColeccion = db.collection('usuarios');
const recursosColeccion = db.collection('recursos');
const comentariosColeccion = db.collection('comentarios');
const votosColeccion = db.collection('votos');

export {
    db,
    auth,
    usuario,
    usuariosColeccion,
    recursosColeccion,
    comentariosColeccion,
    votosColeccion,
}