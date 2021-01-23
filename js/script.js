(async () => {
	const { data: response } = await axios.get('http://10.0.212.140:3000/admin/getAllDates?n=2');
	appendSessions(response.data);
})();
