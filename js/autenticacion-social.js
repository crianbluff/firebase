;
( (d, c, f) => {	

	const config = {
		apiKey: "AIzaSyA-O6r8t38w34HXa0NjKn8HCUTB1cyqITU",
		authDomain: "crianbluff-firebase.firebaseapp.com",
		databaseURL: "https://crianbluff-firebase.firebaseio.com",
		projectId: "crianbluff-firebase",
		storageBucket: "crianbluff-firebase.appspot.com",
		messagingSenderId: "269394560789"
	};

	f.initializeApp(config);

	const provider = new f.auth.GithubAuthProvider(),
				user = f.auth.currentUser,
				loginMessage = d.getElementById('login-message'),
				authMessage = d.getElementById('session-message');

	f.auth().onAuthStateChanged( user => {

		if ( user )  {
			c('Usuario Autenticado');
			authMessage.innerHTML = `
				<p>
					Si ves este contenido es por que estás
					<b>
						Logeado
					</b>
				</p>

				<button type="button" id="logout">
					Salir
				</button>
			`;
		} else {
				c('Usuario No Autenticado');
				authMessage.innerHTML = `
					<p>
						El cotenido de esta sección es para
						<b>
							usuarios registrados
						</b>
					</p>
				`;
			}

		d.addEventListener('click', e => {

			if ( e.target.matches('#login') ) {
				f.auth().signInWithPopup(provider)
				.then( result => {
					c(result);
					loginMessage.innerHTML = `
						<p class="ok">
							<b>
								${ result.user.email }
							</b>

							ha iniciado sesión con github.
						</p>

						<img src="${ result.user.photoURL }" alt="${ result.user.displayName }" title="${ result.user.displayName }">
					`;
				})
				.catch( err => {
					c(err);
					loginMessage.innerHTML = `
						<p class="error">
							Error De Autenticación Con Github ${ err.code }:
							<b>
								${ err.message }
							</b>.
						</p>
					`;
				});
			}

			if ( e.target.matches('#logout') ) {
				f.auth().signOut()
				.then( () => loginMessage.innerHTML = `<p>Sesión terminada </p>` );
			}

		});

	})


})(document, console.log, firebase);