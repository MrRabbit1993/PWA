self.addEventListener("install", event => { 
    console.log("install", event) ;
    event.waitUntil(self.skipWaiting())//可以直接激活，不需等待
})
self.addEventListener("activate", event => { 
    console.log("activate", event)
    event.waitUntil(self.Clients.claim())//这里Clients表是所有控制的页面
 })
self.addEventListener("fetch", event => { console.log("fetch", event) })
//