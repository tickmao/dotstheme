var hljs = new function () {
    var p = {};
    var a = {};

    function n(c) {
        return c.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function k(s, r) {
        if (!s) {
            return false
        }
        for (var c = 0; c < s.length; c++) {
            if (s[c] == r) {
                return true
            }
        }
        return false
    }

    function e(s, r, c) {
        var t = "m" + (s.cI ? "i" : "") + (c ? "g" : "");
        return new RegExp(r, t)
    }

    function j(r) {
        for (var c = 0; c < r.childNodes.length; c++) {
            node = r.childNodes[c];
            if (node.nodeName == "CODE") {
                return node
            }
            if (!(node.nodeType == 3 && node.nodeValue.match(/\s+/))) {
                return null
            }
        }
    }

    function h(u, t) {
        var s = "";
        for (var r = 0; r < u.childNodes.length; r++) {
            if (u.childNodes[r].nodeType == 3) {
                var c = u.childNodes[r].nodeValue;
                if (t) {
                    c = c.replace(/\n/g, "")
                }
                s += c
            } else {
                if (u.childNodes[r].nodeName == "BR") {
                    s += "\n"
                } else {
                    s += h(u.childNodes[r])
                }
            }
        }
        s = s.replace(/\r/g, "\n");
        return s
    }

    function b(t) {
        var r = t.className.split(/\s+/);
        r = r.concat(t.parentNode.className.split(/\s+/));
        for (var c = 0; c < r.length; c++) {
            var s = r[c].replace(/^language-/, "");
            if (p[s] || s == "no-highlight") {
                return s
            }
        }
    }

    function d(c) {
        var r = [];
        (function (t, u) {
            for (var s = 0; s < t.childNodes.length; s++) {
                if (t.childNodes[s].nodeType == 3) {
                    u += t.childNodes[s].nodeValue.length
                } else {
                    if (t.childNodes[s].nodeName == "BR") {
                        u += 1
                    } else {
                        r.push({
                            event: "start",
                            offset: u,
                            node: t.childNodes[s]
                        });
                        u = arguments.callee(t.childNodes[s], u);
                        r.push({
                            event: "stop",
                            offset: u,
                            node: t.childNodes[s]
                        })
                    }
                }
            }
            return u
        })(c, 0);
        return r
    }

    function m(z, A, y) {
        var s = 0;
        var x = "";
        var u = [];

        function v() {
            if (z.length && A.length) {
                if (z[0].offset != A[0].offset) {
                    return (z[0].offset < A[0].offset) ? z : A
                } else {
                    return (z[0].event == "start" && A[0].event == "stop") ? A : z
                }
            } else {
                return z.length ? z : A
            }
        }

        function t(E) {
            var F = "<" + E.nodeName.toLowerCase();
            for (var C = 0; C < E.attributes.length; C++) {
                var D = E.attributes[C];
                F += " " + D.nodeName.toLowerCase();
                if (D.nodeValue != undefined) {
                    F += '="' + n(D.nodeValue) + '"'
                }
            }
            return F + ">"
        }

        function B(C) {
            return "</" + C.nodeName.toLowerCase() + ">"
        }
        while (z.length || A.length) {
            var w = v().splice(0, 1)[0];
            x += n(y.substr(s, w.offset - s));
            s = w.offset;
            if (w.event == "start") {
                x += t(w.node);
                u.push(w.node)
            } else {
                if (w.event == "stop") {
                    var r = u.length;
                    do {
                        r--;
                        var c = u[r];
                        x += B(c)
                    } while (c != w.node);
                    u.splice(r, 1);
                    while (r < u.length) {
                        x += t(u[r]);
                        r++
                    }
                }
            }
        }
        x += y.substr(s);
        return x
    }

    function g(K, E) {
        function A(r, N) {
            for (var M = 0; M < N.sm.length; M++) {
                if (N.sm[M].bR.test(r)) {
                    return N.sm[M]
                }
            }
            return null
        }

        function x(M, r) {
            if (D[M].e && D[M].eR.test(r)) {
                return 1
            }
            if (D[M].eW) {
                var N = x(M - 1, r);
                return N ? N + 1 : 0
            }
            return 0
        }

        function y(r, M) {
            return M.iR && M.iR.test(r)
        }

        function B(P, O) {
            var N = [];
            for (var M = 0; M < P.sm.length; M++) {
                N.push(P.sm[M].b)
            }
            var r = D.length - 1;
            do {
                if (D[r].e) {
                    N.push(D[r].e)
                }
                r--
            } while (D[r + 1].eW);
            if (P.i) {
                N.push(P.i)
            }
            return e(O, "(" + N.join("|") + ")", true)
        }

        function t(N, M) {
            var O = D[D.length - 1];
            if (!O.t) {
                O.t = B(O, I)
            }
            O.t.lastIndex = M;
            var r = O.t.exec(N);
            if (r) {
                return [N.substr(M, r.index - M), r[0], false]
            } else {
                return [N.substr(M), "", true]
            }
        }

        function c(P, r) {
            var M = I.cI ? r[0].toLowerCase() : r[0];
            for (var O in P.keywordGroups) {
                if (!P.keywordGroups.hasOwnProperty(O)) {
                    continue
                }
                var N = P.keywordGroups[O].hasOwnProperty(M);
                if (N) {
                    return [O, N]
                }
            }
            return false
        }

        function G(N, Q) {
            if (!Q.k || !Q.l) {
                return n(N)
            }
            if (!Q.lR) {
                var P = "(" + Q.l.join("|") + ")";
                Q.lR = e(I, P, true)
            }
            var O = "";
            var R = 0;
            Q.lR.lastIndex = 0;
            var M = Q.lR.exec(N);
            while (M) {
                O += n(N.substr(R, M.index - R));
                var r = c(Q, M);
                if (r) {
                    u += r[1];
                    O += '<span class="' + r[0] + '">' + n(M[0]) + "</span>"
                } else {
                    O += n(M[0])
                }
                R = Q.lR.lastIndex;
                M = Q.lR.exec(N)
            }
            O += n(N.substr(R, N.length - R));
            return O
        }

        function L(r, N) {
            if (N.subLanguage && a[N.subLanguage]) {
                var M = g(N.subLanguage, r);
                u += M.keyword_count;
                C += M.r;
                return M.value
            } else {
                return G(r, N)
            }
        }

        function J(N, r) {
            var M = N.nM ? "" : '<span class="' + N.displayClassName + '">';
            if (N.rB) {
                s += M;
                N.buffer = ""
            } else {
                if (N.eB) {
                    s += n(r) + M;
                    N.buffer = ""
                } else {
                    s += M;
                    N.buffer = r
                }
            }
            D[D.length] = N
        }

        function F(M, O, R) {
            var P = D[D.length - 1];
            if (R) {
                s += L(P.buffer + M, P);
                return false
            }
            var S = A(O, P);
            if (S) {
                s += L(P.buffer + M, P);
                J(S, O);
                C += S.r;
                return S.rB
            }
            var r = x(D.length - 1, O);
            if (r) {
                var T = P.nM ? "" : "</span>";
                if (P.rE) {
                    s += L(P.buffer + M, P) + T
                } else {
                    if (P.eE) {
                        s += L(P.buffer + M, P) + T + n(O)
                    } else {
                        s += L(P.buffer + M + O, P) + T
                    }
                }
                while (r > 1) {
                    T = D[D.length - 2].nM ? "" : "</span>";
                    s += T;
                    r--;
                    D.length--
                }
                var Q = D[D.length - 1];
                D.length--;
                D[D.length - 1].buffer = "";
                if (Q.starts) {
                    for (var N = 0; N < I.m.length; N++) {
                        if (I.m[N].cN == Q.starts) {
                            J(I.m[N], "");
                            break
                        }
                    }
                }
                return P.rE
            }
            if (y(O, P)) {
                throw "Illegal"
            }
        }
        var I = p[K];
        var D = [I.dM];
        var C = 0;
        var u = 0;
        var s = "";
        try {
            var w = 0;
            I.dM.buffer = "";
            do {
                var z = t(E, w);
                var v = F(z[0], z[1], z[2]);
                w += z[0].length;
                if (!v) {
                    w += z[1].length
                }
            } while (!z[2]);
            if (D.length > 1) {
                throw "Illegal"
            }
            return {
                language: K,
                r: C,
                keyword_count: u,
                value: s
            }
        } catch (H) {
            if (H == "Illegal") {
                return {
                    language: null,
                    r: 0,
                    keyword_count: 0,
                    value: n(E)
                }
            } else {
                throw H
            }
        }
    }

    function i() {
        function r(y, x) {
            if (y.compiled) {
                return
            }
            if (y.b) {
                y.bR = e(x, "^" + y.b)
            }
            if (y.e) {
                y.eR = e(x, "^" + y.e)
            }
            if (y.i) {
                y.iR = e(x, "^(?:" + y.i + ")")
            }
            if (y.r == undefined) {
                y.r = 1
            }
            if (!y.displayClassName) {
                y.displayClassName = y.cN
            }
            if (!y.cN) {
                y.nM = true
            }
            for (var w in y.k) {
                if (!y.k.hasOwnProperty(w)) {
                    continue
                }
                if (y.k[w] instanceof Object) {
                    y.keywordGroups = y.k
                } else {
                    y.keywordGroups = {
                        keyword: y.k
                    }
                }
                break
            }
            y.sm = [];
            if (y.c) {
                for (var v = 0; v < y.c.length; v++) {
                    if (y.c[v] instanceof Object) {
                        y.sm.push(y.c[v])
                    } else {
                        for (var u = 0; u < x.m.length; u++) {
                            if (x.m[u].cN == y.c[v]) {
                                y.sm.push(x.m[u])
                            }
                        }
                    }
                }
            }
            y.compiled = true;
            for (var v = 0; v < y.sm.length; v++) {
                r(y.sm[v], x)
            }
        }
        for (var t in p) {
            if (!p.hasOwnProperty(t)) {
                continue
            }
            var c = [p[t].dM].concat(p[t].m);
            for (var s = 0; s < c.length; s++) {
                r(c[s], p[t])
            }
        }
    }

    function f() {
        if (f.called) {
            return
        }
        f.called = true;
        i();
        a = p
    }

    function q(v, A, r) {
        f();
        var C = h(v, r);
        var t = b(v);
        if (t == "no-highlight") {
            return
        }
        if (t) {
            var y = g(t, C)
        } else {
            var y = {
                language: "",
                keyword_count: 0,
                r: 0,
                value: n(C)
            };
            var z = y;
            for (var B in a) {
                if (!a.hasOwnProperty(B)) {
                    continue
                }
                var w = g(B, C);
                if (w.keyword_count + w.r > z.keyword_count + z.r) {
                    z = w
                }
                if (w.keyword_count + w.r > y.keyword_count + y.r) {
                    z = y;
                    y = w
                }
            }
        }
        var u = v.className;
        if (!u.match(y.language)) {
            u = u ? (u + " " + y.language) : y.language
        }
        var c = d(v);
        if (c.length) {
            var s = document.createElement("pre");
            s.innerHTML = y.value;
            y.value = m(c, d(s), C)
        }
        if (A) {
            y.value = y.value.replace(/^((<[^>]+>|\t)+)/gm, function (D, G, F, E) {
                return G.replace(/\t/g, A)
            })
        }
        if (r) {
            y.value = y.value.replace(/\n/g, "<br>")
        }
        if (/MSIE [678]/.test(navigator.userAgent) && v.tagName == "CODE" && v.parentNode.tagName == "PRE") {
            var s = v.parentNode;
            var x = document.createElement("div");
            x.innerHTML = "<pre><code>" + y.value + "</code></pre>";
            v = x.firstChild.firstChild;
            x.firstChild.cN = s.cN;
            s.parentNode.replaceChild(x.firstChild, s)
        } else {
            v.innerHTML = y.value
        }
        v.className = u;
        v.dataset = {};
        v.dataset.result = {
            language: y.language,
            kw: y.keyword_count,
            re: y.r
        };
        if (z && z.language) {
            v.dataset.second_best = {
                language: z.language,
                kw: z.keyword_count,
                re: z.r
            }
        }
    }

    function l() {
        if (l.called) {
            return
        }
        l.called = true;
        f();
        if (arguments.length) {
            for (var c = 0; c < arguments.length; c++) {
                if (p[arguments[c]]) {
                    a[arguments[c]] = p[arguments[c]]
                }
            }
        }
        var s = document.getElementsByTagName("pre");
        for (var c = 0; c < s.length; c++) {
            var r = j(s[c]);
            if (r) {
                q(r, hljs.tabReplace)
            }
        }
    }

    function o() {
        var c = arguments;
        var r = function () {
            l.apply(null, c)
        };
        if (window.addEventListener) {
            window.addEventListener("DOMContentLoaded", r, false);
            window.addEventListener("load", r, false)
        } else {
            if (window.attachEvent) {
                window.attachEvent("onload", r)
            } else {
                window.onload = r
            }
        }
    }
    this.LANGUAGES = p;
    this.initHighlightingOnLoad = o;
    this.highlightBlock = q;
    this.initHighlighting = l;
    this.IMR = "\\b|\\B";
    this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
    this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
    this.NR = "\\b\\d+(\\.\\d+)?";
    this.CNR = "\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";
    this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: ["escape"],
        r: 0
    };
    this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: ["escape"],
        r: 0
    };
    this.BE = {
        cN: "escape",
        b: "\\\\.",
        e: this.IMR,
        nM: true,
        r: 0
    };
    this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$",
        r: 0
    };
    this.CBLCLM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/"
    };
    this.HCM = {
        cN: "comment",
        b: "#",
        e: "$"
    };
    this.NUMBER_MODE = {
        cN: "number",
        b: this.NR,
        e: this.IMR,
        r: 0
    };
    this.CNM = {
        cN: "number",
        b: this.CNR,
        e: this.IMR,
        r: 0
    };
    this.inherit = function (c, t) {
        var s = {};
        for (var r in c) {
            s[r] = c[r]
        }
        if (t) {
            for (var r in t) {
                s[r] = t[r]
            }
        }
        return s
    }
}();
var initHighlightingOnLoad = hljs.initHighlightingOnLoad;
hljs.LANGUAGES.bash = function () {
    var a = {
        "true": 1,
        "false": 1
    };
    return {
        dM: {
            l: [hljs.IR],
            c: ["string", "shebang", "comment", "number", "test_condition", "string", "variable"],
            k: {
                keyword: {
                    "if": 1,
                    then: 1,
                    "else": 1,
                    fi: 1,
                    "for": 1,
                    "break": 1,
                    "continue": 1,
                    "while": 1,
                    "in": 1,
                    "do": 1,
                    done: 1,
                    echo: 1,
                    exit: 1,
                    "return": 1,
                    set: 1,
                    declare: 1
                },
                literal: a
            }
        },
        cI: false,
        m: [{
            cN: "shebang",
            b: "(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",
            e: hljs.IMR,
            r: 10
        }, hljs.HCM, {
            cN: "test_condition",
            b: "\\[ ",
            e: " \\]",
            c: ["string", "variable", "number"],
            l: [hljs.IR],
            k: {
                literal: a
            },
            r: 0
        }, {
            cN: "test_condition",
            b: "\\[\\[ ",
            e: " \\]\\]",
            c: ["string", "variable", "number"],
            l: [hljs.IR],
            k: {
                literal: a
            }
        }, {
            cN: "variable",
            b: "\\$([a-zA-Z0-9_]+)\\b",
            e: hljs.IMR
        }, {
            cN: "variable",
            b: "\\$\\{(([^}])|(\\\\}))+\\}",
            e: hljs.IMR,
            c: ["number"]
        }, {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n",
            c: ["escape", "variable"],
            r: 0
        }, {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n",
            c: ["escape", "variable"],
            r: 0
        }, hljs.BE, hljs.CNM, {
            cN: "comment",
            b: "\\/\\/",
            e: "$",
            i: "."
        }]
    }
}();
hljs.LANGUAGES.diff = {
    cI: true,
    dM: {
        c: ["chunk", "header", "addition", "deletion", "change"]
    },
    m: [{
        cN: "chunk",
        b: "^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",
        e: hljs.IMR,
        r: 10
    }, {
        cN: "chunk",
        b: "^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",
        e: hljs.IMR,
        r: 10
    }, {
        cN: "chunk",
        b: "^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",
        e: hljs.IMR,
        r: 10
    }, {
        cN: "header",
        b: "Index: ",
        e: "$"
    }, {
        cN: "header",
        b: "=====",
        e: "=====$"
    }, {
        cN: "header",
        b: "^\\-\\-\\-",
        e: "$"
    }, {
        cN: "header",
        b: "^\\*{3} ",
        e: "$"
    }, {
        cN: "header",
        b: "^\\+\\+\\+",
        e: "$"
    }, {
        cN: "header",
        b: "\\*{5}",
        e: "\\*{5}$"
    }, {
        cN: "addition",
        b: "^\\+",
        e: "$"
    }, {
        cN: "deletion",
        b: "^\\-",
        e: "$"
    }, {
        cN: "change",
        b: "^\\!",
        e: "$"
    }]
};
(function () {
    var d = "[A-Za-z0-9\\._:-]+";
    var k = {
        cN: "pi",
        b: "<\\?",
        e: "\\?>",
        r: 10
    };
    var i = {
        cN: "doctype",
        b: "<!DOCTYPE",
        e: ">",
        r: 10
    };
    var j = {
        cN: "comment",
        b: "<!--",
        e: "-->"
    };
    var g = {
        cN: "tag",
        b: "</?",
        e: "/?>",
        c: ["title", "tag_internal"]
    };
    var e = {
        cN: "title",
        b: d,
        e: hljs.IMR
    };
    var b = {
        cN: "tag_internal",
        b: hljs.IMR,
        eW: true,
        nM: true,
        c: ["attribute", "value_container"],
        r: 0
    };
    var f = {
        cN: "attribute",
        b: d,
        e: hljs.IMR,
        r: 0
    };
    var a = {
        cN: "value_container",
        b: '="',
        rB: true,
        e: '"',
        nM: true,
        c: [{
            cN: "value",
            b: '"',
            eW: true
        }]
    };
    var c = {
        cN: "value_container",
        b: "='",
        rB: true,
        e: "'",
        nM: true,
        c: [{
            cN: "value",
            b: "'",
            eW: true
        }]
    };
    hljs.LANGUAGES.xml = {
        dM: {
            c: ["pi", "doctype", "comment", "cdata", "tag"]
        },
        cI: true,
        m: [{
            cN: "cdata",
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, k, i, j, g, hljs.inherit(e, {
            r: 1.75
        }), b, f, a, c]
    };
    var h = {
        code: 1,
        kbd: 1,
        font: 1,
        noscript: 1,
        style: 1,
        img: 1,
        title: 1,
        menu: 1,
        tt: 1,
        tr: 1,
        param: 1,
        li: 1,
        tfoot: 1,
        th: 1,
        input: 1,
        td: 1,
        dl: 1,
        blockquote: 1,
        fieldset: 1,
        big: 1,
        dd: 1,
        abbr: 1,
        optgroup: 1,
        dt: 1,
        button: 1,
        isindex: 1,
        p: 1,
        small: 1,
        div: 1,
        dir: 1,
        em: 1,
        frame: 1,
        meta: 1,
        sub: 1,
        bdo: 1,
        label: 1,
        acronym: 1,
        sup: 1,
        body: 1,
        basefont: 1,
        base: 1,
        br: 1,
        address: 1,
        strong: 1,
        legend: 1,
        ol: 1,
        script: 1,
        caption: 1,
        s: 1,
        col: 1,
        h2: 1,
        h3: 1,
        h1: 1,
        h6: 1,
        h4: 1,
        h5: 1,
        table: 1,
        select: 1,
        noframes: 1,
        span: 1,
        area: 1,
        dfn: 1,
        strike: 1,
        cite: 1,
        thead: 1,
        head: 1,
        option: 1,
        form: 1,
        hr: 1,
        "var": 1,
        link: 1,
        b: 1,
        colgroup: 1,
        ul: 1,
        applet: 1,
        del: 1,
        iframe: 1,
        pre: 1,
        frameset: 1,
        ins: 1,
        tbody: 1,
        html: 1,
        samp: 1,
        map: 1,
        object: 1,
        a: 1,
        xmlns: 1,
        center: 1,
        textarea: 1,
        i: 1,
        q: 1,
        u: 1,
        section: 1,
        nav: 1,
        article: 1,
        aside: 1,
        hgroup: 1,
        header: 1,
        footer: 1,
        figure: 1,
        figurecaption: 1,
        time: 1,
        mark: 1,
        wbr: 1,
        embed: 1,
        video: 1,
        audio: 1,
        source: 1,
        canvas: 1,
        datalist: 1,
        keygen: 1,
        output: 1,
        progress: 1,
        meter: 1,
        details: 1,
        summary: 1,
        command: 1
    };
    hljs.LANGUAGES.html = {
        dM: {
            c: ["comment", "pi", "doctype", "vbscript", "tag"]
        },
        cI: true,
        m: [{
            cN: "tag",
            b: "<style",
            e: ">",
            l: [hljs.IR],
            k: {
                style: 1
            },
            c: ["tag_internal"],
            starts: "css"
        }, {
            cN: "tag",
            b: "<script",
            e: ">",
            l: [hljs.IR],
            k: {
                script: 1
            },
            c: ["tag_internal"],
            starts: "javascript"
        }, {
            cN: "css",
            e: "</style>",
            rE: true,
            subLanguage: "css"
        }, {
            cN: "javascript",
            e: "<\/script>",
            rE: true,
            subLanguage: "javascript"
        }, {
            cN: "vbscript",
            b: "<%",
            e: "%>",
            subLanguage: "vbscript"
        }, j, k, i, hljs.inherit(g), hljs.inherit(e, {
            l: [hljs.IR],
            k: h
        }), hljs.inherit(b), f, a, c, {
            cN: "value_container",
            b: "=",
            e: hljs.IMR,
            c: [{
                cN: "unquoted_value",
                displayClassName: "value",
                b: "[^\\s/>]+",
                e: hljs.IMR
            }]
        }]
    }
})();
hljs.LANGUAGES.javascript = {
    dM: {
        l: [hljs.UIR],
        c: ["string", "comment", "number", "regexp_container", "function"],
        k: {
            keyword: {
                "in": 1,
                "if": 1,
                "for": 1,
                "while": 1,
                "finally": 1,
                "var": 1,
                "new": 1,
                "function": 1,
                "do": 1,
                "return": 1,
                "void": 1,
                "else": 1,
                "break": 1,
                "catch": 1,
                "instanceof": 1,
                "with": 1,
                "throw": 1,
                "case": 1,
                "default": 1,
                "try": 1,
                "this": 1,
                "switch": 1,
                "continue": 1,
                "typeof": 1,
                "delete": 1
            },
            literal: {
                "true": 1,
                "false": 1,
                "null": 1
            }
        }
    },
    m: [hljs.CLCM, hljs.CBLCLM, hljs.CNM, hljs.ASM, hljs.QSM, hljs.BE, {
        cN: "regexp_container",
        b: "(" + hljs.RSR + "|case|return|throw)\\s*",
        e: hljs.IMR,
        nM: true,
        l: [hljs.IR],
        k: {
            "return": 1,
            "throw": 1,
            "case": 1
        },
        c: ["comment", {
            cN: "regexp",
            b: "/.*?[^\\\\/]/[gim]*",
            e: hljs.IMR
        }],
        r: 0
    }, {
        cN: "function",
        b: "\\bfunction\\b",
        e: "{",
        l: [hljs.UIR],
        k: {
            "function": 1
        },
        c: [{
            cN: "title",
            b: "[A-Za-z$_][0-9A-Za-z$_]*",
            e: hljs.IMR
        }, {
            cN: "params",
            b: "\\(",
            e: "\\)",
            c: ["string", "comment"]
        }]
    }]
};
hljs.LANGUAGES.lua = function () {
    var a = "\\[=*\\[",
        b = "\\]=*\\]";
    return {
        dM: {
            l: [hljs.UIR],
            k: {
                keyword: {
                    and: 1,
                    "break": 1,
                    "do": 1,
                    "else": 1,
                    elseif: 1,
                    end: 1,
                    "false": 1,
                    "for": 1,
                    "if": 1,
                    "in": 1,
                    local: 1,
                    nil: 1,
                    not: 1,
                    or: 1,
                    repeat: 1,
                    "return": 1,
                    then: 1,
                    "true": 1,
                    until: 1,
                    "while": 1
                },
                built_in: {
                    _G: 1,
                    _VERSION: 1,
                    assert: 1,
                    collectgarbage: 1,
                    dofile: 1,
                    error: 1,
                    getfenv: 1,
                    getmetatable: 1,
                    ipairs: 1,
                    load: 1,
                    loadfile: 1,
                    loadstring: 1,
                    module: 1,
                    next: 1,
                    pairs: 1,
                    pcall: 1,
                    print: 1,
                    rawequal: 1,
                    rawget: 1,
                    rawset: 1,
                    require: 1,
                    select: 1,
                    setfenv: 1,
                    setmetatable: 1,
                    tonumber: 1,
                    tostring: 1,
                    type: 1,
                    unpack: 1,
                    xpcall: 1,
                    coroutine: 1,
                    debug: 1,
                    io: 1,
                    math: 1,
                    os: 1,
                    "package": 1,
                    string: 1,
                    table: 1
                }
            },
            c: ["comment", "function", "number", "string"]
        },
        m: [{
            cN: "comment",
            b: "--(?!" + a + ")",
            e: "$"
        }, {
            cN: "comment",
            b: "--" + a,
            e: b,
            c: ["long_brackets"],
            r: 10
        }, {
            cN: "long_brackets",
            b: a,
            e: b,
            c: ["long_brackets"],
            nM: true
        }, {
            cN: "function",
            b: "\\bfunction\\b",
            e: "\\)",
            l: [hljs.UIR],
            k: {
                "function": 1
            },
            c: [{
                cN: "title",
                b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*",
                e: hljs.IMR
            }, {
                cN: "params",
                b: "\\(",
                eW: true,
                c: ["comment"]
            }, "comment"]
        }, hljs.CNM, hljs.ASM, hljs.QSM, {
            cN: "string",
            b: a,
            e: b,
            c: ["long_brackets"],
            r: 10
        }, hljs.BE]
    }
}();
hljs.LANGUAGES.css = {
    dM: {
        c: ["at_rule", "id", "class", "attr_selector", "pseudo", "rules", "comment"],
        k: hljs.HTML_TAGS,
        l: [hljs.IR],
        i: "="
    },
    cI: true,
    m: [{
        cN: "at_rule",
        b: "@",
        e: "[{;]",
        eE: true,
        l: [hljs.IR],
        k: {
            "import": 1,
            page: 1,
            media: 1,
            charset: 1,
            "font-face": 1
        },
        c: ["function", "string", "number", "pseudo"]
    }, {
        cN: "id",
        b: "\\#[A-Za-z0-9_-]+",
        e: hljs.IMR
    }, {
        cN: "class",
        b: "\\.[A-Za-z0-9_-]+",
        e: hljs.IMR,
        r: 0
    }, {
        cN: "attr_selector",
        b: "\\[",
        e: "\\]",
        i: "$"
    }, {
        cN: "pseudo",
        b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+",
        e: hljs.IMR
    }, {
        cN: "rules",
        b: "{",
        e: "}",
        c: [{
            cN: "rule",
            b: "[A-Z\\_\\.\\-]+\\s*:",
            e: ";",
            eW: true,
            l: ["[A-Za-z-]+"],
            k: {
                "play-during": 1,
                "counter-reset": 1,
                "counter-increment": 1,
                "min-height": 1,
                quotes: 1,
                "border-top": 1,
                pitch: 1,
                font: 1,
                pause: 1,
                "list-style-image": 1,
                "border-width": 1,
                cue: 1,
                "outline-width": 1,
                "border-left": 1,
                elevation: 1,
                richness: 1,
                "speech-rate": 1,
                "border-bottom": 1,
                "border-spacing": 1,
                background: 1,
                "list-style-type": 1,
                "text-align": 1,
                "page-break-inside": 1,
                orphans: 1,
                "page-break-before": 1,
                "text-transform": 1,
                "line-height": 1,
                "padding-left": 1,
                "font-size": 1,
                right: 1,
                "word-spacing": 1,
                "padding-top": 1,
                "outline-style": 1,
                bottom: 1,
                content: 1,
                "border-right-style": 1,
                "padding-right": 1,
                "border-left-style": 1,
                "voice-family": 1,
                "background-color": 1,
                "border-bottom-color": 1,
                "outline-color": 1,
                "unicode-bidi": 1,
                "max-width": 1,
                "font-family": 1,
                "caption-side": 1,
                "border-right-width": 1,
                "pause-before": 1,
                "border-top-style": 1,
                color: 1,
                "border-collapse": 1,
                "border-bottom-width": 1,
                "float": 1,
                height: 1,
                "max-height": 1,
                "margin-right": 1,
                "border-top-width": 1,
                speak: 1,
                "speak-header": 1,
                top: 1,
                "cue-before": 1,
                "min-width": 1,
                width: 1,
                "font-variant": 1,
                "border-top-color": 1,
                "background-position": 1,
                "empty-cells": 1,
                direction: 1,
                "border-right": 1,
                visibility: 1,
                padding: 1,
                "border-style": 1,
                "background-attachment": 1,
                overflow: 1,
                "border-bottom-style": 1,
                cursor: 1,
                margin: 1,
                display: 1,
                "border-left-width": 1,
                "letter-spacing": 1,
                "vertical-align": 1,
                clip: 1,
                "border-color": 1,
                "list-style": 1,
                "padding-bottom": 1,
                "pause-after": 1,
                "speak-numeral": 1,
                "margin-left": 1,
                widows: 1,
                border: 1,
                "font-style": 1,
                "border-left-color": 1,
                "pitch-range": 1,
                "background-repeat": 1,
                "table-layout": 1,
                "margin-bottom": 1,
                "speak-punctuation": 1,
                "font-weight": 1,
                "border-right-color": 1,
                "page-break-after": 1,
                position: 1,
                "white-space": 1,
                "text-indent": 1,
                "background-image": 1,
                volume: 1,
                stress: 1,
                outline: 1,
                clear: 1,
                "z-index": 1,
                "text-decoration": 1,
                "margin-top": 1,
                azimuth: 1,
                "cue-after": 1,
                left: 1,
                "list-style-position": 1
            },
            c: [{
                cN: "value",
                b: hljs.IMR,
                eW: true,
                eE: true,
                c: ["function", "number", "hexcolor", "string", "important", "comment"]
            }]
        }, "comment"],
        i: "[^\\s]"
    }, hljs.CBLCLM, {
        cN: "number",
        b: hljs.NR,
        e: hljs.IMR
    }, {
        cN: "hexcolor",
        b: "\\#[0-9A-F]+",
        e: hljs.IMR
    }, {
        cN: "function",
        b: hljs.IR + "\\(",
        e: "\\)",
        c: [{
            cN: "params",
            b: hljs.IMR,
            eW: true,
            eE: true,
            c: ["number", "string"]
        }]
    }, {
        cN: "important",
        b: "!important",
        e: hljs.IMR
    }, hljs.ASM, hljs.QSM, hljs.BE]
};
hljs.LANGUAGES.lisp = function () {
    var a = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#]*";
    var b = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?";
    return {
        cI: true,
        dM: {
            l: [a],
            c: ["literal", "number", "string", "comment", "quoted", "list"],
            i: "[^\\s]"
        },
        m: [{
            cN: "string",
            b: '"',
            e: '"',
            c: ["escape"],
            r: 0
        }, hljs.BE, {
            cN: "number",
            b: b,
            e: hljs.IMR
        }, {
            cN: "number",
            b: "#b[0-1]+(/[0-1]+)?",
            e: hljs.IMR
        }, {
            cN: "number",
            b: "#o[0-7]+(/[0-7]+)?",
            e: hljs.IMR
        }, {
            cN: "number",
            b: "#x[0-9a-f]+(/[0-9a-f]+)?",
            e: hljs.IMR
        }, {
            cN: "number",
            b: "#c\\(" + b + " +" + b,
            e: "\\)"
        }, {
            cN: "comment",
            b: ";",
            e: "$"
        }, {
            cN: "quoted",
            b: "['`]\\(",
            e: "\\)",
            c: ["number", "string", "variable", "keyword", "quoted_list"]
        }, {
            cN: "quoted",
            b: "\\(quote ",
            e: "\\)",
            c: ["number", "string", "variable", "keyword", "quoted_list"],
            l: [a],
            k: {
                title: {
                    quote: 1
                }
            }
        }, {
            cN: "quoted_list",
            b: "\\(",
            e: "\\)",
            c: ["quoted_list", "literal", "number", "string"]
        }, {
            cN: "list",
            b: "\\(",
            e: "\\)",
            c: ["title", "body"]
        }, {
            cN: "title",
            b: a,
            e: hljs.IMR,
            eW: true
        }, {
            cN: "body",
            b: hljs.IMR,
            eW: true,
            eE: true,
            c: ["quoted", "list", "literal", "number", "string", "comment", "variable", "keyword"]
        }, {
            cN: "keyword",
            b: "[:&]" + a,
            e: hljs.IMR
        }, {
            cN: "variable",
            b: "\\*",
            e: "\\*"
        }, {
            cN: "literal",
            b: "\\b(t{1}|nil)\\b",
            e: hljs.IMR
        }]
    }
}();
hljs.LANGUAGES.java = {
    dM: {
        l: [hljs.UIR],
        c: ["javadoc", "comment", "string", "class", "number", "annotation"],
        k: {
            "false": 1,
            "synchronized": 1,
            "int": 1,
            "abstract": 1,
            "float": 1,
            "private": 1,
            "char": 1,
            "interface": 1,
            "boolean": 1,
            "static": 1,
            "null": 1,
            "if": 1,
            "const": 1,
            "for": 1,
            "true": 1,
            "while": 1,
            "long": 1,
            "throw": 1,
            strictfp: 1,
            "finally": 1,
            "protected": 1,
            "extends": 1,
            "import": 1,
            "native": 1,
            "final": 1,
            "implements": 1,
            "return": 1,
            "void": 1,
            "enum": 1,
            "else": 1,
            "break": 1,
            "transient": 1,
            "new": 1,
            "catch": 1,
            "instanceof": 1,
            "byte": 1,
            "super": 1,
            "class": 1,
            "volatile": 1,
            "case": 1,
            assert: 1,
            "short": 1,
            "package": 1,
            "default": 1,
            "double": 1,
            "public": 1,
            "try": 1,
            "this": 1,
            "switch": 1,
            "continue": 1,
            "throws": 1
        }
    },
    m: [{
        cN: "class",
        l: [hljs.UIR],
        b: "(class |interface )",
        e: "{",
        i: ":",
        k: {
            "class": 1,
            "interface": 1
        },
        c: [{
            b: "(implements|extends)",
            e: hljs.IMR,
            l: [hljs.IR],
            k: {
                "extends": 1,
                "implements": 1
            },
            r: 10
        }, {
            cN: "title",
            b: hljs.UIR,
            e: hljs.IMR
        }]
    }, hljs.CNM, hljs.ASM, hljs.QSM, hljs.BE, hljs.CLCM, {
        cN: "javadoc",
        b: "/\\*\\*",
        e: "\\*/",
        c: [{
            cN: "javadoctag",
            b: "@[A-Za-z]+",
            e: hljs.IMR
        }],
        r: 10
    }, hljs.CBLCLM, {
        cN: "annotation",
        b: "@[A-Za-z]+",
        e: hljs.IMR
    }]
};
hljs.LANGUAGES.php = {
    dM: {
        l: [hljs.IR],
        c: ["comment", "number", "string", "variable", "preprocessor"],
        k: {
            and: 1,
            include_once: 1,
            list: 1,
            "abstract": 1,
            global: 1,
            "private": 1,
            echo: 1,
            "interface": 1,
            as: 1,
            "static": 1,
            endswitch: 1,
            array: 1,
            "null": 1,
            "if": 1,
            endwhile: 1,
            or: 1,
            "const": 1,
            "for": 1,
            endforeach: 1,
            self: 1,
            "var": 1,
            "while": 1,
            isset: 1,
            "public": 1,
            "protected": 1,
            exit: 1,
            foreach: 1,
            "throw": 1,
            elseif: 1,
            "extends": 1,
            include: 1,
            __FILE__: 1,
            empty: 1,
            require_once: 1,
            "function": 1,
            "do": 1,
            xor: 1,
            "return": 1,
            "implements": 1,
            parent: 1,
            clone: 1,
            use: 1,
            __CLASS__: 1,
            __LINE__: 1,
            "else": 1,
            "break": 1,
            print: 1,
            "eval": 1,
            "new": 1,
            "catch": 1,
            __METHOD__: 1,
            "class": 1,
            "case": 1,
            exception: 1,
            php_user_filter: 1,
            "default": 1,
            die: 1,
            require: 1,
            __FUNCTION__: 1,
            enddeclare: 1,
            "final": 1,
            "try": 1,
            "this": 1,
            "switch": 1,
            "continue": 1,
            endfor: 1,
            endif: 1,
            declare: 1,
            unset: 1,
            "true": 1,
            "false": 1,
            namespace: 1
        }
    },
    cI: true,
    m: [hljs.CLCM, hljs.HCM, {
        cN: "comment",
        b: "/\\*",
        e: "\\*/",
        c: [{
            cN: "phpdoc",
            b: "\\s@[A-Za-z]+",
            e: hljs.IMR,
            r: 10
        }]
    }, hljs.CNM, {
        cN: "string",
        b: "'",
        e: "'",
        c: ["escape"],
        r: 0
    }, {
        cN: "string",
        b: '"',
        e: '"',
        c: ["escape"],
        r: 0
    }, hljs.BE, {
        cN: "variable",
        b: "\\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*",
        e: hljs.IMR
    }, {
        cN: "preprocessor",
        b: "<\\?php",
        e: hljs.IMR,
        r: 10
    }, {
        cN: "preprocessor",
        b: "\\?>",
        e: hljs.IMR
    }]
};
hljs.LANGUAGES["1c"] = function () {
    var a = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*";
    var c = {
        "возврат": 1,
        "дата": 1,
        "для": 1,
        "если": 1,
        "и": 1,
        "или": 1,
        "иначе": 1,
        "иначеесли": 1,
        "исключение": 1,
        "конецесли": 1,
        "конецпопытки": 1,
        "конецпроцедуры": 1,
        "конецфункции": 1,
        "конеццикла": 1,
        "константа": 1,
        "не": 1,
        "перейти": 1,
        "перем": 1,
        "перечисление": 1,
        "по": 1,
        "пока": 1,
        "попытка": 1,
        "прервать": 1,
        "продолжить": 1,
        "процедура": 1,
        "строка": 1,
        "тогда": 1,
        "фс": 1,
        "функция": 1,
        "цикл": 1,
        "число": 1,
        "экспорт": 1
    };
    var b = {
        ansitooem: 1,
        oemtoansi: 1,
        "ввестивидсубконто": 1,
        "ввестидату": 1,
        "ввестизначение": 1,
        "ввестиперечисление": 1,
        "ввестипериод": 1,
        "ввестиплансчетов": 1,
        "ввестистроку": 1,
        "ввестичисло": 1,
        "вопрос": 1,
        "восстановитьзначение": 1,
        "врег": 1,
        "выбранныйплансчетов": 1,
        "вызватьисключение": 1,
        "датагод": 1,
        "датамесяц": 1,
        "датачисло": 1,
        "добавитьмесяц": 1,
        "завершитьработусистемы": 1,
        "заголовоксистемы": 1,
        "записьжурналарегистрации": 1,
        "запуститьприложение": 1,
        "зафиксироватьтранзакцию": 1,
        "значениевстроку": 1,
        "значениевстрокувнутр": 1,
        "значениевфайл": 1,
        "значениеизстроки": 1,
        "значениеизстрокивнутр": 1,
        "значениеизфайла": 1,
        "имякомпьютера": 1,
        "имяпользователя": 1,
        "каталогвременныхфайлов": 1,
        "каталогиб": 1,
        "каталогпользователя": 1,
        "каталогпрограммы": 1,
        "кодсимв": 1,
        "командасистемы": 1,
        "конгода": 1,
        "конецпериодаби": 1,
        "конецрассчитанногопериодаби": 1,
        "конецстандартногоинтервала": 1,
        "конквартала": 1,
        "конмесяца": 1,
        "коннедели": 1,
        "лев": 1,
        "лог": 1,
        "лог10": 1,
        "макс": 1,
        "максимальноеколичествосубконто": 1,
        "мин": 1,
        "монопольныйрежим": 1,
        "названиеинтерфейса": 1,
        "названиенабораправ": 1,
        "назначитьвид": 1,
        "назначитьсчет": 1,
        "найти": 1,
        "найтипомеченныенаудаление": 1,
        "найтиссылки": 1,
        "началопериодаби": 1,
        "началостандартногоинтервала": 1,
        "начатьтранзакцию": 1,
        "начгода": 1,
        "начквартала": 1,
        "начмесяца": 1,
        "начнедели": 1,
        "номерднягода": 1,
        "номерднянедели": 1,
        "номернеделигода": 1,
        "нрег": 1,
        "обработкаожидания": 1,
        "окр": 1,
        "описаниеошибки": 1,
        "основнойжурналрасчетов": 1,
        "основнойплансчетов": 1,
        "основнойязык": 1,
        "открытьформу": 1,
        "открытьформумодально": 1,
        "отменитьтранзакцию": 1,
        "очиститьокносообщений": 1,
        "периодстр": 1,
        "полноеимяпользователя": 1,
        "получитьвремята": 1,
        "получитьдатута": 1,
        "получитьдокументта": 1,
        "получитьзначенияотбора": 1,
        "получитьпозициюта": 1,
        "получитьпустоезначение": 1,
        "получитьта": 1,
        "прав": 1,
        "праводоступа": 1,
        "предупреждение": 1,
        "префиксавтонумерации": 1,
        "пустаястрока": 1,
        "пустоезначение": 1,
        "рабочаядаттьпустоезначение": 1,
        "получитьта": 1,
        "прав": 1,
        "праводоступа": 1,
        "предупреждение": 1,
        "префиксавтонумерации": 1,
        "пустаястрока": 1,
        "пустоезначение": 1,
        "рабочаядата": 1,
        "разделительстраниц": 1,
        "разделительстрок": 1,
        "разм": 1,
        "разобратьпозициюдокумента": 1,
        "рассчитатьрегистрына": 1,
        "рассчитатьрегистрыпо": 1,
        "сигнал": 1,
        "симв": 1,
        "символтабуляции": 1,
        "создатьобъект": 1,
        "сокрл": 1,
        "сокрлп": 1,
        "сокрп": 1,
        " сообщить": 1,
        "состояние": 1,
        "сохранитьзначение": 1,
        "сред": 1,
        "статусвозврата": 1,
        "стрдлина": 1,
        "стрзаменить": 1,
        "стрколичествострок": 1,
        "стрполучитьстроку": 1,
        " стрчисловхождений": 1,
        "сформироватьпозициюдокумента": 1,
        "счетпокоду": 1,
        "текущаядата": 1,
        "текущеевремя": 1,
        "типзначения": 1,
        "типзначениястр": 1,
        "удалитьобъекты": 1,
        "установитьтана": 1,
        "установитьтапо": 1,
        "фиксшаблон": 1,
        "формат": 1,
        "цел": 1,
        "шаблон": 1
    };
    return {
        dM: {
            l: [a],
            c: ["comment", "string", "function", "preprocessor", "number", "date"],
            k: {
                keyword: c,
                built_in: b
            }
        },
        cI: true,
        m: [hljs.CLCM, {
            cN: "string",
            b: '"',
            e: '"',
            c: ["dquote"],
            r: 0
        }, {
            cN: "string",
            b: '"',
            e: "$",
            c: ["dquote"]
        }, {
            cN: "string",
            b: "\\|",
            e: "$",
            c: ["dquote"]
        }, {
            cN: "string",
            b: "\\|",
            e: '"',
            c: ["dquote"]
        }, {
            cN: "date",
            b: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'",
            e: hljs.IMR
        }, {
            cN: "dquote",
            b: '""',
            e: hljs.IMR
        }, hljs.NUMBER_MODE, {
            cN: "title",
            b: a,
            e: hljs.IMR
        }, {
            cN: "function",
            b: "(процедура|функция)",
            e: "$",
            l: [a],
            k: {
                "процедура": 1,
                "экспорт": 1,
                "функция": 1
            },
            c: ["title", {
                cN: "tail",
                b: hljs.IMR,
                eW: true,
                c: [{
                    cN: "params",
                    b: "\\(",
                    e: "\\)",
                    l: [a],
                    k: {
                        "знач": 1
                    },
                    c: ["string"]
                }, {
                    cN: "export",
                    b: "экспорт",
                    eW: true,
                    l: [a],
                    k: {
                        "экспорт": 1
                    },
                    c: ["comment"]
                }]
            }, "comment"],
            r: 0
        }, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            l: [a]
        }]
    }
}();
hljs.LANGUAGES.python = {
    dM: {
        l: [hljs.UIR],
        i: "(</|->|\\?)",
        c: ["comment", "string", "function", "class", "number", "decorator"],
        k: {
            keyword: {
                and: 1,
                elif: 1,
                is: 1,
                global: 1,
                as: 1,
                "in": 1,
                "if": 1,
                from: 1,
                raise: 1,
                "for": 1,
                except: 1,
                "finally": 1,
                print: 1,
                "import": 1,
                pass: 1,
                "return": 1,
                exec: 1,
                "else": 1,
                "break": 1,
                not: 1,
                "with": 1,
                "class": 1,
                assert: 1,
                yield: 1,
                "try": 1,
                "while": 1,
                "continue": 1,
                del: 1,
                or: 1,
                def: 1,
                lambda: 1,
                nonlocal: 10
            },
            built_in: {
                None: 1,
                True: 1,
                False: 1,
                Ellipsis: 1,
                NotImplemented: 1
            }
        }
    },
    m: [{
        cN: "function",
        l: [hljs.UIR],
        b: "\\bdef ",
        e: ":",
        i: "$",
        k: {
            def: 1
        },
        c: ["title", "params"],
        r: 10
    }, {
        cN: "class",
        l: [hljs.UIR],
        b: "\\bclass ",
        e: ":",
        i: "[${]",
        k: {
            "class": 1
        },
        c: ["title", "params"],
        r: 10
    }, {
        cN: "title",
        b: hljs.UIR,
        e: hljs.IMR
    }, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: ["string"]
    }, hljs.HCM, hljs.CNM, {
        cN: "string",
        b: "u?r?'''",
        e: "'''",
        r: 10
    }, {
        cN: "string",
        b: 'u?r?"""',
        e: '"""',
        r: 10
    }, hljs.ASM, hljs.QSM, hljs.BE, {
        cN: "string",
        b: "(u|r|ur)'",
        e: "'",
        c: ["escape"],
        r: 10
    }, {
        cN: "string",
        b: '(u|r|ur)"',
        e: '"',
        c: ["escape"],
        r: 10
    }, {
        cN: "decorator",
        b: "@",
        e: "$"
    }]
};
hljs.LANGUAGES.sql = {
    cI: true,
    dM: {
        c: ["operator", "comment"],
        i: "[^\\s]"
    },
    m: [{
        cN: "operator",
        b: "(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma)\\b",
        e: ";|$",
        c: ["string", "number", {
            b: "\\n",
            e: hljs.IMR
        }],
        l: ["[a-zA-Z][a-zA-Z0-9_\\.]*"],
        k: {
            keyword: {
                all: 1,
                partial: 1,
                global: 1,
                month: 1,
                current_timestamp: 1,
                using: 1,
                go: 1,
                revoke: 1,
                smallint: 1,
                indicator: 1,
                "end-exec": 1,
                disconnect: 1,
                zone: 1,
                "with": 1,
                character: 1,
                assertion: 1,
                to: 1,
                add: 1,
                current_user: 1,
                usage: 1,
                input: 1,
                local: 1,
                alter: 1,
                match: 1,
                collate: 1,
                real: 1,
                then: 1,
                rollback: 1,
                get: 1,
                read: 1,
                timestamp: 1,
                session_user: 1,
                not: 1,
                integer: 1,
                bit: 1,
                unique: 1,
                day: 1,
                minute: 1,
                desc: 1,
                insert: 1,
                execute: 1,
                like: 1,
                ilike: 2,
                level: 1,
                decimal: 1,
                drop: 1,
                "continue": 1,
                isolation: 1,
                found: 1,
                where: 1,
                constraints: 1,
                domain: 1,
                right: 1,
                national: 1,
                some: 1,
                module: 1,
                transaction: 1,
                relative: 1,
                second: 1,
                connect: 1,
                escape: 1,
                close: 1,
                system_user: 1,
                "for": 1,
                deferred: 1,
                section: 1,
                cast: 1,
                current: 1,
                sqlstate: 1,
                allocate: 1,
                intersect: 1,
                deallocate: 1,
                numeric: 1,
                "public": 1,
                preserve: 1,
                full: 1,
                "goto": 1,
                initially: 1,
                asc: 1,
                no: 1,
                key: 1,
                output: 1,
                collation: 1,
                group: 1,
                by: 1,
                union: 1,
                session: 1,
                both: 1,
                last: 1,
                language: 1,
                constraint: 1,
                column: 1,
                of: 1,
                space: 1,
                foreign: 1,
                deferrable: 1,
                prior: 1,
                connection: 1,
                unknown: 1,
                action: 1,
                commit: 1,
                view: 1,
                or: 1,
                first: 1,
                into: 1,
                "float": 1,
                year: 1,
                primary: 1,
                cascaded: 1,
                except: 1,
                restrict: 1,
                set: 1,
                references: 1,
                names: 1,
                table: 1,
                outer: 1,
                open: 1,
                select: 1,
                size: 1,
                are: 1,
                rows: 1,
                from: 1,
                prepare: 1,
                distinct: 1,
                leading: 1,
                create: 1,
                only: 1,
                next: 1,
                inner: 1,
                authorization: 1,
                schema: 1,
                corresponding: 1,
                option: 1,
                declare: 1,
                precision: 1,
                immediate: 1,
                "else": 1,
                timezone_minute: 1,
                external: 1,
                varying: 1,
                translation: 1,
                "true": 1,
                "case": 1,
                exception: 1,
                join: 1,
                hour: 1,
                "default": 1,
                "double": 1,
                scroll: 1,
                value: 1,
                cursor: 1,
                descriptor: 1,
                values: 1,
                dec: 1,
                fetch: 1,
                procedure: 1,
                "delete": 1,
                and: 1,
                "false": 1,
                "int": 1,
                is: 1,
                describe: 1,
                "char": 1,
                as: 1,
                at: 1,
                "in": 1,
                varchar: 1,
                "null": 1,
                trailing: 1,
                any: 1,
                absolute: 1,
                current_time: 1,
                end: 1,
                grant: 1,
                privileges: 1,
                when: 1,
                cross: 1,
                check: 1,
                write: 1,
                current_date: 1,
                pad: 1,
                begin: 1,
                temporary: 1,
                exec: 1,
                time: 1,
                update: 1,
                catalog: 1,
                user: 1,
                sql: 1,
                date: 1,
                on: 1,
                identity: 1,
                timezone_hour: 1,
                natural: 1,
                whenever: 1,
                interval: 1,
                work: 1,
                order: 1,
                cascade: 1,
                diagnostics: 1,
                nchar: 1,
                having: 1,
                left: 1,
                call: 1,
                "do": 1,
                handler: 1,
                load: 1,
                replace: 1,
                truncate: 1,
                start: 1,
                lock: 1,
                show: 1,
                pragma: 1
            },
            aggregate: {
                count: 1,
                sum: 1,
                min: 1,
                max: 1,
                avg: 1
            }
        }
    }, hljs.CNM, hljs.CBLCLM, {
        cN: "comment",
        b: "--",
        e: "$"
    }, {
        cN: "string",
        b: "'",
        e: "'",
        c: ["escape", {
            b: "''",
            e: hljs.IMR
        }],
        r: 0
    }, {
        cN: "string",
        b: '"',
        e: '"',
        c: ["escape", {
            b: '""',
            e: hljs.IMR
        }],
        r: 0
    }, {
        cN: "string",
        b: "`",
        e: "`",
        c: ["escape"]
    }, hljs.BE]
};
hljs.LANGUAGES.perl = function () {
    var b = ["comment", "string", "number", "regexp", "sub", "variable", "operator", "pod"];
    var a = {
        getpwent: 1,
        getservent: 1,
        quotemeta: 1,
        msgrcv: 1,
        scalar: 1,
        kill: 1,
        dbmclose: 1,
        undef: 1,
        lc: 1,
        ma: 1,
        syswrite: 1,
        tr: 1,
        send: 1,
        umask: 1,
        sysopen: 1,
        shmwrite: 1,
        vec: 1,
        qx: 1,
        utime: 1,
        local: 1,
        oct: 1,
        semctl: 1,
        localtime: 1,
        readpipe: 1,
        "do": 1,
        "return": 1,
        format: 1,
        read: 1,
        sprintf: 1,
        dbmopen: 1,
        pop: 1,
        getpgrp: 1,
        not: 1,
        getpwnam: 1,
        rewinddir: 1,
        qq: 1,
        fileno: 1,
        qw: 1,
        endprotoent: 1,
        wait: 1,
        sethostent: 1,
        bless: 1,
        s: 1,
        opendir: 1,
        "continue": 1,
        each: 1,
        sleep: 1,
        endgrent: 1,
        shutdown: 1,
        dump: 1,
        chomp: 1,
        connect: 1,
        getsockname: 1,
        die: 1,
        socketpair: 1,
        close: 1,
        flock: 1,
        exists: 1,
        index: 1,
        shmget: 1,
        sub: 1,
        "for": 1,
        endpwent: 1,
        redo: 1,
        lstat: 1,
        msgctl: 1,
        setpgrp: 1,
        abs: 1,
        exit: 1,
        select: 1,
        print: 1,
        ref: 1,
        gethostbyaddr: 1,
        unshift: 1,
        fcntl: 1,
        syscall: 1,
        "goto": 1,
        getnetbyaddr: 1,
        join: 1,
        gmtime: 1,
        symlink: 1,
        semget: 1,
        splice: 1,
        x: 1,
        getpeername: 1,
        recv: 1,
        log: 1,
        setsockopt: 1,
        cos: 1,
        last: 1,
        reverse: 1,
        gethostbyname: 1,
        getgrnam: 1,
        study: 1,
        formline: 1,
        endhostent: 1,
        times: 1,
        chop: 1,
        length: 1,
        gethostent: 1,
        getnetent: 1,
        pack: 1,
        getprotoent: 1,
        getservbyname: 1,
        rand: 1,
        mkdir: 1,
        pos: 1,
        chmod: 1,
        y: 1,
        substr: 1,
        endnetent: 1,
        printf: 1,
        next: 1,
        open: 1,
        msgsnd: 1,
        readdir: 1,
        use: 1,
        unlink: 1,
        getsockopt: 1,
        getpriority: 1,
        rindex: 1,
        wantarray: 1,
        hex: 1,
        system: 1,
        getservbyport: 1,
        endservent: 1,
        "int": 1,
        chr: 1,
        untie: 1,
        rmdir: 1,
        prototype: 1,
        tell: 1,
        listen: 1,
        fork: 1,
        shmread: 1,
        ucfirst: 1,
        setprotoent: 1,
        "else": 1,
        sysseek: 1,
        link: 1,
        getgrgid: 1,
        shmctl: 1,
        waitpid: 1,
        unpack: 1,
        getnetbyname: 1,
        reset: 1,
        chdir: 1,
        grep: 1,
        split: 1,
        require: 1,
        caller: 1,
        lcfirst: 1,
        until: 1,
        warn: 1,
        "while": 1,
        values: 1,
        shift: 1,
        telldir: 1,
        getpwuid: 1,
        my: 1,
        getprotobynumber: 1,
        "delete": 1,
        and: 1,
        sort: 1,
        uc: 1,
        defined: 1,
        srand: 1,
        accept: 1,
        "package": 1,
        seekdir: 1,
        getprotobyname: 1,
        semop: 1,
        our: 1,
        rename: 1,
        seek: 1,
        "if": 1,
        q: 1,
        chroot: 1,
        sysread: 1,
        setpwent: 1,
        no: 1,
        crypt: 1,
        getc: 1,
        chown: 1,
        sqrt: 1,
        write: 1,
        setnetent: 1,
        setpriority: 1,
        foreach: 1,
        tie: 1,
        sin: 1,
        msgget: 1,
        map: 1,
        stat: 1,
        getlogin: 1,
        unless: 1,
        elsif: 1,
        truncate: 1,
        exec: 1,
        keys: 1,
        glob: 1,
        tied: 1,
        closedir: 1,
        ioctl: 1,
        socket: 1,
        readlink: 1,
        "eval": 1,
        xor: 1,
        readline: 1,
        binmode: 1,
        setservent: 1,
        eof: 1,
        ord: 1,
        bind: 1,
        alarm: 1,
        pipe: 1,
        atan2: 1,
        getgrent: 1,
        exp: 1,
        time: 1,
        push: 1,
        setgrent: 1,
        gt: 1,
        lt: 1,
        or: 1,
        ne: 1,
        m: 1
    };
    return {
        dM: {
            l: [hljs.IR],
            c: b,
            k: a
        },
        m: [{
            cN: "variable",
            b: "\\$\\d",
            e: hljs.IMR
        }, {
            cN: "variable",
            b: "[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)",
            e: hljs.IMR
        }, {
            cN: "subst",
            b: "[$@]\\{",
            e: "}",
            l: [hljs.IR],
            k: a,
            c: b,
            r: 10
        }, {
            cN: "number",
            b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            e: hljs.IMR,
            r: 0
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\(",
            e: "\\)",
            c: ["escape", "subst", "variable"],
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\[",
            e: "\\]",
            c: ["escape", "subst", "variable"],
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\{",
            e: "\\}",
            c: ["escape", "subst", "variable"],
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\|",
            e: "\\|",
            c: ["escape", "subst", "variable"],
            r: 5
        }, {
            cN: "string",
            b: "q[qwxr]?\\s*\\<",
            e: "\\>",
            c: ["escape", "subst", "variable"],
            r: 5
        }, {
            cN: "string",
            b: "qw\\s+q",
            e: "q",
            c: ["escape", "subst", "variable"],
            r: 5
        }, {
            cN: "string",
            b: "'",
            e: "'",
            c: ["escape"],
            r: 0
        }, {
            cN: "string",
            b: '"',
            e: '"',
            c: ["escape", "subst", "variable"],
            r: 0
        }, hljs.BE, {
            cN: "string",
            b: "`",
            e: "`",
            c: ["escape"]
        }, {
            cN: "regexp",
            b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
            e: hljs.IMR,
            r: 10
        }, {
            cN: "regexp",
            b: "(m|qr)?/",
            e: "/[a-z]*",
            c: ["escape"],
            r: 0
        }, {
            cN: "string",
            b: "{\\w+}",
            e: hljs.IMR,
            r: 0
        }, {
            cN: "string",
            b: "-?\\w+\\s*\\=\\>",
            e: hljs.IMR,
            r: 0
        }, {
            cN: "sub",
            b: "\\bsub\\b",
            e: "(\\s*\\(.*?\\))?[;{]",
            l: [hljs.IR],
            k: {
                sub: 1
            },
            r: 5
        }, {
            cN: "operator",
            b: "-\\w\\b",
            e: hljs.IMR,
            r: 0
        }, hljs.HCM, {
            cN: "comment",
            b: "^(__END__|__DATA__)",
            e: "\\n$",
            r: 5
        }, {
            cN: "pod",
            b: "\\=\\w",
            e: "\\=cut"
        }]
    }
}();
hljs.LANGUAGES.cmake = {
    dM: {
        l: [hljs.IR],
        k: {
            add_custom_command: 2,
            add_custom_target: 2,
            add_definitions: 2,
            add_dependencies: 2,
            add_executable: 2,
            add_library: 2,
            add_subdirectory: 2,
            add_executable: 2,
            add_library: 2,
            add_subdirectory: 2,
            add_test: 2,
            aux_source_directory: 2,
            "break": 1,
            build_command: 2,
            cmake_minimum_required: 3,
            cmake_policy: 3,
            configure_file: 1,
            create_test_sourcelist: 1,
            define_property: 1,
            "else": 1,
            elseif: 1,
            enable_language: 2,
            enable_testing: 2,
            endforeach: 1,
            endfunction: 1,
            endif: 1,
            endmacro: 1,
            endwhile: 1,
            execute_process: 2,
            "export": 1,
            find_file: 1,
            find_library: 2,
            find_package: 2,
            find_path: 1,
            find_program: 1,
            fltk_wrap_ui: 2,
            foreach: 1,
            "function": 1,
            get_cmake_property: 3,
            get_directory_property: 1,
            get_filename_component: 1,
            get_property: 1,
            get_source_file_property: 1,
            get_target_property: 1,
            get_test_property: 1,
            "if": 1,
            include: 1,
            include_directories: 2,
            include_external_msproject: 1,
            include_regular_expression: 2,
            install: 1,
            link_directories: 1,
            load_cache: 1,
            load_command: 1,
            macro: 1,
            mark_as_advanced: 1,
            message: 1,
            option: 1,
            output_required_files: 1,
            project: 1,
            qt_wrap_cpp: 2,
            qt_wrap_ui: 2,
            remove_definitions: 2,
            "return": 1,
            separate_arguments: 1,
            set: 1,
            set_directory_properties: 1,
            set_property: 1,
            set_source_files_properties: 1,
            set_target_properties: 1,
            set_tests_properties: 1,
            site_name: 1,
            source_group: 1,
            string: 1,
            target_link_libraries: 2,
            try_compile: 2,
            try_run: 2,
            unset: 1,
            variable_watch: 2,
            "while": 1,
            build_name: 1,
            exec_program: 1,
            export_library_dependencies: 1,
            install_files: 1,
            install_programs: 1,
            install_targets: 1,
            link_libraries: 1,
            make_directory: 1,
            remove: 1,
            subdir_depends: 1,
            subdirs: 1,
            use_mangled_mesa: 1,
            utility_source: 1,
            variable_requires: 1,
            write_file: 1
        },
        c: ["envvar", "comment", "string", "number"]
    },
    cI: true,
    m: [hljs.HCM, hljs.QSM, hljs.BE, hljs.NUMBER_MODE, {
        cN: "envvar",
        b: "\\${",
        e: "}"
    }]
};
hljs.LANGUAGES.nginx = {
    dM: {
        c: ["comment", "directive"]
    },
    m: [hljs.HCM, {
        cN: "directive",
        b: hljs.UIR,
        e: ";|{",
        rE: true,
        nM: true,
        c: ["comment", "parameters"],
        l: [hljs.UIR],
        k: {
            accept_mutex: 1,
            accept_mutex_delay: 1,
            access_log: 1,
            add_after_body: 1,
            add_before_body: 1,
            add_header: 1,
            addition_types: 1,
            alias: 1,
            allow: 1,
            ancient_browser: 1,
            ancient_browser: 1,
            ancient_browser_value: 1,
            ancient_browser_value: 1,
            auth_basic: 1,
            auth_basic_user_file: 1,
            autoindex: 1,
            autoindex_exact_size: 1,
            autoindex_localtime: 1,
            "break": 1,
            charset: 1,
            charset: 1,
            charset_map: 1,
            charset_map: 1,
            charset_types: 1,
            charset_types: 1,
            client_body_buffer_size: 1,
            client_body_in_file_only: 1,
            client_body_in_single_buffer: 1,
            client_body_temp_path: 1,
            client_body_timeout: 1,
            client_header_buffer_size: 1,
            client_header_timeout: 1,
            client_max_body_size: 1,
            connection_pool_size: 1,
            connections: 1,
            create_full_put_path: 1,
            daemon: 1,
            dav_access: 1,
            dav_methods: 1,
            debug_connection: 1,
            debug_points: 1,
            default_type: 1,
            deny: 1,
            directio: 1,
            directio_alignment: 1,
            echo: 1,
            echo_after_body: 1,
            echo_before_body: 1,
            echo_blocking_sleep: 1,
            echo_duplicate: 1,
            echo_end: 1,
            echo_exec: 1,
            echo_flush: 1,
            echo_foreach_split: 1,
            echo_location: 1,
            echo_location_async: 1,
            echo_read_request_body: 1,
            echo_request_body: 1,
            echo_reset_timer: 1,
            echo_sleep: 1,
            echo_subrequest: 1,
            echo_subrequest_async: 1,
            empty_gif: 1,
            empty_gif: 1,
            env: 1,
            error_log: 1,
            error_log: 1,
            error_page: 1,
            events: 1,
            expires: 1,
            fastcgi_bind: 1,
            fastcgi_buffer_size: 1,
            fastcgi_buffers: 1,
            fastcgi_busy_buffers_size: 1,
            fastcgi_cache: 1,
            fastcgi_cache_key: 1,
            fastcgi_cache_methods: 1,
            fastcgi_cache_min_uses: 1,
            fastcgi_cache_path: 1,
            fastcgi_cache_use_stale: 1,
            fastcgi_cache_valid: 1,
            fastcgi_catch_stderr: 1,
            fastcgi_connect_timeout: 1,
            fastcgi_hide_header: 1,
            fastcgi_ignore_client_abort: 1,
            fastcgi_ignore_headers: 1,
            fastcgi_index: 1,
            fastcgi_intercept_errors: 1,
            fastcgi_max_temp_file_size: 1,
            fastcgi_next_upstream: 1,
            fastcgi_param: 1,
            fastcgi_pass: 1,
            fastcgi_pass_header: 1,
            fastcgi_pass_request_body: 1,
            fastcgi_pass_request_headers: 1,
            fastcgi_read_timeout: 1,
            fastcgi_send_lowat: 1,
            fastcgi_send_timeout: 1,
            fastcgi_split_path_info: 1,
            fastcgi_store: 1,
            fastcgi_store_access: 1,
            fastcgi_temp_file_write_size: 1,
            fastcgi_temp_path: 1,
            fastcgi_upstream_fail_timeout: 1,
            fastcgi_upstream_max_fails: 1,
            flv: 1,
            geo: 1,
            geo: 1,
            geoip_city: 1,
            geoip_country: 1,
            gzip: 1,
            gzip_buffers: 1,
            gzip_comp_level: 1,
            gzip_disable: 1,
            gzip_hash: 1,
            gzip_http_version: 1,
            gzip_min_length: 1,
            gzip_no_buffer: 1,
            gzip_proxied: 1,
            gzip_static: 1,
            gzip_types: 1,
            gzip_vary: 1,
            gzip_window: 1,
            http: 1,
            "if": 1,
            if_modified_since: 1,
            ignore_invalid_headers: 1,
            image_filter: 1,
            image_filter_buffer: 1,
            image_filter_jpeg_quality: 1,
            image_filter_transparency: 1,
            include: 1,
            index: 1,
            internal: 1,
            ip_hash: 1,
            js: 1,
            js_load: 1,
            js_require: 1,
            js_utf8: 1,
            keepalive_requests: 1,
            keepalive_timeout: 1,
            kqueue_changes: 1,
            kqueue_events: 1,
            large_client_header_buffers: 1,
            limit_conn: 1,
            limit_conn_log_level: 1,
            limit_except: 1,
            limit_rate: 1,
            limit_rate_after: 1,
            limit_req: 1,
            limit_req_log_level: 1,
            limit_req_zone: 1,
            limit_zone: 1,
            lingering_time: 1,
            lingering_timeout: 1,
            listen: 1,
            location: 1,
            lock_file: 1,
            log_format: 1,
            log_not_found: 1,
            log_subrequest: 1,
            map: 1,
            map_hash_bucket_size: 1,
            map_hash_max_size: 1,
            master_process: 1,
            memcached_bind: 1,
            memcached_buffer_size: 1,
            memcached_connect_timeout: 1,
            memcached_next_upstream: 1,
            memcached_pass: 1,
            memcached_read_timeout: 1,
            memcached_send_timeout: 1,
            memcached_upstream_fail_timeout: 1,
            memcached_upstream_max_fails: 1,
            merge_slashes: 1,
            min_delete_depth: 1,
            modern_browser: 1,
            modern_browser: 1,
            modern_browser_value: 1,
            modern_browser_value: 1,
            more_clear_headers: 1,
            more_clear_input_headers: 1,
            more_set_headers: 1,
            more_set_input_headers: 1,
            msie_padding: 1,
            msie_refresh: 1,
            multi_accept: 1,
            open_file_cache: 1,
            open_file_cache_errors: 1,
            open_file_cache_events: 1,
            open_file_cache_min_uses: 1,
            open_file_cache_retest: 1,
            open_file_cache_valid: 1,
            open_log_file_cache: 1,
            optimize_server_names: 1,
            output_buffers: 1,
            override_charset: 1,
            override_charset: 1,
            perl: 1,
            perl_modules: 1,
            perl_require: 1,
            perl_set: 1,
            pid: 1,
            port_in_redirect: 1,
            post_action: 1,
            postpone_gzipping: 1,
            postpone_output: 1,
            proxy_bind: 1,
            proxy_buffer_size: 1,
            proxy_buffering: 1,
            proxy_buffers: 1,
            proxy_busy_buffers_size: 1,
            proxy_cache: 1,
            proxy_cache_key: 1,
            proxy_cache_methods: 1,
            proxy_cache_min_uses: 1,
            proxy_cache_path: 1,
            proxy_cache_use_stale: 1,
            proxy_cache_valid: 1,
            proxy_connect_timeout: 1,
            proxy_headers_hash_bucket_size: 1,
            proxy_headers_hash_max_size: 1,
            proxy_hide_header: 1,
            proxy_ignore_client_abort: 1,
            proxy_ignore_headers: 1,
            proxy_intercept_errors: 1,
            proxy_max_temp_file_size: 1,
            proxy_method: 1,
            proxy_next_upstream: 1,
            proxy_pass: 1,
            proxy_pass_header: 1,
            proxy_pass_request_body: 1,
            proxy_pass_request_headers: 1,
            proxy_read_timeout: 1,
            proxy_redirect: 1,
            proxy_send_lowat: 1,
            proxy_send_timeout: 1,
            proxy_set_body: 1,
            proxy_set_header: 1,
            proxy_store: 1,
            proxy_store_access: 1,
            proxy_temp_file_write_size: 1,
            proxy_temp_path: 1,
            proxy_upstream_fail_timeout: 1,
            proxy_upstream_max_fails: 1,
            push_authorized_channels_only: 1,
            push_channel_group: 1,
            push_max_channel_id_length: 1,
            push_max_channel_subscribers: 1,
            push_max_message_buffer_length: 1,
            push_max_reserved_memory: 1,
            push_message_buffer_length: 1,
            push_message_timeout: 1,
            push_min_message_buffer_length: 1,
            push_min_message_recipients: 1,
            push_publisher: 1,
            push_store_messages: 1,
            push_subscriber: 1,
            push_subscriber_concurrency: 1,
            random_index: 1,
            read_ahead: 1,
            real_ip_header: 1,
            recursive_error_pages: 1,
            request_pool_size: 1,
            reset_timedout_connection: 1,
            resolver: 1,
            resolver_timeout: 1,
            "return": 1,
            rewrite: 1,
            rewrite_log: 1,
            root: 1,
            satisfy: 1,
            satisfy_any: 1,
            send_lowat: 1,
            send_timeout: 1,
            sendfile: 1,
            sendfile_max_chunk: 1,
            server: 1,
            server: 1,
            server_name: 1,
            server_name_in_redirect: 1,
            server_names_hash_bucket_size: 1,
            server_names_hash_max_size: 1,
            server_tokens: 1,
            set: 1,
            set_real_ip_from: 1,
            source_charset: 1,
            source_charset: 1,
            ssi: 1,
            ssi_ignore_recycled_buffers: 1,
            ssi_min_file_chunk: 1,
            ssi_silent_errors: 1,
            ssi_types: 1,
            ssi_value_length: 1,
            ssl: 1,
            ssl_certificate: 1,
            ssl_certificate_key: 1,
            ssl_ciphers: 1,
            ssl_client_certificate: 1,
            ssl_crl: 1,
            ssl_dhparam: 1,
            ssl_prefer_server_ciphers: 1,
            ssl_protocols: 1,
            ssl_session_cache: 1,
            ssl_session_timeout: 1,
            ssl_verify_client: 1,
            ssl_verify_depth: 1,
            sub_filter: 1,
            sub_filter_once: 1,
            sub_filter_types: 1,
            tcp_nodelay: 1,
            tcp_nopush: 1,
            timer_resolution: 1,
            try_files: 1,
            types: 1,
            types_hash_bucket_size: 1,
            types_hash_max_size: 1,
            underscores_in_headers: 1,
            uninitialized_variable_warn: 1,
            upstream: 1,
            use: 1,
            user: 1,
            userid: 1,
            userid: 1,
            userid_domain: 1,
            userid_domain: 1,
            userid_expires: 1,
            userid_expires: 1,
            userid_mark: 1,
            userid_name: 1,
            userid_name: 1,
            userid_p3p: 1,
            userid_p3p: 1,
            userid_path: 1,
            userid_path: 1,
            userid_service: 1,
            userid_service: 1,
            valid_referers: 1,
            variables_hash_bucket_size: 1,
            variables_hash_max_size: 1,
            worker_connections: 1,
            worker_cpu_affinity: 1,
            worker_priority: 1,
            worker_processes: 1,
            worker_rlimit_core: 1,
            worker_rlimit_nofile: 1,
            worker_rlimit_sigpending: 1,
            working_directory: 1,
            xml_entities: 1,
            xslt_stylesheet: 1,
            xslt_types: 1
        },
        r: 0
    }, {
        cN: "parameters",
        b: "\\s",
        e: "[;{]",
        rB: true,
        rE: true,
        nM: true,
        c: ["comment", "string", "regexp", "number", "variable", "built_in"]
    }, {
        cN: "variable",
        b: "\\$\\d+",
        e: hljs.IMR
    }, {
        cN: "variable",
        b: "\\${",
        e: "}"
    }, {
        cN: "variable",
        b: "[\\$\\@]" + hljs.UIR,
        e: hljs.IMR,
        r: 0
    }, {
        cN: "built_in",
        b: "\\b(on|off|yes|no|true|false|none|blocked|debug|info|notice|warn|error|crit|select|permanent|redirect)\\b",
        e: hljs.IMR
    }, {
        cN: "built_in",
        b: "\\b(kqueue|rtsig|epoll|poll)\\b|/dev/poll",
        e: hljs.IMR
    }, {
        cN: "number",
        b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b",
        e: hljs.IMR
    }, {
        cN: "number",
        b: "\\s\\d+[kKmMgGdshdwy]*\\b",
        e: hljs.IMR,
        r: 0
    }, {
        cN: "string",
        b: '"',
        e: '"',
        c: ["escape", "variable"],
        r: 0
    }, {
        cN: "string",
        b: "'",
        e: "'",
        c: ["escape", "variable"],
        r: 0
    }, {
        cN: "string",
        b: "([a-z]+):/",
        e: "[;\\s]",
        rE: true
    }, {
        cN: "regexp",
        b: "\\s\\^",
        e: "\\s|{|;",
        rE: true,
        c: ["escape", "variable"]
    }, {
        cN: "regexp",
        b: "~\\*?\\s+",
        e: "\\s|{|;",
        rE: true,
        c: ["escape", "variable"]
    }, {
        cN: "regexp",
        b: "\\*(\\.[a-z\\-]+)+",
        e: "^",
        c: ["escape", "variable"]
    }, {
        cN: "regexp",
        b: "([a-z\\-]+\\.)+\\*",
        e: "^",
        c: ["escape", "variable"]
    }, hljs.BE]
};
hljs.LANGUAGES.cpp = function () {
    var a = {
        keyword: {
            "false": 1,
            "int": 1,
            "float": 1,
            "while": 1,
            "private": 1,
            "char": 1,
            "catch": 1,
            "export": 1,
            virtual: 1,
            operator: 2,
            sizeof: 2,
            dynamic_cast: 2,
            typedef: 2,
            const_cast: 2,
            "const": 1,
            struct: 1,
            "for": 1,
            static_cast: 2,
            union: 1,
            namespace: 1,
            unsigned: 1,
            "long": 1,
            "throw": 1,
            "volatile": 2,
            "static": 1,
            "protected": 1,
            bool: 1,
            template: 1,
            mutable: 1,
            "if": 1,
            "public": 1,
            friend: 2,
            "do": 1,
            "return": 1,
            "goto": 1,
            auto: 1,
            "void": 2,
            "enum": 1,
            "else": 1,
            "break": 1,
            "new": 1,
            extern: 1,
            using: 1,
            "true": 1,
            "class": 1,
            asm: 1,
            "case": 1,
            typeid: 1,
            "short": 1,
            reinterpret_cast: 2,
            "default": 1,
            "double": 1,
            register: 1,
            explicit: 1,
            signed: 1,
            typename: 1,
            "try": 1,
            "this": 1,
            "switch": 1,
            "continue": 1,
            wchar_t: 1,
            inline: 1,
            "delete": 1,
            alignof: 1,
            char16_t: 1,
            char32_t: 1,
            constexpr: 1,
            decltype: 1,
            noexcept: 1,
            nullptr: 1,
            static_assert: 1,
            thread_local: 1
        },
        built_in: {
            std: 1,
            string: 1,
            cin: 1,
            cout: 1,
            cerr: 1,
            clog: 1,
            stringstream: 1,
            istringstream: 1,
            ostringstream: 1,
            auto_ptr: 1,
            deque: 1,
            list: 1,
            queue: 1,
            stack: 1,
            vector: 1,
            map: 1,
            set: 1,
            bitset: 1,
            multiset: 1,
            multimap: 1,
            unordered_set: 1,
            unordered_map: 1,
            unordered_multiset: 1,
            unordered_multimap: 1,
            array: 1,
            shared_ptr: 1
        }
    };
    return {
        dM: {
            l: [hljs.UIR],
            i: "</",
            c: ["comment", "string", "number", "preprocessor", "stl_container"],
            k: a
        },
        m: [hljs.CLCM, hljs.CBLCLM, hljs.CNM, hljs.QSM, hljs.BE, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'",
            i: "[^\\\\][^']"
        }, {
            cN: "preprocessor",
            b: "#",
            e: "$"
        }, {
            cN: "stl_container",
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            c: ["stl_container"],
            l: [hljs.UIR],
            k: a.built_in,
            r: 10
        }]
    }
}();