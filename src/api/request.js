

class AuthenticationApi{
    login(username, password) {
        axios.post("/api/login", {
			username: username,
			password: sha256(password)
		})
    }
}
