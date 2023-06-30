//0.js

//Script for testing/tweaking purposes.

//--- Global Variables
var html = document.documentElement,
	body = document.body;

// var debugMode = false;
var respoNav = document.querySelector(".c-nav.-responsive"),
	toggleExpand = document.querySelector(".c-nav.-responsive .c-toggleExpand"),
	respoGrid = document.querySelector(".o-rustygrid.-responsive");

//--- Breakpoints
var mqPalmOrGT = "screen and (min-width:40em)",
	mqLapOrGT  = "screen and (min-width:60em)",
	mqDeskOrGT = "screen and (min-width:80em)";
// bpWall  = "screen and (min-width:100em)",
// bpMall  = "screen and (min-width:120em)",
// bpTitan = "screen and (min-width:150em)";

// function sendGAEvent(primary, secondary) {
// 	if (window.ga !== undefined) {
// 		if (secondary !== undefined) {
// 			ga('send', 'event', primary, secondary);
// 		} else {
// 			ga('send', 'event', primary);
// 		}
// 	}
// }

//--- If JavaScript is enabled, hide navigation initially.
respoNav.classList.remove("js-visible");

// function checkValueOf(e) {
// 	var s = document.querySelector("input[name=" + e + "]:checked");
// 	if (s) {
// 		return s.value;
// 	}
// }

// Selected Theme Options

// Set default colors and variants

// changeThemeMod("-scheme",html,checkValueOf("color-options"));
// changeThemeMod("t-variant",html,checkValueOf("variant-options"));
// changeThemeMod("-bg",body,checkValueOf("bg-options"));
// changeThemeMod("-corner",html,checkValueOf("corner-options"));
// changeThemeMod("-border",html,checkValueOf("border-options"));
// changeThemeMod("-emboss",html,checkValueOf("emboss-options"));
// changeThemeMod("-shadow",body,checkValueOf("shadow-options"));
// changeThemeMod("-shadowColor",html,checkValueOf("shadowcolor-options"));
// changeThemeMod("-preset",html,checkValueOf("preset-options"));

// Switch to dark theme between 8 AM and 6 PM

// function darkAfterSix() {
// 	var now = new Date();
// 	var currentHour = now.getHours();
// 	var overridingParent = document.querySelector("html.js-override-variant")
// 	if ( ! overridingParent ) {
// 		if (8 <= currentHour && currentHour < 18) {
// 			changeThemeMod("t-variant", html, "Day");
// 		}
// 		if (18 <= currentHour && currentHour <= 24 || currentHour < 8) {
// 			changeThemeMod("t-variant", html, "Dark");
// 		}
// 	}
// }
// darkAfterSix();

// Switch color scheme on demand
// TODO: Add an ability to manually switch color schemes

// Jekyll + Staticman — Get comments from API

function notify(type, content) {
	var div = document.createElement("div");
	div.innerHTML = "<div class='o-frame --typeText -viewNotification -" + type + "'><div class='o-frame__content'>" + content + "</div></div>";
	while (div.children.length > 0) {
		body.appendChild(div.children[0]);
	}
}

(function ($) {
	var $comments = $(".js-comments");
	$(".js-form").submit(function () {
		var form = this;
		$(form).addClass("form--loading");
		$.ajax({
			type: $(this).attr("method"),
			url: $(this).attr("action"),
			data: $(this).serialize(),
			contentType: "application/x-www-form-urlencoded",
			success: function (data) {
				notify('priorityLow', '<h3><svg class="pi" viewBox="0 0 18 18"><use href="/pi.svg#folder-approved"/></svg> Yorum gönderildi!</h3><p>Moderasyondan geçtikten sonra yorumunuz siteye eklenecektir.</p>');
				$(form).removeClass("form--loading");
			},
			error: function (err) {
				console.log(err);
				notify('priorityCritical', '<h3><svg class="pi" viewBox="0 0 18 18"><use href="/pi.svg#warning-triangle"/></svg> Yorum gönderilemedi</h3><p>Mesaj, ad, e-posta ve reCAPTCHA kutucuğunu doldurduğunuzdan emin olun.</p>');
				$(form).removeClass("form--loading");
			}
		});
		return false;
	});
})(jQuery);

// Staticman Comment Replies
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
var addComment = {
	moveForm: function (commId, parentId, respondId, postId) {
		var div, element, style, cssHidden,
			t = this,
			comm = t.I(commId),
			respond = t.I(respondId),
			cancel = t.I("cancel-comment-reply-link"),
			parent = t.I("comment-replying-to"),
			post = t.I("comment-post-slug"),
			commentForm = respond.getElementsByTagName("form")[0];

		if (!comm || !respond || !cancel || !parent || !commentForm) {
			return;
		}

		t.respondId = respondId;
		postId = postId || false;

		if (!t.I("sm-temp-form-div")) {
			div = document.createElement("div");
			div.id = "sm-temp-form-div";
			div.style.display = "none";
			respond.parentNode.insertBefore(div, respond);
		}

		comm.parentNode.insertBefore(respond, comm.nextSibling);
		if (post && postId) {
			post.value = postId;
		}
		parent.value = parentId;
		cancel.style.display = "";

		cancel.onclick = function () {
			var t = addComment,
				temp = t.I("sm-temp-form-div"),
				respond = t.I(t.respondId);

			if (!temp || !respond) {
				return;
			}

			t.I("comment-replying-to").value = "0";
			temp.parentNode.insertBefore(respond, temp);
			temp.parentNode.removeChild(temp);
			this.style.display = "none";
			this.onclick = null;
			return false;
		};

		/*
		 * Set initial focus to the first form focusable element.
		 * Try/catch used just to avoid errors in IE 7- which return visibility
		 * 'inherit' when the visibility value is inherited from an ancestor.
		 */
		try {
			for (var i = 0; i < commentForm.elements.length; i++) {
				element = commentForm.elements[i];
				cssHidden = false;
				// Modern browsers.
				if ("getComputedStyle" in window) {
					style = window.getComputedStyle(element);
					// IE 8.
				} else if (document.documentElement.currentStyle) {
					style = element.currentStyle;
				}
				/*
				 * For display none, do the same thing jQuery does. For visibility,
				 * check the element computed style since browsers are already doing
				 * the job for us. In fact, the visibility computed style is the actual
				 * computed value and already takes into account the element ancestors.
				 */
				if ((element.offsetWidth <= 0 && element.offsetHeight <= 0) || style.visibility === "hidden") {
					cssHidden = true;
				}
				// Skip form elements that are hidden or disabled.
				if ("hidden" === element.type || element.disabled || cssHidden) {
					continue;
				}
				element.focus();
				// Stop after the first focusable element.
				break;
			}
		} catch (er) {}
		return false;
	},
	I: function (id) {
		return document.getElementById(id);
	}
};
