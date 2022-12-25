# Avatar

Generate avatar images in 270+ edge locations, powered by Cloudflare Workers

![Visitor](https://visitor-badge.laobi.icu/badge?page_id=manh21.avatar)

## Info

Avatar generates custom avatar images on the fly. All of these images are generated on Cloudflare's Edge, at 270+ locations, ensuring the best possible performance for all of your users. All images are cached for lengthy periods of time.

## As a Serverless application

You can deploy this repository as a serverless application using an Cloudflare Workers account. This will create a Cloudflare Workers application that you can use to generate mathematics formula to images.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/manh21/avatar)

## Usage

Avaliable parameters:

```text
s=60 (Size of image)
```

```text
shape=square (Shape of image) available: square, circle, rounded
```

```text
https://avatar.manh21.com/api/NH?s=120&shape=circle
```

![](https://avatar.manh21.com/api/NH?s=120&shape=circle)

## License

Math API is released under the [MIT](https://github.com/manh21/math2img/blob/master/LICENSE) license.
