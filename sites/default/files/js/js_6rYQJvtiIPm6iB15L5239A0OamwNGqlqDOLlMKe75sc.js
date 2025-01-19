/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function(l, f) {
    function m() {
        var a = e.elements;
        return "string" == typeof a ? a.split(" ") : a;
    }

    function i(a) {
        var b = n[a[o]];
        b || (b = {}, h++, a[o] = h, n[h] = b);
        return b;
    }

    function p(a, b, c) {
        b || (b = f);
        if (g) return b.createElement(a);
        c || (c = i(b));
        b = c.cache[a] ? c.cache[a].cloneNode() : r.test(a) ? (c.cache[a] = c.createElem(a)).cloneNode() : c.createElem(a);
        return b.canHaveChildren && !s.test(a) ? c.frag.appendChild(b) : b;
    }

    function t(a, b) {
        if (!b.cache) b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag();
        a.createElement = function(c) {
            return !e.shivMethods ? b.createElem(c) : p(c, a, b);
        };
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
    var k = l.html5 || {},
        s = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        r = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        j, o = "_html5shiv",
        h = 0,
        n = {},
        g;
    (function() {
        try {
            var a = f.createElement("a");
            a.innerHTML = "<xyz></xyz>";
            j = "hidden" in a;
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
    })();
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
            if (g) return a.createDocumentFragment();
            for (var b = b || i(a), c = b.frag.cloneNode(), d = 0, e = m(), h = e.length; d < h; d++) c.createElement(e[d]);
            return c;
        }
    };
    l.html5 = e;
    q(f);
})(this, document);;
! function(a) {
    "use strict";
    a.matchMedia = a.matchMedia || function(a) {
        var b, c = a.documentElement,
            d = c.firstElementChild || c.firstChild,
            e = a.createElement("body"),
            f = a.createElement("div");
        return f.id = "mq-test-1", f.style.cssText = "position:absolute;top:-100em", e.style.background = "none", e.appendChild(f),
            function(a) {
                return f.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', c.insertBefore(e, d), b = 42 === f.offsetWidth, c.removeChild(e), {
                    matches: b,
                    media: a
                };
            };
    }(a.document);
}(this),
function(a) {
    "use strict";

    function b() {
        u(!0);
    }
    var c = {};
    a.respond = c, c.update = function() {};
    var d = [],
        e = function() {
            var b = !1;
            try {
                b = new a.XMLHttpRequest();
            } catch (c) {
                b = new a.ActiveXObject("Microsoft.XMLHTTP");
            }
            return function() {
                return b;
            };
        }(),
        f = function(a, b) {
            var c = e();
            c && (c.open("GET", a, !0), c.onreadystatechange = function() {
                4 !== c.readyState || 200 !== c.status && 304 !== c.status || b(c.responseText);
            }, 4 !== c.readyState && c.send(null));
        };
    if (c.ajax = f, c.queue = d, c.regex = {
            media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
            keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
            urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
            findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
            only: /(only\s+)?([a-zA-Z]+)\s?/,
            minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
            maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
        }, c.mediaQueriesSupported = a.matchMedia && null !== a.matchMedia("only all") && a.matchMedia("only all").matches, !c.mediaQueriesSupported) {
        var g, h, i, j = a.document,
            k = j.documentElement,
            l = [],
            m = [],
            n = [],
            o = {},
            p = 30,
            q = j.getElementsByTagName("head")[0] || k,
            r = j.getElementsByTagName("base")[0],
            s = q.getElementsByTagName("link"),
            t = function() {
                var a, b = j.createElement("div"),
                    c = j.body,
                    d = k.style.fontSize,
                    e = c && c.style.fontSize,
                    f = !1;
                return b.style.cssText = "position:absolute;font-size:1em;width:1em", c || (c = f = j.createElement("body"), c.style.background = "none"), k.style.fontSize = "100%", c.style.fontSize = "100%", c.appendChild(b), f && k.insertBefore(c, k.firstChild), a = b.offsetWidth, f ? k.removeChild(c) : c.removeChild(b), k.style.fontSize = d, e && (c.style.fontSize = e), a = i = parseFloat(a);
            },
            u = function(b) {
                var c = "clientWidth",
                    d = k[c],
                    e = "CSS1Compat" === j.compatMode && d || j.body[c] || d,
                    f = {},
                    o = s[s.length - 1],
                    r = (new Date()).getTime();
                if (b && g && p > r - g) return a.clearTimeout(h), h = a.setTimeout(u, p), void 0;
                g = r;
                for (var v in l)
                    if (l.hasOwnProperty(v)) {
                        var w = l[v],
                            x = w.minw,
                            y = w.maxw,
                            z = null === x,
                            A = null === y,
                            B = "em";
                        x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? i || t() : 1)), y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? i || t() : 1)), w.hasquery && (z && A || !(z || e >= x) || !(A || y >= e)) || (f[w.media] || (f[w.media] = []), f[w.media].push(m[w.rules]));
                    }
                for (var C in n) n.hasOwnProperty(C) && n[C] && n[C].parentNode === q && q.removeChild(n[C]);
                n.length = 0;
                for (var D in f)
                    if (f.hasOwnProperty(D)) {
                        var E = j.createElement("style"),
                            F = f[D].join("\n");
                        E.type = "text/css", E.media = D, q.insertBefore(E, o.nextSibling), E.styleSheet ? E.styleSheet.cssText = F : E.appendChild(j.createTextNode(F)), n.push(E);
                    }
            },
            v = function(a, b, d) {
                var e = a.replace(c.regex.keyframes, "").match(c.regex.media),
                    f = e && e.length || 0;
                b = b.substring(0, b.lastIndexOf("/"));
                var g = function(a) {
                        return a.replace(c.regex.urls, "$1" + b + "$2$3");
                    },
                    h = !f && d;
                b.length && (b += "/"), h && (f = 1);
                for (var i = 0; f > i; i++) {
                    var j, k, n, o;
                    h ? (j = d, m.push(g(a))) : (j = e[i].match(c.regex.findStyles) && RegExp.$1, m.push(RegExp.$2 && g(RegExp.$2))), n = j.split(","), o = n.length;
                    for (var p = 0; o > p; p++) k = n[p], l.push({
                        media: k.split("(")[0].match(c.regex.only) && RegExp.$2 || "all",
                        rules: m.length - 1,
                        hasquery: k.indexOf("(") > -1,
                        minw: k.match(c.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: k.match(c.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    });
                }
                u();
            },
            w = function() {
                if (d.length) {
                    var b = d.shift();
                    f(b.href, function(c) {
                        v(c, b.href, b.media), o[b.href] = !0, a.setTimeout(function() {
                            w();
                        }, 0);
                    });
                }
            },
            x = function() {
                for (var b = 0; b < s.length; b++) {
                    var c = s[b],
                        e = c.href,
                        f = c.media,
                        g = c.rel && "stylesheet" === c.rel.toLowerCase();
                    e && g && !o[e] && (c.styleSheet && c.styleSheet.rawCssText ? (v(c.styleSheet.rawCssText, e, f), o[e] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(e) && !r || e.replace(RegExp.$1, "").split("/")[0] === a.location.host) && ("//" === e.substring(0, 2) && (e = a.location.protocol + e), d.push({
                        href: e,
                        media: f
                    })));
                }
                w();
            };
        x(), c.update = x, c.getEmValue = t, a.addEventListener ? a.addEventListener("resize", b, !1) : a.attachEvent && a.attachEvent("onresize", b);
    }
}(this);;;
window.Modernizr = function(a, b, c) {
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
                if (!F(e, "-") && j[e] !== c) return b == "pfx" ? e : !0;
            }
            return !1;
        }

        function H(a, b, d) {
            for (var e in a) {
                var f = b[a[e]];
                if (f !== c) return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f;
            }
            return !1;
        }

        function I(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + p.join(d + " ") + d).split(" ");
            return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), H(e, b, c));
        }

        function J() {
            e.input = function(c) {
                for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
                return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u;
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
                for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !!e;
                return t;
            }("search tel url email datetime date month week time datetime-local number range color".split(" "));
        }
        var d = "2.6.2",
            e = {},
            f = !0,
            g = b.documentElement,
            h = "modernizr",
            i = b.createElement(h),
            j = i.style,
            k = b.createElement("input"),
            l = ":)",
            m = {}.toString,
            n = " -webkit- -moz- -o- -ms- ".split(" "),
            o = "Webkit Moz O ms",
            p = o.split(" "),
            q = o.toLowerCase().split(" "),
            r = {
                svg: "http://www.w3.org/2000/svg"
            },
            s = {},
            t = {},
            u = {},
            v = [],
            w = v.slice,
            x, y = function(a, c, d, e) {
                var f, i, j, k, l = b.createElement("div"),
                    m = b.body,
                    n = m || b.createElement("body");
                if (parseInt(d, 10))
                    while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
                return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i;
            },
            z = function() {
                function d(d, e) {
                    e = e || b.createElement(a[d] || "div"), d = "on" + d;
                    var f = d in e;
                    return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f;
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
            }(),
            A = {}.hasOwnProperty,
            B;
        !E(A, "undefined") && !E(A.call, "undefined") ? B = function(a, b) {
            return A.call(a, b);
        } : B = function(a, b) {
            return b in a && E(a.constructor.prototype[b], "undefined");
        }, Function.prototype.bind || (Function.prototype.bind = function(b) {
            var c = this;
            if (typeof c != "function") throw new TypeError();
            var d = w.call(arguments, 1),
                e = function() {
                    if (this instanceof e) {
                        var a = function() {};
                        a.prototype = c.prototype;
                        var f = new a(),
                            g = c.apply(f, d.concat(w.call(arguments)));
                        return Object(g) === g ? g : f;
                    }
                    return c.apply(b, d.concat(w.call(arguments)));
                };
            return e;
        }), s.flexbox = function() {
            return I("flexWrap");
        }, s.flexboxlegacy = function() {
            return I("boxDirection");
        }, s.canvas = function() {
            var a = b.createElement("canvas");
            return !!a.getContext && !!a.getContext("2d");
        }, s.canvastext = function() {
            return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function");
        }, s.webgl = function() {
            return !!a.WebGLRenderingContext;
        }, s.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = a.offsetTop === 9;
            }), c;
        }, s.geolocation = function() {
            return "geolocation" in navigator;
        }, s.postmessage = function() {
            return !!a.postMessage;
        }, s.websqldatabase = function() {
            return !!a.openDatabase;
        }, s.indexedDB = function() {
            return !!I("indexedDB", a);
        }, s.hashchange = function() {
            return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
        }, s.history = function() {
            return !!a.history && !!history.pushState;
        }, s.draganddrop = function() {
            var a = b.createElement("div");
            return "draggable" in a || "ondragstart" in a && "ondrop" in a;
        }, s.websockets = function() {
            return "WebSocket" in a || "MozWebSocket" in a;
        }, s.rgba = function() {
            return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba");
        }, s.hsla = function() {
            return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla");
        }, s.multiplebgs = function() {
            return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background);
        }, s.backgroundsize = function() {
            return I("backgroundSize");
        }, s.borderimage = function() {
            return I("borderImage");
        }, s.borderradius = function() {
            return I("borderRadius");
        }, s.boxshadow = function() {
            return I("boxShadow");
        }, s.textshadow = function() {
            return b.createElement("div").style.textShadow === "";
        }, s.opacity = function() {
            return D("opacity:.55"), /^0.55$/.test(j.opacity);
        }, s.cssanimations = function() {
            return I("animationName");
        }, s.csscolumns = function() {
            return I("columnCount");
        }, s.cssgradients = function() {
            var a = "background-image:",
                b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                c = "linear-gradient(left top,#9f9, white);";
            return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), F(j.backgroundImage, "gradient");
        }, s.cssreflections = function() {
            return I("boxReflect");
        }, s.csstransforms = function() {
            return !!I("transform");
        }, s.csstransforms3d = function() {
            var a = !!I("perspective");
            return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
                a = b.offsetLeft === 9 && b.offsetHeight === 3;
            }), a;
        }, s.csstransitions = function() {
            return I("transition");
        }, s.fontface = function() {
            var a;
            return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
                var e = b.getElementById("smodernizr"),
                    f = e.sheet || e.styleSheet,
                    g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
                a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0;
            }), a;
        }, s.generatedcontent = function() {
            var a;
            return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
                a = b.offsetHeight >= 3;
            }), a;
        }, s.video = function() {
            var a = b.createElement("video"),
                c = !1;
            try {
                if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "");
            } catch (d) {}
            return c;
        }, s.audio = function() {
            var a = b.createElement("audio"),
                c = !1;
            try {
                if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "");
            } catch (d) {}
            return c;
        }, s.localstorage = function() {
            try {
                return localStorage.setItem(h, h), localStorage.removeItem(h), !0;
            } catch (a) {
                return !1;
            }
        }, s.sessionstorage = function() {
            try {
                return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0;
            } catch (a) {
                return !1;
            }
        }, s.webworkers = function() {
            return !!a.Worker;
        }, s.applicationcache = function() {
            return !!a.applicationCache;
        }, s.svg = function() {
            return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect;
        }, s.inlinesvg = function() {
            var a = b.createElement("div");
            return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg;
        }, s.smil = function() {
            return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")));
        }, s.svgclippaths = function() {
            return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")));
        };
        for (var K in s) B(s, K) && (x = K.toLowerCase(), e[x] = s[K](), v.push((e[x] ? "" : "no-") + x));
        return e.input || J(), e.addTest = function(a, b) {
                if (typeof a == "object")
                    for (var d in a) B(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b;
                }
                return e;
            }, C(""), i = k = null,
            function(a, b) {
                function k(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
                }

                function l() {
                    var a = r.elements;
                    return typeof a == "string" ? a.split(" ") : a;
                }

                function m(a) {
                    var b = i[a[g]];
                    return b || (b = {}, h++, a[g] = h, i[h] = b), b;
                }

                function n(a, c, f) {
                    c || (c = b);
                    if (j) return c.createElement(a);
                    f || (f = m(c));
                    var g;
                    return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g;
                }

                function o(a, c) {
                    a || (a = b);
                    if (j) return a.createDocumentFragment();
                    c = c || m(a);
                    var d = c.frag.cloneNode(),
                        e = 0,
                        f = l(),
                        g = f.length;
                    for (; e < g; e++) d.createElement(f[e]);
                    return d;
                }

                function p(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return r.shivMethods ? n(c, a, b) : b.createElem(c);
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
                    }) + ");return n}")(r, b.frag);
                }

                function q(a) {
                    a || (a = b);
                    var c = m(a);
                    return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a;
                }
                var c = a.html5 || {},
                    d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    f, g = "_html5shiv",
                    h = 0,
                    i = {},
                    j;
                (function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined";
                        }();
                    } catch (c) {
                        f = !0, j = !0;
                    }
                })();
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
                a.html5 = r, q(b);
            }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.hasEvent = z, e.testProp = function(a) {
                return G([a]);
            }, e.testAllProps = I, e.testStyles = y, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e;
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
            q = 1, a ? a.t ? m(function() {
                ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
            }, 0) : (a(), h()) : q = 0;
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && m(function() {
                        t.removeChild(l);
                    }, 50);
                    for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload();
                }
            }
            var j = j || B.errorTimeout,
                l = b.createElement(a),
                o = 0,
                r = 0,
                u = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                k.call(this, r);
            }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l));
        }

        function j(a, b, c, d, f) {
            return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this;
        }

        function k() {
            var a = B;
            return a.loader = {
                load: j,
                i: 0
            }, a;
        }
        var l = b.documentElement,
            m = a.setTimeout,
            n = b.getElementsByTagName("script")[0],
            o = {}.toString,
            p = [],
            q = 0,
            r = "MozAppearance" in l.style,
            s = r && !!b.createRange().compareNode,
            t = s ? l : n.parentNode,
            l = a.opera && "[object Opera]" == o.call(a.opera),
            l = !!b.attachEvent && !l,
            u = r ? "object" : l ? "script" : "img",
            v = l ? "script" : u,
            w = Array.isArray || function(a) {
                return "[object Array]" == o.call(a);
            },
            x = [],
            y = {},
            z = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a;
                }
            },
            A, B;
        B = function(a) {
            function b(a) {
                var a = a.split("!"),
                    b = x.length,
                    c = a.pop(),
                    d = a.length,
                    c = {
                        url: c,
                        origUrl: c,
                        prefixes: a
                    },
                    e, f, g;
                for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
                for (f = 0; f < b; f++) c = x[f](c);
                return c;
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                    k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2;
                })));
            }

            function h(a, b) {
                function c(a, c) {
                    if (a)
                        if (e(a)) c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l();
                        }), g(a, j, b, 0, h);
                        else {
                            if (Object(a) === a)
                                for (n in m = function() {
                                        var b = 0,
                                            c;
                                        for (c in a) a.hasOwnProperty(c) && b++;
                                        return b;
                                    }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                    var a = [].slice.call(arguments);
                                    k.apply(this, a), l();
                                } : j[n] = function(a) {
                                    return function() {
                                        var b = [].slice.call(arguments);
                                        a && a.apply(this, b), l();
                                    };
                                }(k[n])), g(a[n], j, b, n, h));
                        }
                    else !c && l();
                }
                var h = !!a.test,
                    i = a.load || a.both,
                    j = a.callback || f,
                    k = j,
                    l = a.complete || f,
                    m, n;
                c(h ? a.yep : a.nope, !!i), i && c(i);
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (w(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l);
        }, B.addPrefix = function(a, b) {
            z[a] = b;
        }, B.addFilter = function(a) {
            x.push(a);
        }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
            b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete";
        }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var k = b.createElement("script"),
                l, o, e = e || B.errorTimeout;
            k.src = a;
            for (o in d) k.setAttribute(o, d[o]);
            c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
                !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null);
            }, m(function() {
                l || (l = 1, c(1));
            }, e), i ? k.onload() : n.parentNode.insertBefore(k, n);
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var e = b.createElement("link"),
                j, c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (n.parentNode.insertBefore(e, n), m(c, 0));
        };
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0));
    };; +
