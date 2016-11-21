# **Service Worker 101** 

### Working Offline and Instant Loading (@GDG DevFest 2016)

### [Watch Slides → ](https://huangxuan.me/sw-101-gdgdf/)

<img src="https://huangxuan.me/sw-101-gdgdf/attach/qrcode.png" width="350" />

### What is in `code/`

- Hello World of Service Worker
- Make your own Offline Dinosaurs
- Stale/Fastest while revalidate

### What is covered 

TLDR; All the fundamental stuffs of SW to help your site work offline and load instantly. 

It covers techniques below, but in a step-by-step order:

- Motivation
	- Why AppCache & H2 is insufficient 
- How SW works
	- Web Workers
	- Shared Workers
	- Background Processing
	- Event-Driven
- LifeCycle
	- SW state
	- First SW
	- Updating SW
- Events
	- LifeCycle Events
	- Functional Events
	- Extendable Events
- Caching Strategies 
	- Network First
	- Cache First
	- Generic Fallback
	- Fatest (Racing)
	- Stale while revalidate
	- Fastest while revalidate
	- Cache then network
- Gotchas 
- Etc.


### Notes  

This slides is powered by [Yanshuo.io (演说.io)](http://yanshuo.io), a online software helping you create, store and share web slides. 

There are 2 ways that you can fork or contribute to this project:

1. `index.html` is the HTML source code exported from [Yanshuo.io](http://yanshuo.io), and many of its dependencis (js, css, fonts) are still linked to CDN of [Yanshuo.io](http://yanshuo.io). You can do any secondary development and host it by yourself.
2. Download the project file under `shuo/`, drag it into [Yanshuo.io](http://yanshuo.io), and you are ready to go. You can edit whatever you want, upload it to your account, and even share your distributions.


### License

BSD
Copyright (c) 2016 Hux