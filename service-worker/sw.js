const CACHE_NAME = "CACHE-V2"
self.addEventListener("install", event => { //新的work下载之后，只发生一次
    console.log("install", event);
    // event.waitUntil(self.skipWaiting())//可以直接激活，不需等待
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {//打开缓存
        cache.addAll(["./", "./index.css"])//写入资源缓存
    }))
})
self.addEventListener("activate", event => {  //新的work被启用的时候，只发生一次
    console.log("activate", event)
    // event.waitUntil(self.Clients.claim())//这里Clients表是所有控制的页面
    event.waitUntil(caches.keys().then(cacheNames=>{
        return Promise.all(cacheNames.map(cachename=>{
            if(cachename!==CACHE_NAME){
                return cache.delete(cachename)
            }
        }))
    }))//这里Clients表是所有控制的页面
})
self.addEventListener("fetch", event => { // 捕获到资源的时候，可以发生无数次
    console.log("fetch", event)
    event.respondWith(caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {//匹配缓存
            if (response) return response
            return fetch(event.request).then(response => {//重新获取缓存
                cache.put(event.request, response.clone())
                return response
            })
        })
    }))
})
//