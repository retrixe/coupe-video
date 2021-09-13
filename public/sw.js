const CACHE = 'cache-and-update'

self.addEventListener('install', function (evt) {
  // The service worker is being installed.
  evt.waitUntil(precache())
})

self.addEventListener('fetch', function (evt) {
  // The service worker is serving the asset.
  evt.respondWith(fromCache(evt.request))
  evt.waitUntil(update(evt.request))
})

function precache () {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      '/index.html',
      'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js'
    ]) // TODO: Incomplete caching.
  })
}

function fromCache (request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject(new Error('no-match'))
    })
  })
}

function update (request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response)
    })
  })
}