function($) {
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
        if (e) e.preventDefault();
        if (!$parent.length) $parent = $this.hasClass('alert') ? $this : $this.parent();
        $parent.trigger(e = $.Event('close.bs.alert'));
        if (e.isDefaultPrevented()) return;
        $parent.removeClass('in');

        function removeElement() {
            $parent.trigger('closed.bs.alert').remove();
        }
        $.support.transition && $parent.hasClass('fade') ? $parent.one($.support.transition.end, removeElement).emulateTransitionEnd(150) : removeElement();
    };
    var old = $.fn.alert;
    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.alert');
            if (!data) $this.data('bs.alert', (data = new Alert(this)));
            if (typeof option == 'string') data[option].call($this);
        });
    };
    $.fn.alert.Constructor = Alert;
    $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this;
    };
    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery); + function($) {
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
        if (!data.resetText) $el.data('resetText', $el[val]());
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
    };
    Button.prototype.toggle = function() {
        var changed = true;
        var $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find('input');
            if ($input.prop('type') == 'radio')
                if ($input.prop('checked') && this.$element.hasClass('active')) changed = false;
                else $parent.find('.active').removeClass('active');
            if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change');
        }
        if (changed) this.$element.toggleClass('active');
    };
    var old = $.fn.button;
    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.button');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.button', (data = new Button(this, options)));
            if (option == 'toggle') data.toggle();
            else {
                if (option) data.setState(option);
            }
        });
    };
    $.fn.button.Constructor = Button;
    $.fn.button.noConflict = function() {
        $.fn.button = old;
        return this;
    };
    $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function(e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
        $btn.button('toggle');
        e.preventDefault();
    });
}(jQuery); + function($) {
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
    };
    Carousel.prototype.getActiveIndex = function() {
        this.$active = this.$element.find('.item.active');
        this.$items = this.$active.parent().children();
        return this.$items.index(this.$active);
    };
    Carousel.prototype.to = function(pos) {
        var that = this;
        var activeIndex = this.getActiveIndex();
        if (pos > (this.$items.length - 1) || pos < 0) return;
        if (this.sliding) return this.$element.one('slid.bs.carousel', function() {
            that.to(pos);
        });
        if (activeIndex == pos) return this.pause().cycle();
        return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]));
    };
    Carousel.prototype.pause = function(e) {
        e || (this.paused = true);
        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end);
            this.cycle(true);
        }
        this.interval = clearInterval(this.interval);
        return this;
    };
    Carousel.prototype.next = function() {
        if (this.sliding) return;
        return this.slide('next');
    };
    Carousel.prototype.prev = function() {
        if (this.sliding) return;
        return this.slide('prev');
    };
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active');
        var $next = next || $active[type]();
        var isCycling = this.interval;
        var direction = type == 'next' ? 'left' : 'right';
        var fallback = type == 'next' ? 'first' : 'last';
        var that = this;
        if (!$next.length) {
            if (!this.options.wrap) return;
            $next = this.$element.find('.item')[fallback]();
        }
        if ($next.hasClass('active')) return this.sliding = false;
        var e = $.Event('slide.bs.carousel', {
            relatedTarget: $next[0],
            direction
        });
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;
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
    };
    var old = $.fn.carousel;
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.carousel');
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var action = typeof option == 'string' ? option : options.slide;
            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)));
            if (typeof option == 'number') data.to(option);
            else if (action) data[action]();
            else {
                if (options.interval) data.pause().cycle();
            }
        });
    };
    $.fn.carousel.Constructor = Carousel;
    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old;
        return this;
    };
    $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function(e) {
        var $this = $(this),
            href;
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
        var options = $.extend({}, $target.data(), $this.data());
        var slideIndex = $this.attr('data-slide-to');
        if (slideIndex) options.interval = false;
        $target.carousel(options);
        if (slideIndex = $this.attr('data-slide-to')) $target.data('bs.carousel').to(slideIndex);
        e.preventDefault();
    });
    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            $carousel.carousel($carousel.data());
        });
    });
}(jQuery); + function($) {
    'use strict';
    var backdrop = '.dropdown-backdrop';
    var toggle = '[data-toggle=dropdown]';
    var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle);
    };
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if ($this.is('.disabled, :disabled')) return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        clearMenus();
        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
            var relatedTarget = {
                relatedTarget: this
            };
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
            if (e.isDefaultPrevented()) return;
            $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
            $this.focus();
        }
        return false;
    };
    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27)/.test(e.keyCode)) return;
        var $this = $(this);
        e.preventDefault();
        e.stopPropagation();
        if ($this.is('.disabled, :disabled')) return;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27) $parent.find(toggle).focus();
            return $this.click();
        }
        var desc = ' li:not(.divider):visible a';
        var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc);
        if (!$items.length) return;
        var index = $items.index($items.filter(':focus'));
        if (e.keyCode == 38 && index > 0) index--;
        if (e.keyCode == 40 && index < $items.length - 1) index++;
        if (!~index) index = 0;
        $items.eq(index).focus();
    };

    function clearMenus(e) {
        $(backdrop).remove();
        $(toggle).each(function() {
            var $parent = getParent($(this));
            var relatedTarget = {
                relatedTarget: this
            };
            if (!$parent.hasClass('open')) return;
            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
            if (e.isDefaultPrevented()) return;
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
            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)));
            if (typeof option == 'string') data[option].call($this);
        });
    };
    $.fn.dropdown.Constructor = Dropdown;
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old;
        return this;
    };
    $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation();
    }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown);
}(jQuery); + function($) {
    'use strict';
    var Modal = function(element, options) {
        this.options = options;
        this.$element = $(element);
        this.$backdrop = this.isShown = null;
        if (this.options.remote) this.$element.find('.modal-content').load(this.options.remote, $.proxy(function() {
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
    };
    Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.modal', {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e);
        if (this.isShown || e.isDefaultPrevented()) return;
        this.isShown = true;
        this.escape();
        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade');
            if (!that.$element.parent().length) that.$element.appendTo(document.body);
            that.$element.show().scrollTop(0);
            if (transition) that.$element[0].offsetWidth;
            that.$element.addClass('in').attr('aria-hidden', false);
            that.enforceFocus();
            var e = $.Event('shown.bs.modal', {
                relatedTarget: _relatedTarget
            });
            transition ? that.$element.find('.modal-dialog').one($.support.transition.end, function() {
                that.$element.focus().trigger(e);
            }).emulateTransitionEnd(300) : that.$element.focus().trigger(e);
        });
    };
    Modal.prototype.hide = function(e) {
        if (e) e.preventDefault();
        e = $.Event('hide.bs.modal');
        this.$element.trigger(e);
        if (!this.isShown || e.isDefaultPrevented()) return;
        this.isShown = false;
        this.escape();
        $(document).off('focusin.bs.modal');
        this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal');
        $.support.transition && this.$element.hasClass('fade') ? this.$element.one($.support.transition.end, $.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal();
    };
    Modal.prototype.enforceFocus = function() {
        $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function(e) {
            if (this.$element[0] !== e.target && !this.$element.has(e.target).length) this.$element.focus();
        }, this));
    };
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) this.$element.on('keyup.dismiss.bs.modal', $.proxy(function(e) {
            e.which == 27 && this.hide();
        }, this));
        else {
            if (!this.isShown) this.$element.off('keyup.dismiss.bs.modal');
        }
    };
    Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
            that.removeBackdrop();
            that.$element.trigger('hidden.bs.modal');
        });
    };
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };
    Modal.prototype.backdrop = function(callback) {
        var animate = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
            this.$element.on('click.dismiss.bs.modal', $.proxy(function(e) {
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
            }, this));
            if (doAnimate) this.$backdrop[0].offsetWidth;
            this.$backdrop.addClass('in');
            if (!callback) return;
            doAnimate ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback).emulateTransitionEnd(150) : callback();
        } else {
            if (callback) callback();
        }
    };
    var old = $.fn.modal;
    $.fn.modal = function(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.modal');
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
            if (!data) $this.data('bs.modal', (data = new Modal(this, options)));
            if (typeof option == 'string') data[option](_relatedTarget);
            else {
                if (options.show) data.show(_relatedTarget);
            }
        });
    };
    $.fn.modal.Constructor = Modal;
    $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
    };
    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        if ($this.is('a')) e.preventDefault();
        $target.modal(option, this).one('hide', function() {
            $this.is(':visible') && $this.focus();
        });
    });
    $(document).on('show.bs.modal', '.modal', function() {
        $(document.body).addClass('modal-open');
    }).on('hidden.bs.modal', '.modal', function() {
        $(document.body).removeClass('modal-open');
    });
}(jQuery); + function($) {
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
        for (var i = triggers.length; i--;) {
            var trigger = triggers[i];
            if (trigger == 'click') this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
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
    };
    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    };
    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);
        if (options.delay && typeof options.delay == 'number') options.delay = {
            show: options.delay,
            hide: options.delay
        };
        return options;
    };
    Tooltip.prototype.getDelegateOptions = function() {
        var options = {};
        var defaults = this.getDefaults();
        this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value) options[key] = value;
        });
        return options;
    };
    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        clearTimeout(self.timeout);
        self.hoverState = 'in';
        if (!self.options.delay || !self.options.delay.show) return self.show();
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'in') self.show();
        }, self.options.delay.show);
    };
    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
        clearTimeout(self.timeout);
        self.hoverState = 'out';
        if (!self.options.delay || !self.options.delay.hide) return self.hide();
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'out') self.hide();
        }, self.options.delay.hide);
    };
    Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            if (e.isDefaultPrevented()) return;
            var that = this;
            var $tip = this.tip();
            this.setContent();
            if (this.options.animation) $tip.addClass('fade');
            var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
            var autoToken = /\s?auto?\s?/i;
            var autoPlace = autoToken.test(placement);
            if (autoPlace) placement = placement.replace(autoToken, '') || 'top';
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
    };
    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var replace;
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;
        var marginTop = parseInt($tip.css('margin-top'), 10);
        var marginLeft = parseInt($tip.css('margin-left'), 10);
        if (isNaN(marginTop)) marginTop = 0;
        if (isNaN(marginLeft)) marginLeft = 0;
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
        } else this.replaceArrow(actualHeight - height, actualHeight, 'top');
        if (replace) $tip.offset(offset);
    };
    Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
        this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '');
    };
    Tooltip.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
        $tip.removeClass('fade in top bottom left right');
    };
    Tooltip.prototype.hide = function() {
        var that = this;
        var $tip = this.tip();
        var e = $.Event('hide.bs.' + this.type);

        function complete() {
            if (that.hoverState != 'in') $tip.detach();
            that.$element.trigger('hidden.bs.' + that.type);
        }
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;
        $tip.removeClass('in');
        $.support.transition && this.$tip.hasClass('fade') ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150) : complete();
        this.hoverState = null;
        return this;
    };
    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    };
    Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    };
    Tooltip.prototype.getPosition = function() {
        var el = this.$element[0];
        return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
            width: el.offsetWidth,
            height: el.offsetHeight
        }, this.$element.offset());
    };
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
    };
    Tooltip.prototype.getTitle = function() {
        var title;
        var $e = this.$element;
        var o = this.options;
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
        return title;
    };
    Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template);
    };
    Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
    };
    Tooltip.prototype.validate = function() {
        if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null;
        }
    };
    Tooltip.prototype.enable = function() {
        this.enabled = true;
    };
    Tooltip.prototype.disable = function() {
        this.enabled = false;
    };
    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    };
    Tooltip.prototype.toggle = function(e) {
        var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this;
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    };
    Tooltip.prototype.destroy = function() {
        clearTimeout(this.timeout);
        this.hide().$element.off('.' + this.type).removeData('bs.' + this.type);
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.tooltip');
            var options = typeof option == 'object' && option;
            if (!data && option == 'destroy') return;
            if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.tooltip.Constructor = Tooltip;
    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old;
        return this;
    };
}(jQuery); + function($) {
    'use strict';
    var Popover = function(element, options) {
        this.init('popover', element, options);
    };
    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');
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
    };
    Popover.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        var content = this.getContent();
        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
        $tip.find('.popover-content')[this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'](content);
        $tip.removeClass('fade top bottom left right in');
        if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
    };
    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    };
    Popover.prototype.getContent = function() {
        var $e = this.$element;
        var o = this.options;
        return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
    };
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.arrow');
    };
    Popover.prototype.tip = function() {
        if (!this.$tip) this.$tip = $(this.options.template);
        return this.$tip;
    };
    var old = $.fn.popover;
    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.popover');
            var options = typeof option == 'object' && option;
            if (!data && option == 'destroy') return;
            if (!data) $this.data('bs.popover', (data = new Popover(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.popover.Constructor = Popover;
    $.fn.popover.noConflict = function() {
        $.fn.popover = old;
        return this;
    };
}(jQuery); + function($) {
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
        if ($this.parent('li').hasClass('active')) return;
        var previous = $ul.find('.active:last a')[0];
        var e = $.Event('show.bs.tab', {
            relatedTarget: previous
        });
        $this.trigger(e);
        if (e.isDefaultPrevented()) return;
        var $target = $(selector);
        this.activate($this.parent('li'), $ul);
        this.activate($target, $target.parent(), function() {
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: previous
            });
        });
    };
    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback && $.support.transition && $active.hasClass('fade');

        function next() {
            $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');
            element.addClass('active');
            if (transition) {
                element[0].offsetWidth;
                element.addClass('in');
            } else element.removeClass('fade');
            if (element.parent('.dropdown-menu')) element.closest('li.dropdown').addClass('active');
            callback && callback();
        }
        transition ? $active.one($.support.transition.end, next).emulateTransitionEnd(150) : next();
        $active.removeClass('in');
    };
    var old = $.fn.tab;
    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.tab');
            if (!data) $this.data('bs.tab', (data = new Tab(this)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.tab.Constructor = Tab;
    $.fn.tab.noConflict = function() {
        $.fn.tab = old;
        return this;
    };
    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
}(jQuery); + function($) {
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
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass('affix');
        var scrollTop = this.$window.scrollTop();
        var position = this.$element.offset();
        return (this.pinnedOffset = position.top - scrollTop);
    };
    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    };
    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible')) return;
        var scrollHeight = $(document).height();
        var scrollTop = this.$window.scrollTop();
        var position = this.$element.offset();
        var offset = this.options.offset;
        var offsetTop = offset.top;
        var offsetBottom = offset.bottom;
        if (this.affixed == 'top') position.top += scrollTop;
        if (typeof offset != 'object') offsetBottom = offsetTop = offset;
        if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);
        var affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ? false : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' : offsetTop != null && (scrollTop <= offsetTop) ? 'top' : false;
        if (this.affixed === affix) return;
        if (this.unpin) this.$element.css('top', '');
        var affixType = 'affix' + (affix ? '-' + affix : '');
        var e = $.Event(affixType + '.bs.affix');
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;
        this.affixed = affix;
        this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;
        this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace('affix', 'affixed')));
        if (affix == 'bottom') this.$element.offset({
            top: scrollHeight - offsetBottom - this.$element.height()
        });
    };
    var old = $.fn.affix;
    $.fn.affix = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.affix');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.affix', (data = new Affix(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.affix.Constructor = Affix;
    $.fn.affix.noConflict = function() {
        $.fn.affix = old;
        return this;
    };
    $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this);
            var data = $spy.data();
            data.offset = data.offset || {};
            if (data.offsetBottom) data.offset.bottom = data.offsetBottom;
            if (data.offsetTop) data.offset.top = data.offsetTop;
            $spy.affix(data);
        });
    });
}(jQuery); + function($) {
    'use strict';
    var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.transitioning = null;
        if (this.options.parent) this.$parent = $(this.options.parent);
        if (this.options.toggle) this.toggle();
    };
    Collapse.DEFAULTS = {
        toggle: true
    };
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width');
        return hasWidth ? 'width' : 'height';
    };
    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in')) return;
        var startEvent = $.Event('show.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        var actives = this.$parent && this.$parent.find('> .panel > .in');
        if (actives && actives.length) {
            var hasData = actives.data('bs.collapse');
            if (hasData && hasData.transitioning) return;
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
        if (!$.support.transition) return complete.call(this);
        var scrollSize = $.camelCase(['scroll', dimension].join('-'));
        this.$element.one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize]);
    };
    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in')) return;
        var startEvent = $.Event('hide.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass('collapsing').removeClass('collapse').removeClass('in');
        this.transitioning = 1;
        var complete = function() {
            this.transitioning = 0;
            this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse');
        };
        if (!$.support.transition) return complete.call(this);
        this.$element[dimension](0).one($.support.transition.end, $.proxy(complete, this)).emulateTransitionEnd(350);
    };
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']();
    };
    var old = $.fn.collapse;
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.collapse');
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
            if (!data && options.toggle && option == 'show') option = !option;
            if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.collapse.Constructor = Collapse;
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
        return this;
    };
    $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function(e) {
        var $this = $(this),
            href;
        var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
        var $target = $(target);
        var data = $target.data('bs.collapse');
        var option = data ? 'toggle' : $this.data();
        var parent = $this.attr('data-parent');
        var $parent = parent && $(parent);
        if (!data || !data.transitioning) {
            if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed');
            $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
        }
        $target.collapse(option);
    });
}(jQuery); + function($) {
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
            return ($href && $href.length && $href.is(':visible') && [
                [$href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]
            ]) || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            self.offsets.push(this[0]);
            self.targets.push(this[1]);
        });
    };
    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
        var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
        var maxScroll = scrollHeight - this.$scrollElement.height();
        var offsets = this.offsets;
        var targets = this.targets;
        var activeTarget = this.activeTarget;
        var i;
        if (scrollTop >= maxScroll) return activeTarget != (i = targets.last()[0]) && this.activate(i);
        if (activeTarget && scrollTop <= offsets[0]) return activeTarget != (i = targets[0]) && this.activate(i);
        for (i = offsets.length; i--;) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
    };
    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target;
        $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
        var active = $(selector).parents('li').addClass('active');
        if (active.parent('.dropdown-menu').length) active = active.closest('li.dropdown').addClass('active');
        active.trigger('activate.bs.scrollspy');
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('bs.scrollspy');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.scrollspy.Constructor = ScrollSpy;
    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old;
        return this;
    };
    $(window).on('load', function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            $spy.scrollspy($spy.data());
        });
    });
}(jQuery); + function($) {
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
            if (el.style[name] !== undefined) return {
                end: transEndEventNames[name]
            };
        return false;
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false,
            $el = this;
        $(this).one($.support.transition.end, function() {
            called = true;
        });
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
    };
    $(function() {
        $.support.transition = transitionEnd();
    });
}(jQuery);;
jQuery.easing['jswing'] = jQuery.easing['swing'];
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
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
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
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) return c * (7.5625 * t * t) + b;
        else if (t < (2 / 2.75)) return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        else if (t < (2.5 / 2.75)) return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        else return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});;
