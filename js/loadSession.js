const appendSessions = (sessions) => {
	const attendanceList = document.querySelector('#attendanceList');
	//loop through the data and print on the body
	for (let session of sessions) {
		//get correct format of the date
		let formattedDate = getCorrectDateFormat(session.date);

		//create a div element and add class into it
		const list = document.createElement('div');
		list.setAttribute('class', 'date-and-attendance mb-4');

		// loop through the data and insert it into the div
		list.innerHTML = `<h3 class="mb-3">${formattedDate}</h3>`;

		//create a ul to store all the sessions
		const ul = document.createElement('ul');
		ul.classList.add('list-group');

		//create session list
		for (let item of session.sessions) {
			const li = document.createElement('li');
			li.setAttribute('class', 'list-group-item p-0');

			const anker = document.createElement('a');
			anker.setAttribute('class', 'btn btn-outline-secondary d-block p-2 view-details');

			anker.dataset.dateId = session._id;
			anker.dataset.sessionId = item._id;

			anker.innerHTML = `
            <div class="row">
                <div class="col text-start">
                    <p class="paragraph fs-5 fw-bold ps-2">${item.name}</p>
                    <p class="paragraph fs-5 fw-lighter mb-0 ps-2">${getCorrectTimeFormat(
						item.startTime,
						session.date
					)} - ${getCorrectTimeFormat(item.endTime, session.date)}</p>
                </div>
                <div class="col d-flex justify-content-end align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
                        fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                    </svg>
                </div>
			</div>`;

			//toggle attendance list tab when click on button
			anker.addEventListener('click', (event) => {
				toggleNavigation(event);
				// if the tab is invisible make it visible and run this script
				if (![ ...document.querySelector('#swapParent').classList ].includes('invisible')) {
					const { dataset } = event.currentTarget;
					loadAbsentees(dataset, sessions);
				}
			});

			li.append(anker);
			ul.append(li);
		}

		list.append(ul);
		attendanceList.append(list);
	}
};
