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

	const db = f.database(),
				contactsRef = db.ref().child('contacts'),
				contactsForm = d.forms[0],
				contactName = d.getElementById('name'),
				contactEmail = d.getElementById('email'),
				contactId = d.getElementById('id'),
				contacts = d.getElementById('contacts');
	
	function contactTemplate( {name, email} ) {
		return `
			<span class="name">
				${ name }
			</span>

			-

			<span class="email">
				${ email }
			</span>

			<button type="button" class="edit">
				Editar
			</button>

			<button type="button" class="delete">
				Eliminar
			</button>
		`;
	}

	// Create
	contactsForm.addEventListener('submit', e => {
		e.preventDefault();

		let id = contactId.value || contactsRef.push().key,
				contactData = {
					name: contactName.value,
					email: contactEmail.value
				},
				updateData = {};

		updateData[`/${ id }`] = contactData;

		contactsRef.update(updateData)
		contactId.value = '';
		contactsForm.reset();
	})

	contactsRef.on('child_added', data => {
		let li = d.createElement('li');

		li.id = data.key;
		li.innerHTML = contactTemplate(data.val());
		contacts.appendChild(li);
	});

	contactsRef.on('child_changed', data => {
		let affectedNode = d.getElementById(data.key);
		affectedNode.innerHTML = contactTemplate(data.val());
	});

	contactsRef.on('child_removed', data => {
		let affectedNode = d.getElementById(data.key);
		contacts.removeChild(affectedNode);
	});

	d.addEventListener('click', e => {

		let affectedNode = e.target.parentElement;
		// Update
		if ( e.target.matches('button.edit') ) {
			contactName.value = affectedNode.querySelector('.name').innerText;
			contactEmail.value = affectedNode.querySelector('.email').innerText;
			contactId.value = affectedNode.id;
		}

		// Delete
		if ( e.target.matches('button.delete') ) {
			let id = affectedNode.id;
			db.ref(`contacts/${ id }`).remove();
		}
	})

})(document, console.log, firebase);