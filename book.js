const Book = function(){
	let all = []

	return class Book{
		constructor({id, users, title, description, img_url}){
			this.id = id
			this.title = title
			this.description = description
			this.img_url = img_url
			this.users = users

			all.push(this)
		}

		static getAll(){
			return all
		}
	}
}()