const getCorrectDateFormat = (date) => {
	date = new Date(date);
	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	//map month's index with human's readable month name
	let month = months[date.getMonth()];
	//return date in the format of dd mm, yy
	return `${date.getDate()} ${month}, ${date.getUTCFullYear()}`;
};

const getCorrectTimeFormat = (time, date) => {
	date = new Date(date + ' ' + time);
	let hoursClock =
		date.getHours() > 12
			? `${date.getHours() - 12}:${date.getMinutes()} PM`
			: `${date.getHours()}:${date.getMinutes()} AM`;
	//return hours and minutes in format of hh:mm AM || PM
	return hoursClock;
};
