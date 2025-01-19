/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */ ! function() {
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
                        this.id = e, this.navParent = document.getElementById(this.id), this.isTouch = window.matchMedia("(pointer: coarse)").matches;
                        const t = drupalSettings.TBMegaMenu[this.id];
                        this.hasArrows = "1" === t.arrows;
                        const n = this.navParent.getAttribute("data-duration") ? parseInt(this.navParent.getAttribute("data-duration")) : 0;
                        this.mm_timeout = n ? 100 + n : 500;
                    }
                    get isMobile() {
                        return this.navParent.classList.contains("tbm--mobile");
                    }
                    keyDownHandler(e) {
                        const t = this,
                            n = this.id;
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
                                e.preventDefault(), o(e);
                                break;
                            case 39:
                                e.preventDefault(),
                                    function(e) {
                                        a() ? r() : s(e);
                                    }(e);
                                break;
                            case 40:
                                e.preventDefault(), s(e);
                        }

                        function i(e) {
                            e.preventDefault(), a() ? e.shiftKey || 38 === e.keyCode || 37 === e.keyCode ? l() : r() : e.shiftKey || 38 === e.keyCode || 37 === e.keyCode ? Drupal.TBMegaMenu.getNextPrevElement("prev").focus() : Drupal.TBMegaMenu.getNextPrevElement("next").focus();
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
                                }()) Drupal.TBMegaMenu.getNextPrevElement("next", !0).focus();
                            else {
                                const e = Drupal.TBMegaMenu[n].topLevel,
                                    t = e.indexOf(document.activeElement);
                                t > -1 && e[t + 1].focus();
                            }
                        }

                        function l() {
                            if (0 !== Drupal.TBMegaMenu[n].topLevel.indexOf(document.activeElement)) {
                                const e = Drupal.TBMegaMenu[n].topLevel,
                                    t = e.indexOf(document.activeElement);
                                t > -1 && e[t - 1].focus();
                            } else Drupal.TBMegaMenu.getNextPrevElement("prev", !0).focus();
                        }
                    }
                    handleTouch(e) {
                        const t = this,
                            n = e.querySelector(":scope > .tbm-link-container").querySelector(":scope > .tbm-link"),
                            i = n.closest(".tbm-item");
                        n.addEventListener("click", ((e) => {
                            if (!t.isMobile && t.isTouch && !t.hasArrows)
                                if (n.classList.contains("tbm-clicked")) {
                                    const e = n.getAttribute("href");
                                    e ? window.location.href = e : (n.classList.remove("tbm-clicked"), t.hideMenu(i, t.mm_timeout));
                                } else e.preventDefault(), t.navParent.querySelectorAll(".open").forEach(((e) => {
                                    e.contains(n) || e.classList.remove("open");
                                })), t.ariaCheck(), t.navParent.querySelectorAll(".tbm-clicked").forEach(((e) => {
                                    e.classList.remove("tbm-clicked");
                                })), n.classList.add("tbm-clicked"), t.showMenu(i, t.mm_timeout);
                        })), document.addEventListener("click", ((e) => {
                            !e.target.closest(".tbm") && t.navParent.classList.contains("tbm--mobile-show") && t.closeMenu();
                        })), document.addEventListener("focusin", ((e) => {
                            e.target.closest(".tbm") || t.closeMenu();
                        }));
                    }
                    closeMenu() {
                        this.navParent.classList.remove("tbm--mobile-show"), this.navParent.querySelector(".tbm-button").setAttribute("aria-expanded", "false"), this.navParent.querySelectorAll(".open").forEach(((e) => {
                            e.classList.remove("open");
                        })), this.navParent.querySelectorAll(".tbm-clicked").forEach(((e) => {
                            e.classList.remove("tbm-clicked");
                        })), this.ariaCheck();
                    }
                    ariaCheck() {
                        const e = (e, t) => {
                            e.querySelectorAll(".tbm-toggle, .tbm-submenu-toggle").forEach(((e) => {
                                e.setAttribute("aria-expanded", t);
                            }));
                        };
                        document.addEventListener("click", ((e) => {
                            e.target.closest(".tbm") || this.isMobile || !this.hasArrows || this.closeMenu();
                        })), this.navParent.querySelectorAll(".tbm-item").forEach(((t) => {
                            t.classList.contains("tbm-group") ? t.closest(".open") ? t.closest(".open") && e(t, "true") : e(t, "false") : t.classList.contains("tbm-item--has-dropdown") || t.classList.contains("tbm-item--has-flyout") ? t.classList.contains("open") ? t.classList.contains("open") && e(t, "true") : e(t, "false") : t.querySelectorAll(".tbm-toggle, .tbm-submenu-toggle").forEach(((e) => {
                                e.removeAttribute("aria-expanded");
                            }));
                        }));
                    }
                    showMenu(e, t) {
                        const n = this;
                        e.classList.contains("level-1") ? (e.classList.add("animating"), clearTimeout(e.animatingTimeout), e.animatingTimeout = setTimeout((function() {
                            e.classList.remove("animating");
                        }), t), clearTimeout(e.hoverTimeout), e.hoverTimeout = setTimeout((function() {
                            e.classList.add("open"), n.ariaCheck();
                        }), 100)) : (clearTimeout(e.hoverTimeout), e.hoverTimeout = setTimeout((function() {
                            e.classList.add("open"), n.ariaCheck();
                        }), 100));
                    }
                    hideMenu(e, t) {
                        const n = this;
                        e.querySelectorAll(".tbm-toggle, .tbm-submenu-toggle").forEach(((e) => {
                            e.setAttribute("aria-expanded", !1);
                        })), e.classList.contains("level-1") ? (e.classList.add("animating"), clearTimeout(e.animatingTimeout), e.animatingTimeout = setTimeout((function() {
                            e.classList.remove("animating");
                        }), t), clearTimeout(e.hoverTimeout), e.hoverTimeout = setTimeout((function() {
                            e.classList.remove("open"), n.ariaCheck();
                        }), 100)) : (clearTimeout(e.hoverTimeout), e.hoverTimeout = setTimeout((function() {
                            e.classList.remove("open"), n.ariaCheck();
                        }), 100));
                    }
                    init() {
                        const e = this;
                        document.querySelectorAll(".tbm-button").forEach(((t) => {
                            t.addEventListener("click", ((t) => {
                                e.navParent.classList.contains("tbm--mobile-show") ? e.closeMenu() : (e.navParent.classList.add("tbm--mobile-show"), t.currentTarget.setAttribute("aria-expanded", "true"));
                            }));
                        })), this.isTouch || (this.navParent.querySelectorAll(".tbm-item").forEach(((t) => {
                            t.addEventListener("mouseenter", ((n) => {
                                e.isMobile || e.hasArrows || e.showMenu(t, e.mm_timeout);
                            })), t.addEventListener("mouseleave", ((n) => {
                                e.isMobile || e.hasArrows || e.hideMenu(t, e.mm_timeout);
                            }));
                        })), this.navParent.querySelectorAll(".tbm-toggle").forEach(((t) => {
                            t.addEventListener("focus", ((t) => {
                                if (!e.isMobile && !e.hasArrows) {
                                    const n = t.currentTarget.closest("li");
                                    e.showMenu(n, e.mm_timeout), document.addEventListener("focusin", ((t) => {
                                        e.isMobile || e.hasArrows || t.target === n || n.contains(t.target) || (document.removeEventListener("focusin", t), e.hideMenu(n, e.mm_timeout));
                                    }));
                                }
                            }));
                        }))), this.navParent.querySelectorAll(".tbm-item").forEach(((t) => {
                            t.querySelector(":scope > .tbm-submenu") && e.handleTouch(t);
                        })), this.navParent.querySelectorAll(".tbm-submenu-toggle, .tbm-link.no-link").forEach(((t) => {
                            t.addEventListener("click", ((t) => {
                                if (e.isMobile) {
                                    const n = t.currentTarget.closest(".tbm-item");
                                    n.classList.contains("open") ? e.hideMenu(n, e.mm_timeout) : e.showMenu(n, e.mm_timeout);
                                }
                                if (!e.isMobile && (!e.isTouch || e.hasArrows || !t.currentTarget.classList.contains("no-link"))) {
                                    const n = t.currentTarget.closest(".tbm-item");
                                    if (n.classList.contains("open")) e.hideMenu(n, e.mm_timeout), n.querySelectorAll(".open").forEach(((t) => {
                                        e.hideMenu(t, e.mm_timeout);
                                    }));
                                    else {
                                        e.showMenu(n, e.mm_timeout);
                                        let t = n.previousElementSibling;
                                        for (; t;) e.hideMenu(t, e.mm_timeout), t.querySelectorAll(".open").forEach(((t) => {
                                            e.hideMenu(t, e.mm_timeout);
                                        })), t = t.previousElementSibling;
                                        let i = n.nextElementSibling;
                                        for (; i;) e.hideMenu(i, e.mm_timeout), i.querySelectorAll(".open").forEach(((t) => {
                                            e.hideMenu(t, e.mm_timeout);
                                        })), i = i.nextElementSibling;
                                    }
                                }
                            }));
                        })), this.navParent.addEventListener("keydown", this.keyDownHandler.bind(this));
                    }
                }
            }
        },
        n = {};

    function i(e) {
        var o = n[e];
        if (void 0 !== o) return o.exports;
        var s = n[e] = {
            exports: {}
        };
        return t[e](s, s.exports, i), s.exports;
    }
    i.d = function(e, t) {
            for (var n in t) i.o(t, n) && !i.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            });
        }, i.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, e = i(883),
        function(t) {
            t.TBMegaMenu = t.TBMegaMenu || {};
            const n = 'a:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), details:not([disabled]):not([tabindex="-1"]), [tabindex]:not([disabled]):not([tabindex="-1"])',
                i = () => {
                    document.querySelectorAll(".tbm").forEach(((e) => {
                        const i = e.getAttribute("id");
                        t.TBMegaMenu[i] = {};
                        const o = parseInt(e.getAttribute("data-breakpoint"));
                        window.matchMedia(`(max-width: ${o}px)`).matches ? e.classList.add("tbm--mobile") : e.classList.remove("tbm--mobile");
                        let s = document.querySelectorAll(n);
                        s = [...s];
                        let a = e.querySelectorAll(".tbm-link.level-1, .tbm-link.level-1 + .tbm-submenu-toggle");
                        a = [...a], a = a.filter(((e) => e.offsetWidth > 0 && e.offsetHeight > 0)), t.TBMegaMenu.focusable = s, t.TBMegaMenu[i].topLevel = a;
                    }));
                },
                o = (s = i, 100, a = 0, function(...e) {
                    var t = new Date();
                    t - a >= 100 && (s(...e), a = t);
                });
            var s, a;
            ["load", "resize"].forEach(((e) => {
                window.addEventListener(e, o);
            })), t.TBMegaMenu.getNextPrevElement = (e, i = !1) => {
                const o = document.activeElement;
                let s = null;
                if (o) {
                    let a = document.querySelectorAll(n);
                    a = [...a], a = t.TBMegaMenu.focusable.filter(((e) => i ? !e.closest(".tbm-subnav") && e.offsetWidth > 0 && e.offsetHeight > 0 : e.offsetWidth > 0 && e.offsetHeight > 0));
                    const r = a.indexOf(o);
                    r > -1 && (s = "next" === e ? a[r + 1] || a[0] : a[r - 1] || a[0]);
                }
                return s;
            }, t.behaviors.tbMegaMenuInit = {
                attach: (t) => {
                    t.querySelectorAll(".tbm").forEach(((t) => {
                        t.getAttribute("data-initialized") || (t.setAttribute("data-initialized", "true"), new e.w(t.getAttribute("id")).init());
                    }));
                }
            }, t.behaviors.tbMegaMenuRespond = {
                attach: (e) => {
                    i();
                }
            };
        }(Drupal);
}();;
/* @license GNU-GPL-2.0-or-later https://github.com/woothemes/FlexSlider/blob/master/LICENSE.md */
;
(function($) {
    var focused = true;
    $.flexslider = function(el, options) {
        var slider = $(el);
        if (typeof options.rtl == 'undefined' && $('html').attr('dir') == 'rtl') options.rtl = true;
        slider.vars = $.extend({}, $.flexslider.defaults, options);
        var namespace = slider.vars.namespace,
            msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            touch = (("ontouchstart" in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
            eventType = "click touchend MSPointerUp keyup",
            watchedEvent = "",
            watchedEventClearTimer, vertical = slider.vars.direction === "vertical",
            reverse = slider.vars.reverse,
            carousel = (slider.vars.itemWidth > 0),
            fade = slider.vars.animation === "fade",
            asNav = slider.vars.asNavFor !== "",
            methods = {};
        $.data(el, "flexslider", slider);
        methods = {
            init: function() {
                slider.animating = false;
                slider.currentSlide = parseInt((slider.vars.startAt ? slider.vars.startAt : 0), 10);
                if (isNaN(slider.currentSlide)) slider.currentSlide = 0;
                slider.animatingTo = slider.currentSlide;
                slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
                slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
                slider.slides = $(slider.vars.selector, slider);
                slider.container = $(slider.containerSelector, slider);
                slider.count = slider.slides.length;
                slider.syncExists = $(slider.vars.sync).length > 0;
                if (slider.vars.animation === "slide") slider.vars.animation = "swing";
                slider.prop = (vertical) ? "top" : (slider.vars.rtl ? "marginRight" : "marginLeft");
                slider.args = {};
                slider.manualPause = false;
                slider.stopped = false;
                slider.started = false;
                slider.startTimeout = null;
                slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
                    var obj = document.createElement('div'),
                        props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
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
                if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
                if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);
                if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);
                if (slider.vars.randomize) {
                    slider.slides.sort(function() {
                        return (Math.round(Math.random()) - 0.5);
                    });
                    slider.container.empty().append(slider.slides);
                }
                slider.doMath();
                slider.setup("init");
                if (slider.vars.controlNav) methods.controlNav.setup();
                if (slider.vars.directionNav) methods.directionNav.setup();
                if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) $(document).bind('keyup', function(event) {
                    var keycode = event.keyCode;
                    if (!slider.animating && (keycode === 39 || keycode === 37)) {
                        var target = (slider.vars.rtl ? ((keycode === 37) ? slider.getTarget('next') : (keycode === 39) ? slider.getTarget('prev') : false) : ((keycode === 39) ? slider.getTarget('next') : (keycode === 37) ? slider.getTarget('prev') : false));;
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    }
                });
                if (slider.vars.mousewheel) slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
                    event.preventDefault();
                    var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
                    slider.flexAnimate(target, slider.vars.pauseOnAction);
                });
                if (slider.vars.pausePlay) methods.pausePlay.setup();
                if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();
                if (slider.vars.slideshow) {
                    if (slider.vars.pauseOnHover) slider.hover(function() {
                        if (!slider.manualPlay && !slider.manualPause) slider.pause();
                    }, function() {
                        if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
                    });
                    if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden())(slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
                }
                if (asNav) methods.asNav.setup();
                if (touch && slider.vars.touch) methods.touch();
                if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize orientationchange focus", methods.resize);
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
                    if (!msGesture) slider.slides.on(eventType, function(e) {
                        e.preventDefault();
                        var $slide = $(this),
                            target = $slide.index();
                        var posFromX;
                        if (slider.vars.rtl) posFromX = -1 * ($slide.offset().right - $(slider).scrollLeft());
                        else posFromX = $slide.offset().left - $(slider).scrollLeft();
                        if (posFromX <= 0 && $slide.hasClass(namespace + 'active-slide')) slider.flexAnimate(slider.getTarget("prev"), true);
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
                                if (e.currentTarget._gesture) e.currentTarget._gesture.addPointer(e.pointerId);
                            }, false);
                            that.addEventListener("MSGestureTap", function(e) {
                                e.preventDefault();
                                var $slide = $(this),
                                    target = $slide.index();
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
                    if (!slider.manualControls) methods.controlNav.setupPaging();
                    else methods.controlNav.setupManual();
                },
                setupPaging: function() {
                    var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
                        j = 1,
                        item, slide;
                    slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');
                    if (slider.pagingCount > 1)
                        for (var i = 0; i < slider.pagingCount; i++) {
                            slide = slider.slides.eq(i);
                            if (undefined === slide.attr('data-thumb-alt')) slide.attr('data-thumb-alt', '');
                            item = $('<a></a>').attr('href', '#').text(j);
                            if (slider.vars.controlNav === "thumbnails") item = $('<img/>').attr('src', slide.attr('data-thumb'));
                            if ('' !== slide.attr('data-thumb-alt')) item.attr('alt', slide.attr('data-thumb-alt'));
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
                        }(slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
                    methods.controlNav.set();
                    methods.controlNav.active();
                    slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
                        event.preventDefault();
                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);
                            if (!$this.hasClass(namespace + 'active')) {
                                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }
                        if (watchedEvent === "") watchedEvent = event.type;
                        methods.setToClearWatchedEvent();
                    });
                },
                setupManual: function() {
                    slider.controlNav = slider.manualControls;
                    methods.controlNav.active();
                    slider.controlNav.bind(eventType, function(event) {
                        event.preventDefault();
                        if (watchedEvent === "" || watchedEvent === event.type) {
                            var $this = $(this),
                                target = slider.controlNav.index($this);
                            if (!$this.hasClass(namespace + 'active')) {
                                (target > slider.currentSlide) ? slider.direction = "next": slider.direction = "prev";
                                slider.flexAnimate(target, slider.vars.pauseOnAction);
                            }
                        }
                        if (watchedEvent === "") watchedEvent = event.type;
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
                    if (slider.pagingCount > 1 && action === "add") slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
                    else if (slider.pagingCount === 1) slider.controlNavScaffold.find('li').remove();
                    else slider.controlNav.eq(pos).closest('li').remove();
                    methods.controlNav.set();
                    (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action): methods.controlNav.active();
                }
            },
            directionNav: {
                setup: function() {
                    var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');
                    if (slider.customDirectionNav) slider.directionNav = slider.customDirectionNav;
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
                        if (watchedEvent === "") watchedEvent = event.type;
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function() {
                    var disabledClass = namespace + 'disabled';
                    if (slider.pagingCount === 1) slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
                    else if (!slider.vars.animationLoop)
                        if (slider.animatingTo === 0) slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
                        else if (slider.animatingTo === slider.last) slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
                    else slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
                    else slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
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
                        if (watchedEvent === "") watchedEvent = event.type;
                        methods.setToClearWatchedEvent();
                    });
                },
                update: function(state) {
                    (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText): slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
                }
            },
            touch: function() {
                var startX, startY, offset, cwidth, dx, startT, onTouchStart, onTouchMove, onTouchEnd, scrolling = false,
                    localX = 0,
                    localY = 0,
                    accDx = 0;
                if (!msGesture) {
                    onTouchStart = function(e) {
                        if (slider.animating) e.preventDefault();
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
                    };
                    onTouchMove = function(e) {
                        localX = e.touches[0].pageX;
                        localY = e.touches[0].pageY;
                        dx = (vertical) ? startX - localY : (slider.vars.rtl ? -1 : 1) * (startX - localX);
                        scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));
                        var fxms = 500;
                        if (!scrolling || Number(new Date()) - startT > fxms) {
                            e.preventDefault();
                            if (!fade && slider.transitions) {
                                if (!slider.vars.animationLoop) dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    };
                    onTouchEnd = function(e) {
                        el.removeEventListener('touchmove', onTouchMove, false);
                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) slider.flexAnimate(target, slider.vars.pauseOnAction);
                            else {
                                if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
                            }
                        }
                        el.removeEventListener('touchend', onTouchEnd, false);
                        startX = null;
                        startY = null;
                        dx = null;
                        offset = null;
                    };
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
                        if (slider.animating) e.preventDefault();
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
                        if (!slider) return;
                        var transX = -e.translationX,
                            transY = -e.translationY;
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
                                if (!slider.vars.animationLoop) dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                                slider.setProps(offset + dx, "setTouch");
                            }
                        }
                    }

                    function onMSGestureEnd(e) {
                        e.stopPropagation();
                        var slider = e.target._slider;
                        if (!slider) return;
                        if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                            var updateDx = (reverse) ? -dx : dx,
                                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
                            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) slider.flexAnimate(target, slider.vars.pauseOnAction);
                            else {
                                if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
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
                    if (!carousel) slider.doMath();
                    if (fade) methods.smoothHeight();
                    else if (carousel) {
                        slider.slides.width(slider.computedW);
                        slider.update(slider.pagingCount);
                        slider.setProps();
                    } else if (vertical) {
                        slider.viewport.height(slider.h);
                        slider.setProps(slider.h, "setTotal");
                    } else {
                        if (slider.vars.smoothHeight) methods.smoothHeight();
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
                    }, dur): $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
                }
            },
            sync: function(action) {
                var $obj = $(slider.vars.sync).data("flexslider"),
                    target = slider.animatingTo;
                switch (action) {
                    case "animate":
                        $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true);
                        break;
                    case "play":
                        if (!$obj.playing && !$obj.asNav) $obj.play();
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
                                if (slider.startTimeout) clearTimeout(slider.startTimeout);
                                else slider.pause();
                            else if (slider.started) slider.play();
                            else if (slider.vars.initDelay > 0) setTimeout(slider.play, slider.vars.initDelay);
                            else slider.play();
                        });
                    }
                },
                isHidden: function() {
                    var prop = methods.pauseInvisible.getHiddenProp();
                    if (!prop) return false;
                    return document[prop];
                },
                getHiddenProp: function() {
                    var prefixes = ['webkit', 'moz', 'ms', 'o'];
                    if ('hidden' in document) return 'hidden';
                    for (var i = 0; i < prefixes.length; i++)
                        if ((prefixes[i] + 'Hidden') in document) return prefixes[i] + 'Hidden';
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
            if (!slider.vars.animationLoop && target !== slider.currentSlide) slider.direction = (target > slider.currentSlide) ? "next" : "prev";
            if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";
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
                if (pause) slider.pause();
                slider.vars.before(slider);
                if (slider.syncExists && !fromNav) methods.sync("animate");
                if (slider.vars.controlNav) methods.controlNav.active();
                if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
                slider.atEnd = target === 0 || target === slider.last;
                if (slider.vars.directionNav) methods.directionNav.update();
                if (target === slider.last) {
                    slider.vars.end(slider);
                    if (!slider.vars.animationLoop) slider.pause();
                }
                if (!fade) {
                    var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
                        margin, slideString, calcNext;
                    if (carousel) {
                        margin = slider.vars.itemMargin;
                        calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
                        slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
                    } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
                    else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
                    else slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
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
                    } else slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function() {
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
                if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
            }
        };
        slider.wrapup = function(dimension) {
            if (!fade && !carousel)
                if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) slider.setProps(dimension, "jumpEnd");
                else {
                    if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) slider.setProps(dimension, "jumpStart");
                }
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
            slider.vars.after(slider);
        };
        slider.animateSlides = function() {
            if (!slider.animating && focused) slider.flexAnimate(slider.getTarget("next"));
        };
        slider.pause = function() {
            clearInterval(slider.animatedSlides);
            slider.animatedSlides = null;
            slider.playing = false;
            if (slider.vars.pausePlay) methods.pausePlay.update("play");
            if (slider.syncExists) methods.sync("pause");
        };
        slider.play = function() {
            if (slider.playing) clearInterval(slider.animatedSlides);
            slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
            slider.started = slider.playing = true;
            if (slider.vars.pausePlay) methods.pausePlay.update("pause");
            if (slider.syncExists) methods.sync("play");
        };
        slider.stop = function() {
            slider.pause();
            slider.stopped = true;
        };
        slider.canAdvance = function(target, fromNav) {
            var last = (asNav) ? slider.pagingCount - 1 : slider.last;
            return (fromNav) ? true : (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true : (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false : (target === slider.currentSlide && !asNav) ? false : (slider.vars.animationLoop) ? true : (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false : (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false : true;
        };
        slider.getTarget = function(dir) {
            slider.direction = dir;
            if (dir === "next") return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
            else return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
        };
        slider.setProps = function(pos, special, dur) {
            var target = (function() {
                var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
                    posCalc = (function() {
                        if (carousel) return (special === "setTouch") ? pos : (reverse && slider.animatingTo === slider.last) ? 0 : (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) : (slider.animatingTo === slider.last) ? slider.limit : posCheck;
                        else switch (special) {
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
                if (slider.isFirefox) target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + (parseInt(target) + 'px') + ",0,0)";
                else target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + ((slider.vars.rtl ? -1 : 1) * parseInt(target) + 'px') + ",0,0)";
                dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
                slider.container.css("-" + slider.pfx + "-transition-duration", dur);
                slider.container.css("transition-duration", dur);
            }
            slider.args[slider.prop] = target;
            if (slider.transitions || dur === undefined) slider.container.css(slider.args);
            slider.container.css('transform', target);
        };
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
                    if (type !== "init") slider.container.find('.clone').remove();
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
                            if (slider.isFirefox) slider.newSlides.css({
                                "width": slider.computedW,
                                "marginRight": slider.computedM,
                                "float": "right",
                                "display": "block"
                            });
                            else slider.newSlides.css({
                                "width": slider.computedW,
                                "marginRight": slider.computedM,
                                "float": "left",
                                "display": "block"
                            });
                        else slider.newSlides.css({
                            "width": slider.computedW,
                            "marginRight": slider.computedM,
                            "float": "left",
                            "display": "block"
                        });
                        if (slider.vars.smoothHeight) methods.smoothHeight();
                    }, (type === "init") ? 100 : 0);
                }
            } else {
                if (slider.vars.rtl) slider.slides.css({
                    "width": "100%",
                    "float": 'right',
                    "marginLeft": "-100%",
                    "position": "relative"
                });
                else slider.slides.css({
                    "width": "100%",
                    "float": 'left',
                    "marginRight": "-100%",
                    "position": "relative"
                });
                if (type === "init")
                    if (!touch)
                        if (slider.vars.fadeFirstSlide == false) slider.slides.css({
                            "opacity": 0,
                            "display": "block",
                            "zIndex": 1
                        }).eq(slider.currentSlide).css({
                            "zIndex": 2
                        }).css({
                            "opacity": 1
                        });
                        else slider.slides.css({
                            "opacity": 0,
                            "display": "block",
                            "zIndex": 1
                        }).eq(slider.currentSlide).css({
                            "zIndex": 2
                        }).animate({
                            "opacity": 1
                        }, slider.vars.animationSpeed, slider.vars.easing);
                else slider.slides.css({
                    "opacity": 0,
                    "display": "block",
                    "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease",
                    "zIndex": 1
                }).eq(slider.currentSlide).css({
                    "opacity": 1,
                    "zIndex": 2
                });
                if (slider.vars.smoothHeight) methods.smoothHeight();
            }
            if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
            slider.vars.init(slider);
        };
        slider.doMath = function() {
            var slide = slider.slides.first(),
                slideMargin = slider.vars.itemMargin,
                minItems = slider.vars.minItems,
                maxItems = slider.vars.maxItems;
            slider.w = (slider.viewport === undefined) ? slider.width() : slider.viewport.width();
            if (slider.isFirefox) slider.w = slider.width();
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
        };
        slider.update = function(pos, action) {
            slider.doMath();
            if (!carousel) {
                if (pos < slider.currentSlide) slider.currentSlide += 1;
                else {
                    if (pos <= slider.currentSlide && pos !== 0) slider.currentSlide -= 1;
                }
                slider.animatingTo = slider.currentSlide;
            }
            if (slider.vars.controlNav && !slider.manualControls)
                if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) methods.controlNav.update("add");
                else {
                    if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
                        if (carousel && slider.currentSlide > slider.last) {
                            slider.currentSlide -= 1;
                            slider.animatingTo -= 1;
                        }
                        methods.controlNav.update("remove", slider.last);
                    }
                }
            if (slider.vars.directionNav) methods.directionNav.update();
        };
        slider.addSlide = function(obj, pos) {
            var $obj = $(obj);
            slider.count += 1;
            slider.last = slider.count - 1;
            if (vertical && reverse)(pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
            else(pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
            slider.update(pos, "add");
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            slider.setup();
            slider.vars.added(slider);
        };
        slider.removeSlide = function(obj) {
            var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;
            slider.count -= 1;
            slider.last = slider.count - 1;
            if (isNaN(obj)) $(obj, slider.slides).remove();
            else(vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
            slider.doMath();
            slider.update(pos, "remove");
            slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
            slider.setup();
            slider.vars.removed(slider);
        };
        methods.init();
    };
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
        if (options === undefined) options = {};
        if (typeof options === "object") return this.each(function() {
            var $this = $(this),
                selector = (options.selector) ? options.selector : ".slides > li",
                $slides = $this.find(selector);
            if (($slides.length === 1 && options.allowOneSlide === false) || $slides.length === 0) {
                $slides.fadeIn(400);
                if (options.start) options.start($this);
            } else {
                if ($this.data('flexslider') === undefined) new $.flexslider(this, options);
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
                    if (typeof options === "number") $slider.flexAnimate(options, true);
            }
        }
    };
})(jQuery);;
/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
! function() {
    "use strict";
    ! function(e, Drupal, i) {
        function t(t, n, s) {
            e(i("flexslider", "#".concat(t), s)).each((function() {
                e(this).find("ul.slides > li > *").removeAttr("width").removeAttr("height"), n ? e(this).flexslider(e.extend(n, {
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
            }))
        }
        Drupal.behaviors.flexslider = {
            attach: function(i, n) {
                var s, r = [];
                if ("undefined" !== e.type(n.flexslider) && "undefined" !== e.type(n.flexslider.instances))
                    for (s in n.flexslider.instances) n.flexslider.instances.hasOwnProperty(s) && "undefined" !== e.type(n.flexslider.optionsets) && n.flexslider.instances[s] in n.flexslider.optionsets && ("" !== n.flexslider.optionsets[n.flexslider.instances[s]].asNavFor ? t(s, n.flexslider.optionsets[n.flexslider.instances[s]], i) : r[s] = n.flexslider.optionsets[n.flexslider.instances[s]]);
                for (s in r) r.hasOwnProperty(s) && t(s, n.flexslider.optionsets[n.flexslider.instances[s]], i)
            }
        }
    }(jQuery, Drupal, once)
}();;