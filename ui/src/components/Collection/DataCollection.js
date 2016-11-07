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

let pushCollections = () => {
	return new Promise((resolve, reject)=>{
		if (localStorage.getItem('token') === 'null' || !localStorage.getItem('token')) {
			return reject(false)
		} else {
			let get = $.ajax({
				type: 'POST',
				url: 'http://localhost:8000/api/collections?token=' + localStorage.getItem('token'),
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

export default{
	getCollections
}