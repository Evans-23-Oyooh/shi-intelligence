/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function(l, f) {
    function m() {
        var a = e.elements;
        return "string" == typeof a ? a.split(" ") : a;
    }
    function i(a) {
        var b = n[a[o]];
        b || (b = {},
        h++,
        a[o] = h,
        n[h] = b);
        return b;
    }
    function p(a, b, c) {
        b || (b = f);
        if (g)
            return b.createElement(a);
        c || (c = i(b));
        b = c.cache[a] ? c.cache[a].cloneNode() : r.test(a) ? (c.cache[a] = c.createElem(a)).cloneNode() : c.createElem(a);
        return b.canHaveChildren && !s.test(a) ? c.frag.appendChild(b) : b;
    }
    function t(a, b) {
        if (!b.cache)
            b.cache = {},
            b.createElem = a.createElement,
            b.createFrag = a.createDocumentFragment,
            b.frag = b.createFrag();
        a.createElement = function(c) {
            return !e.shivMethods ? b.createElem(c) : p(c, a, b);
        }
        ;
        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) {
            b.createElem(a);
            b.frag.createElement(a);
            return 'c("' + a + '")';
        }) + ");return n}")(e, b.frag);
    }
    function q(a) {
        a || (a = f);
        var b = i(a);
        if (e.shivCSS && !j && !b.hasCSS) {
            var c, d = a;
            c = d.createElement("p");
            d = d.getElementsByTagName("head")[0] || d.documentElement;
            c.innerHTML = "x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>";
            c = d.insertBefore(c.lastChild, d.firstChild);
            b.hasCSS = !!c;
        }
        g || t(a, b);
        return a;
    }
    var k = l.html5 || {}, s = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, r = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, j, o = "_html5shiv", h = 0, n = {}, g;
    (function() {
        try {
            var a = f.createElement("a");
            a.innerHTML = "<xyz></xyz>";
            j = "hidden"in a;
            var b;
            if (!(b = 1 == a.childNodes.length)) {
                f.createElement("a");
                var c = f.createDocumentFragment();
                b = "undefined" == typeof c.cloneNode || "undefined" == typeof c.createDocumentFragment || "undefined" == typeof c.createElement;
            }
            g = b;
        } catch (d) {
            g = j = !0;
        }
    }
    )();
    var e = {
        elements: k.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: "3.7.0",
        shivCSS: !1 !== k.shivCSS,
        supportsUnknownElements: g,
        shivMethods: !1 !== k.shivMethods,
        type: "default",
        shivDocument: q,
        createElement: p,
        createDocumentFragment: function(a, b) {
            a || (a = f);
            if (g)
                return a.createDocumentFragment();
            for (var b = b || i(a), c = b.frag.cloneNode(), d = 0, e = m(), h = e.length; d < h; d++)
                c.createElement(e[d]);
            return c;
        }
    };
    l.html5 = e;
    q(f);
}
)(this, document);
;!function(a) {
    "use strict";
    a.matchMedia = a.matchMedia || function(a) {
        var b, c = a.documentElement, d = c.firstElementChild || c.firstChild, e = a.createElement("body"), f = a.createElement("div");
        return f.id = "mq-test-1",
        f.style.cssText = "position:absolute;top:-100em",
        e.style.background = "none",
        e.appendChild(f),
        function(a) {
            return f.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>',
            c.insertBefore(e, d),
            b = 42 === f.offsetWidth,
            c.removeChild(e),
            {
                matches: b,
                media: a
            };
        }
        ;
    }(a.document);
}(this),
function(a) {
    "use strict";
    function b() {
        u(!0);
    }
    var c = {};
    a.respond = c,
    c.update = function() {}
    ;
    var d = []
      , e = function() {
        var b = !1;
        try {
            b = new a.XMLHttpRequest();
        } catch (c) {
            b = new a.ActiveXObject("Microsoft.XMLHTTP");
        }
        return function() {
            return b;
        }
        ;
    }()
      , f = function(a, b) {
        var c = e();
        c && (c.open("GET", a, !0),
        c.onreadystatechange = function() {
            4 !== c.readyState || 200 !== c.status && 304 !== c.status || b(c.responseText);
        }
        ,
        4 !== c.readyState && c.send(null));
    };
    if (c.ajax = f,
    c.queue = d,
    c.regex = {
        media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
        keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
        urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
        findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
        only: /(only\s+)?([a-zA-Z]+)\s?/,
        minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
        maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
    },
    c.mediaQueriesSupported = a.matchMedia && null !== a.matchMedia("only all") && a.matchMedia("only all").matches,
    !c.mediaQueriesSupported) {
        var g, h, i, j = a.document, k = j.documentElement, l = [], m = [], n = [], o = {}, p = 30, q = j.getElementsByTagName("head")[0] || k, r = j.getElementsByTagName("base")[0], s = q.getElementsByTagName("link"), t = function() {
            var a, b = j.createElement("div"), c = j.body, d = k.style.fontSize, e = c && c.style.fontSize, f = !1;
            return b.style.cssText = "position:absolute;font-size:1em;width:1em",
            c || (c = f = j.createElement("body"),
            c.style.background = "none"),
            k.style.fontSize = "100%",
            c.style.fontSize = "100%",
            c.appendChild(b),
            f && k.insertBefore(c, k.firstChild),
            a = b.offsetWidth,
            f ? k.removeChild(c) : c.removeChild(b),
            k.style.fontSize = d,
            e && (c.style.fontSize = e),
            a = i = parseFloat(a);
        }, u = function(b) {
            var c = "clientWidth"
              , d = k[c]
              , e = "CSS1Compat" === j.compatMode && d || j.body[c] || d
              , f = {}
              , o = s[s.length - 1]
              , r = (new Date()).getTime();
            if (b && g && p > r - g)
                return a.clearTimeout(h),
                h = a.setTimeout(u, p),
                void 0;
            g = r;
            for (var v in l)
                if (l.hasOwnProperty(v)) {
                    var w = l[v]
                      , x = w.minw
                      , y = w.maxw
                      , z = null === x
                      , A = null === y
                      , B = "em";
                    x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? i || t() : 1)),
                    y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? i || t() : 1)),
                    w.hasquery && (z && A || !(z || e >= x) || !(A || y >= e)) || (f[w.media] || (f[w.media] = []),
                    f[w.media].push(m[w.rules]));
                }
            for (var C in n)
                n.hasOwnProperty(C) && n[C] && n[C].parentNode === q && q.removeChild(n[C]);
            n.length = 0;
            for (var D in f)
                if (f.hasOwnProperty(D)) {
                    var E = j.createElement("style")
                      , F = f[D].join("\n");
                    E.type = "text/css",
                    E.media = D,
                    q.insertBefore(E, o.nextSibling),
                    E.styleSheet ? E.styleSheet.cssText = F : E.appendChild(j.createTextNode(F)),
                    n.push(E);
                }
        }, v = function(a, b, d) {
            var e = a.replace(c.regex.keyframes, "").match(c.regex.media)
              , f = e && e.length || 0;
            b = b.substring(0, b.lastIndexOf("/"));
            var g = function(a) {
                return a.replace(c.regex.urls, "$1" + b + "$2$3");
            }
              , h = !f && d;
            b.length && (b += "/"),
            h && (f = 1);
            for (var i = 0; f > i; i++) {
                var j, k, n, o;
                h ? (j = d,
                m.push(g(a))) : (j = e[i].match(c.regex.findStyles) && RegExp.$1,
                m.push(RegExp.$2 && g(RegExp.$2))),
                n = j.split(","),
                o = n.length;
                for (var p = 0; o > p; p++)
                    k = n[p],
                    l.push({
                        media: k.split("(")[0].match(c.regex.only) && RegExp.$2 || "all",
                        rules: m.length - 1,
                        hasquery: k.indexOf("(") > -1,
                        minw: k.match(c.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: k.match(c.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    });
            }
            u();
        }, w = function() {
            if (d.length) {
                var b = d.shift();
                f(b.href, function(c) {
                    v(c, b.href, b.media),
                    o[b.href] = !0,
                    a.setTimeout(function() {
                        w();
                    }, 0);
                });
            }
        }, x = function() {
            for (var b = 0; b < s.length; b++) {
                var c = s[b]
                  , e = c.href
                  , f = c.media
                  , g = c.rel && "stylesheet" === c.rel.toLowerCase();
                e && g && !o[e] && (c.styleSheet && c.styleSheet.rawCssText ? (v(c.styleSheet.rawCssText, e, f),
                o[e] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(e) && !r || e.replace(RegExp.$1, "").split("/")[0] === a.location.host) && ("//" === e.substring(0, 2) && (e = a.location.protocol + e),
                d.push({
                    href: e,
                    media: f
                })));
            }
            w();
        };
        x(),
        c.update = x,
        c.getEmValue = t,
        a.addEventListener ? a.addEventListener("resize", b, !1) : a.attachEvent && a.attachEvent("onresize", b);
    }
}(this);
;;window.Modernizr = function(a, b, c) {
    function C(a) {
        j.cssText = a;
    }
    function D(a, b) {
        return C(n.join(a + ";") + (b || ""));
    }
    function E(a, b) {
        return typeof a === b;
    }
    function F(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function G(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!F(e, "-") && j[e] !== c)
                return b == "pfx" ? e : !0;
        }
        return !1;
    }
    function H(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c)
                return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f;
        }
        return !1;
    }
    function I(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1)
          , e = (a + " " + p.join(d + " ") + d).split(" ");
        return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "),
        H(e, b, c));
    }
    function J() {
        e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++)
                u[c[d]] = c[d]in k;
            return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement),
            u;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),
        e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++)
                k.setAttribute("type", f = a[d]),
                e = k.type !== "text",
                e && (k.value = l,
                k.style.cssText = "position:absolute;visibility:hidden;",
                /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k),
                h = b.defaultView,
                e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0,
                g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)),
                t[a[d]] = !!e;
            return t;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var d = "2.6.2", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k = b.createElement("input"), l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "), o = "Webkit Moz O ms", p = o.split(" "), q = o.toLowerCase().split(" "), r = {
        svg: "http://www.w3.org/2000/svg"
    }, s = {}, t = {}, u = {}, v = [], w = v.slice, x, y = function(a, c, d, e) {
        var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
        if (parseInt(d, 10))
            while (d--)
                j = b.createElement("div"),
                j.id = e ? e[d] : h + (d + 1),
                l.appendChild(j);
        return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""),
        l.id = h,
        (m ? l : n).innerHTML += f,
        n.appendChild(l),
        m || (n.style.background = "",
        n.style.overflow = "hidden",
        k = g.style.overflow,
        g.style.overflow = "hidden",
        g.appendChild(n)),
        i = c(l, a),
        m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n),
        g.style.overflow = k),
        !!i;
    }, z = function() {
        function d(d, e) {
            e = e || b.createElement(a[d] || "div"),
            d = "on" + d;
            var f = d in e;
            return f || (e.setAttribute || (e = b.createElement("div")),
            e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""),
            f = E(e[d], "function"),
            E(e[d], "undefined") || (e[d] = c),
            e.removeAttribute(d))),
            e = null,
            f;
        }
        var a = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return d;
    }(), A = {}.hasOwnProperty, B;
    !E(A, "undefined") && !E(A.call, "undefined") ? B = function(a, b) {
        return A.call(a, b);
    }
    : B = function(a, b) {
        return b in a && E(a.constructor.prototype[b], "undefined");
    }
    ,
    Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function")
            throw new TypeError();
        var d = w.call(arguments, 1)
          , e = function() {
            if (this instanceof e) {
                var a = function() {};
                a.prototype = c.prototype;
                var f = new a()
                  , g = c.apply(f, d.concat(w.call(arguments)));
                return Object(g) === g ? g : f;
            }
            return c.apply(b, d.concat(w.call(arguments)));
        };
        return e;
    }
    ),
    s.flexbox = function() {
        return I("flexWrap");
    }
    ,
    s.flexboxlegacy = function() {
        return I("boxDirection");
    }
    ,
    s.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !!a.getContext("2d");
    }
    ,
    s.canvastext = function() {
        return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function");
    }
    ,
    s.webgl = function() {
        return !!a.WebGLRenderingContext;
    }
    ,
    s.touch = function() {
        var c;
        return "ontouchstart"in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = a.offsetTop === 9;
        }),
        c;
    }
    ,
    s.geolocation = function() {
        return "geolocation"in navigator;
    }
    ,
    s.postmessage = function() {
        return !!a.postMessage;
    }
    ,
    s.websqldatabase = function() {
        return !!a.openDatabase;
    }
    ,
    s.indexedDB = function() {
        return !!I("indexedDB", a);
    }
    ,
    s.hashchange = function() {
        return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
    }
    ,
    s.history = function() {
        return !!a.history && !!history.pushState;
    }
    ,
    s.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable"in a || "ondragstart"in a && "ondrop"in a;
    }
    ,
    s.websockets = function() {
        return "WebSocket"in a || "MozWebSocket"in a;
    }
    ,
    s.rgba = function() {
        return C("background-color:rgba(150,255,150,.5)"),
        F(j.backgroundColor, "rgba");
    }
    ,
    s.hsla = function() {
        return C("background-color:hsla(120,40%,100%,.5)"),
        F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla");
    }
    ,
    s.multiplebgs = function() {
        return C("background:url(https://),url(https://),red url(https://)"),
        /(url\s*\(.*?){3}/.test(j.background);
    }
    ,
    s.backgroundsize = function() {
        return I("backgroundSize");
    }
    ,
    s.borderimage = function() {
        return I("borderImage");
    }
    ,
    s.borderradius = function() {
        return I("borderRadius");
    }
    ,
    s.boxshadow = function() {
        return I("boxShadow");
    }
    ,
    s.textshadow = function() {
        return b.createElement("div").style.textShadow === "";
    }
    ,
    s.opacity = function() {
        return D("opacity:.55"),
        /^0.55$/.test(j.opacity);
    }
    ,
    s.cssanimations = function() {
        return I("animationName");
    }
    ,
    s.csscolumns = function() {
        return I("columnCount");
    }
    ,
    s.cssgradients = function() {
        var a = "background-image:"
          , b = "gradient(linear,left top,right bottom,from(#9f9),to(white));"
          , c = "linear-gradient(left top,#9f9, white);";
        return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)),
        F(j.backgroundImage, "gradient");
    }
    ,
    s.cssreflections = function() {
        return I("boxReflect");
    }
    ,
    s.csstransforms = function() {
        return !!I("transform");
    }
    ,
    s.csstransforms3d = function() {
        var a = !!I("perspective");
        return a && "webkitPerspective"in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
            a = b.offsetLeft === 9 && b.offsetHeight === 3;
        }),
        a;
    }
    ,
    s.csstransitions = function() {
        return I("transition");
    }
    ,
    s.fontface = function() {
        var a;
        return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
            var e = b.getElementById("smodernizr")
              , f = e.sheet || e.styleSheet
              , g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0;
        }),
        a;
    }
    ,
    s.generatedcontent = function() {
        var a;
        return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
            a = b.offsetHeight >= 3;
        }),
        a;
    }
    ,
    s.video = function() {
        var a = b.createElement("video")
          , c = !1;
        try {
            if (c = !!a.canPlayType)
                c = new Boolean(c),
                c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
                c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""),
                c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
        } catch (d) {}
        return c;
    }
    ,
    s.audio = function() {
        var a = b.createElement("audio")
          , c = !1;
        try {
            if (c = !!a.canPlayType)
                c = new Boolean(c),
                c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "");
        } catch (d) {}
        return c;
    }
    ,
    s.localstorage = function() {
        try {
            return localStorage.setItem(h, h),
            localStorage.removeItem(h),
            !0;
        } catch (a) {
            return !1;
        }
    }
    ,
    s.sessionstorage = function() {
        try {
            return sessionStorage.setItem(h, h),
            sessionStorage.removeItem(h),
            !0;
        } catch (a) {
            return !1;
        }
    }
    ,
    s.webworkers = function() {
        return !!a.Worker;
    }
    ,
    s.applicationcache = function() {
        return !!a.applicationCache;
    }
    ,
    s.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect;
    }
    ,
    s.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>",
        (a.firstChild && a.firstChild.namespaceURI) == r.svg;
    }
    ,
    s.smil = function() {
        return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")));
    }
    ,
    s.svgclippaths = function() {
        return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")));
    }
    ;
    for (var K in s)
        B(s, K) && (x = K.toLowerCase(),
        e[x] = s[K](),
        v.push((e[x] ? "" : "no-") + x));
    return e.input || J(),
    e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a)
                B(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c)
                return e;
            b = typeof b == "function" ? b() : b,
            typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a),
            e[a] = b;
        }
        return e;
    }
    ,
    C(""),
    i = k = null,
    function(a, b) {
        function k(a, b) {
            var c = a.createElement("p")
              , d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>",
            d.insertBefore(c.lastChild, d.firstChild);
        }
        function l() {
            var a = r.elements;
            return typeof a == "string" ? a.split(" ") : a;
        }
        function m(a) {
            var b = i[a[g]];
            return b || (b = {},
            h++,
            a[g] = h,
            i[h] = b),
            b;
        }
        function n(a, c, f) {
            c || (c = b);
            if (j)
                return c.createElement(a);
            f || (f = m(c));
            var g;
            return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a),
            g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g;
        }
        function o(a, c) {
            a || (a = b);
            if (j)
                return a.createDocumentFragment();
            c = c || m(a);
            var d = c.frag.cloneNode()
              , e = 0
              , f = l()
              , g = f.length;
            for (; e < g; e++)
                d.createElement(f[e]);
            return d;
        }
        function p(a, b) {
            b.cache || (b.cache = {},
            b.createElem = a.createElement,
            b.createFrag = a.createDocumentFragment,
            b.frag = b.createFrag()),
            a.createElement = function(c) {
                return r.shivMethods ? n(c, a, b) : b.createElem(c);
            }
            ,
            a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
                return b.createElem(a),
                b.frag.createElement(a),
                'c("' + a + '")';
            }) + ");return n}")(r, b.frag);
        }
        function q(a) {
            a || (a = b);
            var c = m(a);
            return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),
            j || p(a, c),
            a;
        }
        var c = a.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, f, g = "_html5shiv", h = 0, i = {}, j;
        (function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>",
                f = "hidden"in a,
                j = a.childNodes.length == 1 || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined";
                }();
            } catch (c) {
                f = !0,
                j = !0;
            }
        }
        )();
        var r = {
            elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: c.shivCSS !== !1,
            supportsUnknownElements: j,
            shivMethods: c.shivMethods !== !1,
            type: "default",
            shivDocument: q,
            createElement: n,
            createDocumentFragment: o
        };
        a.html5 = r,
        q(b);
    }(this, b),
    e._version = d,
    e._prefixes = n,
    e._domPrefixes = q,
    e._cssomPrefixes = p,
    e.hasEvent = z,
    e.testProp = function(a) {
        return G([a]);
    }
    ,
    e.testAllProps = I,
    e.testStyles = y,
    g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""),
    e;
}(this, this.document),
function(a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a);
    }
    function e(a) {
        return "string" == typeof a;
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
        var a = p.shift();
        q = 1,
        a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
        }, 0) : (a(),
        h()) : q = 0;
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1,
            !q && h(),
            l.onload = l.onreadystatechange = null,
            b)) {
                "img" != a && m(function() {
                    t.removeChild(l);
                }, 50);
                for (var d in y[c])
                    y[c].hasOwnProperty(d) && y[c][d].onload();
            }
        }
        var j = j || B.errorTimeout
          , l = b.createElement(a)
          , o = 0
          , r = 0
          , u = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === y[c] && (r = 1,
        y[c] = []),
        "object" == a ? l.data = c : (l.src = c,
        l.type = a),
        l.width = l.height = "0",
        l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r);
        }
        ,
        p.splice(e, 0, u),
        "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n),
        m(k, j)) : y[c].push(l));
    }
    function j(a, b, c, d, f) {
        return q = 0,
        b = b || "j",
        e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a),
        1 == p.length && h()),
        this;
    }
    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        },
        a;
    }
    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance"in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function(a) {
        return "[object Array]" == o.call(a);
    }
    , x = [], y = {}, z = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]),
            a;
        }
    }, A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {
                url: c,
                origUrl: c,
                prefixes: a
            }, e, f, g;
            for (f = 0; f < d; f++)
                g = a[f].split("="),
                (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++)
                c = x[f](c);
            return c;
        }
        function g(a, e, f, g, h) {
            var i = b(a)
              , j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(),
            i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]),
            i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1,
            f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout),
            (d(e) || d(j)) && f.load(function() {
                k(),
                e && e(i.origUrl, h, g),
                j && j(i.origUrl, h, g),
                y[i.url] = 2;
            })));
        }
        function h(a, b) {
            function c(a, c) {
                if (a)
                    if (e(a))
                        c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a),
                            l();
                        }
                        ),
                        g(a, j, b, 0, h);
                    else {
                        if (Object(a) === a)
                            for (n in m = function() {
                                var b = 0, c;
                                for (c in a)
                                    a.hasOwnProperty(c) && b++;
                                return b;
                            }(),
                            a)
                                a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                    var a = [].slice.call(arguments);
                                    k.apply(this, a),
                                    l();
                                }
                                : j[n] = function(a) {
                                    return function() {
                                        var b = [].slice.call(arguments);
                                        a && a.apply(this, b),
                                        l();
                                    }
                                    ;
                                }(k[n])),
                                g(a[n], j, b, n, h));
                    }
                else
                    !c && l();
            }
            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i),
            i && c(i);
        }
        var i, j, l = this.yepnope.loader;
        if (e(a))
            g(a, 0, l, 0);
        else if (w(a))
            for (i = 0; i < a.length; i++)
                j = a[i],
                e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
        else
            Object(a) === a && h(a, l);
    }
    ,
    B.addPrefix = function(a, b) {
        z[a] = b;
    }
    ,
    B.addFilter = function(a) {
        x.push(a);
    }
    ,
    B.errorTimeout = 1e4,
    null == b.readyState && b.addEventListener && (b.readyState = "loading",
    b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0),
        b.readyState = "complete";
    }
    , 0)),
    a.yepnope = k(),
    a.yepnope.executeStack = h,
    a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d)
            k.setAttribute(o, d[o]);
        c = j ? h : c || f,
        k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1,
            c(),
            k.onload = k.onreadystatechange = null);
        }
        ,
        m(function() {
            l || (l = 1,
            c(1));
        }, e),
        i ? k.onload() : n.parentNode.insertBefore(k, n);
    }
    ,
    a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a,
        e.rel = "stylesheet",
        e.type = "text/css";
        for (j in d)
            e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n),
        m(c, 0));
    }
    ;
}(this, document),
Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
}
;
;+function($) {
    'use strict';
    var dismiss = '[data-dismiss="alert"]';
    var Alert = function(el) {
        $(el).on('click', dismiss, this.close);
    };
    Alert.prototype.close = function(e) {
        var $this = $(this);
        var selector = $this.attr('data-target');
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = $(selector);
        if (e)
            e.preventDefault();
        if (!$parent.length)
            $parent = $this.hasClass('alert') ? $this : $this.parent();
        $parent.trigger(e = $.Event('close.bs.alert'));
        if (e.isDefaultPrevented())
            return;
        $parent.removeClass('in');
        function removeElement() {
            $parent.trigger('closed.bs.alert').remove();
        }
        $.support.transition && $parent.hasClass('fade') ? $parent.one($.support.transition.end, removeElement).emulateTransitionEnd(150) : removeElement();
    }
    ;
    var old = $.fn.alert;
    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.alert');
            if (!data)
                $this.data('bs.alert', (data = new Alert(this)));
            if (typeof option == 'string')
                data[option].call($this);
        });
    }
    ;
    $.fn.alert.Constructor = Alert;
    $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this;
    }
    ;
    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery);
