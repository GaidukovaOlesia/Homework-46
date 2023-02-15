
async function controller(action) {
	try {
		const response = await fetch(action);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error(response.status)
		}
	} catch (err) {
		console.log(err)
	}
}

const form = document.getElementById("form");

form.addEventListener("submit", async e => {
	e.preventDefault();

	const inputValue = document.getElementById("username").value;

	const data = await controller(`https://api.github.com/users/${inputValue}`);

	const div = document.createElement("div");
	const avatar = document.createElement("img");
	const repos = document.createElement("p");
	const followers = document.createElement("p");
	const following = document.createElement("p");
	avatar.src = `${data.avatar_url}`;
	avatar.alt = `photo`;
	repos.innerText = `Количество репозиториев - ${data.public_repos}`;
	followers.innerText = `Количество подписчиков - ${data.followers}`;
	following.innerText = `Количество подписок - ${data.following}`;
	div.append(avatar);
	div.append(repos);
	div.append(followers);
	div.append(following);
	document.body.append(div);
})