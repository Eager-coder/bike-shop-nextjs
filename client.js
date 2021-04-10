export const client = (url, method = "GET", body = null) => {
	return new Promise(async (resolve, reject) => {
		const response1 = await customFetch(url, method, body)

		if (response1.status !== 401) {
			return resolve(response1)
		}
		const hasTokenUpdated = await requestAccessToken()

		if (hasTokenUpdated) {
			const response2 = await customFetch(url, method, body)
			return resolve(response2)
		} else {
			return reject({ message: "Not authenticated", ok: false })
		}
	})
}

export const customFetch = async (url, method = "GET", body = null) => {
	const res = await fetch(url, {
		method,
		body: body && JSON.stringify(body),
		credentials: "include",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("accessToken"),
			"Content-Type": "application/json",
		},
	})
	const json = await res.json()
	return {
		ok: res.ok,
		status: res.status,
		data: json.data,
		message: json.message,
	}
}

export const requestAccessToken = async () => {
	const { ok, data: accessToken, message } = await customFetch("/api/auth/refresh_token", "POST")
	console.log(message)
	if (ok) {
		localStorage.setItem("accessToken", accessToken)
	}
	return ok
}
