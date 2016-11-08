import $ from 'jquery'

let getVideos = (collectionId) => {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('token') === 'null' || !localStorage.getItem('token')) {
			return reject(false)
		} else {
			let get = $.ajax({
				type: 'GET',
				url: 'http://localhost:8000/api/video/getvideos?collectionid=' + collectionId + '&token=' + localStorage.getItem('token'),
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

let processBrightness = (collectionId) => {
	return new Promise((resolve, reject) => {
		if (localStorage.getItem('token') === 'null' || !localStorage.getItem('token')) {
			return reject(false)
		} else {
			let get = $.ajax({
				type: 'GET',
				url: 'http://localhost:8000/api/video/processbrightness?collectionid=' + collectionId + '&token=' + localStorage.getItem('token'),
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
	getVideos,
	processBrightness
}