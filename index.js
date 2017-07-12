function ajaxGET(href,callback) {
    var xml = new XMLHttpRequest;
    xml.open("GET", href);
    xml.send();
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            var data = xml.response;
            if (callback != undefined) {
                callback(data, href)
            }
        }
    }
}
document.querySelector("i").addEventListener("click", ()=>{
	if (document.querySelector("i").style.transform == "rotate(0deg)") {
		document.querySelectorAll(".topics")[0].style.display = "flex";
		document.querySelectorAll(".topics")[1].style.display = "flex";
		document.querySelector("i").style.transform = "rotate(45deg)";
	} else {
		document.querySelectorAll(".topics")[0].style.display = "none";
		document.querySelectorAll(".topics")[1].style.display = "none";
		document.querySelector("i").style.transform = "rotate(0deg)";
	}
});
function add(e) {
	document.querySelectorAll(".topics")[1].removeChild(e);
	e.setAttribute("onclick","remove(this)");
	e.setAttribute("class", "topic s");
	document.querySelectorAll(".topics")[0].appendChild(e);
	var sub = e.innerHTML;
	ajaxGET("https://www.reddit.com/r/"+sub+".json", (data)=>{
		var posts = JSON.parse(data).data.children;
		for (var i = 0; i < posts.length; i++) {
			var url = undefined;
			var post = posts[i].data;
			switch (post.post_hint) {
				case "image": 
						if (post.url) {
							url = post.url;
						}
						break;
				case "rich:video":
						if (post.url.indexOf("https://gfycat.com/") != -1) {
							url ="https://giant."+post.url.slice(8)+".gif";
						}
						break;
				default: ;
			}
			if (url) {
				var img = new Image();
				img.src = url;
				img.setAttribute("data-sub", sub);
				img.setAttribute("onclick","fullScreen(this)");
				document.querySelector("#content").appendChild(img);
			}
		}
	});
}
function remove(e) {
	document.querySelectorAll(".topics")[0].removeChild(e);
	e.setAttribute("onclick","add(this)");
	e.setAttribute("class", "topic u");
	document.querySelectorAll(".topics")[1].appendChild(e);
	var children = document.querySelector("#content").children;
	var cLen = parseInt(children.length.toString());
	for (var i = 0; i < cLen; i++) {
		var child = children[0];
		if (child.dataset.sub == e.innerHTML) {
			document.querySelector("#content").removeChild(child);
		}
	}
}
var subr = ["all", "gifs", "pics", "bitcoin"];
(()=>{
	for (var i = 0; i < subr.length; i++) {
		var e = document.createElement("span");
		e.setAttribute("onclick","add(this)");
		e.setAttribute("class", "topic u");
		e.innerHTML = subr[i];
		document.querySelectorAll(".topics")[1].appendChild(e);
	}
})();
function fullScreen(e) {
	var cn = e.cloneNode(true);
	cn.setAttribute("onclick", "removeFullScreen(this)");
	if (window.innerWidth > window.innerHeight) {
		cn.setAttribute("class", "desktop");
	} else {
		cn.setAttribute("class", "mobile");
	}
	document.querySelector("#fullscreen").appendChild(cn);
	document.querySelector("#fullscreen").style.display = "inherit";
}
function removeFullScreen(e) {
	document.querySelector("#fullscreen").innerHTML = "";
	document.querySelector("#fullscreen").style.display = "none";
}
if (("standalone" in window.navigator) && detectmob() && window.navigator.standalone) {
	// Is lauched in standalone mode

} else if (("standalone" in window.navigator) && detectmob() && !window.navigator.standalone) {
	// On mobile but not in standalone
	document.querySelector("#aths").style.display = "inherit";
} else {
	// Is on desktop
	console.log("Desktop") 
}
function detectmob() {
   if(window.innerWidth <= 800 && window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}
var password = "";
function numpadInput(e) {
	var n = ["#one", "#two", "#three", "#four"];
	if (e.className == "t" && !isNaN(e.innerHTML)) {
		password += e.innerHTML;
		document.querySelector(n[password.length-1]).innerHTML = "*";
		if (password.length == 4) {
			if (password == "5313") {
				document.querySelector("#password").style.display = "none";
			} else if (password == "8769"){
				// Panic mode SHOW COLOR RUSH
				console.log("PANIC!!!")
			} else {
				// Wrong Password
			}
		}
	} else {
		document.querySelector(n[password.length-1]).innerHTML = "";
		password = password.slice(0,password.length-1);
	}
};