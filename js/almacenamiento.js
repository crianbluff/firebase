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

	const storage = f.storage(),
				bucket = storage.ref(),
				imgRef = bucket.child('img'),
				form = d.getElementById('upload'),
				uploader = d.getElementById('uploader'),
				progressBar = d.getElementById('progress-bar'),
				output = d.getElementById('output'),
				progressAdvance = d.getElementById('progress-advance');

	function saveFileInDb(url) {

		let fileRef = f.database().ref().child('files');

		fileRef.push({
			url
		});

	}

	c(bucket);

	output.innerHTML = '';

	uploader.addEventListener('change', e => {
		c(e.target.files);

		Array.from(e.target.files).forEach( file => {
			c('Subiendo archivo');
			c(file);

			let uploadTask = imgRef.child(file.name).put(file);

			uploadTask.on('state_changed', data => {
				c(data);
				let progress = Math.floor( ( data.bytesTransferred / data.totalBytes ) * 100 );
				progressBar.value = progress;
				progressAdvance.innerHTML = `${ progress }%`;
				c(progress);
			}, err => {
					c(err);
					c(err.code, err.message);
					progressAdvance.innerHTML = `
						<p>
							${ err.code } - ${ err.message }
						</p>
					`;
				}, () => {
						let fileRef = imgRef.child(file.name);

						fileRef.getDownloadURL()
							.then( url => {
								c(url);

								if ( file.type.match('image.*') ) {
									output.innerHTML += `
										<img src="${ url }" alt="${file.name}" title="${file.name}">
									`;
								} else {
										output.innerHTML += `
											<p>
												Tu archivo se ha subido puedes verlo
												<a href="${ url }" target="_blank">
													Aquí
												</a>
											</p>
										`;
									}
									saveFileInDb(url);
							})
					});
		});

		form.reset();

	});

	
})(document, console.log, firebase);