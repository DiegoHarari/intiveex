const playerSelectName = document.getElementById('sel1');
const playerSelectPosition = document.getElementById('sel2');
const playerSelectAge = document.getElementById('sel3');
const actualYear = new Date().getFullYear();
const getRenderTable = document.getElementById('render');

async function getPlayers() {
	const response = await fetch('https://football-players-b31f2.firebaseio.com/players.json?print=pretty');
	const playersObject = await response.json();
	return playersObject;
}

document.getElementById('search-btn').addEventListener('click', async () => {
	const players = await getPlayers();
	let age = [];
	players.forEach((player) => {
		let actualYear = new Date().getFullYear();
		let yearOfBirth = player.dateOfBirth.split('-')[0];
		age.push(actualYear - yearOfBirth);
	});

	let [ nameInput, positionInput, ageInput ] = [
		playerSelectName.value,
		playerSelectPosition.value,
		parseInt(playerSelectAge.value)
	];
	const filterName = players.filter((playerName) => playerName.name.toLowerCase() === nameInput);
	const filterPosition = players.filter((playerPosition) => playerPosition.position.toLowerCase() === positionInput);
	const filterAge = age.filter((playerAge) => playerAge === ageInput);

	const render = () => {
		if ((filterName || filterPosition) && filterAge.length > 0) {
			let renderName = document.createElement('td');
			renderName.innerHTML = filterName[0].name;
			let renderPosition = document.createElement('td');
			renderPosition.innerHTML = filterPosition[0].position;
			let renderTeam = document.createElement('td');
			renderTeam.innerHTML = filterName[0].nationality;
			let renderAge = document.createElement('td');
			renderAge.innerHTML = ageInput;
			getRenderTable.appendChild(renderName);
			getRenderTable.appendChild(renderPosition);
			getRenderTable.appendChild(renderTeam);
			getRenderTable.appendChild(renderAge);
		}
	};
	render();
});