+function($) {
    'use strict';
    var Button = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Button.DEFAULTS, options);
        this.isLoading = false;
    };
    Button.DEFAULTS = {
        loadingText: 'loading...'
    };
    Button.prototype.setState = function(state) {
        var d = 'disabled';
        var $el = this.$element;
        var val = $el.is('input') ? 'val' : 'html';
        var data = $el.data();
        state = state + 'Text';
        if (!data.resetText)
            $el.data('resetText', $el[val]());
        $el[val](data[state] || this.options[state]);
        setTimeout($.proxy(function() {
            if (state == 'loadingText') {
                this.isLoading = true;
                $el.addClass(d).attr(d, d);
            } else {
                if (this.isLoading) {
                    this.isLoading = false;
                    $el.removeClass(d).removeAttr(d);
                }
            }
        }, this), 0);
    }
    ;
    Button.prototype.toggle = function() {
        var changed = true;
        var $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find('input');
            if ($input.prop('type') == 'radio')
                if ($input.prop('checked') && this.$element.hasClass('active'))
                    changed = false;
                else
                    $parent.find('.active').removeClass('active');
            if (changed)
                $input.prop('checked', !this.$element.hasClass('active')).trigger('change');
        }
        if (changed)
            this.$element.toggleClass('active');
    }
    ;
    var old = $.fn.button;
    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.button');
            var options = typeof option == 'object' && option;
            if (!data)
                $this.data('bs.button', (data = new Button(this,options)));
            if (option == 'toggle')
                data.toggle();
            else {
                if (option)
                    data.setState(option);
            }
        });
    }
    ;
    $.fn.button.Constructor = Button;
    $.fn.button.noConflict = function() {
        $.fn.button = old;
        return this;
    }
    ;
    $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function(e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('btn'))
            $btn = $btn.closest('.btn');
        $btn.button('toggle');
        e.preventDefault();
    });
}(jQuery);
+function($) {
    'use strict';
    var Carousel = function(element, options) {
        this.$element = $(element);
        this.$indicators = this.$element.find('.carousel-indicators');
        this.options = options;
        this.paused = this.sliding = this.interval = this.$active = this.$items = null;
        this.options.pause == 'hover' && this.$element.on('mouseenter', $.proxy(this.pause, this)).on('mouseleave', $.proxy(this.cycle, this));
    };
    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true
    };
    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
        return this;
    }
    ;
    Carousel.prototype.getActiveIndex = function() {
        this.$active = this.$element.find('.item.active');
        this.$items = this.$active.parent().children();
        return this.$items.index(this.$active);
    }
    ;
    Carousel.prototype.to = function(pos) {
        var that = this;
        var activeIndex = this.getActiveIndex();
        if (pos > (this.$items.length - 1) || pos < 0)
            return;
        if (this.sliding)
            return this.$element.one('slid.bs.carousel', function() {
                that.to(pos);
            });
        if (activeIndex == pos)
            return this.pause().cycle();
        return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]));
    }
    ;
    Carousel.prototype.pause = function(e) {
        e || (this.paused = true);
        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end);
            this.cycle(true);
        }
        this.interval = clearInterval(this.interval);
        return this;
    }
    ;
    Carousel.prototype.next = function() {
        if (this.sliding)
            return;
        return this.slide('next');
    }
    ;
    Carousel.prototype.prev = function() {
        if (this.sliding)
            return;
        return this.slide('prev');
    }
    ;
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active');
        var $next = next || $active[type]();
        var isCycling = this.interval;
        var direction = type == 'next' ? 'left' : 'right';
        var fallback = type == 'next' ? 'first' : 'last';
        var that = this;
        if (!$next.length) {
            if (!this.options.wrap)
                return;
            $next = this.$element.find('.item')[fallback]();
        }
        if ($next.hasClass('active'))
            return this.sliding = false;
        var e = $.Event('slide.bs.carousel', {
            relatedTarget: $next[0],
            direction
        });
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
            return;
        this.sliding = true;
        isCycling && this.pause();
        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active');
            this.$element.one('slid.bs.carousel', function() {
                var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
                $nextIndicator && $nextIndicator.addClass('active');
            });
        }
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type);
            $next[0].offsetWidth;
            $active.addClass(direction);
            $next.addClass(direction);
            $active.one($.support.transition.end, function() {
                $next.removeClass([type, direction].join(' ')).addClass('active');
                $active.removeClass(['active', direction].join(' '));
                that.sliding = false;
                setTimeout(function() {
                    that.$element.trigger('slid.bs.carousel');
                }, 0);
            }).emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000);
        } else {
            $active.removeClass('active');
            $next.addClass('active');
            this.sliding = false;
            this.$element.trigger('slid.bs.carousel');
        }
        isCycling && this.cycle();
        return this;
    }
    ;
    var old = $.fn.carousel;
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.carousel');
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var action = typeof option == 'string' ? option : options.slide;
            if (!data)
                $this.data('bs.carousel', (data = new Carousel(this,options)));
            if (typeof option == 'number')
                data.to(option);
            else if (action)
                data[action]();
            else {
                if (options.interval)
                    data.pause().cycle();
            }
        });
    }
    ;
    $.fn.carousel.Constructor = Carousel;
    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old;
        return this;
    }
    ;
    $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function(e) {
        var $this = $(this), href;
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
        var options = $.extend({}, $target.data(), $this.data());
        var slideIndex = $this.attr('data-slide-to');
        if (slideIndex)
            options.interval = false;
        $target.carousel(options);
        if (slideIndex = $this.attr('data-slide-to'))
            $target.data('bs.carousel').to(slideIndex);
        e.preventDefault();
    });
    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            $carousel.carousel($carousel.data());
        });
    });
}(jQuery);
+function($) {
    'use strict';
    var backdrop = '.dropdown-backdrop';
    var toggle = '[data-toggle=dropdown]';
    var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle);
    };
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if ($this.is('.disabled, :disabled'))
            return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        clearMenus();
        if (!isActive) {
            if ('ontouchstart'in document.documentElement && !$parent.closest('.navbar-nav').length)
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
            var relatedTarget = {
                relatedTarget: this
            };
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
            if (e.isDefaultPrevented())
                return;
            $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
            $this.focus();
        }
        return false;
    }
    ;
    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27)/.test(e.keyCode))
            return;
        var $this = $(this);
        e.preventDefault();
        e.stopPropagation();
        if ($this.is('.disabled, :disabled'))
            return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27)
                $parent.find(toggle).focus();
            return $this.click();
        }
        var desc = ' li:not(.divider):visible a';
        var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc);
        if (!$items.length)
            return;
        var index = $items.index($items.filter(':focus'));
        if (e.keyCode == 38 && index > 0)
            index--;
        if (e.keyCode == 40 && index < $items.length - 1)
            index++;
        if (!~index)
            index = 0;
        $items.eq(index).focus();
    }
    ;
    function clearMenus(e) {
        $(backdrop).remove();
        $(toggle).each(function() {
            var $parent = getParent($(this));
            var relatedTarget = {
                relatedTarget: this
            };
            if (!$parent.hasClass('open'))
                return;
            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
            if (e.isDefaultPrevented())
                return;
            $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
        });
    }
    function getParent($this) {
        var selector = $this.attr('data-target');
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    var old = $.fn.dropdown;
    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.dropdown');
            if (!data)
                $this.data('bs.dropdown', (data = new Dropdown(this)));
            if (typeof option == 'string')
                data[option].call($this);
        });
    }
    ;
    $.fn.dropdown.Constructor = Dropdown;
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old;
        return this;
    }
    ;
    $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation();
    }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown);
}(jQuery);
+function($) {
    'use strict';
    var Modal = function(element, options) {
        this.options = options;
        this.$element = $(element);
        this.$backdrop = this.isShown = null;
        if (this.options.remote)
            this.$element.find('.modal-content').load(this.options.remote, $.proxy(function() {
                this.$element.trigger('loaded.bs.modal');
            }, this));
    };
    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    Modal.prototype.toggle = function(_relatedTarget) {
        return this[!this.isShown ? 'show' : 'hide'](_relatedTarget);
    }
    ;
    Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.modal', {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e);
        if (this.isShown || e.isDefaultPrevented())
            return;
        this.isShown = true;
        this.escape();
        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade');
            if (!that.$element.parent().length)
                that.$element.appendTo(document.body);
            that.$element.show().scrollTop(0);
            if (transition)
                that.$element[0].offsetWidth;
            that.$element.addClass('in').attr('aria-hidden', false);
            that.enforceFocus();
            var e = $.Event('shown.bs.modal', {
                relatedTarget: _relatedTarget
            });
            transition ? that.$element.find('.modal-dialog').one($.support.transition.end, function() {
                that.$element.focus().trigger(e);
            }).emulateTransitionEnd(300) : that.$element.focus().trigger(e);
        });
    }
    ;
    Modal.prototype.hide = function(e) {
        if (e)
            e.preventDefault();
        e = $.Event('hide.bs.modal');
        this.$element.trigger(e);
        if (!this.isShown || e.isDefaultPrevented())
            return;
        this.isShown = false;
        this.escape();
        $(document).off('focusin.bs.modal');
        this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal');
        $.support.transition && this.$element.hasClass('fade') ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
    }
    ;
    Modal.prototype.enforceFocus = function() {
        $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function(e) {
            if (this.$element[0] !== e.target && !this.$element.has(e.target).length)
                this.$element.focus();
        }, this));
    }
    ;
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard)
            this.$element.on('keyup.dismiss.bs.modal', $.proxy(function(e) {
                e.which == 27 && this.hide();
            }, this));
        else {
            if (!this.isShown)
                this.$element.off('keyup.dismiss.bs.modal');
        }
    }
    ;
    Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
            that.removeBackdrop();
            that.$element.trigger('hidden.bs.modal');
        });
    }
    ;
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    }
    ;
    Modal.prototype.backdrop = function(callback) {
        var animate = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
            this.$element.on('click.dismiss.bs.modal', $.proxy(function(e) {
                if (e.target !== e.currentTarget)
                    return;
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
            }, this));
            if (doAnimate)
                this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass('in');
            if (!callback)
                return;
            doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
        } else {
            if (callback)
                callback();
        }
    }
    ;
    var old = $.fn.modal;
    $.fn.modal = function(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
            if (!data)
                $this.data('bs.modal', (data = new Modal(this,options)));
            if (typeof option == 'string')
                data[option](_relatedTarget);
            else {
                if (options.show)
                    data.show(_relatedTarget);
            }
        });
    }
    ;
    $.fn.modal.Constructor = Modal;
    $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
    }
    ;
    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        if ($this.is('a'))
            e.preventDefault();
        $target.modal(option, this).one('hide', function() {
            $this.is(':visible') && $this.focus();
        });
    });
    $(document).on('show.bs.modal', '.modal', function() {
        $(document.body).addClass('modal-open');
    }).on('hidden.bs.modal', '.modal', function() {
        $(document.body).removeClass('modal-open');
    });
}(jQuery);
+function($) {
    'use strict';
    var Tooltip = function(element, options) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init('tooltip', element, options);
    };
    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false
    };
    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true;
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        var triggers = this.options.trigger.split(' ');
        for (var i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if (trigger == 'click')
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
            else {
                if (trigger != 'manual') {
                    var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
                    var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
                    this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
                    this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
                }
            }
        }
        this.options.selector ? (this._options = $.extend({}, this.options, {
            trigger: 'manual',
            selector: ''
        })) : this.fixTitle();
    }
    ;
    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    }
    ;
    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);
        if (options.delay && typeof options.delay == 'number')
            options.delay = {
                show: options.delay,
                hide: options.delay
            };
        return options;
    }
    ;
    Tooltip.prototype.getDelegateOptions = function() {
        var options = {};
        var defaults = this.getDefaults();
        this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value)
                options[key] = value;
        });
        return options;
    }
    ;
    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        clearTimeout(self.timeout);
        self.hoverState = 'in';
        if (!self.options.delay || !self.options.delay.show)
            return self.show();
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'in')
                self.show();
        }, self.options.delay.show);
    }
    ;
    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        clearTimeout(self.timeout);
        self.hoverState = 'out';
        if (!self.options.delay || !self.options.delay.hide)
            return self.hide();
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'out')
                self.hide();
        }, self.options.delay.hide);
    }
    ;
    Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            if (e.isDefaultPrevented())
                return;
            var that = this;
            var $tip = this.tip();
            this.setContent();
            if (this.options.animation)
                $tip.addClass('fade');
            var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
            var autoToken = /\s?auto?\s?/i;
            var autoPlace = autoToken.test(placement);
            if (autoPlace)
                placement = placement.replace(autoToken, '') || 'top';
            $tip.detach().css({
                top: 0,
                left: 0,
                display: 'block'
            }).addClass(placement);
            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
            var pos = this.getPosition();
            var actualWidth = $tip[0].offsetWidth;
            var actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var $parent = this.$element.parent();
                var orgPlacement = placement;
                var docScroll = document.documentElement.scrollTop || document.body.scrollTop;
                var parentWidth = this.options.container == 'body' ? window.innerWidth : $parent.outerWidth();
                var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight();
                var parentLeft = this.options.container == 'body' ? 0 : $parent.offset().left;
                placement = placement == 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' : placement == 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' : placement == 'right' && pos.right + actualWidth > parentWidth ? 'left' : placement == 'left' && pos.left - actualWidth < parentLeft ? 'right' : placement;
                $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            this.hoverState = null;
            var complete = function() {
                that.$element.trigger('shown.bs.' + that.type);
            };
            $.support.transition && this.$tip.hasClass('fade') ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
        }
    }
    ;
    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var replace;
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;
        var marginTop = parseInt($tip.css('margin-top'), 10);
        var marginLeft = parseInt($tip.css('margin-left'), 10);
        if (isNaN(marginTop))
            marginTop = 0;
        if (isNaN(marginLeft))
            marginLeft = 0;
        offset.top = offset.top + marginTop;
        offset.left = offset.left + marginLeft;
        $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                });
            }
        }, offset), 0);
        $tip.addClass('in');
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        if (placement == 'top' && actualHeight != height) {
            replace = true;
            offset.top = offset.top + height - actualHeight;
        }
        if (/bottom|top/.test(placement)) {
            var delta = 0;
            if (offset.left < 0) {
                delta = offset.left * -2;
                offset.left = 0;
                $tip.offset(offset);
                actualWidth = $tip[0].offsetWidth;
                actualHeight = $tip[0].offsetHeight;
            }
            this.replaceArrow(delta - width + actualWidth, actualWidth, 'left');
        } else
            this.replaceArrow(actualHeight - height, actualHeight, 'top');
        if (replace)
            $tip.offset(offset);
    }
    ;
    Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
        this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '');
    }
    ;
    Tooltip.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
        $tip.removeClass('fade in top bottom left right');
    }
    ;
    Tooltip.prototype.hide = function() {
        var that = this;
        var $tip = this.tip();
        var e = $.Event('hide.bs.' + this.type);
        function complete() {
            if (that.hoverState != 'in')
                $tip.detach();
            that.$element.trigger('hidden.bs.' + that.type);
        }
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
            return;
        $tip.removeClass('in');
        $.support.transition && this.$tip.hasClass('fade') ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
        this.hoverState = null;
        return this;
    }
    ;
    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string')
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
    ;
    Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    }
    ;
    Tooltip.prototype.getPosition = function() {
        var el = this.$element[0];
        return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
            width: el.offsetWidth,
            height: el.offsetHeight
        }, this.$element.offset());
    }
    ;
    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'top' ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'left' ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    }
    ;
    Tooltip.prototype.getTitle = function() {
        var title;
        var $e = this.$element;
        var o = this.options;
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
        return title;
    }
    ;
    Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template);
    }
    ;
    Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
    }
    ;
    Tooltip.prototype.validate = function() {
        if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null;
        }
    }
    ;
    Tooltip.prototype.enable = function() {
        this.enabled = true;
    }
    ;
    Tooltip.prototype.disable = function() {
        this.enabled = false;
    }
    ;
    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }
    ;
    Tooltip.prototype.toggle = function(e) {
        var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this;
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    }
    ;
    Tooltip.prototype.destroy = function() {
        clearTimeout(this.timeout);
        this.hide().$element.off('.' + this.type).removeData('bs.' + this.type);
    }
    ;
    var old = $.fn.tooltip;
    $.fn.tooltip = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.tooltip');
            var options = typeof option == 'object' && option;
            if (!data && option == 'destroy')
                return;
            if (!data)
                $this.data('bs.tooltip', (data = new Tooltip(this,options)));
            if (typeof option == 'string')
                data[option]();
        });
    }
    ;
    $.fn.tooltip.Constructor = Tooltip;
    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old;
        return this;
    }
    ;
}(jQuery);
+function($) {
    'use strict';
    var Popover = function(element, options) {
        this.init('popover', element, options);
    };
    if (!$.fn.tooltip)
        throw new Error('Popover requires tooltip.js');
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
    Popover.prototype.constructor = Popover;
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    }
    ;
    Popover.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        var content = this.getContent();
        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
        $tip.find('.popover-content')[this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'](content);
        $tip.removeClass('fade top bottom left right in');
        if (!$tip.find('.popover-title').html())
            $tip.find('.popover-title').hide();
    }
    ;
    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }
    ;
    Popover.prototype.getContent = function() {
        var $e = this.$element;
        var o = this.options;
        return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
    }
    ;
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.arrow');
    }
    ;
    Popover.prototype.tip = function() {
        if (!this.$tip)
            this.$tip = $(this.options.template);
        return this.$tip;
    }
    ;
    var old = $.fn.popover;
    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.popover');
            var options = typeof option == 'object' && option;
            if (!data && option == 'destroy')
                return;
            if (!data)
                $this.data('bs.popover', (data = new Popover(this,options)));
            if (typeof option == 'string')
                data[option]();
        });
    }
    ;
    $.fn.popover.Constructor = Popover;
    $.fn.popover.noConflict = function() {
        $.fn.popover = old;
        return this;
    }
    ;
}(jQuery);
+function($) {
    'use strict';
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.prototype.show = function() {
        var $this = this.element;
        var $ul = $this.closest('ul:not(.dropdown-menu)');
        var selector = $this.data('target');
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        if ($this.parent('li').hasClass('active'))
            return;
        var previous = $ul.find('.active:last a')[0];
        var e = $.Event('show.bs.tab', {
            relatedTarget: previous
        });
        $this.trigger(e);
        if (e.isDefaultPrevented())
            return;
        var $target = $(selector);
        this.activate($this.parent('li'), $ul);
        this.activate($target, $target.parent(), function() {
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: previous
            });
        });
    }
    ;
    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback && $.support.transition && $active.hasClass('fade');
        function next() {
            $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');
            element.addClass('active');
            if (transition) {
                element[0].offsetWidth;
                element.addClass('in');
            } else
                element.removeClass('fade');
            if (element.parent('.dropdown-menu'))
                element.closest('li.dropdown').addClass('active');
            callback && callback();
        }
        transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next();
        $active.removeClass('in');
    }
    ;
    var old = $.fn.tab;
    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.tab');
            if (!data)
                $this.data('bs.tab', (data = new Tab(this)));
            if (typeof option == 'string')
                data[option]();
        });
    }
    ;
    $.fn.tab.Constructor = Tab;
    $.fn.tab.noConflict = function() {
        $.fn.tab = old;
        return this;
    }
    ;
    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
}(jQuery);
+function($) {
    'use strict';
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options);
        this.$window = $(window).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
        this.$element = $(element);
        this.affixed = this.unpin = this.pinnedOffset = null;
        this.checkPosition();
    };
    Affix.RESET = 'affix affix-top affix-bottom';
    Affix.DEFAULTS = {
        offset: 0
    };
    Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass('affix');
        var scrollTop = this.$window.scrollTop();
        var position = this.$element.offset();
        return (this.pinnedOffset = position.top - scrollTop);
    }
    ;
    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    }
    ;
    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible'))
            return;
        var scrollHeight = $(document).height();
        var scrollTop = this.$window.scrollTop();
        var position = this.$element.offset();
        var offset = this.options.offset;
        var offsetTop = offset.top;
        var offsetBottom = offset.bottom;
        if (this.affixed == 'top')
            position.top += scrollTop;
        if (typeof offset != 'object')
            offsetBottom = offsetTop = offset;
        if (typeof offsetTop == 'function')
            offsetTop = offset.top(this.$element);
        if (typeof offsetBottom == 'function')
            offsetBottom = offset.bottom(this.$element);
        var affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ? false : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' : offsetTop != null && (scrollTop <= offsetTop) ? 'top' : false;
        if (this.affixed === affix)
            return;
        if (this.unpin)
            this.$element.css('top', '');
        var affixType = 'affix' + (affix ? '-' + affix : '');
        var e = $.Event(affixType + '.bs.affix');
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
            return;
        this.affixed = affix;
        this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;
        this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace('affix', 'affixed')));
        if (affix == 'bottom')
            this.$element.offset({
                top: scrollHeight - offsetBottom - this.$element.height()
            });
    }
    ;
    var old = $.fn.affix;
    $.fn.affix = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.affix');
            var options = typeof option == 'object' && option;
            if (!data)
                $this.data('bs.affix', (data = new Affix(this,options)));
            if (typeof option == 'string')
                data[option]();
        });
    }
    ;
    $.fn.affix.Constructor = Affix;
    $.fn.affix.noConflict = function() {
        $.fn.affix = old;
        return this;
    }
    ;
    $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this);
            var data = $spy.data();
            data.offset = data.offset || {};
            if (data.offsetBottom)
                data.offset.bottom = data.offsetBottom;
            if (data.offsetTop)
                data.offset.top = data.offsetTop;
            $spy.affix(data);
        });
    });
}(jQuery);
+function($) {
    'use strict';
    var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.transitioning = null;
        if (this.options.parent)
            this.$parent = $(this.options.parent);
        if (this.options.toggle)
            this.toggle();
    };
    Collapse.DEFAULTS = {
        toggle: true
    };
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width');
        return hasWidth ? 'width' : 'height';
    }
    ;
    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in'))
            return;
        var startEvent = $.Event('show.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented())
            return;
        var actives = this.$parent && this.$parent.find('> .panel > .in');
        if (actives && actives.length) {
            var hasData = actives.data('bs.collapse');
            if (hasData && hasData.transitioning)
                return;
            actives.collapse('hide');
            hasData || actives.data('bs.collapse', null);
        }
        var dimension = this.dimension();
        this.$element.removeClass('collapse').addClass('collapsing')[dimension](0);
        this.transitioning = 1;
        var complete = function() {
            this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('auto');
            this.transitioning = 0;
            this.$element.trigger('shown.bs.collapse');
        };
        if (!$.support.transition)
            return complete.call(this);
        var scrollSize = $.camelCase(['scroll', dimension].join('-'));
        this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize]);
    }
    ;
    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in'))
            return;
        var startEvent = $.Event('hide.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented())
            return;
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass('collapsing').removeClass('collapse').removeClass('in');
        this.transitioning = 1;
        var complete = function() {
            this.transitioning = 0;
            this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse');
        };
        if (!$.support.transition)
            return complete.call(this);
        this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350);
    }
    ;
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']();
    }
    ;
    var old = $.fn.collapse;
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.collapse');
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
            if (!data && options.toggle && option == 'show')
                option = !option;
            if (!data)
                $this.data('bs.collapse', (data = new Collapse(this,options)));
            if (typeof option == 'string')
                data[option]();
        });
    }
    ;
    $.fn.collapse.Constructor = Collapse;
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
        return this;
    }
    ;
    $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function(e) {
        var $this = $(this), href;
        var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
        var $target = $(target);
        var data = $target.data('bs.collapse');
        var option = data ? 'toggle' : $this.data();
        var parent = $this.attr('data-parent');
        var $parent = parent && $(parent);
        if (!data || !data.transitioning) {
            if ($parent)
                $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed');
            $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
        }
        $target.collapse(option);
    });
}(jQuery);
+function($) {
    'use strict';
    function ScrollSpy(element, options) {
        var href;
        var process = $.proxy(this.process, this);
        this.$element = $(element).is('body') ? $(window) : $(element);
        this.$body = $('body');
        this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process);
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
        this.selector = (this.options.target || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' .nav li > a';
        this.offsets = $([]);
        this.targets = $([]);
        this.activeTarget = null;
        this.refresh();
        this.process();
    }
    ScrollSpy.DEFAULTS = {
        offset: 10
    };
    ScrollSpy.prototype.refresh = function() {
        var offsetMethod = this.$element[0] == window ? 'offset' : 'position';
        this.offsets = $([]);
        this.targets = $([]);
        var self = this;
        var $targets = this.$body.find(this.selector).map(function() {
            var $el = $(this);
            var href = $el.data('target') || $el.attr('href');
            var $href = /^#./.test(href) && $(href);
            return ($href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]]) || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            self.offsets.push(this[0]);
            self.targets.push(this[1]);
        });
    }
    ;
    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
        var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
        var maxScroll = scrollHeight - this.$scrollElement.height();
        var offsets = this.offsets;
        var targets = this.targets;
        var activeTarget = this.activeTarget;
        var i;
        if (scrollTop >= maxScroll)
            return activeTarget != (i = targets.last()[0]) && this.activate(i);
        if (activeTarget && scrollTop <= offsets[0])
            return activeTarget != (i = targets[0]) && this.activate(i);
        for (i = offsets.length; i--; )
            activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
    }
    ;
    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target;
        $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
        var active = $(selector).parents('li').addClass('active');
        if (active.parent('.dropdown-menu').length)
            active = active.closest('li.dropdown').addClass('active');
        active.trigger('activate.bs.scrollspy');
    }
    ;
    var old = $.fn.scrollspy;
    $.fn.scrollspy = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.scrollspy');
            var options = typeof option == 'object' && option;
            if (!data)
                $this.data('bs.scrollspy', (data = new ScrollSpy(this,options)));
            if (typeof option == 'string')
                data[option]();
        });
    }
    ;
    $.fn.scrollspy.Constructor = ScrollSpy;
    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old;
        return this;
    }
    ;
    $(window).on('load', function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            $spy.scrollspy($spy.data());
        });
    });
}(jQuery);
+function($) {
    'use strict';
    function transitionEnd() {
        var el = document.createElement('bootstrap');
        var transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd otransitionend',
            'transition': 'transitionend'
        };
        for (var name in transEndEventNames)
            if (el.style[name] !== undefined)
                return {
                    end: transEndEventNames[name]
                };
        return false;
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false
          , $el = this;
        $(this).one($.support.transition.end, function() {
            called = true;
        });
        var callback = function() {
            if (!called)
                $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
    }
    ;
    $(function() {
        $.support.transition = transitionEnd();
    });
}(jQuery);
;jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75))
            return c * (7.5625 * t * t) + b;
        else if (t < (2 / 2.75))
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        else if (t < (2.5 / 2.75))
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        else
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2)
            return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});
;(function($) {
    var defaults = {
        topSpacing: 0,
        bottomSpacing: 0,
        className: 'is-sticky',
        wrapperClassName: 'sticky-wrapper',
        center: false,
        getWidthFrom: ''
    }
      , $window = $(window)
      , $document = $(document)
      , sticked = []
      , windowHeight = $window.height()
      , scroller = function() {
        var scrollTop = $window.scrollTop()
          , documentHeight = $document.height()
          , dwh = documentHeight - windowHeight
          , extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
        for (var i = 0; i < sticked.length; i++) {
            var s = sticked[i]
              , elementTop = s.stickyWrapper.offset().top
              , etse = elementTop - s.topSpacing - extra;
            if (scrollTop <= etse) {
                if (s.currentTop !== null) {
                    s.stickyElement.css('position', '').css('top', '');
                    s.stickyElement.parent().removeClass(s.className);
                    s.currentTop = null;
                }
            } else {
                var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                if (newTop < 0)
                    newTop = newTop + s.topSpacing;
                else
                    newTop = s.topSpacing;
                if (s.currentTop != newTop) {
                    s.stickyElement.css('position', 'fixed').css('top', newTop);
                    if (typeof s.getWidthFrom !== 'undefined')
                        s.stickyElement.css('width', $(s.getWidthFrom).width());
                    s.stickyElement.parent().addClass(s.className);
                    s.currentTop = newTop;
                }
            }
        }
    }
      , resizer = function() {
        windowHeight = $window.height();
    }
      , methods = {
        init: function(options) {
            var o = $.extend(defaults, options);
            return this.each(function() {
                var stickyElement = $(this);
                stickyId = stickyElement.attr('id');
                wrapper = $('<div></div>').attr('id', stickyId + '-sticky-wrapper').addClass(o.wrapperClassName);
                stickyElement.wrapAll(wrapper);
                if (o.center)
                    stickyElement.parent().css({
                        width: stickyElement.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    });
                if (stickyElement.css("float") == "right")
                    stickyElement.css({
                        "float": "none"
                    }).parent().css({
                        "float": "right"
                    });
                var stickyWrapper = stickyElement.parent();
                stickyWrapper.css('height', stickyElement.outerHeight());
                sticked.push({
                    topSpacing: o.topSpacing,
                    bottomSpacing: o.bottomSpacing,
                    stickyElement,
                    currentTop: null,
                    stickyWrapper,
                    className: o.className,
                    getWidthFrom: o.getWidthFrom
                });
            });
        },
        update: scroller
    };
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else {
        if (window.attachEvent) {
            window.attachEvent('onscroll', scroller);
            window.attachEvent('onresize', resizer);
        }
    }
    $.fn.sticky = function(method) {
        if (methods[method])
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method === 'object' || !method)
            return methods.init.apply(this, arguments);
        else
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
    ;
    $(function() {
        setTimeout(scroller, 0);
    });
}
)(jQuery);
;(function(a, i, g) {
    a.fn.tinyNav = function(j) {
        var b = a.extend({
            active: "selected",
            header: "",
            label: ""
        }, j);
        return this.each(function() {
            g++;
            var h = a(this)
              , d = "tinynav" + g
              , f = ".l_" + d
              , e = a("<select/>").attr("id", d).addClass("tinynav " + d);
            if (h.is("ul,ol")) {
                "" !== b.header && e.append(a("<option/>").text(b.header));
                var c = "";
                h.addClass("l_" + d).find("a").each(function() {
                    c += '<option value="' + a(this).attr("href") + '">';
                    var b;
                    for (b = 0; b < a(this).parents("ul, ol").length - 1; b++)
                        c += "- ";
                    c += a(this).text() + "</option>";
                });
                e.append(c);
                b.header || e.find(":eq(" + a(f + " li").index(a(f + " li." + b.active)) + ")").attr("selected", !0);
                e.change(function() {
                    i.location.href = a(this).val();
                });
                a(f).after(e);
                b.label && e.before(a("<label/>").attr("for", d).addClass("tinynav_label " + d + "_label").append(b.label));
            }
        });
    }
    ;
}
)(jQuery, this, 0);
;jQuery(document).ready(function($) {
    $(".a-flash").hover(function() {
        $(this).addClass("animated flash");
    }, function() {
        $(this).removeClass("animated flash");
    });
    $(".a-bounce").hover(function() {
        $(this).addClass("animated bounce");
    }, function() {
        $(this).removeClass("animated bounce");
    });
    $(".a-shake").hover(function() {
        $(this).addClass("animated shake");
    }, function() {
        $(this).removeClass("animated shake");
    });
    $(".a-tada").hover(function() {
        $(this).addClass("animated tada");
    }, function() {
        $(this).removeClass("animated tada");
    });
    $(".a-swing").hover(function() {
        $(this).addClass("animated swing");
    }, function() {
        $(this).removeClass("animated swing");
    });
    $(".a-wobble").hover(function() {
        $(this).addClass("animated wobble");
    }, function() {
        $(this).removeClass("animated wobble");
    });
    $(".a-wiggle").hover(function() {
        $(this).addClass("animated wiggle");
    }, function() {
        $(this).removeClass("animated wiggle");
    });
    $(".a-pulse").hover(function() {
        $(this).addClass("animated pulse");
    }, function() {
        $(this).removeClass("animated pulse");
    });
});
;(function($) {
    var $window = $(window);
    var windowHeight = $window.height();
    $window.resize(function() {
        windowHeight = $window.height();
    });
    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        function update() {
            $this.each(function() {
                firstTop = $this.offset().top;
            });
            if (outerHeight)
                getHeight = function(jqo) {
                    return jqo.outerHeight(true);
                }
                ;
            else
                getHeight = function(jqo) {
                    return jqo.height();
                }
                ;
            if (arguments.length < 1 || xpos === null)
                xpos = "50%";
            if (arguments.length < 2 || speedFactor === null)
                speedFactor = 0.5;
            if (arguments.length < 3 || outerHeight === null)
                outerHeight = true;
            var pos = $window.scrollTop();
            $this.each(function() {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + windowHeight)
                    return;
                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $window.bind('scroll', update).resize(update);
        update();
    }
    ;
}
)(jQuery);
;jQuery('html').removeClass('no-js').addClass('js');
if (navigator.appVersion.indexOf("Mac") != -1)
    jQuery('html').addClass('osx');
jQuery(document).ready(function($) {
    "use strict";
    $(window).on('load', function() {
        $('a[rel=external]').attr('target', '_blank');
    });
    $('body').tooltip({
        delay: {
            show: 300,
            hide: 0
        },
        selector: '[data-toggle=tooltip]:not([disabled])'
    });
    $(function() {
        $(".inc").click(function() {
            var $button = $(this);
            var old = $button.parent().find("input").val();
            var newVal = parseFloat(old) + 1;
            $button.parent().find("input").val(newVal);
        });
        $(".dec").click(function() {
            var $button = $(this);
            var old = $button.parent().find("input").val();
            var newVal = parseFloat(old) - 1;
            $button.parent().find("input").val(newVal);
        });
    });
    $(window).on('load', function() {
        $('.progress-bar').css('width', function() {
            return ($(this).attr('data-percentage') + '%');
        });
    });
    $(".back-to-top").hide();
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 500)
                $('.back-to-top').fadeIn(500);
            else
                $('.back-to-top').fadeOut(500);
        });
        $('.back-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
    $('.navbar').sticky({
        topSpacing: 0
    });
    $(function() {
        $(".blog-right-sidebar nav ul").tinyNav();
    });
    var detectmob = false;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
        detectmob = true;
    if (detectmob === true)
        $('.parallax').each(function() {
            $(this).addClass('parallax-mobile');
        });
    else {
        $('#parallax-one').parallax();
        $('#parallax-two').parallax();
        $('#parallax-three').parallax();
    }
});
;jQuery(document).ready(function() {
    jQuery(".mobSearch").click(function() {
        jQuery(".top-right section.search-form form").slideToggle();
    });
    jQuery('.mobClick').click(function() {
        var $nav = jQuery(".tbm-main");
        $nav.toggleClass("tbm--mobile-show");
    });
});
;

