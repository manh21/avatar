import { Hono } from 'hono'
import { getRandomColor } from './utils';

const app = new Hono()

app.get('/api/:avatarText', async (c) => {
	try {
		const { avatarText } = c.req.param();
		const cache = caches.default;

		// Check cache on cloudflare
		const cachedResponse = await cache.match(c.req.url);

		if (cachedResponse) {
			return cachedResponse;
		}
  
		let size = '60';
		let text = 'A';
		let radius = '';
		let color1 = await getRandomColor();
		let color2 = await getRandomColor();

		const {s, shape} = c.req.query();
	
		if (s) size = s;
		if (shape == 'circle') radius = `style="border-radius: 50%;"`;
		if (shape == 'rounded') radius = `style="border-radius: 10px;"`;
		if (avatarText) text = avatarText.substr(0, 2);
	
		let fontsize = (Number(size) * 0.9) / text.length;
		const avatar = `
		<svg ${radius} width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g>
			<defs>
				<linearGradient id="avatar" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="${color1}"/>
				<stop offset="100%" stop-color="${color2}"/>
				</linearGradient>
			</defs>
			<rect fill="url(#avatar)" x="0" y="0" width="${size}" height="${size}"/>
			<text x="50%" y="50%" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="${fontsize}">${text}</text>
			</g>
		</svg>
		`;
	
		const response = new Response(avatar, {
			status: 200,
			headers: {
				'Cache-Control': 'public, max-age=31536000, immutable',
				'Content-Type': 'image/svg+xml; charset=utf8',
			}
		});

		// Set cache on cloudflare
		c.executionCtx.waitUntil(
			cache.put(c.req.url, response.clone())
		)
	
		return response;
	} catch (error) {
		console.log(error)
		const response = new Response(
			JSON.stringify({ error: error }),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json; charset=utf8',
				}
			}
		)

		return response
	}
})

export default app