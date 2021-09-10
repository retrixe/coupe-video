# coupe-vidéo

WebAssembly-powered video cutter in the browser. [See it in action here.](https://coupe-video.vercel.app)

coupe-vidéo has been tested against Chrome, Edge and Firefox 89, and should work on the latest version of Safari too. It makes use of WebAssembly and SharedArrayBuffer which are bleeding edge features that enable high-performance CPU processing in the browser, hence the use of a modern browser is recommended.

## Setup

This website can be run locally like any Next.js application. You require Node.js and yarn installed, after which you can run `yarn` to get dependencies and then `yarn build` and `yarn start` to compile and run the app. `yarn dev` can be used to work on the code with Fast Refresh in the browser.

No processing is done on the server, as the website is stateless, and therefore can be exported and served statically. Videos are edited on the client using a version of FFmpeg ported to WebAssembly.
