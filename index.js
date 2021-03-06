const express = require('./node_modules/express');
const cors = require('./node_modules/cors/lib');
const ytdl = require('ytdl-core');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.get('/download', async (req, res, next) => {
	try {
		let URL = req.query.url;
		let title = 'video';

		await ytdl.getBasicInfo(URL, {
			format: 'mp4'
		}, (err, info) => {
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(URL, {
			format: 'mp4',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});