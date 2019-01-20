// Initialize Firebase
let config = {
	apiKey: "AIzaSyA-O6r8t38w34HXa0NjKn8HCUTB1cyqITU",
	authDomain: "crianbluff-firebase.firebaseapp.com",
	databaseURL: "https://crianbluff-firebase.firebaseio.com",
	projectId: "crianbluff-firebase",
	storageBucket: "crianbluff-firebase.appspot.com",
	messagingSenderId: "269394560789"
};

firebase.initializeApp(config);

const hola = document.getElementById('hola'),
			db = firebase.database(),
			refText = db.ref().child('text');

console.log(db, refText);

refText.on('value', data => {
	hola.innerText = data.val();
});

db.ref().child('data-push').push({
	message: 'insertando datos con el método push'
});

db.ref().child('data-set').set({
	message: 'insertando datos con el método set'
});

db.ref().child('data-set-push').push().set({
	message: 'insertando datos con el método push y set a la vez'
});