import $ from 'jquery'

let ensureAuth = () => {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('token') === 'null' || !localStorage.getItem('token')) {
			return reject(false)
		} else {
			let get = $.ajax({
				type: 'GET',
				url: 'http://localhost:8000/api/auth?token=' + localStorage.getItem('token'),
				crossDomain: true
			})

			get.done((response) => {
				if (response.user) {
					return resolve(response.user)
				} else {
					return reject(false)
				}
			})

			get.fail((jqXHR, textStatus) => {
				return reject(textStatus)
			})
		}
	})
}

let login = (data) => {
	return new Promise((resolve, reject) => {
		let post = $.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'http://localhost:8000/api/login',
			crossDomain: true,
			data: JSON.stringify(data),
		})

		post.done((response) => {
			if (response.token) {
				localStorage.setItem('token', response.token)
				return resolve(true)
			}
		})

		post.fail((jqXHR, textStatus) => {
			return reject(textStatus)
		})
	})
}

export default {
	login,
	ensureAuth
}