(function($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper',
            center: false,
            getWidthFrom: ''
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function() {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;
                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement.css('position', '').css('top', '');
                        s.stickyElement.parent().removeClass(s.className);
                        s.currentTop = null;
                    }
                } else {
                    var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) newTop = newTop + s.topSpacing;
                    else newTop = s.topSpacing;
                    if (s.currentTop != newTop) {
                        s.stickyElement.css('position', 'fixed').css('top', newTop);
                        if (typeof s.getWidthFrom !== 'undefined') s.stickyElement.css('width', $(s.getWidthFrom).width());
                        s.stickyElement.parent().addClass(s.className);
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();
        },
        methods = {
            init: function(options) {
                var o = $.extend(defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);
                    stickyId = stickyElement.attr('id');
                    wrapper = $('<div></div>').attr('id', stickyId + '-sticky-wrapper').addClass(o.wrapperClassName);
                    stickyElement.wrapAll(wrapper);
                    if (o.center) stickyElement.parent().css({
                        width: stickyElement.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    });
                    if (stickyElement.css("float") == "right") stickyElement.css({
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
        if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
        else $.error('Method ' + method + ' does not exist on jQuery.sticky');
    };
    $(function() {
        setTimeout(scroller, 0);
    });
})(jQuery);;
(function(a, i, g) {
    a.fn.tinyNav = function(j) {
        var b = a.extend({
            active: "selected",
            header: "",
            label: ""
        }, j);
        return this.each(function() {
            g++;
            var h = a(this),
                d = "tinynav" + g,
                f = ".l_" + d,
                e = a("<select/>").attr("id", d).addClass("tinynav " + d);
            if (h.is("ul,ol")) {
                "" !== b.header && e.append(a("<option/>").text(b.header));
                var c = "";
                h.addClass("l_" + d).find("a").each(function() {
                    c += '<option value="' + a(this).attr("href") + '">';
                    var b;
                    for (b = 0; b < a(this).parents("ul, ol").length - 1; b++) c += "- ";
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
    };
})(jQuery, this, 0);;
jQuery(document).ready(function($) {
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
});;
(function($) {
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
            if (outerHeight) getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
            else getHeight = function(jqo) {
                return jqo.height();
            };
            if (arguments.length < 1 || xpos === null) xpos = "50%";
            if (arguments.length < 2 || speedFactor === null) speedFactor = 0.5;
            if (arguments.length < 3 || outerHeight === null) outerHeight = true;
            var pos = $window.scrollTop();
            $this.each(function() {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + windowHeight) return;
                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);;
jQuery('html').removeClass('no-js').addClass('js');
if (navigator.appVersion.indexOf("Mac") != -1) jQuery('html').addClass('osx');
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
            if ($(this).scrollTop() > 500) $('.back-to-top').fadeIn(500);
            else $('.back-to-top').fadeOut(500);
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
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) detectmob = true;
    if (detectmob === true) $('.parallax').each(function() {
        $(this).addClass('parallax-mobile');
    });
    else {
        $('#parallax-one').parallax();
        $('#parallax-two').parallax();
        $('#parallax-three').parallax();
    }
});;
jQuery(document).ready(function() {
    jQuery(".mobSearch").click(function() {
        jQuery(".top-right section.search-form form").slideToggle();
    });
    jQuery('.mobClick').click(function() {
        var $nav = jQuery(".tbm-main");
        $nav.toggleClass("tbm--mobile-show");
    });
});;