"use strict"
var script = document.createElement("script"),
    load = document.createElement("button"),
    linkArr = [],
    capArr = [],
    imgMod = [],
    imgNum = 0;

script.src = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ae976304a535e7ed8ff2100c1d5b2dc7&photoset_id=72157659451270924&user_id=126785613%40N04&extras=original_format&format=json&api_key=9f46232676650675ddd2cc7bf3ca979d";
document.getElementById("wrapper").appendChild(script);
load.id = "load-more";
load.onclick = function() {
    loadMore()
};
load.innerHTML = "Load More...";
document.getElementById("content").appendChild(load);

function jsonFlickrApi(data) {
    var photos = data.photoset.photo;
    for (var i = 0; i < photos.length; i++) {
        linkArr.push(["https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret + "_z.jpg",
            "https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].originalsecret + "_o." + photos[i].originalformat
        ]);
        capArr.push(photos[i].title);
    }
}

function loadMore() {
    var temp = imgNum;
    if (temp + 4 > linkArr.length) {
        for (var i = imgNum; i < linkArr.length; i++) {
            imgMod.push(new imgModule(linkArr[linkArr.length - i - 1], capArr[capArr.length - i - 1]));
            imgNum++;
        }
        document.getElementById("load-more").style.display = "none";
    } else {
        for (var i = imgNum; i < temp + 4; i++) {
            imgMod.push(new imgModule(linkArr[linkArr.length - i - 1], capArr[capArr.length - i - 1]));
            imgNum++;
        }
    }
}

function expandImage(url, cap) {
    var gallery = document.getElementById("gallery"),
        galleryWrap = document.getElementById("gallery-wrapper");
    gallery.innerHTML = "";
    galleryWrap.style.opacity = "1";
    galleryWrap.style.visibility = "visible";
    document.getElementById("gallery-caption").innerHTML = cap;

    var img = new Image();
    img.src = url;
    var preload = document.createElement("div");
    preload.className = "md-preloader";
    preload.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>';
    var checkLoad = window.setInterval(function() {
        if (gallery.firstChild == null) {
            gallery.appendChild(preload);
        }
        if (img.complete) {
            gallery.innerHTML = "";
            gallery.appendChild(img);
            window.clearInterval(checkLoad);
        }
    }, 100);
}

window.onload = function() {
    for (var i = imgNum; i < 4 * Math.floor((window.innerWidth - 296) / 325); i++) {
        imgMod.push(new imgModule(linkArr[linkArr.length - i - 1], capArr[capArr.length - i - 1]));
        imgNum++;
    }
}

var imgModule = class {
    constructor(url, cap) {
        this.url = url[0];
        this.orig = url[1];
        var parent = document.getElementById("content"),
            imgCard = document.createElement("div"),
            mod = document.createElement("div"),
            bar = document.createElement("div"),
            label = document.createElement("div");
        imgCard.className = "image-card";
        imgCard.style.backgroundImage = "url(" + url[0] + ")";
        imgCard.onclick = function() {
            expandImage(url[1], cap);
        };
        mod.className = "";
        bar.className = "info-overlay";
        label.className = "info-text";
        label.innerHTML = cap;
        imgCard.appendChild(bar);
        bar.appendChild(label);
        imgCard.appendChild(mod);
        parent.insertBefore(imgCard, document.getElementById("load-more"));
    }
}