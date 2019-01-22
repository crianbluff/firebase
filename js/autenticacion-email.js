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

	const auth = f.auth(),
				user = auth.currentUser,
				authMessage = d.getElementById('session-message'),
				formSignIn = d.getElementById('sign-in'),
				formLogin = d.getElementById('login');

	function createUserInDb(uid, name, email) {
		let usersRef = f.database().ref().child('users');

		usersRef.child(uid).set({
			name,
			email
		});
	}

	auth.onAuthStateChanged(user => {
		c(user);

		if ( user ) {
			authMessage.innerHTML = `
				<p>
					Si ves este contenido, es por que estás

					<b>
						Logueado :)
					</b>
				</p>

				<button type="button" id="logout">
					Salir
				</button>
			`;
		} else {
				authMessage.innerHTML = `
					<p>
						El contenido de esta sección es para

						<b>
							usuarios registrados
						</b>
					</p>
				`;
			}

	});

	formSignIn.addEventListener('submit', e => {
		e.preventDefault();
		let message = d.getElementById('sign-in-message');
		auth.createUserWithEmailAndPassword(
			e.target.email.value,
			e.target.password.value
		)
		.then( res => {
			c(res);
			c(res.user);
			// Insertar el usuario en la base de datos
			createUserInDb(
				res.user.uid,
				e.target.name.value,
				e.target.email.value
			);
			message.innerHTML = `
				<p class="ok">
					Usuario creado con el correo

					<b>
						${ e.target.email.value }
					</b>
				</p>
			`;
			e.target.reset();
		})
		.catch( err =>  {
			c(err);
			message.innerHTML = `
				<p class="error">
					La cuenta de correo

					<b>
						${ e.target.email.value }
					</b>

					ya existe.
					Intenta con otra
				</p>
			`;
			e.target.name.focus();
		});
	});

	formLogin.addEventListener('submit', e => {
		e.preventDefault();

		let message = d.getElementById('login-message');
		auth.signInWithEmailAndPassword(
			e.target.email.value,
			e.target.password.value
		)
		.then( user =>  {
			c(user);
			message.innerHTML = `
				<p class="ok">
					Usuario logueado con el correo

					<b>
						${ e.target.email.value }
					</b>
				</p>
			`;
			e.target.reset();
		})
		.catch( err =>  {
			c(err);
			message.innerHTML = `
				<p class="error">
					Correo electrónico o password no son validos. Verifica nuevamente tus datos.
				</p>
			`;
			e.target.password.focus();
		});
	});

	d.addEventListener('click', e => {
		if ( e.target.matches('#logout') ) {
			auth.signOut()
			.then( () => {
				c('Sesión terminada');
				authMessage.innerHTML = `<p>Sesión terminada </p>`;
			});
		}
	});
	
})(document, console.log, firebase);