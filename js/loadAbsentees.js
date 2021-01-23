const loadAbsentees = (data, sessions) => {
	const date = sessions.find((session) => session._id === data.dateId);
	const session = date.sessions.find((item) => item._id === data.sessionId);
	const { absentees } = session;

	const swapBody = document.querySelector('#swap1').querySelector('.swap-body');
	swapBody.innerHTML = ` 
        <h2 class="px-3 pt-3">${session.name}</h2>
        <p class="paragraph p-3 fs-5 fw-lighter">${getCorrectTimeFormat(
			session.startTime,
			date.date
		)} - ${getCorrectTimeFormat(session.endTime, date.date)}</p>
        <div class="px-3">
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: ${Math.floor(
					absentees.length * 100 / 33
				)}%" aria-valuenow="75"
                    aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p class="paragraph">${absentees.length} Students absent</p>
        </div>`;

	const ul = document.createElement('ul');
	ul.setAttribute('class', 'list-group px-3 mb-3');

	for (let absentee of absentees) {
		const li = document.createElement('li');
		li.setAttribute('class', 'list-group-item');
		li.innerHTML = `
        <div class="row">
            <div class="col d-flex align-items-center">
                <img width="40" height="40" class="rounded-circle me-3"
                    src="${absentee.profile_src}">
                <p class="paragraph mb-0">
                    <span class="d-block fs-5">${absentee.name}</span>
                    <span class="d-block fw-lighter">${absentee.email}</span>
                </p>
            </div>
            <div class="col d-flex justify-content-end align-items-center remove-absentees">
                
            </div>
        </div>`;
		const removeAbsentees = li.querySelector('.remove-absentees');

		const anker = document.createElement('a');
		anker.setAttribute('class', 'btn');
		anker.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>`;
		anker.addEventListener('click', (event) => {
			return li.remove();
		});

		removeAbsentees.append(anker);
		ul.append(li);
	}

	swapBody.append(ul);
};