/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($, Drupal) {
    Drupal.theme.progressBar = function(id) {
        const escapedId = Drupal.checkPlain(id);
        return (`<div id="${escapedId}" class="progress" aria-live="polite">` + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>');
    }
    ;
    Drupal.ProgressBar = function(id, updateCallback, method, errorCallback) {
        this.id = id;
        this.method = method || 'GET';
        this.updateCallback = updateCallback;
        this.errorCallback = errorCallback;
        this.element = $(Drupal.theme('progressBar', id));
    }
    ;
    $.extend(Drupal.ProgressBar.prototype, {
        setProgress(percentage, message, label) {
            if (percentage >= 0 && percentage <= 100) {
                $(this.element).find('div.progress__bar').each(function() {
                    this.style.width = `${percentage}%`;
                });
                $(this.element).find('div.progress__percentage').html(`${percentage}%`);
            }
            $('div.progress__description', this.element).html(message);
            $('div.progress__label', this.element).html(label);
            if (this.updateCallback)
                this.updateCallback(percentage, message, this);
        },
        startMonitoring(uri, delay) {
            this.delay = delay;
            this.uri = uri;
            this.sendPing();
        },
        stopMonitoring() {
            clearTimeout(this.timer);
            this.uri = null;
        },
        sendPing() {
            if (this.timer)
                clearTimeout(this.timer);
            if (this.uri) {
                const pb = this;
                let uri = this.uri;
                if (!uri.includes('?'))
                    uri += '?';
                else
                    uri += '&';
                uri += '_format=json';
                $.ajax({
                    type: this.method,
                    url: uri,
                    data: '',
                    dataType: 'json',
                    success(progress) {
                        if (progress.status === 0) {
                            pb.displayError(progress.data);
                            return;
                        }
                        pb.setProgress(progress.percentage, progress.message, progress.label);
                        pb.timer = setTimeout( () => {
                            pb.sendPing();
                        }
                        , pb.delay);
                    },
                    error(xmlhttp) {
                        const e = new Drupal.AjaxError(xmlhttp,pb.uri);
                        pb.displayError(`<pre>${e.message}</pre>`);
                    }
                });
            }
        },
        displayError(string) {
            const error = $('<div class="messages messages--error"></div>').html(string);
            $(this.element).before(error).hide();
            if (this.errorCallback)
                this.errorCallback(this);
        }
    });
}
)(jQuery, Drupal);
;/* @license MIT https://raw.githubusercontent.com/muicss/loadjs/4.3.0/LICENSE.txt */
loadjs = function() {
    var h = function() {}
      , o = {}
      , c = {}
      , f = {};
    function u(e, n) {
        if (e) {
            var t = f[e];
            if (c[e] = n,
            t)
                for (; t.length; )
                    t[0](e, n),
                    t.splice(0, 1)
        }
    }
    function l(e, n) {
        e.call && (e = {
            success: e
        }),
        n.length ? (e.error || h)(n) : (e.success || h)(e)
    }
    function p(t, r, i, s) {
        var o, e, u, n = document, c = i.async, f = (i.numRetries || 0) + 1, l = i.before || h, a = t.replace(/[\?|#].*$/, ""), d = t.replace(/^(css|img|module|nomodule)!/, "");
        if (s = s || 0,
        /(^css!|\.css$)/.test(a))
            (u = n.createElement("link")).rel = "stylesheet",
            u.href = d,
            (o = "hideFocus"in u) && u.relList && (o = 0,
            u.rel = "preload",
            u.as = "style");
        else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(a))
            (u = n.createElement("img")).src = d;
        else if ((u = n.createElement("script")).src = d,
        u.async = void 0 === c || c,
        e = "noModule"in u,
        /^module!/.test(a)) {
            if (!e)
                return r(t, "l");
            u.type = "module"
        } else if (/^nomodule!/.test(a) && e)
            return r(t, "l");
        !(u.onload = u.onerror = u.onbeforeload = function(e) {
            var n = e.type[0];
            if (o)
                try {
                    u.sheet.cssText.length || (n = "e")
                } catch (e) {
                    18 != e.code && (n = "e")
                }
            if ("e" == n) {
                if ((s += 1) < f)
                    return p(t, r, i, s)
            } else if ("preload" == u.rel && "style" == u.as)
                return u.rel = "stylesheet";
            r(t, n, e.defaultPrevented)
        }
        ) !== l(t, u) && n.head.appendChild(u)
    }
    function t(e, n, t) {
        var r, i;
        if (n && n.trim && (r = n),
        i = (r ? t : n) || {},
        r) {
            if (r in o)
                throw "LoadJS";
            o[r] = !0
        }
        function s(n, t) {
            !function(e, r, n) {
                var t, i, s = (e = e.push ? e : [e]).length, o = s, u = [];
                for (t = function(e, n, t) {
                    if ("e" == n && u.push(e),
                    "b" == n) {
                        if (!t)
                            return;
                        u.push(e)
                    }
                    --s || r(u)
                }
                ,
                i = 0; i < o; i++)
                    p(e[i], t, n)
            }(e, function(e) {
                l(i, e),
                n && l({
                    success: n,
                    error: t
                }, e),
                u(r, e)
            }, i)
        }
        if (i.returnPromise)
            return new Promise(s);
        s()
    }
    return t.ready = function(e, n) {
        return function(e, t) {
            e = e.push ? e : [e];
            var n, r, i, s = [], o = e.length, u = o;
            for (n = function(e, n) {
                n.length && s.push(e),
                --u || t(s)
            }
            ; o--; )
                r = e[o],
                (i = c[r]) ? n(r, i) : (f[r] = f[r] || []).push(n)
        }(e, function(e) {
            l(n, e)
        }),
        t
    }
    ,
    t.done = function(e) {
        u(e, [])
    }
    ,
    t.reset = function() {
        o = {},
        c = {},
        f = {}
    }
    ,
    t.isDefined = function(e) {
        return e in o
    }
    ,
    t
}();
;/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
Drupal.debounce = function(func, wait, immediate) {
    let timeout;
    let result;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate)
                result = func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            result = func.apply(context, args);
        return result;
    }
    ;
}
;
;(function(Drupal, debounce) {
    let liveElement;
    const announcements = [];
    Drupal.behaviors.drupalAnnounce = {
        attach(context) {
            if (!liveElement) {
                liveElement = document.createElement('div');
                liveElement.id = 'drupal-live-announce';
                liveElement.className = 'visually-hidden';
                liveElement.setAttribute('aria-live', 'polite');
                liveElement.setAttribute('aria-busy', 'false');
                document.body.appendChild(liveElement);
            }
        }
    };
    function announce() {
        const text = [];
        let priority = 'polite';
        let announcement;
        const il = announcements.length;
        for (let i = 0; i < il; i++) {
            announcement = announcements.pop();
            text.unshift(announcement.text);
            if (announcement.priority === 'assertive')
                priority = 'assertive';
        }
        if (text.length) {
            liveElement.innerHTML = '';
            liveElement.setAttribute('aria-busy', 'true');
            liveElement.setAttribute('aria-live', priority);
            liveElement.innerHTML = text.join('\n');
            liveElement.setAttribute('aria-busy', 'false');
        }
    }
    Drupal.announce = function(text, priority) {
        announcements.push({
            text,
            priority
        });
        return debounce(announce, 200)();
    }
    ;
}
)(Drupal, Drupal.debounce);
;( (Drupal) => {
    Drupal.Message = class {
        constructor(messageWrapper=null) {
            if (!messageWrapper)
                this.messageWrapper = Drupal.Message.defaultWrapper();
            else
                this.messageWrapper = messageWrapper;
        }
        static defaultWrapper() {
            let wrapper = document.querySelector('[data-drupal-messages]') || document.querySelector('[data-drupal-messages-fallback]');
            if (!wrapper) {
                wrapper = document.createElement('div');
                document.body.appendChild(wrapper);
            }
            if (wrapper.hasAttribute('data-drupal-messages-fallback')) {
                wrapper.removeAttribute('data-drupal-messages-fallback');
                wrapper.classList.remove('hidden');
            }
            wrapper.setAttribute('data-drupal-messages', '');
            return wrapper.innerHTML === '' ? Drupal.Message.messageInternalWrapper(wrapper) : wrapper.firstElementChild;
        }
        static getMessageTypeLabels() {
            return {
                status: Drupal.t('Status message'),
                error: Drupal.t('Error message'),
                warning: Drupal.t('Warning message')
            };
        }
        add(message, options={}) {
            if (!options.hasOwnProperty('type'))
                options.type = 'status';
            if (typeof message !== 'string')
                throw new Error('Message must be a string.');
            Drupal.Message.announce(message, options);
            options.id = options.id ? String(options.id) : `${options.type}-${Math.random().toFixed(15).replace('0.', '')}`;
            if (!Drupal.Message.getMessageTypeLabels().hasOwnProperty(options.type)) {
                const {type} = options;
                throw new Error(`The message type, ${type}, is not present in Drupal.Message.getMessageTypeLabels().`);
            }
            this.messageWrapper.appendChild(Drupal.theme('message', {
                text: message
            }, options));
            return options.id;
        }
        select(id) {
            return this.messageWrapper.querySelector(`[data-drupal-message-id^="${id}"]`);
        }
        remove(id) {
            return this.messageWrapper.removeChild(this.select(id));
        }
        clear() {
            Array.prototype.forEach.call(this.messageWrapper.querySelectorAll('[data-drupal-message-id]'), (message) => {
                this.messageWrapper.removeChild(message);
            }
            );
        }
        static announce(message, options) {
            if (!options.priority && (options.type === 'warning' || options.type === 'error'))
                options.priority = 'assertive';
            if (options.announce !== '')
                Drupal.announce(options.announce || message, options.priority);
        }
        static messageInternalWrapper(messageWrapper) {
            const innerWrapper = document.createElement('div');
            innerWrapper.setAttribute('class', 'messages__wrapper');
            messageWrapper.insertAdjacentElement('afterbegin', innerWrapper);
            return innerWrapper;
        }
    }
    ;
    Drupal.theme.message = ({text}, {type, id}) => {
        const messagesTypes = Drupal.Message.getMessageTypeLabels();
        const messageWrapper = document.createElement('div');
        messageWrapper.setAttribute('class', `messages messages--${type}`);
        messageWrapper.setAttribute('role', type === 'error' || type === 'warning' ? 'alert' : 'status');
        messageWrapper.setAttribute('data-drupal-message-id', id);
        messageWrapper.setAttribute('data-drupal-message-type', type);
        messageWrapper.setAttribute('aria-label', messagesTypes[type]);
        messageWrapper.innerHTML = `${text}`;
        return messageWrapper;
    }
    ;
}
)(Drupal);
;(function($, window, Drupal, drupalSettings, loadjs, {isFocusable, tabbable}) {
    Drupal.behaviors.AJAX = {
        attach(context, settings) {
            function loadAjaxBehavior(base) {
                const elementSettings = settings.ajax[base];
                if (typeof elementSettings.selector === 'undefined')
                    elementSettings.selector = `#${base}`;
                once('drupal-ajax', $(elementSettings.selector)).forEach( (el) => {
                    elementSettings.element = el;
                    elementSettings.base = base;
                    Drupal.ajax(elementSettings);
                }
                );
            }
            Object.keys(settings.ajax || {}).forEach(loadAjaxBehavior);
            Drupal.ajax.bindAjaxLinks(document.body);
            once('ajax', '.use-ajax-submit').forEach( (el) => {
                const elementSettings = {};
                elementSettings.url = $(el.form).attr('action');
                elementSettings.setClick = true;
                elementSettings.event = 'click';
                elementSettings.progress = {
                    type: 'throbber'
                };
                elementSettings.base = el.id;
                elementSettings.element = el;
                Drupal.ajax(elementSettings);
            }
            );
        },
        detach(context, settings, trigger) {
            if (trigger === 'unload')
                Drupal.ajax.expired().forEach( (instance) => {
                    Drupal.ajax.instances[instance.instanceIndex] = null;
                }
                );
        }
    };
    Drupal.AjaxError = function(xmlhttp, uri, customMessage) {
        let statusCode;
        let statusText;
        let responseText;
        if (xmlhttp.status)
            statusCode = `\n${Drupal.t('An AJAX HTTP error occurred.')}\n${Drupal.t('HTTP Result Code: !status', {
                '!status': xmlhttp.status
            })}`;
        else
            statusCode = `\n${Drupal.t('An AJAX HTTP request terminated abnormally.')}`;
        statusCode += `\n${Drupal.t('Debugging information follows.')}`;
        const pathText = `\n${Drupal.t('Path: !uri', {
            '!uri': uri
        })}`;
        statusText = '';
        try {
            statusText = `\n${Drupal.t('StatusText: !statusText', {
                '!statusText': xmlhttp.statusText.trim()
            })}`;
        } catch (e) {}
        responseText = '';
        try {
            responseText = `\n${Drupal.t('ResponseText: !responseText', {
                '!responseText': xmlhttp.responseText.trim()
            })}`;
        } catch (e) {}
        responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
        responseText = responseText.replace(/[\n]+\s+/g, '\n');
        const readyStateText = xmlhttp.status === 0 ? `\n${Drupal.t('ReadyState: !readyState', {
            '!readyState': xmlhttp.readyState
        })}` : '';
        customMessage = customMessage ? `\n${Drupal.t('CustomMessage: !customMessage', {
            '!customMessage': customMessage
        })}` : '';
        this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
        this.name = 'AjaxError';
        if (!Drupal.AjaxError.messages)
            Drupal.AjaxError.messages = new Drupal.Message();
        Drupal.AjaxError.messages.add(Drupal.t("Oops, something went wrong. Check your browser's developer console for more details."), {
            type: 'error'
        });
    }
    ;
    Drupal.AjaxError.prototype = new Error();
    Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;
    Drupal.ajax = function(settings) {
        if (arguments.length !== 1)
            throw new Error('Drupal.ajax() function must be called with one configuration object only');
        const base = settings.base || false;
        const element = settings.element || false;
        delete settings.base;
        delete settings.element;
        if (!settings.progress && !element)
            settings.progress = false;
        const ajax = new Drupal.Ajax(base,element,settings);
        ajax.instanceIndex = Drupal.ajax.instances.length;
        Drupal.ajax.instances.push(ajax);
        return ajax;
    }
    ;
    Drupal.ajax.instances = [];
    Drupal.ajax.expired = function() {
        return Drupal.ajax.instances.filter( (instance) => instance && instance.element !== false && !document.body.contains(instance.element));
    }
    ;
    Drupal.ajax.bindAjaxLinks = (element) => {
        once('ajax', '.use-ajax', element).forEach( (ajaxLink) => {
            const $linkElement = $(ajaxLink);
            const elementSettings = {
                progress: {
                    type: 'throbber'
                },
                dialogType: $linkElement.data('dialog-type'),
                dialog: $linkElement.data('dialog-options'),
                dialogRenderer: $linkElement.data('dialog-renderer'),
                base: $linkElement.attr('id'),
                element: ajaxLink
            };
            const href = $linkElement.attr('href');
            if (href) {
                elementSettings.url = href;
                elementSettings.event = 'click';
            }
            const httpMethod = $linkElement.data('ajax-http-method');
            if (httpMethod)
                elementSettings.httpMethod = httpMethod;
            Drupal.ajax(elementSettings);
        }
        );
    }
    ;
    Drupal.Ajax = function(base, element, elementSettings) {
        const defaults = {
            httpMethod: 'POST',
            event: element ? 'mousedown' : null,
            keypress: true,
            selector: base ? `#${base}` : null,
            effect: 'none',
            speed: 'none',
            method: 'replaceWith',
            progress: {
                type: 'throbber',
                message: Drupal.t('Processing...')
            },
            submit: {
                js: true
            }
        };
        $.extend(this, defaults, elementSettings);
        this.commands = new Drupal.AjaxCommands();
        this.instanceIndex = false;
        if (this.wrapper)
            this.wrapper = `#${this.wrapper}`;
        this.element = element;
        this.preCommandsFocusedElementSelector = null;
        this.elementSettings = elementSettings;
        if (this.element && this.element.form)
            this.$form = $(this.element.form);
        if (!this.url) {
            const $element = $(this.element);
            if (this.element.tagName === 'A')
                this.url = $element.attr('href');
            else {
                if (this.element && element.form)
                    this.url = this.$form.attr('action');
            }
        }
        const originalUrl = this.url;
        this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');
        if (drupalSettings.ajaxTrustedUrl[originalUrl])
            drupalSettings.ajaxTrustedUrl[this.url] = true;
        const ajax = this;
        ajax.options = {
            url: ajax.url,
            data: ajax.submit,
            isInProgress() {
                return ajax.ajaxing;
            },
            beforeSerialize(elementSettings, options) {
                return ajax.beforeSerialize(elementSettings, options);
            },
            beforeSubmit(formValues, elementSettings, options) {
                ajax.ajaxing = true;
                ajax.preCommandsFocusedElementSelector = null;
                return ajax.beforeSubmit(formValues, elementSettings, options);
            },
            beforeSend(xmlhttprequest, options) {
                ajax.ajaxing = true;
                return ajax.beforeSend(xmlhttprequest, options);
            },
            success(response, status, xmlhttprequest) {
                ajax.preCommandsFocusedElementSelector = document.activeElement.getAttribute('data-drupal-selector');
                if (typeof response === 'string')
                    response = $.parseJSON(response);
                if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url])
                    if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
                        const customMessage = Drupal.t('The response failed verification so will not be processed.');
                        return ajax.error(xmlhttprequest, ajax.url, customMessage);
                    }
                return (Promise.resolve(ajax.success(response, status)).then( () => {
                    ajax.ajaxing = false;
                    $(document).trigger('ajaxSuccess', [xmlhttprequest, this]);
                    $(document).trigger('ajaxComplete', [xmlhttprequest, this]);
                    if (--$.active === 0)
                        $(document).trigger('ajaxStop');
                }
                ));
            },
            error(xmlhttprequest, status, error) {
                ajax.ajaxing = false;
            },
            complete(xmlhttprequest, status) {
                if (status === 'error' || status === 'parsererror')
                    return ajax.error(xmlhttprequest, ajax.url);
            },
            dataType: 'json',
            jsonp: false,
            method: ajax.httpMethod
        };
        if (elementSettings.dialog)
            ajax.options.data.dialogOptions = elementSettings.dialog;
        if (!ajax.options.url.includes('?'))
            ajax.options.url += '?';
        else
            ajax.options.url += '&';
        let wrapper = `drupal_${elementSettings.dialogType || 'ajax'}`;
        if (elementSettings.dialogRenderer)
            wrapper += `.${elementSettings.dialogRenderer}`;
        ajax.options.url += `${Drupal.ajax.WRAPPER_FORMAT}=${wrapper}`;
        $(ajax.element).on(elementSettings.event, function(event) {
            if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url))
                throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
                    '!url': ajax.url
                }));
            return ajax.eventResponse(this, event);
        });
        if (elementSettings.keypress)
            $(ajax.element).on('keypress', function(event) {
                return ajax.keypressResponse(this, event);
            });
        if (elementSettings.prevent)
            $(ajax.element).on(elementSettings.prevent, false);
    }
    ;
    Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';
    Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';
    Drupal.Ajax.prototype.execute = function() {
        if (this.ajaxing)
            return;
        try {
            this.beforeSerialize(this.element, this.options);
            return $.ajax(this.options);
        } catch (e) {
            this.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${this.options.url}: ${e.message}`);
            return $.Deferred().reject();
        }
    }
    ;
    Drupal.Ajax.prototype.keypressResponse = function(element, event) {
        const ajax = this;
        if (event.which === 13 || (event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number')) {
            event.preventDefault();
            event.stopPropagation();
            $(element).trigger(ajax.elementSettings.event);
        }
    }
    ;
    Drupal.Ajax.prototype.eventResponse = function(element, event) {
        event.preventDefault();
        event.stopPropagation();
        const ajax = this;
        if (ajax.ajaxing)
            return;
        try {
            if (ajax.$form) {
                if (ajax.setClick)
                    element.form.clk = element;
                ajax.$form.ajaxSubmit(ajax.options);
            } else {
                ajax.beforeSerialize(ajax.element, ajax.options);
                $.ajax(ajax.options);
            }
        } catch (e) {
            ajax.ajaxing = false;
            window.alert(`An error occurred while attempting to process ${ajax.options.url}: ${e.message}`);
        }
    }
    ;
    Drupal.Ajax.prototype.beforeSerialize = function(element, options) {
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
        }
        options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;
        const pageState = drupalSettings.ajaxPageState;
        options.data['ajax_page_state[theme]'] = pageState.theme;
        options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
        options.data['ajax_page_state[libraries]'] = pageState.libraries;
    }
    ;
    Drupal.Ajax.prototype.beforeSubmit = function(formValues, element, options) {}
    ;
    Drupal.Ajax.prototype.beforeSend = function(xmlhttprequest, options) {
        if (this.$form) {
            options.extraData = options.extraData || {};
            options.extraData.ajax_iframe_upload = '1';
            const v = $.fieldValue(this.element);
            if (v !== null)
                options.extraData[this.element.name] = v;
        }
        $(this.element).prop('disabled', true);
        if (!this.progress || !this.progress.type)
            return;
        const progressIndicatorMethod = `setProgressIndicator${this.progress.type.slice(0, 1).toUpperCase()}${this.progress.type.slice(1).toLowerCase()}`;
        if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function')
            this[progressIndicatorMethod].call(this);
    }
    ;
    Drupal.theme.ajaxProgressThrobber = (message) => {
        const messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
        const throbber = '<div class="throbber">&nbsp;</div>';
        return `<div class="ajax-progress ajax-progress-throbber">${throbber}${messageMarkup}</div>`;
    }
    ;
    Drupal.theme.ajaxProgressIndicatorFullscreen = () => '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
    Drupal.theme.ajaxProgressMessage = (message) => `<div class="message">${message}</div>`;
    Drupal.theme.ajaxProgressBar = ($element) => $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
    Drupal.Ajax.prototype.setProgressIndicatorBar = function() {
        const progressBar = new Drupal.ProgressBar(`ajax-progress-${this.element.id}`,$.noop,this.progress.method,$.noop);
        if (this.progress.message)
            progressBar.setProgress(-1, this.progress.message);
        if (this.progress.url)
            progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
        this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
        this.progress.object = progressBar;
        $(this.element).after(this.progress.element);
    }
    ;
    Drupal.Ajax.prototype.setProgressIndicatorThrobber = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
        if ($(this.element).closest('[data-drupal-ajax-container]').length)
            $(this.element).closest('[data-drupal-ajax-container]').after(this.progress.element);
        else
            $(this.element).after(this.progress.element);
    }
    ;
    Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function() {
        this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
        $('body').append(this.progress.element);
    }
    ;
    Drupal.Ajax.prototype.commandExecutionQueue = function(response, status) {
        const ajaxCommands = this.commands;
        return Object.keys(response || {}).reduce( (executionQueue, key) => executionQueue.then( () => {
            const {command} = response[key];
            if (command && ajaxCommands[command])
                return ajaxCommands[command](this, response[key], status);
        }
        ), Promise.resolve());
    }
    ;
    Drupal.Ajax.prototype.success = function(response, status) {
        if (this.progress.element)
            $(this.progress.element).remove();
        if (this.progress.object)
            this.progress.object.stopMonitoring();
        $(this.element).prop('disabled', false);
        const elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();
        const focusChanged = Object.keys(response || {}).some( (key) => {
            const {command, method} = response[key];
            return (command === 'focusFirst' || command === 'openDialog' || (command === 'invoke' && method === 'focus'));
        }
        );
        return (this.commandExecutionQueue(response, status).then( () => {
            if (!focusChanged) {
                let target = false;
                if (this.element) {
                    if ($(this.element).data('refocus-blur') && this.preCommandsFocusedElementSelector)
                        target = document.querySelector(`[data-drupal-selector="${this.preCommandsFocusedElementSelector}"]`);
                    if (!target && !$(this.element).data('disable-refocus')) {
                        for (let n = elementParents.length - 1; !target && n >= 0; n--)
                            target = document.querySelector(`[data-drupal-selector="${elementParents[n].getAttribute('data-drupal-selector')}"]`);
                    }
                }
                if (target)
                    $(target).trigger('focus');
            }
            if (this.$form && document.body.contains(this.$form.get(0))) {
                const settings = this.settings || drupalSettings;
                Drupal.attachBehaviors(this.$form.get(0), settings);
            }
            this.settings = null;
        }
        ).catch( (error) => console.error(Drupal.t('An error occurred during the execution of the Ajax response: !error', {
            '!error': error
        }))));
    }
    ;
    Drupal.Ajax.prototype.getEffect = function(response) {
        const type = response.effect || this.effect;
        const speed = response.speed || this.speed;
        const effect = {};
        if (type === 'none') {
            effect.showEffect = 'show';
            effect.hideEffect = 'hide';
            effect.showSpeed = '';
        } else if (type === 'fade') {
            effect.showEffect = 'fadeIn';
            effect.hideEffect = 'fadeOut';
            effect.showSpeed = speed;
        } else {
            effect.showEffect = `${type}Toggle`;
            effect.hideEffect = `${type}Toggle`;
            effect.showSpeed = speed;
        }
        return effect;
    }
    ;
    Drupal.Ajax.prototype.error = function(xmlhttprequest, uri, customMessage) {
        if (this.progress.element)
            $(this.progress.element).remove();
        if (this.progress.object)
            this.progress.object.stopMonitoring();
        $(this.wrapper).show();
        $(this.element).prop('disabled', false);
        if (this.$form && document.body.contains(this.$form.get(0))) {
            const settings = this.settings || drupalSettings;
            Drupal.attachBehaviors(this.$form.get(0), settings);
        }
        throw new Drupal.AjaxError(xmlhttprequest,uri,customMessage);
    }
    ;
    Drupal.theme.ajaxWrapperNewContent = ($newContent, ajax, response) => (response.effect || ajax.effect) !== 'none' && $newContent.filter( (i) => !(($newContent[i].nodeName === '#comment' || ($newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent))))).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
    Drupal.theme.ajaxWrapperMultipleRootElements = ($elements) => $('<div></div>').append($elements);
    Drupal.AjaxCommands = function() {}
    ;
    Drupal.AjaxCommands.prototype = {
        insert(ajax, response) {
            const $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
            const method = response.method || ajax.method;
            const effect = ajax.getEffect(response);
            const settings = response.settings || ajax.settings || drupalSettings;
            let $newContent = $($.parseHTML(response.data, document, true));
            $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);
            switch (method) {
            case 'html':
            case 'replaceWith':
            case 'replaceAll':
            case 'empty':
            case 'remove':
                Drupal.detachBehaviors($wrapper.get(0), settings);
                break;
            default:
                break;
            }
            $wrapper[method]($newContent);
            if (effect.showEffect !== 'show')
                $newContent.hide();
            const $ajaxNewContent = $newContent.find('.ajax-new-content');
            if ($ajaxNewContent.length) {
                $ajaxNewContent.hide();
                $newContent.show();
                $ajaxNewContent[effect.showEffect](effect.showSpeed);
            } else {
                if (effect.showEffect !== 'show')
                    $newContent[effect.showEffect](effect.showSpeed);
            }
            $newContent.each( (index, element) => {
                if (element.nodeType === Node.ELEMENT_NODE && document.documentElement.contains(element))
                    Drupal.attachBehaviors(element, settings);
            }
            );
        },
        remove(ajax, response, status) {
            const settings = response.settings || ajax.settings || drupalSettings;
            $(response.selector).each(function() {
                Drupal.detachBehaviors(this, settings);
            }).remove();
        },
        changed(ajax, response, status) {
            const $element = $(response.selector);
            if (!$element.hasClass('ajax-changed')) {
                $element.addClass('ajax-changed');
                if (response.asterisk)
                    $element.find(response.asterisk).append(` <abbr class="ajax-changed" title="${Drupal.t('Changed')}">*</abbr> `);
            }
        },
        alert(ajax, response, status) {
            window.alert(response.text);
        },
        announce(ajax, response) {
            if (response.priority)
                Drupal.announce(response.text, response.priority);
            else
                Drupal.announce(response.text);
        },
        redirect(ajax, response, status) {
            window.location = response.url;
        },
        css(ajax, response, status) {
            $(response.selector).css(response.argument);
        },
        settings(ajax, response, status) {
            const ajaxSettings = drupalSettings.ajax;
            if (ajaxSettings)
                Drupal.ajax.expired().forEach( (instance) => {
                    if (instance.selector) {
                        const selector = instance.selector.replace('#', '');
                        if (selector in ajaxSettings)
                            delete ajaxSettings[selector];
                    }
                }
                );
            if (response.merge)
                $.extend(true, drupalSettings, response.settings);
            else
                ajax.settings = response.settings;
        },
        data(ajax, response, status) {
            $(response.selector).data(response.name, response.value);
        },
        focusFirst(ajax, response, status) {
            let focusChanged = false;
            const container = document.querySelector(response.selector);
            if (container) {
                const tabbableElements = tabbable(container);
                if (tabbableElements.length) {
                    tabbableElements[0].focus();
                    focusChanged = true;
                } else {
                    if (isFocusable(container)) {
                        container.focus();
                        focusChanged = true;
                    }
                }
            }
            if (ajax.hasOwnProperty('element') && !focusChanged)
                ajax.element.focus();
        },
        invoke(ajax, response, status) {
            const $element = $(response.selector);
            $element[response.method](...response.args);
        },
        restripe(ajax, response, status) {
            $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
        },
        update_build_id(ajax, response, status) {
            document.querySelectorAll(`input[name="form_build_id"][value="${response.old}"]`).forEach( (item) => {
                item.value = response.new;
            }
            );
        },
        add_css(ajax, response, status) {
            if (typeof response.data === 'string') {
                Drupal.deprecationError({
                    message: 'Passing a string to the Drupal.ajax.add_css() method is deprecated in 10.1.0 and is removed from drupal:11.0.0. See https://www.drupal.org/node/3154948.'
                });
                $('head').prepend(response.data);
                return;
            }
            const allUniqueBundleIds = response.data.map(function(style) {
                const uniqueBundleId = style.href;
                if (!loadjs.isDefined(uniqueBundleId))
                    loadjs(`css!${style.href}`, uniqueBundleId, {
                        before(path, styleEl) {
                            Object.keys(style).forEach( (attributeKey) => {
                                styleEl.setAttribute(attributeKey, style[attributeKey]);
                            }
                            );
                        }
                    });
                return uniqueBundleId;
            });
            return new Promise( (resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, {
                            '@dependencies': depsNotFound.join(', ')
                        });
                        reject(message);
                    }
                });
            }
            );
        },
        message(ajax, response) {
            const messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));
            if (response.clearPrevious)
                messages.clear();
            messages.add(response.message, response.messageOptions);
        },
        add_js(ajax, response, status) {
            const parentEl = document.querySelector(response.selector || 'body');
            const settings = ajax.settings || drupalSettings;
            const allUniqueBundleIds = response.data.map( (script) => {
                const uniqueBundleId = script.src;
                if (!loadjs.isDefined(uniqueBundleId))
                    loadjs(script.src, uniqueBundleId, {
                        async: false,
                        before(path, scriptEl) {
                            Object.keys(script).forEach( (attributeKey) => {
                                scriptEl.setAttribute(attributeKey, script[attributeKey]);
                            }
                            );
                            parentEl.appendChild(scriptEl);
                            return false;
                        }
                    });
                return uniqueBundleId;
            }
            );
            return new Promise( (resolve, reject) => {
                loadjs.ready(allUniqueBundleIds, {
                    success() {
                        Drupal.attachBehaviors(parentEl, settings);
                        resolve();
                    },
                    error(depsNotFound) {
                        const message = Drupal.t(`The following files could not be loaded: @dependencies`, {
                            '@dependencies': depsNotFound.join(', ')
                        });
                        reject(message);
                    }
                });
            }
            );
        },
        scrollTop(ajax, response) {
            const offset = $(response.selector).offset();
            let scrollTarget = response.selector;
            while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent())
                scrollTarget = $(scrollTarget).parent();
            if (offset.top - 10 < $(scrollTarget).scrollTop())
                scrollTarget.get(0).scrollTo({
                    top: offset.top - 10,
                    behavior: 'smooth'
                });
        }
    };
    const stopEvent = (xhr, settings) => {
        return (xhr.getResponseHeader('X-Drupal-Ajax-Token') === '1' && settings.isInProgress && settings.isInProgress());
    }
    ;
    $.extend(true, $.event.special, {
        ajaxSuccess: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings))
                    return false;
            }
        },
        ajaxComplete: {
            trigger(event, xhr, settings) {
                if (stopEvent(xhr, settings)) {
                    $.active++;
                    return false;
                }
            }
        }
    });
}
)(jQuery, window, Drupal, drupalSettings, loadjs, window.tabbable);
;(function(Drupal) {
    Drupal.AjaxCommands.prototype.gtagEvent = function(ajax, response) {
        gtag('event', response.event_name, response.data);
    }
    ;
}
)(Drupal);
;
/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
!function() {
    "use strict";
    var e, t = {
        883: function(e, t, n) {
            n.d(t, {
                w: function() {
                    return i;
                }
            });
            class i {
                constructor(e) {
                    this.id = e,
                    this.navParent = document.getElementById(this.id),
                    this.isTouch = window.matchMedia("(pointer: coarse)").matches;
                    const t = drupalSettings.TBMegaMenu[this.id];
                    this.hasArrows = "1" === t.arrows;
                    const n = this.navParent.getAttribute("data-duration") ? parseInt(this.navParent.getAttribute("data-duration")) : 0;
                    this.mm_timeout = n ? 100 + n : 500;
                }
                get isMobile() {
                    return this.navParent.classList.contains("tbm--mobile");
                }
                keyDownHandler(e) {
                    const t = this
                      , n = this.id;
                    switch (e.keyCode) {
                    case 9:
                        t.isMobile || i(e);
                        break;
                    case 13:
                        document.activeElement.classList.contains("no-link") && document.activeElement.click();
                        break;
                    case 27:
                        t.closeMenu();
                        break;
                    case 37:
                        e.preventDefault(),
                        function(e) {
                            a() ? l() : o(e);
                        }(e);
                        break;
                    case 38:
                        e.preventDefault(),
                        o(e);
                        break;
                    case 39:
                        e.preventDefault(),
                        function(e) {
                            a() ? r() : s(e);
                        }(e);
                        break;
                    case 40:
                        e.preventDefault(),
                        s(e);
                    }
                    function i(e) {
                        e.preventDefault(),
                        a() ? e.shiftKey || 38 === e.keyCode || 37 === e.keyCode ? l() : r() : e.shiftKey || 38 === e.keyCode || 37 === e.keyCode ? Drupal.TBMegaMenu.getNextPrevElement("prev").focus() : Drupal.TBMegaMenu.getNextPrevElement("next").focus();
                    }
                    function o(e) {
                        a() || i(e);
                    }
                    function s(e) {
                        a() ? Drupal.TBMegaMenu.getNextPrevElement("next").focus() : Drupal.TBMegaMenu.getNextPrevElement("next").closest(".tbm-item.level-1") !== document.activeElement.closest(".tbm-item.level-1") || i(e);
                    }
                    function a() {
                        return Drupal.TBMegaMenu[n].topLevel.indexOf(document.activeElement) > -1;
                    }
                    function r() {
                        if (function() {
                            const e = Drupal.TBMegaMenu[n].topLevel;
                            return e.indexOf(document.activeElement) === e.length - 1;
                        }())
                            Drupal.TBMegaMenu.getNextPrevElement("next", !0).focus();
                        else {
                            const e = Drupal.TBMegaMenu[n].topLevel
                              , t = e.indexOf(document.activeElement);
                            t > -1 && e[t + 1].focus();
                        }
                    }
                    function l() {
                        if (0 !== Drupal.TBMegaMenu[n].topLevel.indexOf(document.activeElement)) {
                            const e = Drupal.TBMegaMenu[n].topLevel
                              , t = e.indexOf(document.activeElement);
                            t > -1 && e[t - 1].focus();
                        } else
                            Drupal.TBMegaMenu.getNextPrevElement("prev", !0).focus();
                    }
                }
                handleTouch(e) {
                    const t = this
                      , n = e.querySelector(":scope > .tbm-link-container").querySelector(":scope > .tbm-link")
                      , i = n.closest(".tbm-item");
                    n.addEventListener("click", ( (e) => {
                        if (!t.isMobile && t.isTouch && !t.hasArrows)
                            if (n.classList.contains("tbm-clicked")) {
                                const e = n.getAttribute("href");
                                e ? window.location.href = e : (n.classList.remove("tbm-clicked"),
                                t.hideMenu(i, t.mm_timeout));
                            } else
                                e.preventDefault(),
                                t.navParent.querySelectorAll(".open").forEach(( (e) => {
                                    e.contains(n) || e.classList.remove("open");
                                }
                                )),
                                t.ariaCheck(),
                                t.navParent.querySelectorAll(".tbm-clicked").forEach(( (e) => {
                                    e.classList.remove("tbm-clicked");
                                }
                                )),
                                n.classList.add("tbm-clicked"),
                                t.showMenu(i, t.mm_timeout);
                    }
                    )),
                    document.addEventListener("click", ( (e) => {
                        !e.target.closest(".tbm") && t.navParent.classList.contains("tbm--mobile-show") && t.closeMenu();
                    }
                    )),
                    document.addEventListener("focusin", ( (e) => {
                        e.target.closest(".tbm") || t.closeMenu();
                    }
                    ));
                }
                closeMenu() {
                    this.navParent.classList.remove("tbm--mobile-show"),
                    this.navParent.querySelector(".tbm-button").setAttribute("aria-expanded", "false"),
                    this.navParent.querySelectorAll(".open").forEach(( (e) => {
                        e.classList.remove("open");
                    }
                    )),
                    this.navParent.querySelectorAll(".tbm-clicked").forEach(( (e) => {
                        e.classList.remove("tbm-clicked");
                    }
                    )),
                    this.ariaCheck();
                }
                ariaCheck() {
                    const e = (e, t) => {
                        e.querySelectorAll(".tbm-toggle, .tbm-submenu-toggle").forEach(( (e) => {
                            e.setAttribute("aria-expanded", t);
                        }
                        ));
                    }
                    ;
                    document.addEventListener("click", ( (e) => {
                        e.target.closest(".tbm") || this.isMobile || !this.hasArrows || this.closeMenu();
                    }
                    )),
                    this.navParent.querySelectorAll(".tbm-item").forEach(( (t) => {
                        t.classList.contains("tbm-group") ? t.closest(".open") ? t.closest(".open") && e(t, "true") : e(t, "false") : t.classList.contains("tbm-item--has-dropdown") || t.classList.contains("tbm-item--has-flyout") ? t.classList.contains("open") ? t.classList.contains("open") && e(t, "true") : e(t, "false") : t.querySelectorAll(".tbm-toggle, .tbm-submenu-toggle").forEach(( (e) => {
                            e.removeAttribute("aria-expanded");
                        }
                        ));
                    }
                    ));
                }
                showMenu(e, t) {
                    const n = this;
                    e.classList.contains("level-1") ? (e.classList.add("animating"),
                    clearTimeout(e.animatingTimeout),
                    e.animatingTimeout = setTimeout((function() {
                        e.classList.remove("animating");
                    }
                    ), t),
                    clearTimeout(e.hoverTimeout),
                    e.hoverTimeout = setTimeout((function() {
                        e.classList.add("open"),
                        n.ariaCheck();
                    }
                    ), 100)) : (clearTimeout(e.hoverTimeout),
                    e.hoverTimeout = setTimeout((function() {
                        e.classList.add("open"),
                        n.ariaCheck();
                    }
                    ), 100));
                }
                hideMenu(e, t) {
                    const n = this;
                    e.querySelectorAll(".tbm-toggle, .tbm-submenu-toggle").forEach(( (e) => {
                        e.setAttribute("aria-expanded", !1);
                    }
                    )),
                    e.classList.contains("level-1") ? (e.classList.add("animating"),
                    clearTimeout(e.animatingTimeout),
                    e.animatingTimeout = setTimeout((function() {
                        e.classList.remove("animating");
                    }
                    ), t),
                    clearTimeout(e.hoverTimeout),
                    e.hoverTimeout = setTimeout((function() {
                        e.classList.remove("open"),
                        n.ariaCheck();
                    }
                    ), 100)) : (clearTimeout(e.hoverTimeout),
                    e.hoverTimeout = setTimeout((function() {
                        e.classList.remove("open"),
                        n.ariaCheck();
                    }
                    ), 100));
                }
                init() {
                    const e = this;
                    document.querySelectorAll(".tbm-button").forEach(( (t) => {
                        t.addEventListener("click", ( (t) => {
                            e.navParent.classList.contains("tbm--mobile-show") ? e.closeMenu() : (e.navParent.classList.add("tbm--mobile-show"),
                            t.currentTarget.setAttribute("aria-expanded", "true"));
                        }
                        ));
                    }
                    )),
                    this.isTouch || (this.navParent.querySelectorAll(".tbm-item").forEach(( (t) => {
                        t.addEventListener("mouseenter", ( (n) => {
                            e.isMobile || e.hasArrows || e.showMenu(t, e.mm_timeout);
                        }
                        )),
                        t.addEventListener("mouseleave", ( (n) => {
                            e.isMobile || e.hasArrows || e.hideMenu(t, e.mm_timeout);
                        }
                        ));
                    }
                    )),
                    this.navParent.querySelectorAll(".tbm-toggle").forEach(( (t) => {
                        t.addEventListener("focus", ( (t) => {
                            if (!e.isMobile && !e.hasArrows) {
                                const n = t.currentTarget.closest("li");
                                e.showMenu(n, e.mm_timeout),
                                document.addEventListener("focusin", ( (t) => {
                                    e.isMobile || e.hasArrows || t.target === n || n.contains(t.target) || (document.removeEventListener("focusin", t),
                                    e.hideMenu(n, e.mm_timeout));
                                }
                                ));
                            }
                        }
                        ));
                    }
                    ))),
                    this.navParent.querySelectorAll(".tbm-item").forEach(( (t) => {
                        t.querySelector(":scope > .tbm-submenu") && e.handleTouch(t);
                    }
                    )),
                    this.navParent.querySelectorAll(".tbm-submenu-toggle, .tbm-link.no-link").forEach(( (t) => {
                        t.addEventListener("click", ( (t) => {
                            if (e.isMobile) {
                                const n = t.currentTarget.closest(".tbm-item");
                                n.classList.contains("open") ? e.hideMenu(n, e.mm_timeout) : e.showMenu(n, e.mm_timeout);
                            }
                            if (!e.isMobile && (!e.isTouch || e.hasArrows || !t.currentTarget.classList.contains("no-link"))) {
                                const n = t.currentTarget.closest(".tbm-item");
                                if (n.classList.contains("open"))
                                    e.hideMenu(n, e.mm_timeout),
                                    n.querySelectorAll(".open").forEach(( (t) => {
                                        e.hideMenu(t, e.mm_timeout);
                                    }
                                    ));
                                else {
                                    e.showMenu(n, e.mm_timeout);
                                    let t = n.previousElementSibling;
                                    for (; t; )
                                        e.hideMenu(t, e.mm_timeout),
                                        t.querySelectorAll(".open").forEach(( (t) => {
                                            e.hideMenu(t, e.mm_timeout);
                                        }
                                        )),
                                        t = t.previousElementSibling;
                                    let i = n.nextElementSibling;
                                    for (; i; )
                                        e.hideMenu(i, e.mm_timeout),
                                        i.querySelectorAll(".open").forEach(( (t) => {
                                            e.hideMenu(t, e.mm_timeout);
                                        }
                                        )),
                                        i = i.nextElementSibling;
                                }
                            }
                        }
                        ));
                    }
                    )),
                    this.navParent.addEventListener("keydown", this.keyDownHandler.bind(this));
                }
            }
        }
    }, n = {};
    function i(e) {
        var o = n[e];
        if (void 0 !== o)
            return o.exports;
        var s = n[e] = {
            exports: {}
        };
        return t[e](s, s.exports, i),
        s.exports;
    }
    i.d = function(e, t) {
        for (var n in t)
            i.o(t, n) && !i.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            });
    }
    ,
    i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    ,
    e = i(883),
    function(t) {
        t.TBMegaMenu = t.TBMegaMenu || {};
        const n = 'a:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), details:not([disabled]):not([tabindex="-1"]), [tabindex]:not([disabled]):not([tabindex="-1"])'
          , i = () => {
            document.querySelectorAll(".tbm").forEach(( (e) => {
                const i = e.getAttribute("id");
                t.TBMegaMenu[i] = {};
                const o = parseInt(e.getAttribute("data-breakpoint"));
                window.matchMedia(`(max-width: ${o}px)`).matches ? e.classList.add("tbm--mobile") : e.classList.remove("tbm--mobile");
                let s = document.querySelectorAll(n);
                s = [...s];
                let a = e.querySelectorAll(".tbm-link.level-1, .tbm-link.level-1 + .tbm-submenu-toggle");
                a = [...a],
                a = a.filter(( (e) => e.offsetWidth > 0 && e.offsetHeight > 0)),
                t.TBMegaMenu.focusable = s,
                t.TBMegaMenu[i].topLevel = a;
            }
            ));
        }
          , o = (s = i,
        100,
        a = 0,
        function(...e) {
            var t = new Date();
            t - a >= 100 && (s(...e),
            a = t);
        }
        );
        var s, a;
        ["load", "resize"].forEach(( (e) => {
            window.addEventListener(e, o);
        }
        )),
        t.TBMegaMenu.getNextPrevElement = (e, i=!1) => {
            const o = document.activeElement;
            let s = null;
            if (o) {
                let a = document.querySelectorAll(n);
                a = [...a],
                a = t.TBMegaMenu.focusable.filter(( (e) => i ? !e.closest(".tbm-subnav") && e.offsetWidth > 0 && e.offsetHeight > 0 : e.offsetWidth > 0 && e.offsetHeight > 0));
                const r = a.indexOf(o);
                r > -1 && (s = "next" === e ? a[r + 1] || a[0] : a[r - 1] || a[0]);
            }
            return s;
        }
        ,
        t.behaviors.tbMegaMenuInit = {
            attach: (t) => {
                t.querySelectorAll(".tbm").forEach(( (t) => {
                    t.getAttribute("data-initialized") || (t.setAttribute("data-initialized", "true"),
                    new e.w(t.getAttribute("id")).init());
                }
                ));
            }
        },
        t.behaviors.tbMegaMenuRespond = {
            attach: (e) => {
                i();
            }
        };
    }(Drupal);
}();
;/* @license GNU-GPL-2.0-or-later https://github.com/woothemes/FlexSlider/blob/master/LICENSE.md */
;(function($) {
    var focused = true;
    $.flexslider = function(el, options) {
        var slider = $(el);
        if (typeof options.rtl == 'undefined' && $('html').attr('dir') == 'rtl')
            options.rtl = true;
        slider.vars = $.extend({}, $.flexslider.defaults, options);
        var namespace = slider.vars.namespace, msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture, touch = (("ontouchstart"in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch, eventType = "click touchend MSPointerUp keyup", watchedEvent = "", watchedEventClearTimer, vertical = slider.vars.direction === "vertical", reverse = slider.vars.reverse, carousel = (slider.vars.itemWidth > 0), fade = slider.vars.animation === "fade", asNav = slider.vars.asNavFor !== "", methods = {};
        $.data(el, "flexslider", slider);
        methods = {
            init: function() {
                slider.animating = false;
                slider.currentSlide = parseInt((slider.vars.startAt ? slider.vars.startAt : 0), 10);
                if (isNaN(slider.currentSlide))
                    slider.currentSlide = 0;
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
                slider.slides = $(slider.vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                slider.syncExists = $(slider.vars.sync).length > 0;
                if (slider.vars.animation === "slide")
                    slider.vars.animation = "swing";
                slider.prop = (vertical) ? "top" : (slider.vars.rtl ? "marginRight" : "marginLeft");
                slider.args = {};
                slider.manualPause = false;
                slider.stopped = false;
                slider.started = false;
                slider.startTimeout = null;
                slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
                    var obj = document.createElement('div')
                      , props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    for (var i in props)
                        if (obj.style[props[i]] !== undefined) {
                            slider.pfx = props[i].replace('Perspective', '').toLowerCase();
                            slider.prop = "-" + slider.pfx + "-transform";
                            return true;
                        }
                    return false;
                }());
                slider.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                slider.ensureAnimationEnd = '';
                if (slider.vars.controlsContainer !== "")
                    slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
                if (slider.vars.manualControls !== "")
                    slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);
                if (slider.vars.customDirectionNav !== "")
                    slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);
                if (slider.vars.randomize) {
                    slider.slides.sort(function() {
                        return (Math.round(Math.random()) - 0.5);
                    });
                    slider.container.empty().append(slider.slides);
                }
                slider.doMath();
                slider.setup("init");
                if (slider.vars.controlNav)
                    methods.controlNav.setup();
                if (slider.vars.directionNav)
                    methods.directionNav.setup();
                if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard))
                    $(document).bind('keyup', function(event) {
                        var keycode = event.keyCode;
                        if (!slider.animating && (keycode === 39 || keycode === 37)) {
                            var target = (slider.vars.rtl ? ((keycode === 37) ? slider.getTarget('next') : (keycode === 39) ? slider.getTarget('prev') : false) : ((keycode === 39) ? slider.getTarget('next') : (keycode === 37) ? slider.getTarget('prev') : false));
                            ;slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }
                    });
                if (slider.vars.mousewheel)
                    slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
                        event.preventDefault();
                        var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    });
                if (slider.vars.pausePlay)
                    methods.pausePlay.setup();
                if (slider.vars.slideshow && slider.vars.pauseInvisible)
                    methods.pauseInvisible.init();
                if (slider.vars.slideshow) {
                    if (slider.vars.pauseOnHover)
                        slider.hover(function() {
                            if (!slider.manualPlay && !slider.manualPause)
                                slider.pause();
                        }, function() {
                            if (!slider.manualPause && !slider.manualPlay && !slider.stopped)
                                slider.play();
                        });
                    if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden())
                        (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
                }
                if (asNav)
                    methods.asNav.setup();
                if (touch && slider.vars.touch)
                    methods.touch();
                if (!fade || (fade && slider.vars.smoothHeight))
                    $(window).bind("resize orientationchange focus", methods.resize);
                slider.find("img").attr("draggable", "false");
                setTimeout(function() {
                    slider.vars.start(slider);
                }, 200);
            },
            asNav: {
                setup: function() {
                    slider.asNav = true;
                    slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
                    slider.currentItem = slider.currentSlide;
                    slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
                    if (!msGesture)
                        slider.slides.on(eventType, function(e) {
                            e.preventDefault();
                            var $slide = $(this)
                              , target = $slide.index();
                            var posFromX;
                            if (slider.vars.rtl)
                                posFromX = -1 * ($slide.offset().right - $(slider).scrollLeft());
                            else
                                posFromX = $slide.offset().left - $(slider).scrollLeft();
                            if (posFromX <= 0 && $slide.hasClass(namespace + 'active-slide'))
                                slider.flexAnimate(slider.getTarget("prev"), true);
                            else {
                                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                    slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                                }
                            }
                        });
                    else {
                        el._slider = slider;
                        slider.slides.each(function() {
                            var that = this;
                            that._gesture = new MSGesture();
                            that._gesture.target = that;
                            that.addEventListener("MSPointerDown", function(e) {
                                e.preventDefault();
                                if (e.currentTarget._gesture)
                                    e.currentTarget._gesture.addPointer(e.pointerId);
                            }, false);
                            that.addEventListener("MSGestureTap", function(e) {
                                e.preventDefault();
                                var $slide = $(this)
                                  , target = $slide.index();
                                if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                                    slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                                }
                            });
                        });
                    }
                }
            },
            controlNav: {
                setup: function() {
                    if (!slider.manualControls)
                        methods.controlNav.setupPaging();
                    else
                        methods.controlNav.setupManual();
                },
                setupPaging: function() {
                    var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging', j = 1, item, slide;
                    slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');
                    if (slider.pagingCount > 1)
                        for (var i = 0; i < slider.pagingCount; i++) {
                            slide = slider.slides.eq(i);
                            if (undefined === slide.attr('data-thumb-alt'))
                                slide.attr('data-thumb-alt', '');
                            item = $('<a></a>').attr('href', '#').text(j);
                            if (slider.vars.controlNav === "thumbnails")
                                item = $('<img/>').attr('src', slide.attr('data-thumb'));
                            if ('' !== slide.attr('data-thumb-alt'))
                                item.attr('alt', slide.attr('data-thumb-alt'));
                            if ('thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions) {
                                var captn = slide.attr('data-thumbcaption');
                                if ('' !== captn && undefined !== captn) {
                                    var caption = $('<span></span>').addClass(namespace + 'caption').text(captn);
                                    item.append(caption);
                                }
                            }
                            var liElement = $('<li>');
                            item.appendTo(liElement);
                            liElement.append('</li>');
                            slider.controlNavScaffold.append(liElement);
                            j++;
                        }
                    (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();
                    methods.controlNav.active();
                    slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
                        event.preventDefault();
                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this)
                              , target = slider.controlNav.index($this);
                            if (!$this.hasClass(namespace + 'active')) {
                                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }
                        if (watchedEvent === "")
                            watchedEvent = event.type;
                        methods.setToClearWatchedEvent();
                    });
                },
                setupManual: function() {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();
                    slider.controlNav.bind(eventType, function(event) {
                        event.preventDefault();
                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this)
                              , target = slider.controlNav.index($this);
                            if (!$this.hasClass(namespace + 'active')) {
                                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }
                        if (watchedEvent === "")
                            watchedEvent = event.type;
                        methods.setToClearWatchedEvent();
                    });
                },
                set: function() {
                    var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
                    slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
                },
                active: function() {
                    slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
                },
                update: function(action, pos) {
                    if (slider.pagingCount > 1 && action === "add")
                        slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
                    else if (slider.pagingCount === 1)
                        slider.controlNavScaffold.find('li').remove();
                    else
                        slider.controlNav.eq(pos).closest('li').remove();
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
                }
            },
            directionNav: {
                setup: function() {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');
                    if (slider.customDirectionNav)
                        slider.directionNav = slider.customDirectionNav;
                    else if (slider.controlsContainer) {
                        $(slider.controlsContainer).append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
                    } else {
                        slider.append(directionNavScaffold);
                        slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
                    }
                    methods.directionNav.update();
                    slider.directionNav.bind(eventType, function(event) {
                        event.preventDefault();
                        var target;
                        if (watchedEvent === "" || watchedEvent === event.type) {
                            target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
                            slider.flexAnimate(target, slider.vars.pauseOnAction);
                        }
                        if (watchedEvent === "")
                            watchedEvent = event.type;
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function() {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1)
                        slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
                    else if (!slider.vars.animationLoop)
                        if (slider.animatingTo === 0)
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
                        else if (slider.animatingTo === slider.last)
                            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
                        else
                            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                    else
                        slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                }
            },
            pausePlay: {
                setup: function() {
                    var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');
                    if (slider.controlsContainer) {
                        slider.controlsContainer.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
                    } else {
                        slider.append(pausePlayScaffold);
                        slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
                    }
                    methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');
                    slider.pausePlay.bind(eventType, function(event) {
                        event.preventDefault();
                        if (watchedEvent === "" || watchedEvent === event.type)
                            if ($(this).hasClass(namespace + 'pause')) {
                                slider.manualPause = true;
                                slider.manualPlay = false;
                                slider.pause();
                            } else {
                                slider.manualPause = false;
                                slider.manualPlay = true;
                                slider.play();
                            }
                        if (watchedEvent === "")
                            watchedEvent = event.type;
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function(state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
                }
            },
            touch: function() {
                var startX, startY, offset, cwidth, dx, startT, onTouchStart, onTouchMove, onTouchEnd, scrolling = false, localX = 0, localY = 0, accDx = 0;
                if (!msGesture) {
                    onTouchStart = function(e) {
                        if (slider.animating)
                            e.preventDefault();
                        else {
                            if ((window.navigator.msPointerEnabled) || e.touches.length === 1) {
                                slider.pause();
                                cwidth = (vertical) ? slider.h : slider.w;
                                startT = Number(new Date());
                                localX = e.touches[0].pageX;
                                localY = e.touches[0].pageY;
                                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 : (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) : (carousel && slider.currentSlide === slider.last) ? slider.limit : (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide : (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                                startX = (vertical) ? localY : localX;
                                startY = (vertical) ? localX : localY;
                                el.addEventListener('touchmove', onTouchMove, false);
                                el.addEventListener('touchend', onTouchEnd, false);
                            }
                        }
                    }
                    ;
                    onTouchMove = function(e) {
                        localX = e.touches[0].pageX;
                        localY = e.touches[0].pageY;
                        dx = (vertical) ? startX - localY : (slider.vars.rtl ? -1 : 1) * (startX - localX);
                        scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));
                        var fxms = 500;
                        if (!scrolling || Number(new Date()) - startT > fxms) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop)
                                    dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    }
                    ;
                    onTouchEnd = function(e) {
                        el.removeEventListener('touchmove', onTouchMove, false);
                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx
                              , target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2))
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            else {
                                if (!fade)
                                    slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                            }
                        }
                        el.removeEventListener('touchend', onTouchEnd, false);
                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                    }
                    ;
                    el.addEventListener('touchstart', onTouchStart, false);
                } else {
                    el.style.msTouchAction = "none";
                    el._gesture = new MSGesture();
                    el._gesture.target = el;
                    el.addEventListener("MSPointerDown", onMSPointerDown, false);
                    el._slider = slider;
                    el.addEventListener("MSGestureChange", onMSGestureChange, false);
                    el.addEventListener("MSGestureEnd", onMSGestureEnd, false);
                    function onMSPointerDown(e) {
                        e.stopPropagation();
                        if (slider.animating)
                            e.preventDefault();
                        else {
                            slider.pause();
                            el._gesture.addPointer(e.pointerId);
                            accDx = 0;
                            cwidth = (vertical) ? slider.h : slider.w;
                            startT = Number(new Date());
                            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 : (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) : (carousel && slider.currentSlide === slider.last) ? slider.limit : (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide : (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                        }
                    }
                    function onMSGestureChange(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if (!slider)
                            return;
                        var transX = -e.translationX
                          , transY = -e.translationY;
                        accDx = accDx + ((vertical) ? transY : transX);
                        dx = (slider.vars.rtl ? -1 : 1) * accDx;
                        scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));
                        if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
                            setImmediate(function() {
                                el._gesture.stop();
                            });
                            return;
                        }
                        if (!scrolling || Number(new Date()) - startT > 500) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop)
                                    dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    }
                    function onMSGestureEnd(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if (!slider)
                            return;
                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx
                              , target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2))
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            else {
                                if (!fade)
                                    slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                            }
                        }
                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                        accDx = 0;
                    }
                }
            },
            resize: function() {
                if (!slider.animating && slider.is(':visible')) {
                    if (!carousel)
                        slider.doMath();
                    if (fade)
                        methods.smoothHeight();
                    else if (carousel) {
                        slider.slides.width(slider.computedW);
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    } else if (vertical) {
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        if (slider.vars.smoothHeight)
                            methods.smoothHeight();
                        slider.newSlides.width(slider.computedW);
                        slider.setProps(slider.computedW, "setTotal");
                    }
                }
            },
            smoothHeight: function(dur) {
                if (!vertical || fade) {
                    var $obj = (fade) ? slider : slider.viewport;
                    (dur) ? $obj.animate({
                        "height": slider.slides.eq(slider.animatingTo).innerHeight()
                    }, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
                }
            },
            sync: function(action) {
                var $obj = $(slider.vars.sync).data("flexslider")
                  , target = slider.animatingTo;
                switch (action) {
                case "animate":
                    $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true);
                    break;
                case "play":
                    if (!$obj.playing && !$obj.asNav)
                        $obj.play();
                    break;
                case "pause":
                    $obj.pause();
                    break;
                }
            },
            uniqueID: function($clone) {
                $clone.filter('[id]').add($clone.find('[id]')).each(function() {
                    var $this = $(this);
                    $this.attr('id', $this.attr('id') + '_clone');
                });
                return $clone;
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var visProp = methods.pauseInvisible.getHiddenProp();
                    if (visProp) {
                        var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                        document.addEventListener(evtname, function() {
                            if (methods.pauseInvisible.isHidden())
                                if (slider.startTimeout)
                                    clearTimeout(slider.startTimeout);
                                else
                                    slider.pause();
                            else if (slider.started)
                                slider.play();
                            else if (slider.vars.initDelay > 0)
                                setTimeout(slider.play, slider.vars.initDelay);
                            else
                                slider.play();
                        });
                    }
                },
                isHidden: function() {
                    var prop = methods.pauseInvisible.getHiddenProp();
                    if (!prop)
                        return false;
                    return document[prop];
                },
                getHiddenProp: function() {
                    var prefixes = ['webkit', 'moz', 'ms', 'o'];
                    if ('hidden'in document)
                        return 'hidden';
                    for (var i = 0; i < prefixes.length; i++)
                        if ((prefixes[i] + 'Hidden')in document)
                            return prefixes[i] + 'Hidden';
                    return null;
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(watchedEventClearTimer);
                watchedEventClearTimer = setTimeout(function() {
                    watchedEvent = "";
                }, 3000);
            }
        };
        slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
            if (!slider.vars.animationLoop && target !== slider.currentSlide)
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
            if (asNav && slider.pagingCount === 1)
                slider.direction = (slider.currentItem < target) ? "next" : "prev";
            if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
                if (asNav && withSync) {
                    var master = $(slider.vars.asNavFor).data('flexslider');
                    slider.atEnd = target === 0 || target === slider.count - 1;
                    master.flexAnimate(target, true, false, true, fromNav);
                    slider.direction = (slider.currentItem < target) ? "next" : "prev";
                    master.direction = slider.direction;
                    if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        target = Math.floor(target / slider.visible);
                    } else {
                        slider.currentItem = target;
                        slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
                        return false;
                    }
                }
                slider.animating = true;
                slider.animatingTo = target;
                if (pause)
                    slider.pause();
                slider.vars.before(slider);
                if (slider.syncExists && !fromNav)
                    methods.sync("animate");
                if (slider.vars.controlNav)
                    methods.controlNav.active();
                if (!carousel)
                    slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
                slider.atEnd = target === 0 || target === slider.last;
                if (slider.vars.directionNav)
                    methods.directionNav.update();
                if (target === slider.last) {
                    slider.vars.end(slider);
                    if (!slider.vars.animationLoop)
                        slider.pause();
                }
                if (!fade) {
                    var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW, margin, slideString, calcNext;
                    if (carousel) {
                        margin = slider.vars.itemMargin;
                        calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                        slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                    } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next")
                        slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                    else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev")
                        slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                    else
                        slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
                    slider.setProps(slideString, "", slider.vars.animationSpeed);
                    if (slider.transitions) {
                        if (!slider.vars.animationLoop || !slider.atEnd) {
                            slider.animating = false;
                            slider.currentSlide = slider.animatingTo;
                        }
                        slider.container.unbind("webkitTransitionEnd transitionend");
                        slider.container.bind("webkitTransitionEnd transitionend", function() {
                            clearTimeout(slider.ensureAnimationEnd);
                            slider.wrapup(dimension);
                        });
                        clearTimeout(slider.ensureAnimationEnd);
                        slider.ensureAnimationEnd = setTimeout(function() {
                            slider.wrapup(dimension);
                        }, slider.vars.animationSpeed + 100);
                    } else
                        slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function() {
                            slider.wrapup(dimension);
                        });
                } else if (!touch) {
                    slider.slides.eq(slider.currentSlide).css({
                        "zIndex": 1
                    }).animate({
                        "opacity": 0
                    }, slider.vars.animationSpeed, slider.vars.easing);
                    slider.slides.eq(target).css({
                        "zIndex": 2
                    }).animate({
                        "opacity": 1
                    }, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
                } else {
                    slider.slides.eq(slider.currentSlide).css({
                        "opacity": 0,
                        "zIndex": 1
                    });
                    slider.slides.eq(target).css({
                        "opacity": 1,
                        "zIndex": 2
                    });
                    slider.wrapup(dimension);
                }
                if (slider.vars.smoothHeight)
                    methods.smoothHeight(slider.vars.animationSpeed);
            }
        }
        ;
        slider.wrapup = function(dimension) {
            if (!fade && !carousel)
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop)
                    slider.setProps(dimension, "jumpEnd");
                else {
                    if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop)
                        slider.setProps(dimension, "jumpStart");
                }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            slider.vars.after(slider);
        }
        ;
        slider.animateSlides = function() {
            if (!slider.animating && focused)
                slider.flexAnimate(slider.getTarget("next"));
        }
        ;
        slider.pause = function() {
            clearInterval(slider.animatedSlides);
            slider.animatedSlides = null;
            slider.playing = false;
            if (slider.vars.pausePlay)
                methods.pausePlay.update("play");
            if (slider.syncExists)
                methods.sync("pause");
        }
        ;
        slider.play = function() {
            if (slider.playing)
                clearInterval(slider.animatedSlides);
            slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
            slider.started = slider.playing = true;
            if (slider.vars.pausePlay)
                methods.pausePlay.update("pause");
            if (slider.syncExists)
                methods.sync("play");
        }
        ;
        slider.stop = function() {
            slider.pause();
            slider.stopped = true;
        }
        ;
        slider.canAdvance = function(target, fromNav) {
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return (fromNav) ? true : (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true : (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false : (target === slider.currentSlide && !asNav) ? false : (slider.vars.animationLoop) ? true : (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false : (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false : true;
        }
        ;
        slider.getTarget = function(dir) {
            slider.direction = dir;
            if (dir === "next")
                return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            else
                return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
        }
        ;
        slider.setProps = function(pos, special, dur) {
            var target = (function() {
                var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo
                  , posCalc = (function() {
                    if (carousel)
                        return (special === "setTouch") ? pos : (reverse && slider.animatingTo === slider.last) ? 0 : (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) : (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                    else
                        switch (special) {
                        case "setTotal":
                            return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                        case "setTouch":
                            return (reverse) ? pos : pos;
                        case "jumpEnd":
                            return (reverse) ? pos : slider.count * pos;
                        case "jumpStart":
                            return (reverse) ? slider.count * pos : pos;
                        default:
                            return pos;
                        }
                }());
                return (posCalc * ((slider.vars.rtl) ? 1 : -1)) + "px";
            }());
            if (slider.transitions) {
                if (slider.isFirefox)
                    target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + (parseInt(target) + 'px') + ",0,0)";
                else
                    target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + ((slider.vars.rtl ? -1 : 1) * parseInt(target) + 'px') + ",0,0)";
                dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
                slider.container.css("transition-duration", dur);
            }
            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined)
                slider.container.css(slider.args);
            slider.container.css('transform', target);
        }
        ;
        slider.setup = function(type) {
            if (!fade) {
                var sliderOffset, arr;
                if (type === "init") {
                    slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
                        "overflow": "hidden",
                        "position": "relative"
                    }).appendTo(slider).append(slider.container);
                    slider.cloneCount = 0;
                    slider.cloneOffset = 0;
                    if (reverse) {
                        arr = $.makeArray(slider.slides).reverse();
                        slider.slides = $(arr);
                        slider.container.empty().append(slider.slides);
                    }
                }
                if (slider.vars.animationLoop && !carousel) {
                    slider.cloneCount = 2;
                    slider.cloneOffset = 1;
                    if (type !== "init")
                        slider.container.find('.clone').remove();
                    slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true')).prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
                }
                slider.newSlides = $(slider.vars.selector, slider);
                sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
                if (vertical && !carousel) {
                    slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function() {
                        slider.newSlides.css({
                            "display": "block"
                        });
                        slider.doMath();
                        slider.viewport.height(slider.h);
                        slider.setProps(sliderOffset * slider.h, "init");
                    }, (type === "init") ? 100 : 0);
                } else {
                    slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
                    slider.setProps(sliderOffset * slider.computedW, "init");
                    setTimeout(function() {
                        slider.doMath();
                        if (slider.vars.rtl)
                            if (slider.isFirefox)
                                slider.newSlides.css({
                                    "width": slider.computedW,
                                    "marginRight": slider.computedM,
                                    "float": "right",
                                    "display": "block"
                                });
                            else
                                slider.newSlides.css({
                                    "width": slider.computedW,
                                    "marginRight": slider.computedM,
                                    "float": "left",
                                    "display": "block"
                                });
                        else
                            slider.newSlides.css({
                                "width": slider.computedW,
                                "marginRight": slider.computedM,
                                "float": "left",
                                "display": "block"
                            });
                        if (slider.vars.smoothHeight)
                            methods.smoothHeight();
                    }, (type === "init") ? 100 : 0);
                }
            } else {
                if (slider.vars.rtl)
                    slider.slides.css({
                        "width": "100%",
                        "float": 'right',
                        "marginLeft": "-100%",
                        "position": "relative"
                    });
                else
                    slider.slides.css({
                        "width": "100%",
                        "float": 'left',
                        "marginRight": "-100%",
                        "position": "relative"
                    });
                if (type === "init")
                    if (!touch)
                        if (slider.vars.fadeFirstSlide == false)
                            slider.slides.css({
                                "opacity": 0,
                                "display": "block",
                                "zIndex": 1
                            }).eq(slider.currentSlide).css({
                                "zIndex": 2
                            }).css({
                                "opacity": 1
                            });
                        else
                            slider.slides.css({
                                "opacity": 0,
                                "display": "block",
                                "zIndex": 1
                            }).eq(slider.currentSlide).css({
                                "zIndex": 2
                            }).animate({
                                "opacity": 1
                            }, slider.vars.animationSpeed, slider.vars.easing);
                    else
                        slider.slides.css({
                            "opacity": 0,
                            "display": "block",
                            "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease",
                            "zIndex": 1
                        }).eq(slider.currentSlide).css({
                            "opacity": 1,
                            "zIndex": 2
                        });
                if (slider.vars.smoothHeight)
                    methods.smoothHeight();
            }
            if (!carousel)
                slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
            slider.vars.init(slider);
        }
        ;
        slider.doMath = function() {
            var slide = slider.slides.first()
              , slideMargin = slider.vars.itemMargin
              , minItems = slider.vars.minItems
              , maxItems = slider.vars.maxItems;
            slider.w = (slider.viewport === undefined) ? slider.width() : slider.viewport.width();
            if (slider.isFirefox)
                slider.w = slider.width();
            slider.h = slide.height();
            slider.boxPadding = slide.outerWidth() - slide.width();
            if (carousel) {
                slider.itemT = slider.vars.itemWidth + slideMargin;
                slider.itemM = slideMargin;
                slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
                slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
                slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1))) / minItems : (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1))) / maxItems : (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;
                slider.visible = Math.floor(slider.w / (slider.itemW));
                slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible) ? slider.vars.move : slider.visible;
                slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
                slider.last = slider.pagingCount - 1;
                slider.limit = (slider.pagingCount === 1) ? 0 : (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
            } else {
                slider.itemW = slider.w;
                slider.itemM = slideMargin;
                slider.pagingCount = slider.count;
                slider.last = slider.count - 1;
            }
            slider.computedW = slider.itemW - slider.boxPadding;
            slider.computedM = slider.itemM;
        }
        ;
        slider.update = function(pos, action) {
            slider.doMath();
            if (!carousel) {
                if (pos < slider.currentSlide)
                    slider.currentSlide += 1;
                else {
                    if (pos <= slider.currentSlide && pos !== 0)
                        slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }
            if (slider.vars.controlNav && !slider.manualControls)
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length)
                    methods.controlNav.update("add");
                else {
                    if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                        if (carousel && slider.currentSlide > slider.last) {
                            slider.currentSlide -= 1;
                            slider.animatingTo -= 1;
                        }
                        methods.controlNav.update("remove", slider.last);
                    }
                }
            if (slider.vars.directionNav)
                methods.directionNav.update();
        }
        ;
        slider.addSlide = function(obj, pos) {
            var $obj = $(obj);
            slider.count += 1;
            slider.last = slider.count - 1;
            if (vertical && reverse)
                (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            else
                (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            slider.update(pos, "add");
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            slider.setup();
            slider.vars.added(slider);
        }
        ;
        slider.removeSlide = function(obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;
            slider.count -= 1;
            slider.last = slider.count - 1;
            if (isNaN(obj))
                $(obj, slider.slides).remove();
            else
                (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            slider.doMath();
            slider.update(pos, "remove");
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            slider.setup();
            slider.vars.removed(slider);
        }
        ;
        methods.init();
    }
    ;
    $(window).blur(function(e) {
        focused = false;
    }).focus(function(e) {
        focused = true;
    });
    $.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: false,
        animationLoop: true,
        smoothHeight: false,
        startAt: 0,
        slideshow: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        initDelay: 0,
        randomize: false,
        fadeFirstSlide: true,
        thumbCaptions: false,
        pauseOnAction: true,
        pauseOnHover: false,
        pauseInvisible: true,
        useCSS: true,
        touch: true,
        video: false,
        controlNav: true,
        directionNav: true,
        prevText: "Previous",
        nextText: "Next",
        keyboard: true,
        multipleKeyboard: false,
        mousewheel: false,
        pausePlay: false,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: true,
        isFirefox: false,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {},
        rtl: false
    };
    $.fn.flexslider = function(options) {
        if (options === undefined)
            options = {};
        if (typeof options === "object")
            return this.each(function() {
                var $this = $(this)
                  , selector = (options.selector) ? options.selector : ".slides > li"
                  , $slides = $this.find(selector);
                if (($slides.length === 1 && options.allowOneSlide === false) || $slides.length === 0) {
                    $slides.fadeIn(400);
                    if (options.start)
                        options.start($this);
                } else {
                    if ($this.data('flexslider') === undefined)
                        new $.flexslider(this,options);
                }
            });
        else {
            var $slider = $(this).data('flexslider');
            switch (options) {
            case "play":
                $slider.play();
                break;
            case "pause":
                $slider.pause();
                break;
            case "stop":
                $slider.stop();
                break;
            case "next":
                $slider.flexAnimate($slider.getTarget("next"), true);
                break;
            case "prev":
            case "previous":
                $slider.flexAnimate($slider.getTarget("prev"), true);
                break;
            default:
                if (typeof options === "number")
                    $slider.flexAnimate(options, true);
            }
        }
    }
    ;
}
)(jQuery);
;/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
!function() {
    "use strict";
    !function(e, Drupal, i) {
        function t(t, n, s) {
            e(i("flexslider", "#".concat(t), s)).each((function() {
                e(this).find("ul.slides > li > *").removeAttr("width").removeAttr("height"),
                n ? e(this).flexslider(e.extend(n, {
                    start: function(e) {
                        e.trigger("start", [e])
                    },
                    before: function(e) {
                        e.trigger("before", [e])
                    },
                    after: function(e) {
                        e.trigger("after", [e])
                    },
                    end: function(e) {
                        e.trigger("end", [e])
                    },
                    added: function(e) {
                        e.trigger("added", [e])
                    },
                    removed: function(e) {
                        e.trigger("removed", [e])
                    },
                    init: function(e) {
                        e.trigger("init", [e])
                    }
                })) : e(this).flexslider()
            }
            ))
        }
        Drupal.behaviors.flexslider = {
            attach: function(i, n) {
                var s, r = [];
                if ("undefined" !== e.type(n.flexslider) && "undefined" !== e.type(n.flexslider.instances))
                    for (s in n.flexslider.instances)
                        n.flexslider.instances.hasOwnProperty(s) && "undefined" !== e.type(n.flexslider.optionsets) && n.flexslider.instances[s]in n.flexslider.optionsets && ("" !== n.flexslider.optionsets[n.flexslider.instances[s]].asNavFor ? t(s, n.flexslider.optionsets[n.flexslider.instances[s]], i) : r[s] = n.flexslider.optionsets[n.flexslider.instances[s]]);
                for (s in r)
                    r.hasOwnProperty(s) && t(s, n.flexslider.optionsets[n.flexslider.instances[s]], i)
            }
        }
    }(jQuery, Drupal, once)
}();
;/* @license MIT https://raw.githubusercontent.com/jquery/jquery/3.7.1/LICENSE.txt */
/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(ie, e) {
    "use strict";
    var oe = []
      , r = Object.getPrototypeOf
      , ae = oe.slice
      , g = oe.flat ? function(e) {
        return oe.flat.call(e)
    }
    : function(e) {
        return oe.concat.apply([], e)
    }
      , s = oe.push
      , se = oe.indexOf
      , n = {}
      , i = n.toString
      , ue = n.hasOwnProperty
      , o = ue.toString
      , a = o.call(Object)
      , le = {}
      , v = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
    }
      , y = function(e) {
        return null != e && e === e.window
    }
      , C = ie.document
      , u = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    };
    function m(e, t, n) {
        var r, i, o = (n = n || C).createElement("script");
        if (o.text = e,
        t)
            for (r in u)
                (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }
    function x(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[i.call(e)] || "object" : typeof e
    }
    var t = "3.7.1"
      , l = /HTML$/i
      , ce = function(e, t) {
        return new ce.fn.init(e,t)
    };
    function c(e) {
        var t = !!e && "length"in e && e.length
          , n = x(e);
        return !v(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    function fe(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    ce.fn = ce.prototype = {
        jquery: t,
        constructor: ce,
        length: 0,
        toArray: function() {
            return ae.call(this)
        },
        get: function(e) {
            return null == e ? ae.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = ce.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return ce.each(this, e)
        },
        map: function(n) {
            return this.pushStack(ce.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(ae.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(ce.grep(this, function(e, t) {
                return (t + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(ce.grep(this, function(e, t) {
                return t % 2
            }))
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: s,
        sort: oe.sort,
        splice: oe.splice
    },
    ce.extend = ce.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || v(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e)
                    r = e[t],
                    "__proto__" !== t && a !== r && (l && r && (ce.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t],
                    o = i && !Array.isArray(n) ? [] : i || ce.isPlainObject(n) ? n : {},
                    i = !1,
                    a[t] = ce.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }
    ,
    ce.extend({
        expando: "jQuery" + (t + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== i.call(e)) && (!(t = r(e)) || "function" == typeof (n = ue.call(t, "constructor") && t.constructor) && o.call(n) === a)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            m(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, r = 0;
            if (c(e)) {
                for (n = e.length; r < n; r++)
                    if (!1 === t.call(e[r], r, e[r]))
                        break
            } else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        text: function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (!i)
                while (t = e[r++])
                    n += ce.text(t);
            return 1 === i || 11 === i ? e.textContent : 9 === i ? e.documentElement.textContent : 3 === i || 4 === i ? e.nodeValue : n
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (c(Object(e)) ? ce.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : se.call(t, e, n)
        },
        isXMLDoc: function(e) {
            var t = e && e.namespaceURI
              , n = e && (e.ownerDocument || e).documentElement;
            return !l.test(t || n && n.nodeName || "HTML")
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0, a = [];
            if (c(e))
                for (r = e.length; o < r; o++)
                    null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e)
                    null != (i = t(e[o], o, n)) && a.push(i);
            return g(a)
        },
        guid: 1,
        support: le
    }),
    "function" == typeof Symbol && (ce.fn[Symbol.iterator] = oe[Symbol.iterator]),
    ce.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var pe = oe.pop
      , de = oe.sort
      , he = oe.splice
      , ge = "[\\x20\\t\\r\\n\\f]"
      , ve = new RegExp("^" + ge + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ge + "+$","g");
    ce.contains = function(e, t) {
        var n = t && t.parentNode;
        return e === n || !(!n || 1 !== n.nodeType || !(e.contains ? e.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
    }
    ;
    var f = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function p(e, t) {
        return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
    }
    ce.escapeSelector = function(e) {
        return (e + "").replace(f, p)
    }
    ;
    var ye = C
      , me = s;
    !function() {
        var e, b, w, o, a, T, r, C, d, i, k = me, S = ce.expando, E = 0, n = 0, s = W(), c = W(), u = W(), h = W(), l = function(e, t) {
            return e === t && (a = !0),
            0
        }, f = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", t = "(?:\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", p = "\\[" + ge + "*(" + t + ")(?:" + ge + "*([*^$|!~]?=)" + ge + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + t + "))|)" + ge + "*\\]", g = ":(" + t + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + p + ")*)|.*)\\)|)", v = new RegExp(ge + "+","g"), y = new RegExp("^" + ge + "*," + ge + "*"), m = new RegExp("^" + ge + "*([>+~]|" + ge + ")" + ge + "*"), x = new RegExp(ge + "|>"), j = new RegExp(g), A = new RegExp("^" + t + "$"), D = {
            ID: new RegExp("^#(" + t + ")"),
            CLASS: new RegExp("^\\.(" + t + ")"),
            TAG: new RegExp("^(" + t + "|[*])"),
            ATTR: new RegExp("^" + p),
            PSEUDO: new RegExp("^" + g),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ge + "*(even|odd|(([+-]|)(\\d*)n|)" + ge + "*(?:([+-]|)" + ge + "*(\\d+)|))" + ge + "*\\)|)","i"),
            bool: new RegExp("^(?:" + f + ")$","i"),
            needsContext: new RegExp("^" + ge + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ge + "*((?:-\\d)?\\d*)" + ge + "*\\)|)(?=[^-]|$)","i")
        }, N = /^(?:input|select|textarea|button)$/i, q = /^h\d$/i, L = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, H = /[+~]/, O = new RegExp("\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\([^\\r\\n\\f])","g"), P = function(e, t) {
            var n = "0x" + e.slice(1) - 65536;
            return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
        }, M = function() {
            V()
        }, R = J(function(e) {
            return !0 === e.disabled && fe(e, "fieldset")
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            k.apply(oe = ae.call(ye.childNodes), ye.childNodes),
            oe[ye.childNodes.length].nodeType
        } catch (e) {
            k = {
                apply: function(e, t) {
                    me.apply(e, ae.call(t))
                },
                call: function(e) {
                    me.apply(e, ae.call(arguments, 1))
                }
            }
        }
        function I(t, e, n, r) {
            var i, o, a, s, u, l, c, f = e && e.ownerDocument, p = e ? e.nodeType : 9;
            if (n = n || [],
            "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p)
                return n;
            if (!r && (V(e),
            e = e || T,
            C)) {
                if (11 !== p && (u = L.exec(t)))
                    if (i = u[1]) {
                        if (9 === p) {
                            if (!(a = e.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return k.call(n, a),
                                n
                        } else if (f && (a = f.getElementById(i)) && I.contains(e, a) && a.id === i)
                            return k.call(n, a),
                            n
                    } else {
                        if (u[2])
                            return k.apply(n, e.getElementsByTagName(t)),
                            n;
                        if ((i = u[3]) && e.getElementsByClassName)
                            return k.apply(n, e.getElementsByClassName(i)),
                            n
                    }
                if (!(h[t + " "] || d && d.test(t))) {
                    if (c = t,
                    f = e,
                    1 === p && (x.test(t) || m.test(t))) {
                        (f = H.test(t) && U(e.parentNode) || e) == e && le.scope || ((s = e.getAttribute("id")) ? s = ce.escapeSelector(s) : e.setAttribute("id", s = S)),
                        o = (l = Y(t)).length;
                        while (o--)
                            l[o] = (s ? "#" + s : ":scope") + " " + Q(l[o]);
                        c = l.join(",")
                    }
                    try {
                        return k.apply(n, f.querySelectorAll(c)),
                        n
                    } catch (e) {
                        h(t, !0)
                    } finally {
                        s === S && e.removeAttribute("id")
                    }
                }
            }
            return re(t.replace(ve, "$1"), e, n, r)
        }
        function W() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > b.cacheLength && delete e[r.shift()],
                e[t + " "] = n
            }
        }
        function F(e) {
            return e[S] = !0,
            e
        }
        function $(e) {
            var t = T.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function B(t) {
            return function(e) {
                return fe(e, "input") && e.type === t
            }
        }
        function _(t) {
            return function(e) {
                return (fe(e, "input") || fe(e, "button")) && e.type === t
            }
        }
        function z(t) {
            return function(e) {
                return "form"in e ? e.parentNode && !1 === e.disabled ? "label"in e ? "label"in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && R(e) === t : e.disabled === t : "label"in e && e.disabled === t
            }
        }
        function X(a) {
            return F(function(o) {
                return o = +o,
                F(function(e, t) {
                    var n, r = a([], e.length, o), i = r.length;
                    while (i--)
                        e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }
        function U(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function V(e) {
            var t, n = e ? e.ownerDocument || e : ye;
            return n != T && 9 === n.nodeType && n.documentElement && (r = (T = n).documentElement,
            C = !ce.isXMLDoc(T),
            i = r.matches || r.webkitMatchesSelector || r.msMatchesSelector,
            r.msMatchesSelector && ye != T && (t = T.defaultView) && t.top !== t && t.addEventListener("unload", M),
            le.getById = $(function(e) {
                return r.appendChild(e).id = ce.expando,
                !T.getElementsByName || !T.getElementsByName(ce.expando).length
            }),
            le.disconnectedMatch = $(function(e) {
                return i.call(e, "*")
            }),
            le.scope = $(function() {
                return T.querySelectorAll(":scope")
            }),
            le.cssHas = $(function() {
                try {
                    return T.querySelector(":has(*,:jqfake)"),
                    !1
                } catch (e) {
                    return !0
                }
            }),
            le.getById ? (b.filter.ID = function(e) {
                var t = e.replace(O, P);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && C) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (b.filter.ID = function(e) {
                var n = e.replace(O, P);
                return function(e) {
                    var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n
                }
            }
            ,
            b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && C) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                        i = t.getElementsByName(e),
                        r = 0;
                        while (o = i[r++])
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }
            ),
            b.find.TAG = function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : t.querySelectorAll(e)
            }
            ,
            b.find.CLASS = function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && C)
                    return t.getElementsByClassName(e)
            }
            ,
            d = [],
            $(function(e) {
                var t;
                r.appendChild(e).innerHTML = "<a id='" + S + "' href='' disabled='disabled'></a><select id='" + S + "-\r\\' disabled='disabled'><option selected=''></option></select>",
                e.querySelectorAll("[selected]").length || d.push("\\[" + ge + "*(?:value|" + f + ")"),
                e.querySelectorAll("[id~=" + S + "-]").length || d.push("~="),
                e.querySelectorAll("a#" + S + "+*").length || d.push(".#.+[+~]"),
                e.querySelectorAll(":checked").length || d.push(":checked"),
                (t = T.createElement("input")).setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                r.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && d.push(":enabled", ":disabled"),
                (t = T.createElement("input")).setAttribute("name", ""),
                e.appendChild(t),
                e.querySelectorAll("[name='']").length || d.push("\\[" + ge + "*name" + ge + "*=" + ge + "*(?:''|\"\")")
            }),
            le.cssHas || d.push(":has"),
            d = d.length && new RegExp(d.join("|")),
            l = function(e, t) {
                if (e === t)
                    return a = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !le.sortDetached && t.compareDocumentPosition(e) === n ? e === T || e.ownerDocument == ye && I.contains(ye, e) ? -1 : t === T || t.ownerDocument == ye && I.contains(ye, t) ? 1 : o ? se.call(o, e) - se.call(o, t) : 0 : 4 & n ? -1 : 1)
            }
            ),
            T
        }
        for (e in I.matches = function(e, t) {
            return I(e, null, null, t)
        }
        ,
        I.matchesSelector = function(e, t) {
            if (V(e),
            C && !h[t + " "] && (!d || !d.test(t)))
                try {
                    var n = i.call(e, t);
                    if (n || le.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return n
                } catch (e) {
                    h(t, !0)
                }
            return 0 < I(t, T, null, [e]).length
        }
        ,
        I.contains = function(e, t) {
            return (e.ownerDocument || e) != T && V(e),
            ce.contains(e, t)
        }
        ,
        I.attr = function(e, t) {
            (e.ownerDocument || e) != T && V(e);
            var n = b.attrHandle[t.toLowerCase()]
              , r = n && ue.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !C) : void 0;
            return void 0 !== r ? r : e.getAttribute(t)
        }
        ,
        I.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        ce.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (a = !le.sortStable,
            o = !le.sortStable && ae.call(e, 0),
            de.call(e, l),
            a) {
                while (t = e[i++])
                    t === e[i] && (r = n.push(i));
                while (r--)
                    he.call(e, n[r], 1)
            }
            return o = null,
            e
        }
        ,
        ce.fn.uniqueSort = function() {
            return this.pushStack(ce.uniqueSort(ae.apply(this)))
        }
        ,
        (b = ce.expr = {
            cacheLength: 50,
            createPseudo: F,
            match: D,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(O, P),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(O, P),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || I.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && I.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return D.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && j.test(n) && (t = Y(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(O, P).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return fe(e, t)
                    }
                },
                CLASS: function(e) {
                    var t = s[e + " "];
                    return t || (t = new RegExp("(^|" + ge + ")" + e + "(" + ge + "|$)")) && s(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(n, r, i) {
                    return function(e) {
                        var t = I.attr(e, n);
                        return null == t ? "!=" === r : !r || (t += "",
                        "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(v, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(d, e, t, h, g) {
                    var v = "nth" !== d.slice(0, 3)
                      , y = "last" !== d.slice(-4)
                      , m = "of-type" === e;
                    return 1 === h && 0 === g ? function(e) {
                        return !!e.parentNode
                    }
                    : function(e, t, n) {
                        var r, i, o, a, s, u = v !== y ? "nextSibling" : "previousSibling", l = e.parentNode, c = m && e.nodeName.toLowerCase(), f = !n && !m, p = !1;
                        if (l) {
                            if (v) {
                                while (u) {
                                    o = e;
                                    while (o = o[u])
                                        if (m ? fe(o, c) : 1 === o.nodeType)
                                            return !1;
                                    s = u = "only" === d && !s && "nextSibling"
                                }
                                return !0
                            }
                            if (s = [y ? l.firstChild : l.lastChild],
                            y && f) {
                                p = (a = (r = (i = l[S] || (l[S] = {}))[d] || [])[0] === E && r[1]) && r[2],
                                o = a && l.childNodes[a];
                                while (o = ++a && o && o[u] || (p = a = 0) || s.pop())
                                    if (1 === o.nodeType && ++p && o === e) {
                                        i[d] = [E, a, p];
                                        break
                                    }
                            } else if (f && (p = a = (r = (i = e[S] || (e[S] = {}))[d] || [])[0] === E && r[1]),
                            !1 === p)
                                while (o = ++a && o && o[u] || (p = a = 0) || s.pop())
                                    if ((m ? fe(o, c) : 1 === o.nodeType) && ++p && (f && ((i = o[S] || (o[S] = {}))[d] = [E, p]),
                                    o === e))
                                        break;
                            return (p -= g) === h || p % h == 0 && 0 <= p / h
                        }
                    }
                },
                PSEUDO: function(e, o) {
                    var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || I.error("unsupported pseudo: " + e);
                    return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o],
                    b.setFilters.hasOwnProperty(e.toLowerCase()) ? F(function(e, t) {
                        var n, r = a(e, o), i = r.length;
                        while (i--)
                            e[n = se.call(e, r[i])] = !(t[n] = r[i])
                    }) : function(e) {
                        return a(e, 0, t)
                    }
                    ) : a
                }
            },
            pseudos: {
                not: F(function(e) {
                    var r = []
                      , i = []
                      , s = ne(e.replace(ve, "$1"));
                    return s[S] ? F(function(e, t, n, r) {
                        var i, o = s(e, null, r, []), a = e.length;
                        while (a--)
                            (i = o[a]) && (e[a] = !(t[a] = i))
                    }) : function(e, t, n) {
                        return r[0] = e,
                        s(r, null, n, i),
                        r[0] = null,
                        !i.pop()
                    }
                }),
                has: F(function(t) {
                    return function(e) {
                        return 0 < I(t, e).length
                    }
                }),
                contains: F(function(t) {
                    return t = t.replace(O, P),
                    function(e) {
                        return -1 < (e.textContent || ce.text(e)).indexOf(t)
                    }
                }),
                lang: F(function(n) {
                    return A.test(n || "") || I.error("unsupported lang: " + n),
                    n = n.replace(O, P).toLowerCase(),
                    function(e) {
                        var t;
                        do {
                            if (t = C ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }),
                target: function(e) {
                    var t = ie.location && ie.location.hash;
                    return t && t.slice(1) === e.id
                },
                root: function(e) {
                    return e === r
                },
                focus: function(e) {
                    return e === function() {
                        try {
                            return T.activeElement
                        } catch (e) {}
                    }() && T.hasFocus() && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: z(!1),
                disabled: z(!0),
                checked: function(e) {
                    return fe(e, "input") && !!e.checked || fe(e, "option") && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !b.pseudos.empty(e)
                },
                header: function(e) {
                    return q.test(e.nodeName)
                },
                input: function(e) {
                    return N.test(e.nodeName)
                },
                button: function(e) {
                    return fe(e, "input") && "button" === e.type || fe(e, "button")
                },
                text: function(e) {
                    var t;
                    return fe(e, "input") && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: X(function() {
                    return [0]
                }),
                last: X(function(e, t) {
                    return [t - 1]
                }),
                eq: X(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: X(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: X(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: X(function(e, t, n) {
                    var r;
                    for (r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; )
                        e.push(r);
                    return e
                }),
                gt: X(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        }).pseudos.nth = b.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            b.pseudos[e] = B(e);
        for (e in {
            submit: !0,
            reset: !0
        })
            b.pseudos[e] = _(e);
        function G() {}
        function Y(e, t) {
            var n, r, i, o, a, s, u, l = c[e + " "];
            if (l)
                return t ? 0 : l.slice(0);
            a = e,
            s = [],
            u = b.preFilter;
            while (a) {
                for (o in n && !(r = y.exec(a)) || (r && (a = a.slice(r[0].length) || a),
                s.push(i = [])),
                n = !1,
                (r = m.exec(a)) && (n = r.shift(),
                i.push({
                    value: n,
                    type: r[0].replace(ve, " ")
                }),
                a = a.slice(n.length)),
                b.filter)
                    !(r = D[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(),
                    i.push({
                        value: n,
                        type: o,
                        matches: r
                    }),
                    a = a.slice(n.length));
                if (!n)
                    break
            }
            return t ? a.length : a ? I.error(e) : c(e, s).slice(0)
        }
        function Q(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function J(a, e, t) {
            var s = e.dir
              , u = e.next
              , l = u || s
              , c = t && "parentNode" === l
              , f = n++;
            return e.first ? function(e, t, n) {
                while (e = e[s])
                    if (1 === e.nodeType || c)
                        return a(e, t, n);
                return !1
            }
            : function(e, t, n) {
                var r, i, o = [E, f];
                if (n) {
                    while (e = e[s])
                        if ((1 === e.nodeType || c) && a(e, t, n))
                            return !0
                } else
                    while (e = e[s])
                        if (1 === e.nodeType || c)
                            if (i = e[S] || (e[S] = {}),
                            u && fe(e, u))
                                e = e[s] || e;
                            else {
                                if ((r = i[l]) && r[0] === E && r[1] === f)
                                    return o[2] = r[2];
                                if ((i[l] = o)[2] = a(e, t, n))
                                    return !0
                            }
                return !1
            }
        }
        function K(i) {
            return 1 < i.length ? function(e, t, n) {
                var r = i.length;
                while (r--)
                    if (!i[r](e, t, n))
                        return !1;
                return !0
            }
            : i[0]
        }
        function Z(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                l && t.push(s)));
            return a
        }
        function ee(d, h, g, v, y, e) {
            return v && !v[S] && (v = ee(v)),
            y && !y[S] && (y = ee(y, e)),
            F(function(e, t, n, r) {
                var i, o, a, s, u = [], l = [], c = t.length, f = e || function(e, t, n) {
                    for (var r = 0, i = t.length; r < i; r++)
                        I(e, t[r], n);
                    return n
                }(h || "*", n.nodeType ? [n] : n, []), p = !d || !e && h ? f : Z(f, u, d, n, r);
                if (g ? g(p, s = y || (e ? d : c || v) ? [] : t, n, r) : s = p,
                v) {
                    i = Z(s, l),
                    v(i, [], n, r),
                    o = i.length;
                    while (o--)
                        (a = i[o]) && (s[l[o]] = !(p[l[o]] = a))
                }
                if (e) {
                    if (y || d) {
                        if (y) {
                            i = [],
                            o = s.length;
                            while (o--)
                                (a = s[o]) && i.push(p[o] = a);
                            y(null, s = [], i, r)
                        }
                        o = s.length;
                        while (o--)
                            (a = s[o]) && -1 < (i = y ? se.call(e, a) : u[o]) && (e[i] = !(t[i] = a))
                    }
                } else
                    s = Z(s === t ? s.splice(c, s.length) : s),
                    y ? y(null, t, s, r) : k.apply(t, s)
            })
        }
        function te(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = J(function(e) {
                return e === i
            }, a, !0), l = J(function(e) {
                return -1 < se.call(i, e)
            }, a, !0), c = [function(e, t, n) {
                var r = !o && (n || t != w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                return i = null,
                r
            }
            ]; s < r; s++)
                if (t = b.relative[e[s].type])
                    c = [J(K(c), t)];
                else {
                    if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
                        for (n = ++s; n < r; n++)
                            if (b.relative[e[n].type])
                                break;
                        return ee(1 < s && K(c), 1 < s && Q(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(ve, "$1"), t, s < n && te(e.slice(s, n)), n < r && te(e = e.slice(n)), n < r && Q(e))
                    }
                    c.push(t)
                }
            return K(c)
        }
        function ne(e, t) {
            var n, v, y, m, x, r, i = [], o = [], a = u[e + " "];
            if (!a) {
                t || (t = Y(e)),
                n = t.length;
                while (n--)
                    (a = te(t[n]))[S] ? i.push(a) : o.push(a);
                (a = u(e, (v = o,
                m = 0 < (y = i).length,
                x = 0 < v.length,
                r = function(e, t, n, r, i) {
                    var o, a, s, u = 0, l = "0", c = e && [], f = [], p = w, d = e || x && b.find.TAG("*", i), h = E += null == p ? 1 : Math.random() || .1, g = d.length;
                    for (i && (w = t == T || t || i); l !== g && null != (o = d[l]); l++) {
                        if (x && o) {
                            a = 0,
                            t || o.ownerDocument == T || (V(o),
                            n = !C);
                            while (s = v[a++])
                                if (s(o, t || T, n)) {
                                    k.call(r, o);
                                    break
                                }
                            i && (E = h)
                        }
                        m && ((o = !s && o) && u--,
                        e && c.push(o))
                    }
                    if (u += l,
                    m && l !== u) {
                        a = 0;
                        while (s = y[a++])
                            s(c, f, t, n);
                        if (e) {
                            if (0 < u)
                                while (l--)
                                    c[l] || f[l] || (f[l] = pe.call(r));
                            f = Z(f)
                        }
                        k.apply(r, f),
                        i && !e && 0 < f.length && 1 < u + y.length && ce.uniqueSort(r)
                    }
                    return i && (E = h,
                    w = p),
                    c
                }
                ,
                m ? F(r) : r))).selector = e
            }
            return a
        }
        function re(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e, c = !r && Y(e = l.selector || e);
            if (n = n || [],
            1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && C && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(O, P), t) || [])[0]))
                        return n;
                    l && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                i = D.needsContext.test(e) ? 0 : o.length;
                while (i--) {
                    if (a = o[i],
                    b.relative[s = a.type])
                        break;
                    if ((u = b.find[s]) && (r = u(a.matches[0].replace(O, P), H.test(o[0].type) && U(t.parentNode) || t))) {
                        if (o.splice(i, 1),
                        !(e = r.length && Q(o)))
                            return k.apply(n, r),
                            n;
                        break
                    }
                }
            }
            return (l || ne(e, c))(r, t, !C, n, !t || H.test(e) && U(t.parentNode) || t),
            n
        }
        G.prototype = b.filters = b.pseudos,
        b.setFilters = new G,
        le.sortStable = S.split("").sort(l).join("") === S,
        V(),
        le.sortDetached = $(function(e) {
            return 1 & e.compareDocumentPosition(T.createElement("fieldset"))
        }),
        ce.find = I,
        ce.expr[":"] = ce.expr.pseudos,
        ce.unique = ce.uniqueSort,
        I.compile = ne,
        I.select = re,
        I.setDocument = V,
        I.tokenize = Y,
        I.escape = ce.escapeSelector,
        I.getText = ce.text,
        I.isXML = ce.isXMLDoc,
        I.selectors = ce.expr,
        I.support = ce.support,
        I.uniqueSort = ce.uniqueSort
    }();
    var d = function(e, t, n) {
        var r = []
          , i = void 0 !== n;
        while ((e = e[t]) && 9 !== e.nodeType)
            if (1 === e.nodeType) {
                if (i && ce(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
      , h = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , b = ce.expr.match.needsContext
      , w = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function T(e, n, r) {
        return v(n) ? ce.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? ce.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? ce.grep(e, function(e) {
            return -1 < se.call(n, e) !== r
        }) : ce.filter(n, e, r)
    }
    ce.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? ce.find.matchesSelector(r, e) ? [r] : [] : ce.find.matches(e, ce.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    ce.fn.extend({
        find: function(e) {
            var t, n, r = this.length, i = this;
            if ("string" != typeof e)
                return this.pushStack(ce(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (ce.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]),
            t = 0; t < r; t++)
                ce.find(e, i[t], n);
            return 1 < r ? ce.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(T(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(T(this, e || [], !0))
        },
        is: function(e) {
            return !!T(this, "string" == typeof e && b.test(e) ? ce(e) : e || [], !1).length
        }
    });
    var k, S = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (ce.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || k,
        "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : S.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof ce ? t[0] : t,
                ce.merge(this, ce.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : C, !0)),
                w.test(r[1]) && ce.isPlainObject(t))
                    for (r in t)
                        v(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = C.getElementById(r[2])) && (this[0] = i,
            this.length = 1),
            this
        }
        return e.nodeType ? (this[0] = e,
        this.length = 1,
        this) : v(e) ? void 0 !== n.ready ? n.ready(e) : e(ce) : ce.makeArray(e, this)
    }
    ).prototype = ce.fn,
    k = ce(C);
    var E = /^(?:parents|prev(?:Until|All))/
      , j = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function A(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType)
            ;
        return e
    }
    ce.fn.extend({
        has: function(e) {
            var t = ce(e, this)
              , n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (ce.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = "string" != typeof e && ce(e);
            if (!b.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && ce.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(1 < o.length ? ce.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? se.call(ce(e), this[0]) : se.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ce.uniqueSort(ce.merge(this.get(), ce(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    ce.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return d(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return d(e, "parentNode", n)
        },
        next: function(e) {
            return A(e, "nextSibling")
        },
        prev: function(e) {
            return A(e, "previousSibling")
        },
        nextAll: function(e) {
            return d(e, "nextSibling")
        },
        prevAll: function(e) {
            return d(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return d(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return d(e, "previousSibling", n)
        },
        siblings: function(e) {
            return h((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return h(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (fe(e, "template") && (e = e.content || e),
            ce.merge([], e.childNodes))
        }
    }, function(r, i) {
        ce.fn[r] = function(e, t) {
            var n = ce.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e),
            t && "string" == typeof t && (n = ce.filter(t, n)),
            1 < this.length && (j[r] || ce.uniqueSort(n),
            E.test(r) && n.reverse()),
            this.pushStack(n)
        }
    });
    var D = /[^\x20\t\r\n\f]+/g;
    function N(e) {
        return e
    }
    function q(e) {
        throw e
    }
    function L(e, t, n, r) {
        var i;
        try {
            e && v(i = e.promise) ? i.call(e).done(t).fail(n) : e && v(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    ce.Callbacks = function(r) {
        var e, n;
        r = "string" == typeof r ? (e = r,
        n = {},
        ce.each(e.match(D) || [], function(e, t) {
            n[t] = !0
        }),
        n) : ce.extend({}, r);
        var i, t, o, a, s = [], u = [], l = -1, c = function() {
            for (a = a || r.once,
            o = i = !0; u.length; l = -1) {
                t = u.shift();
                while (++l < s.length)
                    !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length,
                    t = !1)
            }
            r.memory || (t = !1),
            i = !1,
            a && (s = t ? [] : "")
        }, f = {
            add: function() {
                return s && (t && !i && (l = s.length - 1,
                u.push(t)),
                function n(e) {
                    ce.each(e, function(e, t) {
                        v(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== x(t) && n(t)
                    })
                }(arguments),
                t && !i && c()),
                this
            },
            remove: function() {
                return ce.each(arguments, function(e, t) {
                    var n;
                    while (-1 < (n = ce.inArray(t, s, n)))
                        s.splice(n, 1),
                        n <= l && l--
                }),
                this
            },
            has: function(e) {
                return e ? -1 < ce.inArray(e, s) : 0 < s.length
            },
            empty: function() {
                return s && (s = []),
                this
            },
            disable: function() {
                return a = u = [],
                s = t = "",
                this
            },
            disabled: function() {
                return !s
            },
            lock: function() {
                return a = u = [],
                t || i || (s = t = ""),
                this
            },
            locked: function() {
                return !!a
            },
            fireWith: function(e, t) {
                return a || (t = [e, (t = t || []).slice ? t.slice() : t],
                u.push(t),
                i || c()),
                this
            },
            fire: function() {
                return f.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!o
            }
        };
        return f
    }
    ,
    ce.extend({
        Deferred: function(e) {
            var o = [["notify", "progress", ce.Callbacks("memory"), ce.Callbacks("memory"), 2], ["resolve", "done", ce.Callbacks("once memory"), ce.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", ce.Callbacks("once memory"), ce.Callbacks("once memory"), 1, "rejected"]]
              , i = "pending"
              , a = {
                state: function() {
                    return i
                },
                always: function() {
                    return s.done(arguments).fail(arguments),
                    this
                },
                "catch": function(e) {
                    return a.then(null, e)
                },
                pipe: function() {
                    var i = arguments;
                    return ce.Deferred(function(r) {
                        ce.each(o, function(e, t) {
                            var n = v(i[t[4]]) && i[t[4]];
                            s[t[1]](function() {
                                var e = n && n.apply(this, arguments);
                                e && v(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                            })
                        }),
                        i = null
                    }).promise()
                },
                then: function(t, n, r) {
                    var u = 0;
                    function l(i, o, a, s) {
                        return function() {
                            var n = this
                              , r = arguments
                              , e = function() {
                                var e, t;
                                if (!(i < u)) {
                                    if ((e = a.apply(n, r)) === o.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    t = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    v(t) ? s ? t.call(e, l(u, o, N, s), l(u, o, q, s)) : (u++,
                                    t.call(e, l(u, o, N, s), l(u, o, q, s), l(u, o, N, o.notifyWith))) : (a !== N && (n = void 0,
                                    r = [e]),
                                    (s || o.resolveWith)(n, r))
                                }
                            }
                              , t = s ? e : function() {
                                try {
                                    e()
                                } catch (e) {
                                    ce.Deferred.exceptionHook && ce.Deferred.exceptionHook(e, t.error),
                                    u <= i + 1 && (a !== q && (n = void 0,
                                    r = [e]),
                                    o.rejectWith(n, r))
                                }
                            }
                            ;
                            i ? t() : (ce.Deferred.getErrorHook ? t.error = ce.Deferred.getErrorHook() : ce.Deferred.getStackHook && (t.error = ce.Deferred.getStackHook()),
                            ie.setTimeout(t))
                        }
                    }
                    return ce.Deferred(function(e) {
                        o[0][3].add(l(0, e, v(r) ? r : N, e.notifyWith)),
                        o[1][3].add(l(0, e, v(t) ? t : N)),
                        o[2][3].add(l(0, e, v(n) ? n : q))
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? ce.extend(e, a) : a
                }
            }
              , s = {};
            return ce.each(o, function(e, t) {
                var n = t[2]
                  , r = t[5];
                a[t[1]] = n.add,
                r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock),
                n.add(t[3].fire),
                s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments),
                    this
                }
                ,
                s[t[0] + "With"] = n.fireWith
            }),
            a.promise(s),
            e && e.call(s, s),
            s
        },
        when: function(e) {
            var n = arguments.length
              , t = n
              , r = Array(t)
              , i = ae.call(arguments)
              , o = ce.Deferred()
              , a = function(t) {
                return function(e) {
                    r[t] = this,
                    i[t] = 1 < arguments.length ? ae.call(arguments) : e,
                    --n || o.resolveWith(r, i)
                }
            };
            if (n <= 1 && (L(e, o.done(a(t)).resolve, o.reject, !n),
            "pending" === o.state() || v(i[t] && i[t].then)))
                return o.then();
            while (t--)
                L(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    ce.Deferred.exceptionHook = function(e, t) {
        ie.console && ie.console.warn && e && H.test(e.name) && ie.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }
    ,
    ce.readyException = function(e) {
        ie.setTimeout(function() {
            throw e
        })
    }
    ;
    var O = ce.Deferred();
    function P() {
        C.removeEventListener("DOMContentLoaded", P),
        ie.removeEventListener("load", P),
        ce.ready()
    }
    ce.fn.ready = function(e) {
        return O.then(e)["catch"](function(e) {
            ce.readyException(e)
        }),
        this
    }
    ,
    ce.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --ce.readyWait : ce.isReady) || (ce.isReady = !0) !== e && 0 < --ce.readyWait || O.resolveWith(C, [ce])
        }
    }),
    ce.ready.then = O.then,
    "complete" === C.readyState || "loading" !== C.readyState && !C.documentElement.doScroll ? ie.setTimeout(ce.ready) : (C.addEventListener("DOMContentLoaded", P),
    ie.addEventListener("load", P));
    var M = function(e, t, n, r, i, o, a) {
        var s = 0
          , u = e.length
          , l = null == n;
        if ("object" === x(n))
            for (s in i = !0,
            n)
                M(e, t, s, n[s], !0, o, a);
        else if (void 0 !== r && (i = !0,
        v(r) || (a = !0),
        l && (a ? (t.call(e, r),
        t = null) : (l = t,
        t = function(e, t, n) {
            return l.call(ce(e), n)
        }
        )),
        t))
            for (; s < u; s++)
                t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    }
      , R = /^-ms-/
      , I = /-([a-z])/g;
    function W(e, t) {
        return t.toUpperCase()
    }
    function F(e) {
        return e.replace(R, "ms-").replace(I, W)
    }
    var $ = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    function B() {
        this.expando = ce.expando + B.uid++
    }
    B.uid = 1,
    B.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            $(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t)
                i[F(t)] = n;
            else
                for (r in t)
                    i[F(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][F(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(F) : (t = F(t))in r ? [t] : t.match(D) || []).length;
                    while (n--)
                        delete r[t[n]]
                }
                (void 0 === t || ce.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !ce.isEmptyObject(t)
        }
    };
    var _ = new B
      , z = new B
      , X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , U = /[A-Z]/g;
    function V(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(U, "-$&").toLowerCase(),
            "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : X.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                z.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    ce.extend({
        hasData: function(e) {
            return z.hasData(e) || _.hasData(e)
        },
        data: function(e, t, n) {
            return z.access(e, t, n)
        },
        removeData: function(e, t) {
            z.remove(e, t)
        },
        _data: function(e, t, n) {
            return _.access(e, t, n)
        },
        _removeData: function(e, t) {
            _.remove(e, t)
        }
    }),
    ce.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0], a = o && o.attributes;
            if (void 0 === n) {
                if (this.length && (i = z.get(o),
                1 === o.nodeType && !_.get(o, "hasDataAttrs"))) {
                    t = a.length;
                    while (t--)
                        a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = F(r.slice(5)),
                        V(o, r, i[r]));
                    _.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof n ? this.each(function() {
                z.set(this, n)
            }) : M(this, function(e) {
                var t;
                if (o && void 0 === e)
                    return void 0 !== (t = z.get(o, n)) ? t : void 0 !== (t = V(o, n)) ? t : void 0;
                this.each(function() {
                    z.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                z.remove(this, e)
            })
        }
    }),
    ce.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = _.get(e, t),
                n && (!r || Array.isArray(n) ? r = _.access(e, t, ce.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ce.queue(e, t)
              , r = n.length
              , i = n.shift()
              , o = ce._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, function() {
                ce.dequeue(e, t)
            }, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return _.get(e, n) || _.access(e, n, {
                empty: ce.Callbacks("once memory").add(function() {
                    _.remove(e, [t + "queue", n])
                })
            })
        }
    }),
    ce.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t,
            t = "fx",
            e--),
            arguments.length < e ? ce.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = ce.queue(this, t, n);
                ce._queueHooks(this, t),
                "fx" === t && "inprogress" !== e[0] && ce.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ce.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1, i = ce.Deferred(), o = this, a = this.length, s = function() {
                --r || i.resolveWith(o, [o])
            };
            "string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx";
            while (a--)
                (n = _.get(o[a], e + "queueHooks")) && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var G = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , Y = new RegExp("^(?:([+-])=|)(" + G + ")([a-z%]*)$","i")
      , Q = ["Top", "Right", "Bottom", "Left"]
      , J = C.documentElement
      , K = function(e) {
        return ce.contains(e.ownerDocument, e)
    }
      , Z = {
        composed: !0
    };
    J.getRootNode && (K = function(e) {
        return ce.contains(e.ownerDocument, e) || e.getRootNode(Z) === e.ownerDocument
    }
    );
    var ee = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && K(e) && "none" === ce.css(e, "display")
    };
    function te(e, t, n, r) {
        var i, o, a = 20, s = r ? function() {
            return r.cur()
        }
        : function() {
            return ce.css(e, t, "")
        }
        , u = s(), l = n && n[3] || (ce.cssNumber[t] ? "" : "px"), c = e.nodeType && (ce.cssNumber[t] || "px" !== l && +u) && Y.exec(ce.css(e, t));
        if (c && c[3] !== l) {
            u /= 2,
            l = l || c[3],
            c = +u || 1;
            while (a--)
                ce.style(e, t, c + l),
                (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0),
                c /= o;
            c *= 2,
            ce.style(e, t, c + l),
            n = n || []
        }
        return n && (c = +c || +u || 0,
        i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = l,
        r.start = c,
        r.end = i)),
        i
    }
    var ne = {};
    function re(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
            (r = e[c]).style && (n = r.style.display,
            t ? ("none" === n && (l[c] = _.get(r, "display") || null,
            l[c] || (r.style.display = "")),
            "" === r.style.display && ee(r) && (l[c] = (u = a = o = void 0,
            a = (i = r).ownerDocument,
            s = i.nodeName,
            (u = ne[s]) || (o = a.body.appendChild(a.createElement(s)),
            u = ce.css(o, "display"),
            o.parentNode.removeChild(o),
            "none" === u && (u = "block"),
            ne[s] = u)))) : "none" !== n && (l[c] = "none",
            _.set(r, "display", n)));
        for (c = 0; c < f; c++)
            null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    ce.fn.extend({
        show: function() {
            return re(this, !0)
        },
        hide: function() {
            return re(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ee(this) ? ce(this).show() : ce(this).hide()
            })
        }
    });
    var xe, be, we = /^(?:checkbox|radio)$/i, Te = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Ce = /^$|^module$|\/(?:java|ecma)script/i;
    xe = C.createDocumentFragment().appendChild(C.createElement("div")),
    (be = C.createElement("input")).setAttribute("type", "radio"),
    be.setAttribute("checked", "checked"),
    be.setAttribute("name", "t"),
    xe.appendChild(be),
    le.checkClone = xe.cloneNode(!0).cloneNode(!0).lastChild.checked,
    xe.innerHTML = "<textarea>x</textarea>",
    le.noCloneChecked = !!xe.cloneNode(!0).lastChild.defaultValue,
    xe.innerHTML = "<option></option>",
    le.option = !!xe.lastChild;
    var ke = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function Se(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && fe(e, t) ? ce.merge([e], n) : n
    }
    function Ee(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            _.set(e[n], "globalEval", !t || _.get(t[n], "globalEval"))
    }
    ke.tbody = ke.tfoot = ke.colgroup = ke.caption = ke.thead,
    ke.th = ke.td,
    le.option || (ke.optgroup = ke.option = [1, "<select multiple='multiple'>", "</select>"]);
    var je = /<|&#?\w+;/;
    function Ae(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === x(o))
                    ce.merge(p, o.nodeType ? [o] : o);
                else if (je.test(o)) {
                    a = a || f.appendChild(t.createElement("div")),
                    s = (Te.exec(o) || ["", ""])[1].toLowerCase(),
                    u = ke[s] || ke._default,
                    a.innerHTML = u[1] + ce.htmlPrefilter(o) + u[2],
                    c = u[0];
                    while (c--)
                        a = a.lastChild;
                    ce.merge(p, a.childNodes),
                    (a = f.firstChild).textContent = ""
                } else
                    p.push(t.createTextNode(o));
        f.textContent = "",
        d = 0;
        while (o = p[d++])
            if (r && -1 < ce.inArray(o, r))
                i && i.push(o);
            else if (l = K(o),
            a = Se(f.appendChild(o), "script"),
            l && Ee(a),
            n) {
                c = 0;
                while (o = a[c++])
                    Ce.test(o.type || "") && n.push(o)
            }
        return f
    }
    var De = /^([^.]*)(?:\.(.+)|)/;
    function Ne() {
        return !0
    }
    function qe() {
        return !1
    }
    function Le(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n,
            n = void 0),
            t)
                Le(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
        r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
        r = void 0) : (i = r,
        r = n,
        n = void 0)),
        !1 === i)
            i = qe;
        else if (!i)
            return e;
        return 1 === o && (a = i,
        (i = function(e) {
            return ce().off(e),
            a.apply(this, arguments)
        }
        ).guid = a.guid || (a.guid = ce.guid++)),
        e.each(function() {
            ce.event.add(this, t, i, r, n)
        })
    }
    function He(e, r, t) {
        t ? (_.set(e, r, !1),
        ce.event.add(e, r, {
            namespace: !1,
            handler: function(e) {
                var t, n = _.get(this, r);
                if (1 & e.isTrigger && this[r]) {
                    if (n)
                        (ce.event.special[r] || {}).delegateType && e.stopPropagation();
                    else if (n = ae.call(arguments),
                    _.set(this, r, n),
                    this[r](),
                    t = _.get(this, r),
                    _.set(this, r, !1),
                    n !== t)
                        return e.stopImmediatePropagation(),
                        e.preventDefault(),
                        t
                } else
                    n && (_.set(this, r, ce.event.trigger(n[0], n.slice(1), this)),
                    e.stopPropagation(),
                    e.isImmediatePropagationStopped = Ne)
            }
        })) : void 0 === _.get(e, r) && ce.event.add(e, r, Ne)
    }
    ce.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = _.get(t);
            if ($(t)) {
                n.handler && (n = (o = n).handler,
                i = o.selector),
                i && ce.find.matchesSelector(J, i),
                n.guid || (n.guid = ce.guid++),
                (u = v.events) || (u = v.events = Object.create(null)),
                (a = v.handle) || (a = v.handle = function(e) {
                    return "undefined" != typeof ce && ce.event.triggered !== e.type ? ce.event.dispatch.apply(t, arguments) : void 0
                }
                ),
                l = (e = (e || "").match(D) || [""]).length;
                while (l--)
                    d = g = (s = De.exec(e[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d && (f = ce.event.special[d] || {},
                    d = (i ? f.delegateType : f.bindType) || d,
                    f = ce.event.special[d] || {},
                    c = ce.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && ce.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o),
                    (p = u[d]) || ((p = u[d] = []).delegateCount = 0,
                    f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)),
                    f.add && (f.add.call(t, c),
                    c.handler.guid || (c.handler.guid = n.guid)),
                    i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    ce.event.global[d] = !0)
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = _.hasData(e) && _.get(e);
            if (v && (u = v.events)) {
                l = (t = (t || "").match(D) || [""]).length;
                while (l--)
                    if (d = g = (s = De.exec(t[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d) {
                        f = ce.event.special[d] || {},
                        p = u[d = (r ? f.delegateType : f.bindType) || d] || [],
                        s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        a = o = p.length;
                        while (o--)
                            c = p[o],
                            !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1),
                            c.selector && p.delegateCount--,
                            f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || ce.removeEvent(e, d, v.handle),
                        delete u[d])
                    } else
                        for (d in u)
                            ce.event.remove(e, d + t[l], n, r, !0);
                ce.isEmptyObject(u) && _.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = new Array(arguments.length), u = ce.event.fix(e), l = (_.get(this, "events") || Object.create(null))[u.type] || [], c = ce.event.special[u.type] || {};
            for (s[0] = u,
            t = 1; t < arguments.length; t++)
                s[t] = arguments[t];
            if (u.delegateTarget = this,
            !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                a = ce.event.handlers.call(this, u, l),
                t = 0;
                while ((i = a[t++]) && !u.isPropagationStopped()) {
                    u.currentTarget = i.elem,
                    n = 0;
                    while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped())
                        u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o,
                        u.data = o.data,
                        void 0 !== (r = ((ce.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(),
                        u.stopPropagation()))
                }
                return c.postDispatch && c.postDispatch.call(this, u),
                u.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [],
                        a = {},
                        n = 0; n < u; n++)
                            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < ce(i, this).index(l) : ce.find(i, this, null, [l]).length),
                            a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return l = this,
            u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }),
            s
        },
        addProp: function(t, e) {
            Object.defineProperty(ce.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: v(e) ? function() {
                    if (this.originalEvent)
                        return e(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[t]
                }
                ,
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[ce.expando] ? e : new ce.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return we.test(t.type) && t.click && fe(t, "input") && He(t, "click", !0),
                    !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return we.test(t.type) && t.click && fe(t, "input") && He(t, "click"),
                    !0
                },
                _default: function(e) {
                    var t = e.target;
                    return we.test(t.type) && t.click && fe(t, "input") && _.get(t, "click") || fe(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    ce.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    ce.Event = function(e, t) {
        if (!(this instanceof ce.Event))
            return new ce.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ne : qe,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && ce.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[ce.expando] = !0
    }
    ,
    ce.Event.prototype = {
        constructor: ce.Event,
        isDefaultPrevented: qe,
        isPropagationStopped: qe,
        isImmediatePropagationStopped: qe,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ne,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ne,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ne,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    ce.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
    }, ce.event.addProp),
    ce.each({
        focus: "focusin",
        blur: "focusout"
    }, function(r, i) {
        function o(e) {
            if (C.documentMode) {
                var t = _.get(this, "handle")
                  , n = ce.event.fix(e);
                n.type = "focusin" === e.type ? "focus" : "blur",
                n.isSimulated = !0,
                t(e),
                n.target === n.currentTarget && t(n)
            } else
                ce.event.simulate(i, e.target, ce.event.fix(e))
        }
        ce.event.special[r] = {
            setup: function() {
                var e;
                if (He(this, r, !0),
                !C.documentMode)
                    return !1;
                (e = _.get(this, i)) || this.addEventListener(i, o),
                _.set(this, i, (e || 0) + 1)
            },
            trigger: function() {
                return He(this, r),
                !0
            },
            teardown: function() {
                var e;
                if (!C.documentMode)
                    return !1;
                (e = _.get(this, i) - 1) ? _.set(this, i, e) : (this.removeEventListener(i, o),
                _.remove(this, i))
            },
            _default: function(e) {
                return _.get(e.target, r)
            },
            delegateType: i
        },
        ce.event.special[i] = {
            setup: function() {
                var e = this.ownerDocument || this.document || this
                  , t = C.documentMode ? this : e
                  , n = _.get(t, i);
                n || (C.documentMode ? this.addEventListener(i, o) : e.addEventListener(r, o, !0)),
                _.set(t, i, (n || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this.document || this
                  , t = C.documentMode ? this : e
                  , n = _.get(t, i) - 1;
                n ? _.set(t, i, n) : (C.documentMode ? this.removeEventListener(i, o) : e.removeEventListener(r, o, !0),
                _.remove(t, i))
            }
        }
    }),
    ce.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        ce.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget, r = e.handleObj;
                return n && (n === this || ce.contains(this, n)) || (e.type = r.origType,
                t = r.handler.apply(this, arguments),
                e.type = i),
                t
            }
        }
    }),
    ce.fn.extend({
        on: function(e, t, n, r) {
            return Le(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Le(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                ce(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" == typeof e) {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t,
            t = void 0),
            !1 === n && (n = qe),
            this.each(function() {
                ce.event.remove(this, e, n, t)
            })
        }
    });
    var Oe = /<script|<style|<link/i
      , Pe = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Me = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function Re(e, t) {
        return fe(e, "table") && fe(11 !== t.nodeType ? t : t.firstChild, "tr") && ce(e).children("tbody")[0] || e
    }
    function Ie(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function We(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
        e
    }
    function Fe(e, t) {
        var n, r, i, o, a, s;
        if (1 === t.nodeType) {
            if (_.hasData(e) && (s = _.get(e).events))
                for (i in _.remove(t, "handle events"),
                s)
                    for (n = 0,
                    r = s[i].length; n < r; n++)
                        ce.event.add(t, i, s[i][n]);
            z.hasData(e) && (o = z.access(e),
            a = ce.extend({}, o),
            z.set(t, a))
        }
    }
    function $e(n, r, i, o) {
        r = g(r);
        var e, t, a, s, u, l, c = 0, f = n.length, p = f - 1, d = r[0], h = v(d);
        if (h || 1 < f && "string" == typeof d && !le.checkClone && Pe.test(d))
            return n.each(function(e) {
                var t = n.eq(e);
                h && (r[0] = d.call(this, e, t.html())),
                $e(t, r, i, o)
            });
        if (f && (t = (e = Ae(r, n[0].ownerDocument, !1, n, o)).firstChild,
        1 === e.childNodes.length && (e = t),
        t || o)) {
            for (s = (a = ce.map(Se(e, "script"), Ie)).length; c < f; c++)
                u = e,
                c !== p && (u = ce.clone(u, !0, !0),
                s && ce.merge(a, Se(u, "script"))),
                i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument,
                ce.map(a, We),
                c = 0; c < s; c++)
                    u = a[c],
                    Ce.test(u.type || "") && !_.access(u, "globalEval") && ce.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? ce._evalUrl && !u.noModule && ce._evalUrl(u.src, {
                        nonce: u.nonce || u.getAttribute("nonce")
                    }, l) : m(u.textContent.replace(Me, ""), u, l))
        }
        return n
    }
    function Be(e, t, n) {
        for (var r, i = t ? ce.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || ce.cleanData(Se(r)),
            r.parentNode && (n && K(r) && Ee(Se(r, "script")),
            r.parentNode.removeChild(r));
        return e
    }
    ce.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = K(e);
            if (!(le.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ce.isXMLDoc(e)))
                for (a = Se(c),
                r = 0,
                i = (o = Se(e)).length; r < i; r++)
                    s = o[r],
                    u = a[r],
                    void 0,
                    "input" === (l = u.nodeName.toLowerCase()) && we.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || Se(e),
                    a = a || Se(c),
                    r = 0,
                    i = o.length; r < i; r++)
                        Fe(o[r], a[r]);
                else
                    Fe(e, c);
            return 0 < (a = Se(c, "script")).length && Ee(a, !f && Se(e, "script")),
            c
        },
        cleanData: function(e) {
            for (var t, n, r, i = ce.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if ($(n)) {
                    if (t = n[_.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? ce.event.remove(n, r) : ce.removeEvent(n, r, t.handle);
                        n[_.expando] = void 0
                    }
                    n[z.expando] && (n[z.expando] = void 0)
                }
        }
    }),
    ce.fn.extend({
        detach: function(e) {
            return Be(this, e, !0)
        },
        remove: function(e) {
            return Be(this, e)
        },
        text: function(e) {
            return M(this, function(e) {
                return void 0 === e ? ce.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return $e(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Re(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return $e(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Re(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return $e(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return $e(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (ce.cleanData(Se(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return ce.clone(this, e, t)
            })
        },
        html: function(e) {
            return M(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !Oe.test(e) && !ke[(Te.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = ce.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            1 === (t = this[n] || {}).nodeType && (ce.cleanData(Se(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return $e(this, arguments, function(e) {
                var t = this.parentNode;
                ce.inArray(this, n) < 0 && (ce.cleanData(Se(this)),
                t && t.replaceChild(e, this))
            }, n)
        }
    }),
    ce.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        ce.fn[e] = function(e) {
            for (var t, n = [], r = ce(e), i = r.length - 1, o = 0; o <= i; o++)
                t = o === i ? this : this.clone(!0),
                ce(r[o])[a](t),
                s.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var _e = new RegExp("^(" + G + ")(?!px)[a-z%]+$","i")
      , ze = /^--/
      , Xe = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = ie),
        t.getComputedStyle(e)
    }
      , Ue = function(e, t, n) {
        var r, i, o = {};
        for (i in t)
            o[i] = e.style[i],
            e.style[i] = t[i];
        for (i in r = n.call(e),
        t)
            e.style[i] = o[i];
        return r
    }
      , Ve = new RegExp(Q.join("|"),"i");
    function Ge(e, t, n) {
        var r, i, o, a, s = ze.test(t), u = e.style;
        return (n = n || Xe(e)) && (a = n.getPropertyValue(t) || n[t],
        s && a && (a = a.replace(ve, "$1") || void 0),
        "" !== a || K(e) || (a = ce.style(e, t)),
        !le.pixelBoxStyles() && _e.test(a) && Ve.test(t) && (r = u.width,
        i = u.minWidth,
        o = u.maxWidth,
        u.minWidth = u.maxWidth = u.width = a,
        a = n.width,
        u.width = r,
        u.minWidth = i,
        u.maxWidth = o)),
        void 0 !== a ? a + "" : a
    }
    function Ye(e, t) {
        return {
            get: function() {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    !function() {
        function e() {
            if (l) {
                u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                J.appendChild(u).appendChild(l);
                var e = ie.getComputedStyle(l);
                n = "1%" !== e.top,
                s = 12 === t(e.marginLeft),
                l.style.right = "60%",
                o = 36 === t(e.right),
                r = 36 === t(e.width),
                l.style.position = "absolute",
                i = 12 === t(l.offsetWidth / 3),
                J.removeChild(u),
                l = null
            }
        }
        function t(e) {
            return Math.round(parseFloat(e))
        }
        var n, r, i, o, a, s, u = C.createElement("div"), l = C.createElement("div");
        l.style && (l.style.backgroundClip = "content-box",
        l.cloneNode(!0).style.backgroundClip = "",
        le.clearCloneStyle = "content-box" === l.style.backgroundClip,
        ce.extend(le, {
            boxSizingReliable: function() {
                return e(),
                r
            },
            pixelBoxStyles: function() {
                return e(),
                o
            },
            pixelPosition: function() {
                return e(),
                n
            },
            reliableMarginLeft: function() {
                return e(),
                s
            },
            scrollboxSize: function() {
                return e(),
                i
            },
            reliableTrDimensions: function() {
                var e, t, n, r;
                return null == a && (e = C.createElement("table"),
                t = C.createElement("tr"),
                n = C.createElement("div"),
                e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                t.style.cssText = "box-sizing:content-box;border:1px solid",
                t.style.height = "1px",
                n.style.height = "9px",
                n.style.display = "block",
                J.appendChild(e).appendChild(t).appendChild(n),
                r = ie.getComputedStyle(t),
                a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight,
                J.removeChild(e)),
                a
            }
        }))
    }();
    var Qe = ["Webkit", "Moz", "ms"]
      , Je = C.createElement("div").style
      , Ke = {};
    function Ze(e) {
        var t = ce.cssProps[e] || Ke[e];
        return t || (e in Je ? e : Ke[e] = function(e) {
            var t = e[0].toUpperCase() + e.slice(1)
              , n = Qe.length;
            while (n--)
                if ((e = Qe[n] + t)in Je)
                    return e
        }(e) || e)
    }
    var et = /^(none|table(?!-c[ea]).+)/
      , tt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , nt = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function rt(e, t, n) {
        var r = Y.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function it(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0
          , s = 0
          , u = 0
          , l = 0;
        if (n === (r ? "border" : "content"))
            return 0;
        for (; a < 4; a += 2)
            "margin" === n && (l += ce.css(e, n + Q[a], !0, i)),
            r ? ("content" === n && (u -= ce.css(e, "padding" + Q[a], !0, i)),
            "margin" !== n && (u -= ce.css(e, "border" + Q[a] + "Width", !0, i))) : (u += ce.css(e, "padding" + Q[a], !0, i),
            "padding" !== n ? u += ce.css(e, "border" + Q[a] + "Width", !0, i) : s += ce.css(e, "border" + Q[a] + "Width", !0, i));
        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0),
        u + l
    }
    function ot(e, t, n) {
        var r = Xe(e)
          , i = (!le.boxSizingReliable() || n) && "border-box" === ce.css(e, "boxSizing", !1, r)
          , o = i
          , a = Ge(e, t, r)
          , s = "offset" + t[0].toUpperCase() + t.slice(1);
        if (_e.test(a)) {
            if (!n)
                return a;
            a = "auto"
        }
        return (!le.boxSizingReliable() && i || !le.reliableTrDimensions() && fe(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === ce.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === ce.css(e, "boxSizing", !1, r),
        (o = s in e) && (a = e[s])),
        (a = parseFloat(a) || 0) + it(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
    }
    function at(e, t, n, r, i) {
        return new at.prototype.init(e,t,n,r,i)
    }
    ce.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Ge(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageSlice: !0,
            columnCount: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            scale: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = F(t), u = ze.test(t), l = e.style;
                if (u || (t = Ze(s)),
                a = ce.cssHooks[t] || ce.cssHooks[s],
                void 0 === n)
                    return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" === (o = typeof n) && (i = Y.exec(n)) && i[1] && (n = te(e, t, i),
                o = "number"),
                null != n && n == n && ("number" !== o || u || (n += i && i[3] || (ce.cssNumber[s] ? "" : "px")),
                le.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                a && "set"in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = F(t);
            return ze.test(t) || (t = Ze(s)),
            (a = ce.cssHooks[t] || ce.cssHooks[s]) && "get"in a && (i = a.get(e, !0, n)),
            void 0 === i && (i = Ge(e, t, r)),
            "normal" === i && t in nt && (i = nt[t]),
            "" === n || n ? (o = parseFloat(i),
            !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }),
    ce.each(["height", "width"], function(e, u) {
        ce.cssHooks[u] = {
            get: function(e, t, n) {
                if (t)
                    return !et.test(ce.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? ot(e, u, n) : Ue(e, tt, function() {
                        return ot(e, u, n)
                    })
            },
            set: function(e, t, n) {
                var r, i = Xe(e), o = !le.scrollboxSize() && "absolute" === i.position, a = (o || n) && "border-box" === ce.css(e, "boxSizing", !1, i), s = n ? it(e, u, n, a, i) : 0;
                return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - it(e, u, "border", !1, i) - .5)),
                s && (r = Y.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t,
                t = ce.css(e, u)),
                rt(0, t, s)
            }
        }
    }),
    ce.cssHooks.marginLeft = Ye(le.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(Ge(e, "marginLeft")) || e.getBoundingClientRect().left - Ue(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
    }),
    ce.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        ce.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)
                    n[i + Q[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        },
        "margin" !== i && (ce.cssHooks[i + o].set = rt)
    }),
    ce.fn.extend({
        css: function(e, t) {
            return M(this, function(e, t, n) {
                var r, i, o = {}, a = 0;
                if (Array.isArray(t)) {
                    for (r = Xe(e),
                    i = t.length; a < i; a++)
                        o[t[a]] = ce.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? ce.style(e, t, n) : ce.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }),
    ((ce.Tween = at).prototype = {
        constructor: at,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || ce.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (ce.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = at.propHooks[this.prop];
            return e && e.get ? e.get(this) : at.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = at.propHooks[this.prop];
            return this.options.duration ? this.pos = t = ce.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : at.propHooks._default.set(this),
            this
        }
    }).init.prototype = at.prototype,
    (at.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ce.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                ce.fx.step[e.prop] ? ce.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !ce.cssHooks[e.prop] && null == e.elem.style[Ze(e.prop)] ? e.elem[e.prop] = e.now : ce.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = at.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    ce.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    ce.fx = at.prototype.init,
    ce.fx.step = {};
    var st, ut, lt, ct, ft = /^(?:toggle|show|hide)$/, pt = /queueHooks$/;
    function dt() {
        ut && (!1 === C.hidden && ie.requestAnimationFrame ? ie.requestAnimationFrame(dt) : ie.setTimeout(dt, ce.fx.interval),
        ce.fx.tick())
    }
    function ht() {
        return ie.setTimeout(function() {
            st = void 0
        }),
        st = Date.now()
    }
    function gt(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = Q[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function vt(e, t, n) {
        for (var r, i = (yt.tweeners[t] || []).concat(yt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function yt(o, e, t) {
        var n, a, r = 0, i = yt.prefilters.length, s = ce.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (a)
                return !1;
            for (var e = st || ht(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++)
                l.tweens[r].run(n);
            return s.notifyWith(o, [l, n, t]),
            n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]),
            s.resolveWith(o, [l]),
            !1)
        }, l = s.promise({
            elem: o,
            props: ce.extend({}, e),
            opts: ce.extend(!0, {
                specialEasing: {},
                easing: ce.easing._default
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: st || ht(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var n = ce.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                return l.tweens.push(n),
                n
            },
            stop: function(e) {
                var t = 0
                  , n = e ? l.tweens.length : 0;
                if (a)
                    return this;
                for (a = !0; t < n; t++)
                    l.tweens[t].run(1);
                return e ? (s.notifyWith(o, [l, 1, 0]),
                s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]),
                this
            }
        }), c = l.props;
        for (!function(e, t) {
            var n, r, i, o, a;
            for (n in e)
                if (i = t[r = F(n)],
                o = e[n],
                Array.isArray(o) && (i = o[1],
                o = e[n] = o[0]),
                n !== r && (e[r] = o,
                delete e[n]),
                (a = ce.cssHooks[r]) && "expand"in a)
                    for (n in o = a.expand(o),
                    delete e[r],
                    o)
                        n in e || (e[n] = o[n],
                        t[n] = i);
                else
                    t[r] = i
        }(c, l.opts.specialEasing); r < i; r++)
            if (n = yt.prefilters[r].call(l, o, c, l.opts))
                return v(n.stop) && (ce._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
                n;
        return ce.map(c, vt, l),
        v(l.opts.start) && l.opts.start.call(o, l),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
        ce.fx.timer(ce.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })),
        l
    }
    ce.Animation = ce.extend(yt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return te(n.elem, e, Y.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            v(e) ? (t = e,
            e = ["*"]) : e = e.match(D);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r],
                yt.tweeners[n] = yt.tweeners[n] || [],
                yt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width"in t || "height"in t, p = this, d = {}, h = e.style, g = e.nodeType && ee(e), v = _.get(e, "fxshow");
            for (r in n.queue || (null == (a = ce._queueHooks(e, "fx")).unqueued && (a.unqueued = 0,
            s = a.empty.fire,
            a.empty.fire = function() {
                a.unqueued || s()
            }
            ),
            a.unqueued++,
            p.always(function() {
                p.always(function() {
                    a.unqueued--,
                    ce.queue(e, "fx").length || a.empty.fire()
                })
            })),
            t)
                if (i = t[r],
                ft.test(i)) {
                    if (delete t[r],
                    o = o || "toggle" === i,
                    i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r])
                            continue;
                        g = !0
                    }
                    d[r] = v && v[r] || ce.style(e, r)
                }
            if ((u = !ce.isEmptyObject(t)) || !ce.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
                null == (l = v && v.display) && (l = _.get(e, "display")),
                "none" === (c = ce.css(e, "display")) && (l ? c = l : (re([e], !0),
                l = e.style.display || l,
                c = ce.css(e, "display"),
                re([e]))),
                ("inline" === c || "inline-block" === c && null != l) && "none" === ce.css(e, "float") && (u || (p.done(function() {
                    h.display = l
                }),
                null == l && (c = h.display,
                l = "none" === c ? "" : c)),
                h.display = "inline-block")),
                n.overflow && (h.overflow = "hidden",
                p.always(function() {
                    h.overflow = n.overflow[0],
                    h.overflowX = n.overflow[1],
                    h.overflowY = n.overflow[2]
                })),
                u = !1,
                d)
                    u || (v ? "hidden"in v && (g = v.hidden) : v = _.access(e, "fxshow", {
                        display: l
                    }),
                    o && (v.hidden = !g),
                    g && re([e], !0),
                    p.done(function() {
                        for (r in g || re([e]),
                        _.remove(e, "fxshow"),
                        d)
                            ce.style(e, r, d[r])
                    })),
                    u = vt(g ? v[r] : 0, r, p),
                    r in v || (v[r] = u.start,
                    g && (u.end = u.start,
                    u.start = 0))
        }
        ],
        prefilter: function(e, t) {
            t ? yt.prefilters.unshift(e) : yt.prefilters.push(e)
        }
    }),
    ce.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? ce.extend({}, e) : {
            complete: n || !n && t || v(e) && e,
            duration: e,
            easing: n && t || t && !v(t) && t
        };
        return ce.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in ce.fx.speeds ? r.duration = ce.fx.speeds[r.duration] : r.duration = ce.fx.speeds._default),
        null != r.queue && !0 !== r.queue || (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            v(r.old) && r.old.call(this),
            r.queue && ce.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    ce.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ee).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            var i = ce.isEmptyObject(t)
              , o = ce.speed(e, n, r)
              , a = function() {
                var e = yt(this, ce.extend({}, t), o);
                (i || _.get(this, "finish")) && e.stop(!0)
            };
            return a.finish = a,
            i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(i, e, o) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop,
                t(o)
            };
            return "string" != typeof i && (o = e,
            e = i,
            i = void 0),
            e && this.queue(i || "fx", []),
            this.each(function() {
                var e = !0
                  , t = null != i && i + "queueHooks"
                  , n = ce.timers
                  , r = _.get(this);
                if (t)
                    r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r)
                        r[t] && r[t].stop && pt.test(t) && a(r[t]);
                for (t = n.length; t--; )
                    n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o),
                    e = !1,
                    n.splice(t, 1));
                !e && o || ce.dequeue(this, i)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"),
            this.each(function() {
                var e, t = _.get(this), n = t[a + "queue"], r = t[a + "queueHooks"], i = ce.timers, o = n ? n.length : 0;
                for (t.finish = !0,
                ce.queue(this, a, []),
                r && r.stop && r.stop.call(this, !0),
                e = i.length; e--; )
                    i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0),
                    i.splice(e, 1));
                for (e = 0; e < o; e++)
                    n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }),
    ce.each(["toggle", "show", "hide"], function(e, r) {
        var i = ce.fn[r];
        ce.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(gt(r, !0), e, t, n)
        }
    }),
    ce.each({
        slideDown: gt("show"),
        slideUp: gt("hide"),
        slideToggle: gt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        ce.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }),
    ce.timers = [],
    ce.fx.tick = function() {
        var e, t = 0, n = ce.timers;
        for (st = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || ce.fx.stop(),
        st = void 0
    }
    ,
    ce.fx.timer = function(e) {
        ce.timers.push(e),
        ce.fx.start()
    }
    ,
    ce.fx.interval = 13,
    ce.fx.start = function() {
        ut || (ut = !0,
        dt())
    }
    ,
    ce.fx.stop = function() {
        ut = null
    }
    ,
    ce.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    ce.fn.delay = function(r, e) {
        return r = ce.fx && ce.fx.speeds[r] || r,
        e = e || "fx",
        this.queue(e, function(e, t) {
            var n = ie.setTimeout(e, r);
            t.stop = function() {
                ie.clearTimeout(n)
            }
        })
    }
    ,
    lt = C.createElement("input"),
    ct = C.createElement("select").appendChild(C.createElement("option")),
    lt.type = "checkbox",
    le.checkOn = "" !== lt.value,
    le.optSelected = ct.selected,
    (lt = C.createElement("input")).value = "t",
    lt.type = "radio",
    le.radioValue = "t" === lt.value;
    var mt, xt = ce.expr.attrHandle;
    ce.fn.extend({
        attr: function(e, t) {
            return M(this, ce.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ce.removeAttr(this, e)
            })
        }
    }),
    ce.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return "undefined" == typeof e.getAttribute ? ce.prop(e, t, n) : (1 === o && ce.isXMLDoc(e) || (i = ce.attrHooks[t.toLowerCase()] || (ce.expr.match.bool.test(t) ? mt : void 0)),
                void 0 !== n ? null === n ? void ce.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : null == (r = ce.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!le.radioValue && "radio" === t && fe(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0, i = t && t.match(D);
            if (i && 1 === e.nodeType)
                while (n = i[r++])
                    e.removeAttribute(n)
        }
    }),
    mt = {
        set: function(e, t, n) {
            return !1 === t ? ce.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    ce.each(ce.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = xt[t] || ce.find.attr;
        xt[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = xt[o],
            xt[o] = r,
            r = null != a(e, t, n) ? o : null,
            xt[o] = i),
            r
        }
    });
    var bt = /^(?:input|select|textarea|button)$/i
      , wt = /^(?:a|area)$/i;
    function Tt(e) {
        return (e.match(D) || []).join(" ")
    }
    function Ct(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function kt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(D) || []
    }
    ce.fn.extend({
        prop: function(e, t) {
            return M(this, ce.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[ce.propFix[e] || e]
            })
        }
    }),
    ce.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && ce.isXMLDoc(e) || (t = ce.propFix[t] || t,
                i = ce.propHooks[t]),
                void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ce.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : bt.test(e.nodeName) || wt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    le.optSelected || (ce.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    ce.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ce.propFix[this.toLowerCase()] = this
    }),
    ce.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a;
            return v(t) ? this.each(function(e) {
                ce(this).addClass(t.call(this, e, Ct(this)))
            }) : (e = kt(t)).length ? this.each(function() {
                if (r = Ct(this),
                n = 1 === this.nodeType && " " + Tt(r) + " ") {
                    for (o = 0; o < e.length; o++)
                        i = e[o],
                        n.indexOf(" " + i + " ") < 0 && (n += i + " ");
                    a = Tt(n),
                    r !== a && this.setAttribute("class", a)
                }
            }) : this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a;
            return v(t) ? this.each(function(e) {
                ce(this).removeClass(t.call(this, e, Ct(this)))
            }) : arguments.length ? (e = kt(t)).length ? this.each(function() {
                if (r = Ct(this),
                n = 1 === this.nodeType && " " + Tt(r) + " ") {
                    for (o = 0; o < e.length; o++) {
                        i = e[o];
                        while (-1 < n.indexOf(" " + i + " "))
                            n = n.replace(" " + i + " ", " ")
                    }
                    a = Tt(n),
                    r !== a && this.setAttribute("class", a)
                }
            }) : this : this.attr("class", "")
        },
        toggleClass: function(t, n) {
            var e, r, i, o, a = typeof t, s = "string" === a || Array.isArray(t);
            return v(t) ? this.each(function(e) {
                ce(this).toggleClass(t.call(this, e, Ct(this), n), n)
            }) : "boolean" == typeof n && s ? n ? this.addClass(t) : this.removeClass(t) : (e = kt(t),
            this.each(function() {
                if (s)
                    for (o = ce(this),
                    i = 0; i < e.length; i++)
                        r = e[i],
                        o.hasClass(r) ? o.removeClass(r) : o.addClass(r);
                else
                    void 0 !== t && "boolean" !== a || ((r = Ct(this)) && _.set(this, "__className__", r),
                    this.setAttribute && this.setAttribute("class", r || !1 === t ? "" : _.get(this, "__className__") || ""))
            }))
        },
        hasClass: function(e) {
            var t, n, r = 0;
            t = " " + e + " ";
            while (n = this[r++])
                if (1 === n.nodeType && -1 < (" " + Tt(Ct(n)) + " ").indexOf(t))
                    return !0;
            return !1
        }
    });
    var St = /\r/g;
    ce.fn.extend({
        val: function(n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = v(n),
            this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, ce(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = ce.map(t, function(e) {
                    return null == e ? "" : e + ""
                })),
                (r = ce.valHooks[this.type] || ce.valHooks[this.nodeName.toLowerCase()]) && "set"in r && void 0 !== r.set(this, t, "value") || (this.value = t))
            })) : t ? (r = ce.valHooks[t.type] || ce.valHooks[t.nodeName.toLowerCase()]) && "get"in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(St, "") : null == e ? "" : e : void 0
        }
    }),
    ce.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ce.find.attr(e, "value");
                    return null != t ? t : Tt(ce.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !fe(n.parentNode, "optgroup"))) {
                            if (t = ce(n).val(),
                            a)
                                return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    var n, r, i = e.options, o = ce.makeArray(t), a = i.length;
                    while (a--)
                        ((r = i[a]).selected = -1 < ce.inArray(ce.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    ce.each(["radio", "checkbox"], function() {
        ce.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = -1 < ce.inArray(ce(e).val(), t)
            }
        },
        le.checkOn || (ce.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    });
    var Et = ie.location
      , jt = {
        guid: Date.now()
    }
      , At = /\?/;
    ce.parseXML = function(e) {
        var t, n;
        if (!e || "string" != typeof e)
            return null;
        try {
            t = (new ie.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {}
        return n = t && t.getElementsByTagName("parsererror")[0],
        t && !n || ce.error("Invalid XML: " + (n ? ce.map(n.childNodes, function(e) {
            return e.textContent
        }).join("\n") : e)),
        t
    }
    ;
    var Dt = /^(?:focusinfocus|focusoutblur)$/
      , Nt = function(e) {
        e.stopPropagation()
    };
    ce.extend(ce.event, {
        trigger: function(e, t, n, r) {
            var i, o, a, s, u, l, c, f, p = [n || C], d = ue.call(e, "type") ? e.type : e, h = ue.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = f = a = n = n || C,
            3 !== n.nodeType && 8 !== n.nodeType && !Dt.test(d + ce.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(),
            h.sort()),
            u = d.indexOf(":") < 0 && "on" + d,
            (e = e[ce.expando] ? e : new ce.Event(d,"object" == typeof e && e)).isTrigger = r ? 2 : 3,
            e.namespace = h.join("."),
            e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            e.result = void 0,
            e.target || (e.target = n),
            t = null == t ? [e] : ce.makeArray(t, [e]),
            c = ce.event.special[d] || {},
            r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !y(n)) {
                    for (s = c.delegateType || d,
                    Dt.test(s + d) || (o = o.parentNode); o; o = o.parentNode)
                        p.push(o),
                        a = o;
                    a === (n.ownerDocument || C) && p.push(a.defaultView || a.parentWindow || ie)
                }
                i = 0;
                while ((o = p[i++]) && !e.isPropagationStopped())
                    f = o,
                    e.type = 1 < i ? s : c.bindType || d,
                    (l = (_.get(o, "events") || Object.create(null))[e.type] && _.get(o, "handle")) && l.apply(o, t),
                    (l = u && o[u]) && l.apply && $(o) && (e.result = l.apply(o, t),
                    !1 === e.result && e.preventDefault());
                return e.type = d,
                r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !$(n) || u && v(n[d]) && !y(n) && ((a = n[u]) && (n[u] = null),
                ce.event.triggered = d,
                e.isPropagationStopped() && f.addEventListener(d, Nt),
                n[d](),
                e.isPropagationStopped() && f.removeEventListener(d, Nt),
                ce.event.triggered = void 0,
                a && (n[u] = a)),
                e.result
            }
        },
        simulate: function(e, t, n) {
            var r = ce.extend(new ce.Event, n, {
                type: e,
                isSimulated: !0
            });
            ce.event.trigger(r, null, t)
        }
    }),
    ce.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                ce.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return ce.event.trigger(e, t, n, !0)
        }
    });
    var qt = /\[\]$/
      , Lt = /\r?\n/g
      , Ht = /^(?:submit|button|image|reset|file)$/i
      , Ot = /^(?:input|select|textarea|keygen)/i;
    function Pt(n, e, r, i) {
        var t;
        if (Array.isArray(e))
            ce.each(e, function(e, t) {
                r || qt.test(n) ? i(n, t) : Pt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
            });
        else if (r || "object" !== x(e))
            i(n, e);
        else
            for (t in e)
                Pt(n + "[" + t + "]", e[t], r, i)
    }
    ce.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            var n = v(t) ? t() : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
        if (null == e)
            return "";
        if (Array.isArray(e) || e.jquery && !ce.isPlainObject(e))
            ce.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                Pt(n, e[n], t, i);
        return r.join("&")
    }
    ,
    ce.fn.extend({
        serialize: function() {
            return ce.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ce.prop(this, "elements");
                return e ? ce.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ce(this).is(":disabled") && Ot.test(this.nodeName) && !Ht.test(e) && (this.checked || !we.test(e))
            }).map(function(e, t) {
                var n = ce(this).val();
                return null == n ? null : Array.isArray(n) ? ce.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Lt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Lt, "\r\n")
                }
            }).get()
        }
    });
    var Mt = /%20/g
      , Rt = /#.*$/
      , It = /([?&])_=[^&]*/
      , Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Ft = /^(?:GET|HEAD)$/
      , $t = /^\/\//
      , Bt = {}
      , _t = {}
      , zt = "*/".concat("*")
      , Xt = C.createElement("a");
    function Ut(o) {
        return function(e, t) {
            "string" != typeof e && (t = e,
            e = "*");
            var n, r = 0, i = e.toLowerCase().match(D) || [];
            if (v(t))
                while (n = i[r++])
                    "+" === n[0] ? (n = n.slice(1) || "*",
                    (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }
    function Vt(t, i, o, a) {
        var s = {}
          , u = t === _t;
        function l(e) {
            var r;
            return s[e] = !0,
            ce.each(t[e] || [], function(e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n),
                l(n),
                !1)
            }),
            r
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*")
    }
    function Gt(e, t) {
        var n, r, i = ce.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && ce.extend(!0, e, r),
        e
    }
    Xt.href = Et.href,
    ce.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Et.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": zt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": ce.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Gt(Gt(e, ce.ajaxSettings), t) : Gt(ce.ajaxSettings, e)
        },
        ajaxPrefilter: Ut(Bt),
        ajaxTransport: Ut(_t),
        ajax: function(e, t) {
            "object" == typeof e && (t = e,
            e = void 0),
            t = t || {};
            var c, f, p, n, d, r, h, g, i, o, v = ce.ajaxSetup({}, t), y = v.context || v, m = v.context && (y.nodeType || y.jquery) ? ce(y) : ce.event, x = ce.Deferred(), b = ce.Callbacks("once memory"), w = v.statusCode || {}, a = {}, s = {}, u = "canceled", T = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (h) {
                        if (!n) {
                            n = {};
                            while (t = Wt.exec(p))
                                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2])
                        }
                        t = n[e.toLowerCase() + " "]
                    }
                    return null == t ? null : t.join(", ")
                },
                getAllResponseHeaders: function() {
                    return h ? p : null
                },
                setRequestHeader: function(e, t) {
                    return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e,
                    a[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == h && (v.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (h)
                            T.always(e[T.status]);
                        else
                            for (t in e)
                                w[t] = [w[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || u;
                    return c && c.abort(t),
                    l(0, t),
                    this
                }
            };
            if (x.promise(T),
            v.url = ((e || v.url || Et.href) + "").replace($t, Et.protocol + "//"),
            v.type = t.method || t.type || v.method || v.type,
            v.dataTypes = (v.dataType || "*").toLowerCase().match(D) || [""],
            null == v.crossDomain) {
                r = C.createElement("a");
                try {
                    r.href = v.url,
                    r.href = r.href,
                    v.crossDomain = Xt.protocol + "//" + Xt.host != r.protocol + "//" + r.host
                } catch (e) {
                    v.crossDomain = !0
                }
            }
            if (v.data && v.processData && "string" != typeof v.data && (v.data = ce.param(v.data, v.traditional)),
            Vt(Bt, v, t, T),
            h)
                return T;
            for (i in (g = ce.event && v.global) && 0 == ce.active++ && ce.event.trigger("ajaxStart"),
            v.type = v.type.toUpperCase(),
            v.hasContent = !Ft.test(v.type),
            f = v.url.replace(Rt, ""),
            v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Mt, "+")) : (o = v.url.slice(f.length),
            v.data && (v.processData || "string" == typeof v.data) && (f += (At.test(f) ? "&" : "?") + v.data,
            delete v.data),
            !1 === v.cache && (f = f.replace(It, "$1"),
            o = (At.test(f) ? "&" : "?") + "_=" + jt.guid++ + o),
            v.url = f + o),
            v.ifModified && (ce.lastModified[f] && T.setRequestHeader("If-Modified-Since", ce.lastModified[f]),
            ce.etag[f] && T.setRequestHeader("If-None-Match", ce.etag[f])),
            (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType),
            T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : v.accepts["*"]),
            v.headers)
                T.setRequestHeader(i, v.headers[i]);
            if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
                return T.abort();
            if (u = "abort",
            b.add(v.complete),
            T.done(v.success),
            T.fail(v.error),
            c = Vt(_t, v, t, T)) {
                if (T.readyState = 1,
                g && m.trigger("ajaxSend", [T, v]),
                h)
                    return T;
                v.async && 0 < v.timeout && (d = ie.setTimeout(function() {
                    T.abort("timeout")
                }, v.timeout));
                try {
                    h = !1,
                    c.send(a, l)
                } catch (e) {
                    if (h)
                        throw e;
                    l(-1, e)
                }
            } else
                l(-1, "No Transport");
            function l(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0,
                d && ie.clearTimeout(d),
                c = void 0,
                p = r || "",
                T.readyState = 0 < e ? 4 : 0,
                i = 200 <= e && e < 300 || 304 === e,
                n && (s = function(e, t, n) {
                    var r, i, o, a, s = e.contents, u = e.dataTypes;
                    while ("*" === u[0])
                        u.shift(),
                        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            }
                    if (u[0]in n)
                        o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o)
                        return o !== u[0] && u.unshift(o),
                        n[o]
                }(v, T, n)),
                !i && -1 < ce.inArray("script", v.dataTypes) && ce.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function() {}
                ),
                s = function(e, t, n, r) {
                    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters)
                            l[a.toLowerCase()] = e.converters[a];
                    o = c.shift();
                    while (o)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                        !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                        u = o,
                        o = c.shift())
                            if ("*" === o)
                                o = u;
                            else if ("*" !== u && u !== o) {
                                if (!(a = l[u + " " + o] || l["* " + o]))
                                    for (i in l)
                                        if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                            c.unshift(s[1]));
                                            break
                                        }
                                if (!0 !== a)
                                    if (a && e["throws"])
                                        t = a(t);
                                    else
                                        try {
                                            t = a(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: a ? e : "No conversion from " + u + " to " + o
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(v, s, T, i),
                i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (ce.lastModified[f] = u),
                (u = T.getResponseHeader("etag")) && (ce.etag[f] = u)),
                204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state,
                o = s.data,
                i = !(a = s.error))) : (a = l,
                !e && l || (l = "error",
                e < 0 && (e = 0))),
                T.status = e,
                T.statusText = (t || l) + "",
                i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
                T.statusCode(w),
                w = void 0,
                g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]),
                b.fireWith(y, [T, l]),
                g && (m.trigger("ajaxComplete", [T, v]),
                --ce.active || ce.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return ce.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ce.get(e, void 0, t, "script")
        }
    }),
    ce.each(["get", "post"], function(e, i) {
        ce[i] = function(e, t, n, r) {
            return v(t) && (r = r || n,
            n = t,
            t = void 0),
            ce.ajax(ce.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, ce.isPlainObject(e) && e))
        }
    }),
    ce.ajaxPrefilter(function(e) {
        var t;
        for (t in e.headers)
            "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    }),
    ce._evalUrl = function(e, t, n) {
        return ce.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                ce.globalEval(e, t, n)
            }
        })
    }
    ,
    ce.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (v(e) && (e = e.call(this[0])),
            t = ce(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                var e = this;
                while (e.firstElementChild)
                    e = e.firstElementChild;
                return e
            }).append(this)),
            this
        },
        wrapInner: function(n) {
            return v(n) ? this.each(function(e) {
                ce(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = ce(this)
                  , t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = v(t);
            return this.each(function(e) {
                ce(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                ce(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    ce.expr.pseudos.hidden = function(e) {
        return !ce.expr.pseudos.visible(e)
    }
    ,
    ce.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    ce.ajaxSettings.xhr = function() {
        try {
            return new ie.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Yt = {
        0: 200,
        1223: 204
    }
      , Qt = ce.ajaxSettings.xhr();
    le.cors = !!Qt && "withCredentials"in Qt,
    le.ajax = Qt = !!Qt,
    ce.ajaxTransport(function(i) {
        var o, a;
        if (le.cors || Qt && !i.crossDomain)
            return {
                send: function(e, t) {
                    var n, r = i.xhr();
                    if (r.open(i.type, i.url, i.async, i.username, i.password),
                    i.xhrFields)
                        for (n in i.xhrFields)
                            r[n] = i.xhrFields[n];
                    for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType),
                    i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"),
                    e)
                        r.setRequestHeader(n, e[n]);
                    o = function(e) {
                        return function() {
                            o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null,
                            "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Yt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                binary: r.response
                            } : {
                                text: r.responseText
                            }, r.getAllResponseHeaders()))
                        }
                    }
                    ,
                    r.onload = o(),
                    a = r.onerror = r.ontimeout = o("error"),
                    void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                        4 === r.readyState && ie.setTimeout(function() {
                            o && a()
                        })
                    }
                    ,
                    o = o("abort");
                    try {
                        r.send(i.hasContent && i.data || null)
                    } catch (e) {
                        if (o)
                            throw e
                    }
                },
                abort: function() {
                    o && o()
                }
            }
    }),
    ce.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    ce.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return ce.globalEval(e),
                e
            }
        }
    }),
    ce.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }),
    ce.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain || n.scriptAttrs)
            return {
                send: function(e, t) {
                    r = ce("<script>").attr(n.scriptAttrs || {}).prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", i = function(e) {
                        r.remove(),
                        i = null,
                        e && t("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    C.head.appendChild(r[0])
                },
                abort: function() {
                    i && i()
                }
            }
    });
    var Jt, Kt = [], Zt = /(=)\?(?=&|$)|\?\?/;
    ce.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Kt.pop() || ce.expando + "_" + jt.guid++;
            return this[e] = !0,
            e
        }
    }),
    ce.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Zt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0])
            return r = e.jsonpCallback = v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
            a ? e[a] = e[a].replace(Zt, "$1" + r) : !1 !== e.jsonp && (e.url += (At.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
            e.converters["script json"] = function() {
                return o || ce.error(r + " was not called"),
                o[0]
            }
            ,
            e.dataTypes[0] = "json",
            i = ie[r],
            ie[r] = function() {
                o = arguments
            }
            ,
            n.always(function() {
                void 0 === i ? ce(ie).removeProp(r) : ie[r] = i,
                e[r] && (e.jsonpCallback = t.jsonpCallback,
                Kt.push(r)),
                o && v(i) && i(o[0]),
                o = i = void 0
            }),
            "script"
    }),
    le.createHTMLDocument = ((Jt = C.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === Jt.childNodes.length),
    ce.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t,
        t = !1),
        t || (le.createHTMLDocument ? ((r = (t = C.implementation.createHTMLDocument("")).createElement("base")).href = C.location.href,
        t.head.appendChild(r)) : t = C),
        o = !n && [],
        (i = w.exec(e)) ? [t.createElement(i[1])] : (i = Ae([e], t, o),
        o && o.length && ce(o).remove(),
        ce.merge([], i.childNodes)));
        var r, i, o
    }
    ,
    ce.fn.load = function(e, t, n) {
        var r, i, o, a = this, s = e.indexOf(" ");
        return -1 < s && (r = Tt(e.slice(s)),
        e = e.slice(0, s)),
        v(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (i = "POST"),
        0 < a.length && ce.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? ce("<div>").append(ce.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    ce.expr.pseudos.animated = function(t) {
        return ce.grep(ce.timers, function(e) {
            return t === e.elem
        }).length
    }
    ,
    ce.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = ce.css(e, "position"), c = ce(e), f = {};
            "static" === l && (e.style.position = "relative"),
            s = c.offset(),
            o = ce.css(e, "top"),
            u = ce.css(e, "left"),
            ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top,
            i = r.left) : (a = parseFloat(o) || 0,
            i = parseFloat(u) || 0),
            v(t) && (t = t.call(e, n, ce.extend({}, s))),
            null != t.top && (f.top = t.top - s.top + a),
            null != t.left && (f.left = t.left - s.left + i),
            "using"in t ? t.using.call(e, f) : c.css(f)
        }
    },
    ce.fn.extend({
        offset: function(t) {
            if (arguments.length)
                return void 0 === t ? this : this.each(function(e) {
                    ce.offset.setOffset(this, t, e)
                });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(),
            n = r.ownerDocument.defaultView,
            {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0], i = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === ce.css(r, "position"))
                    t = r.getBoundingClientRect();
                else {
                    t = this.offset(),
                    n = r.ownerDocument,
                    e = r.offsetParent || n.documentElement;
                    while (e && (e === n.body || e === n.documentElement) && "static" === ce.css(e, "position"))
                        e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = ce(e).offset()).top += ce.css(e, "borderTopWidth", !0),
                    i.left += ce.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - ce.css(r, "marginTop", !0),
                    left: t.left - i.left - ce.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && "static" === ce.css(e, "position"))
                    e = e.offsetParent;
                return e || J
            })
        }
    }),
    ce.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        ce.fn[t] = function(e) {
            return M(this, function(e, t, n) {
                var r;
                if (y(e) ? r = e : 9 === e.nodeType && (r = e.defaultView),
                void 0 === n)
                    return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }),
    ce.each(["top", "left"], function(e, n) {
        ce.cssHooks[n] = Ye(le.pixelPosition, function(e, t) {
            if (t)
                return t = Ge(e, n),
                _e.test(t) ? ce(e).position()[n] + "px" : t
        })
    }),
    ce.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        ce.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            ce.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e)
                  , i = r || (!0 === e || !0 === t ? "margin" : "border");
                return M(this, function(e, t, n) {
                    var r;
                    return y(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement,
                    Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? ce.css(e, t, i) : ce.style(e, t, n, i)
                }, s, n ? e : void 0, n)
            }
        })
    }),
    ce.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ce.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    ce.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.on("mouseenter", e).on("mouseleave", t || e)
        }
    }),
    ce.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        ce.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    });
    var en = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    ce.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t],
        t = e,
        e = n),
        v(e))
            return r = ae.call(arguments, 2),
            (i = function() {
                return e.apply(t || this, r.concat(ae.call(arguments)))
            }
            ).guid = e.guid = e.guid || ce.guid++,
            i
    }
    ,
    ce.holdReady = function(e) {
        e ? ce.readyWait++ : ce.ready(!0)
    }
    ,
    ce.isArray = Array.isArray,
    ce.parseJSON = JSON.parse,
    ce.nodeName = fe,
    ce.isFunction = v,
    ce.isWindow = y,
    ce.camelCase = F,
    ce.type = x,
    ce.now = Date.now,
    ce.isNumeric = function(e) {
        var t = ce.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }
    ,
    ce.trim = function(e) {
        return null == e ? "" : (e + "").replace(en, "$1")
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return ce
    });
    var tn = ie.jQuery
      , nn = ie.$;
    return ce.noConflict = function(e) {
        return ie.$ === ce && (ie.$ = nn),
        e && ie.jQuery === ce && (ie.jQuery = tn),
        ce
    }
    ,
    "undefined" == typeof e && (ie.jQuery = ie.$ = ce),
    ce
});
;/* @license GPL-2.0-or-later https://git.drupalcode.org/project/once/-/raw/v1.0.1/LICENSE.md */
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once = function() {
    "use strict";
    var n = /[\11\12\14\15\40]+/
      , e = "data-once"
      , t = document;
    function r(n, t, r) {
        return n[t + "Attribute"](e, r)
    }
    function o(e) {
        if ("string" != typeof e)
            throw new TypeError("once ID must be a string");
        if ("" === e || n.test(e))
            throw new RangeError("once ID must not be empty or contain spaces");
        return '[data-once~="' + e + '"]'
    }
    function u(n) {
        if (!(n instanceof Element))
            throw new TypeError("The element must be an instance of Element");
        return !0
    }
    function i(n, e) {
        void 0 === e && (e = t);
        var r = n;
        if (null === n)
            r = [];
        else {
            if (!n)
                throw new TypeError("Selector must not be empty");
            "string" != typeof n || e !== t && !u(e) ? n instanceof Element && (r = [n]) : r = e.querySelectorAll(n)
        }
        return Array.prototype.slice.call(r)
    }
    function c(n, e, t) {
        return e.filter((function(e) {
            var r = u(e) && e.matches(n);
            return r && t && t(e),
            r
        }
        ))
    }
    function f(e, t) {
        var o = t.add
          , u = t.remove
          , i = [];
        r(e, "has") && r(e, "get").trim().split(n).forEach((function(n) {
            i.indexOf(n) < 0 && n !== u && i.push(n)
        }
        )),
        o && i.push(o);
        var c = i.join(" ");
        r(e, "" === c ? "remove" : "set", c)
    }
    function a(n, e, t) {
        return c(":not(" + o(n) + ")", i(e, t), (function(e) {
            return f(e, {
                add: n
            })
        }
        ))
    }
    return a.remove = function(n, e, t) {
        return c(o(n), i(e, t), (function(e) {
            return f(e, {
                remove: n
            })
        }
        ))
    }
    ,
    a.filter = function(n, e, t) {
        return c(o(n), i(e, t))
    }
    ,
    a.find = function(n, e) {
        return i(n ? o(n) : "[data-once]", e)
    }
    ,
    a
}();

;/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function() {
    const settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
    window.drupalSettings = {};
    if (settingsElement !== null)
        window.drupalSettings = JSON.parse(settingsElement.textContent);
}
)();
;window.Drupal = {
    behaviors: {},
    locale: {}
};
(function(Drupal, drupalSettings, drupalTranslations, console, Proxy, Reflect) {
    Drupal.throwError = function(error) {
        setTimeout( () => {
            throw error;
        }
        , 0);
    }
    ;
    Drupal.attachBehaviors = function(context, settings) {
        context = context || document;
        settings = settings || drupalSettings;
        const behaviors = Drupal.behaviors;
        Object.keys(behaviors || {}).forEach( (i) => {
            if (typeof behaviors[i].attach === 'function')
                try {
                    behaviors[i].attach(context, settings);
                } catch (e) {
                    Drupal.throwError(e);
                }
        }
        );
    }
    ;
    Drupal.detachBehaviors = function(context, settings, trigger) {
        context = context || document;
        settings = settings || drupalSettings;
        trigger = trigger || 'unload';
        const behaviors = Drupal.behaviors;
        Object.keys(behaviors || {}).forEach( (i) => {
            if (typeof behaviors[i].detach === 'function')
                try {
                    behaviors[i].detach(context, settings, trigger);
                } catch (e) {
                    Drupal.throwError(e);
                }
        }
        );
    }
    ;
    Drupal.checkPlain = function(str) {
        str = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return str;
    }
    ;
    Drupal.formatString = function(str, args) {
        const processedArgs = {};
        Object.keys(args || {}).forEach( (key) => {
            switch (key.charAt(0)) {
            case '@':
                processedArgs[key] = Drupal.checkPlain(args[key]);
                break;
            case '!':
                processedArgs[key] = args[key];
                break;
            default:
                processedArgs[key] = Drupal.theme('placeholder', args[key]);
                break;
            }
        }
        );
        return Drupal.stringReplace(str, processedArgs, null);
    }
    ;
    Drupal.stringReplace = function(str, args, keys) {
        if (str.length === 0)
            return str;
        if (!Array.isArray(keys)) {
            keys = Object.keys(args || {});
            keys.sort( (a, b) => a.length - b.length);
        }
        if (keys.length === 0)
            return str;
        const key = keys.pop();
        const fragments = str.split(key);
        if (keys.length) {
            for (let i = 0; i < fragments.length; i++)
                fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
        }
        return fragments.join(args[key]);
    }
    ;
    Drupal.t = function(str, args, options) {
        options = options || {};
        options.context = options.context || '';
        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str])
            str = drupalTranslations.strings[options.context][str];
        if (args)
            str = Drupal.formatString(str, args);
        return str;
    }
    ;
    Drupal.url = function(path) {
        return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
    }
    ;
    Drupal.url.toAbsolute = function(url) {
        const urlParsingNode = document.createElement('a');
        try {
            url = decodeURIComponent(url);
        } catch (e) {}
        urlParsingNode.setAttribute('href', url);
        return urlParsingNode.cloneNode(false).href;
    }
    ;
    Drupal.url.isLocal = function(url) {
        let absoluteUrl = Drupal.url.toAbsolute(url);
        let {protocol} = window.location;
        if (protocol === 'http:' && absoluteUrl.startsWith('https:'))
            protocol = 'https:';
        let baseUrl = `${protocol}//${window.location.host}${drupalSettings.path.baseUrl.slice(0, -1)}`;
        try {
            absoluteUrl = decodeURIComponent(absoluteUrl);
        } catch (e) {}
        try {
            baseUrl = decodeURIComponent(baseUrl);
        } catch (e) {}
        return absoluteUrl === baseUrl || absoluteUrl.startsWith(`${baseUrl}/`);
    }
    ;
    Drupal.formatPlural = function(count, singular, plural, args, options) {
        args = args || {};
        args['@count'] = count;
        const pluralDelimiter = drupalSettings.pluralDelimiter;
        const translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
        let index = 0;
        if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula)
            index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula.default;
        else {
            if (args['@count'] !== 1)
                index = 1;
        }
        return translations[index];
    }
    ;
    Drupal.encodePath = function(item) {
        return window.encodeURIComponent(item).replace(/%2F/g, '/');
    }
    ;
    Drupal.deprecationError = ({message}) => {
        if (drupalSettings.suppressDeprecationErrors === false && typeof console !== 'undefined' && console.warn)
            console.warn(`[Deprecation] ${message}`);
    }
    ;
    Drupal.deprecatedProperty = ({target, deprecatedProperty, message}) => {
        if (!Proxy || !Reflect)
            return target;
        return new Proxy(target,{
            get: (target, key, ...rest) => {
                if (key === deprecatedProperty)
                    Drupal.deprecationError({
                        message
                    });
                return Reflect.get(target, key, ...rest);
            }
        });
    }
    ;
    Drupal.theme = function(func, ...args) {
        if (func in Drupal.theme)
            return Drupal.theme[func](...args);
    }
    ;
    Drupal.theme.placeholder = function(str) {
        return `<em class="placeholder">${Drupal.checkPlain(str)}</em>`;
    }
    ;
    Drupal.elementIsVisible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }
    ;
    Drupal.elementIsHidden = function(elem) {
        return !Drupal.elementIsVisible(elem);
    }
    ;
}
)(Drupal, window.drupalSettings, window.drupalTranslations, window.console, window.Proxy, window.Reflect);
;if (window.jQuery)
    jQuery.noConflict();
