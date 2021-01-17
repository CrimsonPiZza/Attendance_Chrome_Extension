const createBtn = document.querySelector('#createNewBtn');
const viewDetails = document.querySelectorAll('.view-details');
const swapBackBtn1 = document.querySelector('#swapBack1');
const swapBackBtn2 = document.querySelector('#swapBack2');

const toggleNavigation = (event) => {
	const swapParent = document.querySelector('#swapParent');
	const swap = swapParent.querySelector('#swap1');

	swapParent.classList.toggle('invisible');
	swap.classList.toggle('left-0');
};

const toggleCreateNew = (event) => {
	const swapParent = document.querySelector('#swapParent');
	const swap = swapParent.querySelector('#swap2');

	swapParent.classList.toggle('invisible');
	swap.classList.toggle('left-0');
};

viewDetails.forEach((element) => element.addEventListener('click', toggleNavigation));
swapBackBtn1.addEventListener('click', toggleNavigation);
createBtn.addEventListener('click', toggleCreateNew);
swapBackBtn2.addEventListener('click', toggleCreateNew);
