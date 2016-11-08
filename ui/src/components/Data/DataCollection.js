import $ from 'jquery'

let getCollections = () => {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('token') === 'null' || !localStorage.getItem('token')) {
			return reject(false)
		} else {
			let get = $.ajax({
				type: 'GET',
				url: 'http://localhost:8000/api/collections/getall?token=' + localStorage.getItem('token'),
				crossDomain: true
			})

			get.done((response) => {
				resolve(response)
			})

			get.fail((jqXHR, textStatus) => {
				return reject(textStatus)
			})
		}
	})
}

let pushCollections = (name) => {
	return new Promise((resolve, reject)=>{
		if (localStorage.getItem('token') === 'null' || !localStorage.getItem('token')) {
			return reject(false)
		} else {
			let data = {
				name:name
			}
			let post = $.ajax({
				type: 'POST',
				data: JSON.stringify(data),
				url: 'http://localhost:8000/api/collections/create?token=' + localStorage.getItem('token'),
				crossDomain: true
			})

			post.done((response) => {
				resolve(response)
			})

			post.fail((jqXHR, textStatus) => {
				return reject(textStatus)
			})
		}
	})
}

export default{
	getCollections,
	pushCollections
}