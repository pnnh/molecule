'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "00a3e22624b11853a8cffd1e2219c0ff",
"favicon.ico": "164198e5317680c1b648307a82c5f722",
"index.html": "f525a9bf065b26bdfbd88ac1119a1b42",
"/": "f525a9bf065b26bdfbd88ac1119a1b42",
"main.dart.js": "2a4c2887a177563fde77f79fda760fa8",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "2f431f44398ea6ddb9615177d68087f1",
"assets/AssetManifest.json": "f9966921d8e39550f346d24247fd697c",
"assets/NOTICES": "0747fa3c0dc37020c4483a39dca69dfa",
"assets/FontManifest.json": "15f02e5a1de45a162fdf89138051ef5c",
"assets/static/images/icons/pencil-svgrepo-com.svg": "d991671c6053b275770a121e72048e48",
"assets/static/images/icons/search.svg": "58e53b0f5198cfbddbc6e06bde1c4c8e",
"assets/static/images/icons/close_fill.svg": "b5d20dbb64759b8ad17b8ab6d71d4989",
"assets/static/images/icons/document-education-file-format-svgrepo-com.svg": "c76ef3774e43d1426d4bda4d11655506",
"assets/static/images/icons/menu_unfold.svg": "fc21ea18359b1cbae4cf4612a24c39c3",
"assets/static/images/icons/todo.svg": "55974516bb3a4aeae7835d66ce656765",
"assets/static/images/icons/arrow_right_s.svg": "ba463ccb5045da35d73dcd81c45b1df0",
"assets/static/images/icons/menu_fold.svg": "1ef36159fbce057e6be32b9d9f4cc432",
"assets/static/images/icons/writing-education-learning-pencil-note-write-svgrepo-com.svg": "a290b4dad47820abc1c681b57276ad24",
"assets/static/images/icons/pencil-draw-svgrepo-com.svg": "af119a46fb4128ea8cbb6efcef901d0b",
"assets/static/images/icons/booklet.svg": "a64b8a1182e71ae1c11f62ae625ad183",
"assets/static/images/icons/cha.svg": "b644f335dfa88e6fb3ed372de1a587f2",
"assets/static/images/icons/arrow_left.svg": "00f9dea4ccf4337a86286df769ffdef9",
"assets/static/images/icons/lajitong.svg": "f5f761e2ba2839b86fa68cbbdda213d6",
"assets/static/images/icons/wenzi.svg": "66a0621e062a9a66f132d2a09e52cd22",
"assets/static/images/icons/diary-education-learning-pencil-school-study-svgrepo-com.svg": "107f9d6620f20d705b42bbbc9895bc14",
"assets/static/images/icons/renwu.svg": "e68ba5a9043221d4c1411989b531bad2",
"assets/static/images/icons/close_line.svg": "325d2687eb070fdd93dd2910f1aea5ee",
"assets/static/images/icons/calendar_2.svg": "c1cb06ae2bcf6997b83f05fc4e22ae04",
"assets/static/images/icons/wallet.svg": "45c9ad5bebdc0728975ae02eab22e348",
"assets/static/images/icons/pencil-svgrepo-com%2520(1).svg": "200c28a4fc0a552704725e4b8add7230",
"assets/static/images/icons/arrow_right.svg": "bc7a8045d976fc85fb85c128d47c4760",
"assets/static/images/icons/pencil-draw-svgrepo-com%2520(2).svg": "711fafdce9c482a85ddcda6270536dac",
"assets/static/images/icons/plus.svg": "358e667334c1c7af988ef5de4566d1b9",
"assets/static/images/icons/dongwu.svg": "b7471250920124a6b2fbb76875416589",
"assets/static/images/icons/bigimg.svg": "d7e51bfe40d135c227f8ec354ee61392",
"assets/static/images/icons/pencil-draw-svgrepo-com%2520(1).svg": "034db3a66389cf1a52c12683805e5754",
"assets/static/images/icons/pencil-case-svgrepo-com.svg": "72259ccfefc96bdfc419d2a969397e65",
"assets/static/images/icons/education-learning-pencil-school-signature-writing-svgrepo-com.svg": "c23a1826ef39d39a63cb9e6ca227d448",
"assets/static/images/icons/hao.svg": "8a8f09f042e7e28c7087930a39c778de",
"assets/static/images/icons/zhong.svg": "57b1fe71e7b16ee63a0d89e880ef95a6",
"assets/static/images/icons/archive_drawer.svg": "00752a72df813a76ff4fe7a74aeb83db",
"assets/static/images/icons/bill.svg": "91beb551fe7dec0cb48d3dad2009be79",
"assets/static/images/icons/pencil-svgrepo-com%2520(2).svg": "bf4e03c576b82885dec069dbf7e16708",
"assets/static/images/icons/sun.svg": "d9322916c546879e8d4e99e2088764f5",
"assets/static/images/icons/calendar_todo.svg": "f5066df09d8280149718b800e0a9a305",
"assets/static/images/icons/trash_fill.svg": "218acefea21a8b921b32a4ea51b25f34",
"assets/static/images/icons/sync.svg": "cac3c8e67263fba9517f3642c89f010a",
"assets/static/images/icons/web.svg": "6a7069fccc4be48628bc8cbcd305d18d",
"assets/static/images/icons/shoucang.svg": "790925812b6497f17aac376af4865e10",
"assets/static/images/icons/pencil-box-svgrepo-com.svg": "ae037e3fc3228cea6e0a03113673d162",
"assets/static/images/icons/pencil-box-svgrepo-com%2520(1).svg": "ae037e3fc3228cea6e0a03113673d162",
"assets/static/images/icons/stack.svg": "07fbb1a235bc2940170fa44d13de09a5",
"assets/static/images/icons/education-learning-math-mathematics-school-study-svgrepo-com.svg": "247db25767dcd14f58dd5482a32d2ffc",
"assets/static/images/icons/calendar.svg": "a32298257068c1ba6cea32bc7e84efa5",
"assets/static/images/icons/chongfu.svg": "7665b89ec39a92632572e3283cd6e640",
"assets/static/images/icons/drawing-tool-education-learning-pencil-ruler-school-svgrepo-com.svg": "14ad13fb7b20ca84a5e7c0aca2b17565",
"assets/static/images/icons/folder.svg": "1c900a48227c43fbf27e036a932d5914",
"assets/static/images/icons/jietu.svg": "d42045b40bd5206af902a6bc1cc67175",
"assets/static/images/icons/arrow_left_s.svg": "5c89f14fbfd06ca88f773a6f870a18dd",
"assets/static/images/placeholder/empty.png": "2a29dc1a1b003c9ea7ad78fb62b201ce",
"assets/static/images/brand.png": "f1c33a5e79f7f7f061a7330f2fce9de5",
"assets/static/images/avatar.jpeg": "f931ee0f03c092689ba3a6b15e58d277",
"assets/static/fonts/NotoSansSC/NotoSansSC-Regular.otf": "e3ae561f7b8052d9aa9f2b0b09c33ea1",
"assets/static/fonts/NotoSansSC/NotoSansSC-Thin.otf": "9c640accd722b4d742cec321ab2557fc",
"assets/static/fonts/NotoSansSC/NotoSansSC-Light.otf": "b0d7520585ad4d8ea979ebd3c0bc715c",
"assets/static/fonts/NotoSansSC/NotoSansSC-Medium.otf": "34d4f8ee5ad2748a4cf36d3d414b49af",
"assets/static/fonts/NotoSansSC/NotoSansSC-Bold.otf": "9c8cb849cb0041912ec77c9c59725a2a",
"assets/static/fonts/NotoSansSC/NotoSansSC-Black.otf": "b7f4adfd7248ad6a9f9eeb97672d3465",
"assets/static/fonts/Roboto/Roboto-Regular.ttf": "8a36205bd9b83e03af0591a004bc97f4",
"assets/packages/timezone/data/latest_all.tzf": "016df80452fa51f0f61403cd259f2366",
"assets/packages/pillow/web/dist/index.js": "7a81907cf8b4b862670085a5df942178",
"assets/packages/pillow/web/dist/index.css": "c0fa87773a804bede8f049db04e8ae5d",
"assets/shaders/ink_sparkle.frag": "6ddca61f03944b33ce9eb6974f399db8",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