document.documentElement.className += ' js';
(function(Drupal, drupalSettings) {
    const domReady = (callback) => {
        const listener = () => {
            callback();
            document.removeEventListener('DOMContentLoaded', listener);
        }
        ;
        if (document.readyState !== 'loading')
            setTimeout(callback, 0);
        else
            document.addEventListener('DOMContentLoaded', listener);
    }
    ;
    domReady( () => {
        Drupal.attachBehaviors(document, drupalSettings);
    }
    );
}
)(Drupal, window.drupalSettings);
;/* @license MIT https://raw.githubusercontent.com/focus-trap/tabbable/v6.2.0/LICENSE */
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self,
    function() {
        var n = t.tabbable
          , o = t.tabbable = {};
        e(o),
        o.noConflict = function() {
            return t.tabbable = n,
            o
        }
    }())
}(this, (function(t) {
    "use strict";
    var e = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"]
      , n = e.join(",")
      , o = "undefined" == typeof Element
      , r = o ? function() {}
    : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
      , i = !o && Element.prototype.getRootNode ? function(t) {
        var e;
        return null == t || null === (e = t.getRootNode) || void 0 === e ? void 0 : e.call(t)
    }
    : function(t) {
        return null == t ? void 0 : t.ownerDocument
    }
      , a = function t(e, n) {
        var o;
        void 0 === n && (n = !0);
        var r = null == e || null === (o = e.getAttribute) || void 0 === o ? void 0 : o.call(e, "inert");
        return "" === r || "true" === r || n && e && t(e.parentNode)
    }
      , l = function(t, e, o) {
        if (a(t))
            return [];
        var i = Array.prototype.slice.apply(t.querySelectorAll(n));
        return e && r.call(t, n) && i.unshift(t),
        i = i.filter(o)
    }
      , u = function t(e, o, i) {
        for (var l = [], u = Array.from(e); u.length; ) {
            var d = u.shift();
            if (!a(d, !1))
                if ("SLOT" === d.tagName) {
                    var c = d.assignedElements()
                      , f = t(c.length ? c : d.children, !0, i);
                    i.flatten ? l.push.apply(l, f) : l.push({
                        scopeParent: d,
                        candidates: f
                    })
                } else {
                    r.call(d, n) && i.filter(d) && (o || !e.includes(d)) && l.push(d);
                    var s = d.shadowRoot || "function" == typeof i.getShadowRoot && i.getShadowRoot(d)
                      , p = !a(s, !1) && (!i.shadowRootFilter || i.shadowRootFilter(d));
                    if (s && p) {
                        var h = t(!0 === s ? d.children : s.children, !0, i);
                        i.flatten ? l.push.apply(l, h) : l.push({
                            scopeParent: d,
                            candidates: h
                        })
                    } else
                        u.unshift.apply(u, d.children)
                }
        }
        return l
    }
      , d = function(t) {
        return !isNaN(parseInt(t.getAttribute("tabindex"), 10))
    }
      , c = function(t) {
        if (!t)
            throw new Error("No node provided");
        return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || function(t) {
            var e, n = null == t || null === (e = t.getAttribute) || void 0 === e ? void 0 : e.call(t, "contenteditable");
            return "" === n || "true" === n
        }(t)) && !d(t) ? 0 : t.tabIndex
    }
      , f = function(t, e) {
        return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex
    }
      , s = function(t) {
        return "INPUT" === t.tagName
    }
      , p = function(t) {
        return function(t) {
            return s(t) && "radio" === t.type
        }(t) && !function(t) {
            if (!t.name)
                return !0;
            var e, n = t.form || i(t), o = function(t) {
                return n.querySelectorAll('input[type="radio"][name="' + t + '"]')
            };
            if ("undefined" != typeof window && void 0 !== window.CSS && "function" == typeof window.CSS.escape)
                e = o(window.CSS.escape(t.name));
            else
                try {
                    e = o(t.name)
                } catch (t) {
                    return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", t.message),
                    !1
                }
            var r = function(t, e) {
                for (var n = 0; n < t.length; n++)
                    if (t[n].checked && t[n].form === e)
                        return t[n]
            }(e, t.form);
            return !r || r === t
        }(t)
    }
      , h = function(t) {
        var e = t.getBoundingClientRect()
          , n = e.width
          , o = e.height;
        return 0 === n && 0 === o
    }
      , v = function(t, e) {
        var n = e.displayCheck
          , o = e.getShadowRoot;
        if ("hidden" === getComputedStyle(t).visibility)
            return !0;
        var a = r.call(t, "details>summary:first-of-type") ? t.parentElement : t;
        if (r.call(a, "details:not([open]) *"))
            return !0;
        if (n && "full" !== n && "legacy-full" !== n) {
            if ("non-zero-area" === n)
                return h(t)
        } else {
            if ("function" == typeof o) {
                for (var l = t; t; ) {
                    var u = t.parentElement
                      , d = i(t);
                    if (u && !u.shadowRoot && !0 === o(u))
                        return h(t);
                    t = t.assignedSlot ? t.assignedSlot : u || d === t.ownerDocument ? u : d.host
                }
                t = l
            }
            if (function(t) {
                var e, n, o, r, a = t && i(t), l = null === (e = a) || void 0 === e ? void 0 : e.host, u = !1;
                if (a && a !== t)
                    for (u = !!(null !== (n = l) && void 0 !== n && null !== (o = n.ownerDocument) && void 0 !== o && o.contains(l) || null != t && null !== (r = t.ownerDocument) && void 0 !== r && r.contains(t)); !u && l; ) {
                        var d, c, f;
                        u = !(null === (c = l = null === (d = a = i(l)) || void 0 === d ? void 0 : d.host) || void 0 === c || null === (f = c.ownerDocument) || void 0 === f || !f.contains(l))
                    }
                return u
            }(t))
                return !t.getClientRects().length;
            if ("legacy-full" !== n)
                return !0
        }
        return !1
    }
      , b = function(t, e) {
        return !(e.disabled || a(e) || function(t) {
            return s(t) && "hidden" === t.type
        }(e) || v(e, t) || function(t) {
            return "DETAILS" === t.tagName && Array.prototype.slice.apply(t.children).some((function(t) {
                return "SUMMARY" === t.tagName
            }
            ))
        }(e) || function(t) {
            if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
                for (var e = t.parentElement; e; ) {
                    if ("FIELDSET" === e.tagName && e.disabled) {
                        for (var n = 0; n < e.children.length; n++) {
                            var o = e.children.item(n);
                            if ("LEGEND" === o.tagName)
                                return !!r.call(e, "fieldset[disabled] *") || !o.contains(t)
                        }
                        return !0
                    }
                    e = e.parentElement
                }
            return !1
        }(e))
    }
      , m = function(t, e) {
        return !(p(e) || c(e) < 0 || !b(t, e))
    }
      , g = function(t) {
        var e = parseInt(t.getAttribute("tabindex"), 10);
        return !!(isNaN(e) || e >= 0)
    }
      , y = function t(e) {
        var n = []
          , o = [];
        return e.forEach((function(e, r) {
            var i = !!e.scopeParent
              , a = i ? e.scopeParent : e
              , l = function(t, e) {
                var n = c(t);
                return n < 0 && e && !d(t) ? 0 : n
            }(a, i)
              , u = i ? t(e.candidates) : a;
            0 === l ? i ? n.push.apply(n, u) : n.push(a) : o.push({
                documentOrder: r,
                tabIndex: l,
                item: e,
                isScope: i,
                content: u
            })
        }
        )),
        o.sort(f).reduce((function(t, e) {
            return e.isScope ? t.push.apply(t, e.content) : t.push(e.content),
            t
        }
        ), []).concat(n)
    }
      , w = e.concat("iframe").join(",");
    t.focusable = function(t, e) {
        return (e = e || {}).getShadowRoot ? u([t], e.includeContainer, {
            filter: b.bind(null, e),
            flatten: !0,
            getShadowRoot: e.getShadowRoot
        }) : l(t, e.includeContainer, b.bind(null, e))
    }
    ,
    t.getTabIndex = c,
    t.isFocusable = function(t, e) {
        if (e = e || {},
        !t)
            throw new Error("No node provided");
        return !1 !== r.call(t, w) && b(e, t)
    }
    ,
    t.isTabbable = function(t, e) {
        if (e = e || {},
        !t)
            throw new Error("No node provided");
        return !1 !== r.call(t, n) && m(e, t)
    }
    ,
    t.tabbable = function(t, e) {
        var n;
        return n = (e = e || {}).getShadowRoot ? u([t], e.includeContainer, {
            filter: m.bind(null, e),
            flatten: !1,
            getShadowRoot: e.getShadowRoot,
            shadowRootFilter: g
        }) : l(t, e.includeContainer, m.bind(null, e)),
        y(n)
    }
    ,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
}
));

;