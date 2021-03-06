import Vue from 'vue'

Vue.prototype.$prism = function() {
  /* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+c+bash+cpp+docker+git+go+graphql+http+hpkp+hsts+json+typescript+nginx+sql+powershell+python+rust+plsql+stylus+pug+vim+wasm&plugins=autolinker+toolbar+command-line+show-language+copy-to-clipboard */
  const _self =
    typeof window !== 'undefined'
      ? window
      : typeof WorkerGlobalScope !== 'undefined' &&
        self instanceof WorkerGlobalScope
      ? self
      : {}
  const Prism = (function(u) {
    const c = /\blang(?:uage)?-([\w-]+)\b/i
    let r = 0
    var _ = {
      manual: u.Prism && u.Prism.manual,
      disableWorkerMessageHandler:
        u.Prism && u.Prism.disableWorkerMessageHandler,
      util: {
        encode(e) {
          return e instanceof L
            ? new L(e.type, _.util.encode(e.content), e.alias)
            : Array.isArray(e)
            ? e.map(_.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00A0/g, ' ')
        },
        type(e) {
          return Object.prototype.toString.call(e).slice(8, -1)
        },
        objId(e) {
          return (
            e.__id || Object.defineProperty(e, '__id', { value: ++r }), e.__id
          )
        },
        clone: function n(e, t) {
          let a
          let r
          const i = _.util.type(e)
          switch (((t = t || {}), i)) {
            case 'Object':
              if (((r = _.util.objId(e)), t[r])) return t[r]
              for (const o in ((a = {}), (t[r] = a), e))
                e.hasOwnProperty(o) && (a[o] = n(e[o], t))
              return a
            case 'Array':
              return (
                (r = _.util.objId(e)),
                t[r]
                  ? t[r]
                  : ((a = []),
                    (t[r] = a),
                    e.forEach(function(e, r) {
                      a[r] = n(e, t)
                    }),
                    a)
              )
            default:
              return e
          }
        },
        currentScript() {
          if (typeof document === 'undefined') return null
          if ('currentScript' in document) return document.currentScript
          try {
            throw new Error()
          } catch (e) {
            const r = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1]
            if (r) {
              const n = document.getElementsByTagName('script')
              for (const t in n) if (n[t].src == r) return n[t]
            }
            return null
          }
        }
      },
      languages: {
        extend(e, r) {
          const n = _.util.clone(_.languages[e])
          for (const t in r) n[t] = r[t]
          return n
        },
        insertBefore(n, e, r, t) {
          const a = (t = t || _.languages)[n]
          const i = {}
          for (const o in a)
            if (a.hasOwnProperty(o)) {
              if (o == e)
                for (const l in r) r.hasOwnProperty(l) && (i[l] = r[l])
              r.hasOwnProperty(o) || (i[o] = a[o])
            }
          const s = t[n]
          return (
            (t[n] = i),
            _.languages.DFS(_.languages, function(e, r) {
              r === s && e != n && (this[e] = i)
            }),
            i
          )
        },
        DFS: function e(r, n, t, a) {
          a = a || {}
          const i = _.util.objId
          for (const o in r)
            if (r.hasOwnProperty(o)) {
              n.call(r, o, r[o], t || o)
              const l = r[o]
              const s = _.util.type(l)
              s !== 'Object' || a[i(l)]
                ? s !== 'Array' || a[i(l)] || ((a[i(l)] = !0), e(l, n, o, a))
                : ((a[i(l)] = !0), e(l, n, null, a))
            }
        }
      },
      plugins: {},
      highlightAll(e, r) {
        _.highlightAllUnder(document, e, r)
      },
      highlightAllUnder(e, r, n) {
        const t = {
          callback: n,
          selector:
            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        }
        _.hooks.run('before-highlightall', t)
        for (var a, i = e.querySelectorAll(t.selector), o = 0; (a = i[o++]); )
          _.highlightElement(a, !0 === r, t.callback)
      },
      highlightElement(e, r, n) {
        const t = (function(e) {
          for (; e && !c.test(e.className); ) e = e.parentNode
          return e
            ? (e.className.match(c) || [, 'none'])[1].toLowerCase()
            : 'none'
        })(e)
        const a = _.languages[t]
        e.className =
          e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t
        const i = e.parentNode
        i &&
          i.nodeName.toLowerCase() === 'pre' &&
          (i.className =
            i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t)
        const o = { element: e, language: t, grammar: a, code: e.textContent }
        function l(e) {
          ;(o.highlightedCode = e),
            _.hooks.run('before-insert', o),
            (o.element.innerHTML = o.highlightedCode),
            _.hooks.run('after-highlight', o),
            _.hooks.run('complete', o),
            n && n.call(o.element)
        }
        if ((_.hooks.run('before-sanity-check', o), !o.code))
          return _.hooks.run('complete', o), void (n && n.call(o.element))
        if ((_.hooks.run('before-highlight', o), o.grammar))
          if (r && u.Worker) {
            const s = new Worker(_.filename)
            ;(s.onmessage = function(e) {
              l(e.data)
            }),
              s.postMessage(
                JSON.stringify({
                  language: o.language,
                  code: o.code,
                  immediateClose: !0
                })
              )
          } else l(_.highlight(o.code, o.grammar, o.language))
        else l(_.util.encode(o.code))
      },
      highlight(e, r, n) {
        const t = { code: e, grammar: r, language: n }
        return (
          _.hooks.run('before-tokenize', t),
          (t.tokens = _.tokenize(t.code, t.grammar)),
          _.hooks.run('after-tokenize', t),
          L.stringify(_.util.encode(t.tokens), t.language)
        )
      },
      matchGrammar(e, r, n, t, a, i, o) {
        for (const l in n)
          if (n.hasOwnProperty(l) && n[l]) {
            let s = n[l]
            s = Array.isArray(s) ? s : [s]
            for (let u = 0; u < s.length; ++u) {
              if (o && o == l + ',' + u) return
              let c = s[u]
              const g = c.inside
              const f = !!c.lookbehind
              const d = !!c.greedy
              let h = 0
              const m = c.alias
              if (d && !c.pattern.global) {
                const p = c.pattern.toString().match(/[imsuy]*$/)[0]
                c.pattern = RegExp(c.pattern.source, p + 'g')
              }
              c = c.pattern || c
              for (let y = t, v = a; y < r.length; v += r[y].length, ++y) {
                let k = r[y]
                if (r.length > e.length) return
                if (!(k instanceof L)) {
                  if (d && y != r.length - 1) {
                    if (((c.lastIndex = v), !(O = c.exec(e)))) break
                    for (
                      var b = O.index + (f && O[1] ? O[1].length : 0),
                        w = O.index + O[0].length,
                        A = y,
                        P = v,
                        x = r.length;
                      A < x && (P < w || (!r[A].type && !r[A - 1].greedy));
                      ++A
                    )
                      (P += r[A].length) <= b && (++y, (v = P))
                    if (r[y] instanceof L) continue
                    ;(S = A - y), (k = e.slice(v, P)), (O.index -= v)
                  } else {
                    c.lastIndex = 0
                    var O = c.exec(k)
                    var S = 1
                  }
                  if (O) {
                    f && (h = O[1] ? O[1].length : 0)
                    w = (b = O.index + h) + (O = O[0].slice(h)).length
                    const j = k.slice(0, b)
                    const N = k.slice(w)
                    const E = [y, S]
                    j && (++y, (v += j.length), E.push(j))
                    const C = new L(l, g ? _.tokenize(O, g) : O, m, O, d)
                    if (
                      (E.push(C),
                      N && E.push(N),
                      Array.prototype.splice.apply(r, E),
                      S != 1 && _.matchGrammar(e, r, n, y, v, !0, l + ',' + u),
                      i)
                    )
                      break
                  } else if (i) break
                }
              }
            }
          }
      },
      tokenize(e, r) {
        const n = [e]
        const t = r.rest
        if (t) {
          for (const a in t) r[a] = t[a]
          delete r.rest
        }
        return _.matchGrammar(e, n, r, 0, 0, !1), n
      },
      hooks: {
        all: {},
        add(e, r) {
          const n = _.hooks.all
          ;(n[e] = n[e] || []), n[e].push(r)
        },
        run(e, r) {
          const n = _.hooks.all[e]
          if (n && n.length) for (var t, a = 0; (t = n[a++]); ) t(r)
        }
      },
      Token: L
    }
    function L(e, r, n, t, a) {
      ;(this.type = e),
        (this.content = r),
        (this.alias = n),
        (this.length = 0 | (t || '').length),
        (this.greedy = !!a)
    }
    if (
      ((u.Prism = _),
      (L.stringify = function(e, r) {
        if (typeof e === 'string') return e
        if (Array.isArray(e))
          return e
            .map(function(e) {
              return L.stringify(e, r)
            })
            .join('')
        const n = {
          type: e.type,
          content: L.stringify(e.content, r),
          tag: 'span',
          classes: ['token', e.type],
          attributes: {},
          language: r
        }
        if (e.alias) {
          const t = Array.isArray(e.alias) ? e.alias : [e.alias]
          Array.prototype.push.apply(n.classes, t)
        }
        _.hooks.run('wrap', n)
        const a = Object.keys(n.attributes)
          .map(function(e) {
            return (
              e + '="' + (n.attributes[e] || '').replace(/"/g, '&quot;') + '"'
            )
          })
          .join(' ')
        return (
          '<' +
          n.tag +
          ' class="' +
          n.classes.join(' ') +
          '"' +
          (a ? ' ' + a : '') +
          '>' +
          n.content +
          '</' +
          n.tag +
          '>'
        )
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (_.disableWorkerMessageHandler ||
            u.addEventListener(
              'message',
              function(e) {
                const r = JSON.parse(e.data)
                const n = r.language
                const t = r.code
                const a = r.immediateClose
                u.postMessage(_.highlight(t, _.languages[n], n)), a && u.close()
              },
              !1
            )),
        _
      )
    const e = _.util.currentScript()
    if (
      (e &&
        ((_.filename = e.src),
        e.hasAttribute('data-manual') && (_.manual = !0)),
      !_.manual)
    ) {
      function n() {
        _.manual || _.highlightAll()
      }
      const t = document.readyState
      t === 'loading' || (t === 'interactive' && e && e.defer)
        ? document.addEventListener('DOMContentLoaded', n)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(n)
        : window.setTimeout(n, 16)
    }
    return _
  })(_self)
  typeof module !== 'undefined' && module.exports && (module.exports = Prism),
    typeof global !== 'undefined' && (global.Prism = Prism)
  ;(Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
      greedy: !0
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
        },
        'attr-value': {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
          inside: {
            punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }]
          }
        },
        punctuation: /\/?>/,
        'attr-name': {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ }
        }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  }),
    (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
      Prism.languages.markup.entity),
    Prism.hooks.add('wrap', function(a) {
      a.type === 'entity' &&
        (a.attributes.title = a.content.replace(/&amp;/, '&'))
    }),
    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
      value(a, e) {
        const s = {}
        ;(s['language-' + e] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: Prism.languages[e]
        }),
          (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
        const n = {
          'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s }
        }
        n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
        const t = {}
        ;(t[a] = {
          pattern: RegExp(
            '(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(
              /__/g,
              a
            ),
            'i'
          ),
          lookbehind: !0,
          greedy: !0,
          inside: n
        }),
          Prism.languages.insertBefore('markup', 'cdata', t)
      }
    }),
    (Prism.languages.xml = Prism.languages.extend('markup', {})),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup)
  !(function(s) {
    const t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    ;(s.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
        inside: { rule: /@[\w-]+/ }
      },
      url: {
        pattern: RegExp('url\\((?:' + t.source + '|[^\n\r()]*)\\)', 'i'),
        inside: { function: /^url/i, punctuation: /^\(|\)$/ }
      },
      selector: RegExp('[^{}\\s](?:[^{};"\']|' + t.source + ')*?(?=\\s*\\{)'),
      string: { pattern: t, greedy: !0 },
      property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
      important: /!important\b/i,
      function: /[-a-z0-9]+(?=\()/i,
      punctuation: /[(){};:,]/
    }),
      (s.languages.css.atrule.inside.rest = s.languages.css)
    const e = s.languages.markup
    e &&
      (e.tag.addInlined('style', 'css'),
      s.languages.insertBefore(
        'inside',
        'attr-value',
        {
          'style-attr': {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
              'attr-name': { pattern: /^\s*style/i, inside: e.tag.inside },
              punctuation: /^\s*=\s*['"]|['"]\s*$/,
              'attr-value': { pattern: /.+/i, inside: s.languages.css }
            },
            alias: 'language-css'
          }
        },
        e.tag
      ))
  })(Prism)
  Prism.languages.clike = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    'class-name': {
      pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
  }
  ;(Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
      Prism.languages.clike['class-name'],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0
      }
    ],
    keyword: [
      { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
      {
        pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
      }
    ],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
  })),
    (Prism.languages.javascript[
      'class-name'
    ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore('javascript', 'keyword', {
      regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*(?:$|[\r\n,.;})\]]))/,
        lookbehind: !0,
        greedy: !0
      },
      'function-variable': {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: 'function'
      },
      parameter: [
        {
          pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        },
        {
          pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
          inside: Prism.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }),
    Prism.languages.insertBefore('javascript', 'string', {
      'template-string': {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: !0,
        inside: {
          'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
            lookbehind: !0,
            inside: {
              'interpolation-punctuation': {
                pattern: /^\${|}$/,
                alias: 'punctuation'
              },
              rest: Prism.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      }
    }),
    Prism.languages.markup &&
      Prism.languages.markup.tag.addInlined('script', 'javascript'),
    (Prism.languages.js = Prism.languages.javascript)
  ;(Prism.languages.c = Prism.languages.extend('clike', {
    'class-name': { pattern: /(\b(?:enum|struct)\s+)\w+/, lookbehind: !0 },
    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
    number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
  })),
    Prism.languages.insertBefore('c', 'string', {
      macro: {
        pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        alias: 'property',
        inside: {
          string: {
            pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
            lookbehind: !0
          },
          directive: {
            pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
            lookbehind: !0,
            alias: 'keyword'
          }
        }
      },
      constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
    }),
    delete Prism.languages.c.boolean
  !(function(e) {
    const t =
      '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b'
    const n = {
      environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: !0,
          inside: {
            variable: [
              { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
              /^\$\(\(/
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            punctuation: /\(\(?|\)\)?|,|;/
          }
        },
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: !0,
          inside: { variable: /^\$\(|^`|\)$|`$/ }
        },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: !0,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp('(\\{)' + t),
              lookbehind: !0,
              alias: 'constant'
            }
          }
        },
        /\$(?:\w+|[#?*!@$])/
      ],
      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
    }
    e.languages.bash = {
      shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
      comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
      'function-name': [
        {
          pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
          lookbehind: !0,
          alias: 'function'
        },
        { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' }
      ],
      'for-or-select': {
        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
        alias: 'variable',
        lookbehind: !0
      },
      'assign-left': {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
        inside: {
          environment: {
            pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
            lookbehind: !0,
            alias: 'constant'
          }
        },
        alias: 'variable',
        lookbehind: !0
      },
      string: [
        {
          pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\2/,
          lookbehind: !0,
          greedy: !0,
          inside: n
        },
        {
          pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\3/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
          greedy: !0,
          inside: n
        }
      ],
      environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
      variable: n.variable,
      function: {
        pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: !0
      },
      keyword: {
        pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
        lookbehind: !0
      },
      builtin: {
        pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
        lookbehind: !0,
        alias: 'class-name'
      },
      boolean: {
        pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
        lookbehind: !0
      },
      'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
      operator: {
        pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
        inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } }
      },
      punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 }
    }
    for (
      let a = [
          'comment',
          'function-name',
          'for-or-select',
          'assign-left',
          'string',
          'environment',
          'function',
          'keyword',
          'builtin',
          'boolean',
          'file-descriptor',
          'operator',
          'punctuation',
          'number'
        ],
        r = n.variable[1].inside,
        s = 0;
      s < a.length;
      s++
    )
      r[a[s]] = e.languages.bash[a[s]]
    e.languages.shell = e.languages.bash
  })(Prism)
  ;(Prism.languages.cpp = Prism.languages.extend('c', {
    'class-name': {
      pattern: /(\b(?:class|enum|struct)\s+)\w+/,
      lookbehind: !0
    },
    keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    number: {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
      greedy: !0
    },
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:true|false)\b/
  })),
    Prism.languages.insertBefore('cpp', 'string', {
      'raw-string': {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: 'string',
        greedy: !0
      }
    })
  ;(Prism.languages.docker = {
    keyword: {
      pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
      lookbehind: !0
    },
    string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
    comment: /#.*/,
    punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/
  }),
    (Prism.languages.dockerfile = Prism.languages.docker)
  Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m
  }
  ;(Prism.languages.go = Prism.languages.extend('clike', {
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 }
  })),
    delete Prism.languages.go['class-name']
  Prism.languages.graphql = {
    comment: /#.*/,
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    boolean: /\b(?:true|false)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
    'attr-name': {
      pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
      greedy: !0
    },
    'class-name': {
      pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
      lookbehind: !0
    },
    fragment: {
      pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
      lookbehind: !0,
      alias: 'function'
    },
    keyword: /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
    operator: /[!=|]|\.{3}/,
    punctuation: /[!(){}\[\]:=,]/,
    constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/
  }
  !(function(t) {
    t.languages.http = {
      'request-line': {
        pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
        inside: {
          property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
          'attr-name': /:\w+/
        }
      },
      'response-status': {
        pattern: /^HTTP\/1.[01] \d+.*/m,
        inside: {
          property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 }
        }
      },
      'header-name': { pattern: /^[\w-]+:(?=.)/m, alias: 'keyword' }
    }
    let a
    let e
    let n
    const i = t.languages
    const p = {
      'application/javascript': i.javascript,
      'application/json': i.json || i.javascript,
      'application/xml': i.xml,
      'text/xml': i.xml,
      'text/html': i.html,
      'text/css': i.css
    }
    const s = { 'application/json': !0, 'application/xml': !0 }
    for (const r in p)
      if (p[r]) {
        a = a || {}
        const T = s[r]
          ? (void 0,
            (n = (e = r).replace(/^[a-z]+\//, '')),
            '(?:' + e + '|\\w+/(?:[\\w.-]+\\+)+' + n + '(?![+\\w.-]))')
          : r
        a[r.replace(/\//g, '-')] = {
          pattern: RegExp(
            '(content-type:\\s*' + T + '[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*',
            'i'
          ),
          lookbehind: !0,
          inside: p[r]
        }
      }
    a && t.languages.insertBefore('http', 'header-name', a)
  })(Prism)
  Prism.languages.hpkp = {
    directive: {
      pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
      alias: 'keyword'
    },
    safe: { pattern: /\d{7,}/, alias: 'selector' },
    unsafe: { pattern: /\d{1,6}/, alias: 'function' }
  }
  Prism.languages.hsts = {
    directive: {
      pattern: /\b(?:max-age=|includeSubDomains|preload)/,
      alias: 'keyword'
    },
    safe: { pattern: /\d{8,}/, alias: 'selector' },
    unsafe: { pattern: /\d{1,7}/, alias: 'function' }
  }
  Prism.languages.json = {
    property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' }
  }
  ;(Prism.languages.typescript = Prism.languages.extend('javascript', {
    keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
    builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
  })),
    (Prism.languages.ts = Prism.languages.typescript)
  ;(Prism.languages.nginx = Prism.languages.extend('clike', {
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i
  })),
    Prism.languages.insertBefore('nginx', 'keyword', { variable: /\$[a-z_]+/i })
  Prism.languages.sql = {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
      lookbehind: !0
    },
    variable: [
      { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
      /@[\w.$]+/
    ],
    string: {
      pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
      greedy: !0,
      lookbehind: !0
    },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
  }
  !(function(e) {
    const t = (Prism.languages.powershell = {
      comment: [
        { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
        { pattern: /(^|[^`])#.*/, lookbehind: !0 }
      ],
      string: [
        {
          pattern: /"(?:`[\s\S]|[^`"])*"/,
          greedy: !0,
          inside: {
            function: {
              pattern: /(^|[^`])\$\((?:\$\(.*?\)|(?!\$\()[^\r\n)])*\)/,
              lookbehind: !0,
              inside: {}
            }
          }
        },
        { pattern: /'(?:[^']|'')*'/, greedy: !0 }
      ],
      namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
      boolean: /\$(?:true|false)\b/i,
      variable: /\$\w+\b/i,
      function: [
        /\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i,
        /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
      ],
      keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
      operator: {
        pattern: /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
        lookbehind: !0
      },
      punctuation: /[|{}[\];(),.]/
    })
    const o = t.string[0].inside
    ;(o.boolean = t.boolean), (o.variable = t.variable), (o.function.inside = t)
  })()
  ;(Prism.languages.python = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    'string-interpolation': {
      pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
          lookbehind: !0,
          inside: {
            'format-spec': { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
            'conversion-option': {
              pattern: /![sra](?=[:}]$)/,
              alias: 'punctuation'
            },
            rest: null
          }
        },
        string: /[\s\S]+/
      }
    },
    'triple-quoted-string': {
      pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
      greedy: !0,
      alias: 'string'
    },
    string: {
      pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
      greedy: !0
    },
    function: {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: !0
    },
    'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
    decorator: {
      pattern: /(^\s*)@\w+(?:\.\w+)*/im,
      lookbehind: !0,
      alias: ['annotation', 'punctuation'],
      inside: { punctuation: /\./ }
    },
    keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/
  }),
    (Prism.languages.python[
      'string-interpolation'
    ].inside.interpolation.inside.rest = Prism.languages.python),
    (Prism.languages.py = Prism.languages.python)
  Prism.languages.rust = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }
    ],
    string: [
      { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
      { pattern: /b?"(?:\\.|[^\\\r\n"])*"/, greedy: !0 }
    ],
    char: {
      pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
      alias: 'string'
    },
    'lifetime-annotation': { pattern: /'[^\s>']+/, alias: 'symbol' },
    keyword: /\b(?:abstract|alignof|as|async|await|be|box|break|const|continue|crate|do|dyn|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|Self|struct|super|true|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
    attribute: { pattern: /#!?\[.+?\]/, greedy: !0, alias: 'attr-name' },
    function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
    'macro-rules': { pattern: /\w+!/, alias: 'function' },
    number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
    'closure-params': {
      pattern: /\|[^|]*\|(?=\s*[{-])/,
      inside: { punctuation: /[|:,]/, operator: /[&*]/ }
    },
    punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
  }
  !(function(E) {
    const A = (E.languages.plsql = E.languages.extend('sql', {
      comment: [/\/\*[\s\S]*?\*\//, /--.*/]
    }))
    let T = A.keyword
    Array.isArray(T) || (T = A.keyword = [T]),
      T.unshift(
        /\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i
      )
    let R = A.operator
    Array.isArray(R) || (R = A.operator = [R]), R.unshift(/:=/)
  })(Prism)
  !(function(n) {
    const t = {
      url: /url\((["']?).*?\1\)/i,
      string: {
        pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
        greedy: !0
      },
      interpolation: null,
      func: null,
      important: /\B!(?:important|optional)\b/i,
      keyword: {
        pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
        lookbehind: !0
      },
      hexcode: /#[\da-f]{3,6}/i,
      number: /\b\d+(?:\.\d+)?%?/,
      boolean: /\b(?:true|false)\b/,
      operator: [
        /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
      ],
      punctuation: /[{}()\[\];:,]/
    }
    ;(t.interpolation = {
      pattern: /\{[^\r\n}:]+\}/,
      alias: 'variable',
      inside: { delimiter: { pattern: /^{|}$/, alias: 'punctuation' }, rest: t }
    }),
      (t.func = {
        pattern: /[\w-]+\([^)]*\).*/,
        inside: { function: /^[^(]+/, rest: t }
      }),
      (n.languages.stylus = {
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
          lookbehind: !0
        },
        'atrule-declaration': {
          pattern: /(^\s*)@.+/m,
          lookbehind: !0,
          inside: { atrule: /^@[\w-]+/, rest: t }
        },
        'variable-declaration': {
          pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
          lookbehind: !0,
          inside: { variable: /^\S+/, rest: t }
        },
        statement: {
          pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
          lookbehind: !0,
          inside: { keyword: /^\S+/, rest: t }
        },
        'property-declaration': {
          pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
          lookbehind: !0,
          inside: {
            property: {
              pattern: /^[^\s:]+/,
              inside: { interpolation: t.interpolation }
            },
            rest: t
          }
        },
        selector: {
          pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
          lookbehind: !0,
          inside: { interpolation: t.interpolation, punctuation: /[{},]/ }
        },
        func: t.func,
        string: t.string,
        interpolation: t.interpolation,
        punctuation: /[{}()\[\];:.]/
      })
  })(Prism)
  !(function(e) {
    e.languages.pug = {
      comment: {
        pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
        lookbehind: !0
      },
      'multiline-script': {
        pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0,
        inside: e.languages.javascript
      },
      filter: {
        pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0,
        inside: { 'filter-name': { pattern: /^:[\w-]+/, alias: 'variable' } }
      },
      'multiline-plain-text': {
        pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0
      },
      markup: {
        pattern: /(^[\t ]*)<.+/m,
        lookbehind: !0,
        inside: e.languages.markup
      },
      doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
      'flow-control': {
        pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
        lookbehind: !0,
        inside: {
          each: {
            pattern: /^each .+? in\b/,
            inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ }
          },
          branch: {
            pattern: /^(?:if|unless|else|case|when|default|while)\b/,
            alias: 'keyword'
          },
          rest: e.languages.javascript
        }
      },
      keyword: {
        pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
        lookbehind: !0
      },
      mixin: [
        {
          pattern: /(^[\t ]*)mixin .+/m,
          lookbehind: !0,
          inside: {
            keyword: /^mixin/,
            function: /\w+(?=\s*\(|\s*$)/,
            punctuation: /[(),.]/
          }
        },
        {
          pattern: /(^[\t ]*)\+.+/m,
          lookbehind: !0,
          inside: {
            name: { pattern: /^\+\w+/, alias: 'function' },
            rest: e.languages.javascript
          }
        }
      ],
      script: {
        pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
        lookbehind: !0,
        inside: e.languages.javascript
      },
      'plain-text': {
        pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
        lookbehind: !0
      },
      tag: {
        pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
        lookbehind: !0,
        inside: {
          attributes: [
            { pattern: /&[^(]+\([^)]+\)/, inside: e.languages.javascript },
            {
              pattern: /\([^)]+\)/,
              inside: {
                'attr-value': {
                  pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                  lookbehind: !0,
                  inside: e.languages.javascript
                },
                'attr-name': /[\w-]+(?=\s*!?=|\s*[,)])/,
                punctuation: /[!=(),]+/
              }
            }
          ],
          punctuation: /:/
        }
      },
      code: [
        {
          pattern: /(^[\t ]*(?:-|!?=)).+/m,
          lookbehind: !0,
          inside: e.languages.javascript
        }
      ],
      punctuation: /[.\-!=|]+/
    }
    for (
      var t = [
          { filter: 'atpl', language: 'twig' },
          { filter: 'coffee', language: 'coffeescript' },
          'ejs',
          'handlebars',
          'less',
          'livescript',
          'markdown',
          { filter: 'sass', language: 'scss' },
          'stylus'
        ],
        n = {},
        a = 0,
        i = t.length;
      a < i;
      a++
    ) {
      let r = t[a]
      ;(r = typeof r === 'string' ? { filter: r, language: r } : r),
        e.languages[r.language] &&
          (n['filter-' + r.filter] = {
            pattern: RegExp(
              '(^([\t ]*)):{{filter_name}}(?:(?:\r?\n|\r(?!\n))(?:\\2[\t ]+.+|\\s*?(?=\r?\n|\r)))+'.replace(
                '{{filter_name}}',
                r.filter
              ),
              'm'
            ),
            lookbehind: !0,
            inside: {
              'filter-name': { pattern: /^:[\w-]+/, alias: 'variable' },
              rest: e.languages[r.language]
            }
          })
    }
    e.languages.insertBefore('pug', 'filter', n)
  })(Prism)
  Prism.languages.vim = {
    string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
    comment: /".*/,
    function: /\w+(?=\()/,
    keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
    builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
    operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
    punctuation: /[{}[\](),;:]/
  }
  Prism.languages.wasm = {
    comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
    string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
    keyword: [
      { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
      {
        pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
        inside: { punctuation: /\./ }
      },
      /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/
    ],
    variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
    number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    punctuation: /[()]/
  }
  !(function() {
    if (
      (typeof self === 'undefined' || self.Prism) &&
      (typeof global === 'undefined' || global.Prism)
    ) {
      const t = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/
      const r = /\b\S+@[\w.]+[a-z]{2}/
      const a = /\[([^\]]+)]\(([^)]+)\)/
      const l = ['comment', 'url', 'attr-value', 'string']
      ;(Prism.plugins.autolinker = {
        processGrammar(i) {
          i &&
            !i['url-link'] &&
            (Prism.languages.DFS(i, function(i, n, e) {
              l.includes(e) &&
                !Array.isArray(n) &&
                (n.pattern || (n = this[i] = { pattern: n }),
                (n.inside = n.inside || {}),
                e == 'comment' && (n.inside['md-link'] = a),
                e == 'attr-value'
                  ? Prism.languages.insertBefore(
                      'inside',
                      'punctuation',
                      { 'url-link': t },
                      n
                    )
                  : (n.inside['url-link'] = t),
                (n.inside['email-link'] = r))
            }),
            (i['url-link'] = t),
            (i['email-link'] = r))
        }
      }),
        Prism.hooks.add('before-highlight', function(i) {
          Prism.plugins.autolinker.processGrammar(i.grammar)
        }),
        Prism.hooks.add('wrap', function(i) {
          if (/-link$/.test(i.type)) {
            i.tag = 'a'
            let n = i.content
            if (i.type == 'email-link' && n.indexOf('mailto:') != 0)
              n = 'mailto:' + n
            else if (i.type == 'md-link') {
              const e = i.content.match(a)
              ;(n = e[2]), (i.content = e[1])
            }
            i.attributes.href = n
            try {
              i.content = decodeURIComponent(i.content)
            } catch (i) {}
          }
        })
    }
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document) {
      let r = []
      const i = {}
      const a = function() {}
      Prism.plugins.toolbar = {}
      const t = (Prism.plugins.toolbar.registerButton = function(t, a) {
        let e
        ;(e =
          typeof a === 'function'
            ? a
            : function(t) {
                let e
                return (
                  typeof a.onClick === 'function'
                    ? (((e = document.createElement('button')).type = 'button'),
                      e.addEventListener('click', function() {
                        a.onClick.call(this, t)
                      }))
                    : typeof a.url === 'string'
                    ? ((e = document.createElement('a')).href = a.url)
                    : (e = document.createElement('span')),
                  a.className && e.classList.add(a.className),
                  (e.textContent = a.text),
                  e
                )
              }),
          t in i
            ? console.warn(
                'There is a button with the key "' + t + '" registered already.'
              )
            : r.push((i[t] = e))
      })
      const e = (Prism.plugins.toolbar.hook = function(n) {
        const t = n.element.parentNode
        if (
          t &&
          /pre/i.test(t.nodeName) &&
          !t.parentNode.classList.contains('code-toolbar')
        ) {
          const e = document.createElement('div')
          e.classList.add('code-toolbar'),
            t.parentNode.insertBefore(e, t),
            e.appendChild(t)
          const o = document.createElement('div')
          o.classList.add('toolbar'),
            document.body.hasAttribute('data-toolbar-order') &&
              (r = document.body
                .getAttribute('data-toolbar-order')
                .split(',')
                .map(function(t) {
                  return i[t] || a
                })),
            r.forEach(function(t) {
              const e = t(n)
              if (e) {
                const a = document.createElement('div')
                a.classList.add('toolbar-item'),
                  a.appendChild(e),
                  o.appendChild(a)
              }
            }),
            e.appendChild(o)
        }
      })
      t('label', function(t) {
        const e = t.element.parentNode
        if (e && /pre/i.test(e.nodeName) && e.hasAttribute('data-label')) {
          let a
          let n
          const o = e.getAttribute('data-label')
          try {
            n = document.querySelector('template#' + o)
          } catch (t) {}
          return (
            n
              ? (a = n.content)
              : (e.hasAttribute('data-url')
                  ? ((a = document.createElement('a')).href = e.getAttribute(
                      'data-url'
                    ))
                  : (a = document.createElement('span')),
                (a.textContent = o)),
            a
          )
        }
      }),
        Prism.hooks.add('complete', e)
    }
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document) {
      const u = /(?:^|\s)command-line(?:\s|$)/
      Prism.hooks.add('before-highlight', function(e) {
        const t = (e.vars = e.vars || {})
        const a = (t['command-line'] = t['command-line'] || {})
        if (!a.complete && e.code) {
          const n = e.element.parentNode
          if (
            n &&
            /pre/i.test(n.nodeName) &&
            (u.test(n.className) || u.test(e.element.className))
          )
            if (e.element.querySelector('.command-line-prompt')) a.complete = !0
            else {
              const r = e.code.split('\n')
              a.numberOfLines = r.length
              const s = (a.outputLines = [])
              let o = n.getAttribute('data-output')
              const i = n.getAttribute('data-filter-output')
              if (o || o === '') {
                o = o.split(',')
                for (var l = 0; l < o.length; l++) {
                  const m = o[l].split('-')
                  let p = parseInt(m[0], 10)
                  let d = m.length === 2 ? parseInt(m[1], 10) : p
                  if (!isNaN(p) && !isNaN(d)) {
                    p < 1 && (p = 1), d > r.length && (d = r.length), d--
                    for (let c = --p; c <= d; c++) (s[c] = r[c]), (r[c] = '')
                  }
                }
              } else if (i)
                for (l = 0; l < r.length; l++)
                  r[l].indexOf(i) === 0 &&
                    ((s[l] = r[l].slice(i.length)), (r[l] = ''))
              e.code = r.join('\n')
            }
          else a.complete = !0
        } else a.complete = !0
      }),
        Prism.hooks.add('before-insert', function(e) {
          const t = (e.vars = e.vars || {})
          const a = (t['command-line'] = t['command-line'] || {})
          if (!a.complete) {
            for (
              var n = e.highlightedCode.split('\n'),
                r = 0,
                s = (a.outputLines || []).length;
              r < s;
              r++
            )
              a.outputLines.hasOwnProperty(r) && (n[r] = a.outputLines[r])
            e.highlightedCode = n.join('\n')
          }
        }),
        Prism.hooks.add('complete', function(e) {
          const t = (e.vars = e.vars || {})
          const a = (t['command-line'] = t['command-line'] || {})
          if (!a.complete) {
            const n = e.element.parentNode
            u.test(e.element.className) &&
              (e.element.className = e.element.className.replace(u, ' ')),
              u.test(n.className) || (n.className += ' command-line')
            const r = function(e, t) {
              return (n.getAttribute(e) || t).replace(/"/g, '&quot')
            }
            let s = new Array((a.numberOfLines || 0) + 1)
            const o = r('data-prompt', '')
            if (o !== '') s = s.join('<span data-prompt="' + o + '"></span>')
            else {
              const i = r('data-user', 'user')
              const l = r('data-host', 'localhost')
              s = s.join(
                '<span data-user="' + i + '" data-host="' + l + '"></span>'
              )
            }
            const m = document.createElement('span')
            ;(m.className = 'command-line-prompt'), (m.innerHTML = s)
            for (let p = 0, d = (a.outputLines || []).length; p < d; p++)
              if (a.outputLines.hasOwnProperty(p)) {
                const c = m.children[p]
                c.removeAttribute('data-user'),
                  c.removeAttribute('data-host'),
                  c.removeAttribute('data-prompt')
              }
            e.element.insertBefore(m, e.element.firstChild), (a.complete = !0)
          }
        })
    }
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document)
      if (Prism.plugins.toolbar) {
        const r = {
          html: 'HTML',
          xml: 'XML',
          svg: 'SVG',
          mathml: 'MathML',
          css: 'CSS',
          clike: 'C-like',
          js: 'JavaScript',
          abap: 'ABAP',
          abnf: 'Augmented Backus–Naur form',
          antlr4: 'ANTLR4',
          g4: 'ANTLR4',
          apacheconf: 'Apache Configuration',
          apl: 'APL',
          aql: 'AQL',
          arff: 'ARFF',
          asciidoc: 'AsciiDoc',
          adoc: 'AsciiDoc',
          asm6502: '6502 Assembly',
          aspnet: 'ASP.NET (C#)',
          autohotkey: 'AutoHotkey',
          autoit: 'AutoIt',
          shell: 'Bash',
          basic: 'BASIC',
          bbcode: 'BBcode',
          bnf: 'Backus–Naur form',
          rbnf: 'Routing Backus–Naur form',
          csharp: 'C#',
          cs: 'C#',
          dotnet: 'C#',
          cpp: 'C++',
          cil: 'CIL',
          coffee: 'CoffeeScript',
          cmake: 'CMake',
          csp: 'Content-Security-Policy',
          'css-extras': 'CSS Extras',
          django: 'Django/Jinja2',
          jinja2: 'Django/Jinja2',
          'dns-zone-file': 'DNS zone file',
          'dns-zone': 'DNS zone file',
          dockerfile: 'Docker',
          ebnf: 'Extended Backus–Naur form',
          ejs: 'EJS',
          etlua: 'Embedded Lua templating',
          erb: 'ERB',
          fsharp: 'F#',
          'firestore-security-rules': 'Firestore security rules',
          ftl: 'FreeMarker Template Language',
          gcode: 'G-code',
          gdscript: 'GDScript',
          gedcom: 'GEDCOM',
          glsl: 'GLSL',
          gml: 'GameMaker Language',
          gamemakerlanguage: 'GameMaker Language',
          graphql: 'GraphQL',
          hs: 'Haskell',
          hcl: 'HCL',
          http: 'HTTP',
          hpkp: 'HTTP Public-Key-Pins',
          hsts: 'HTTP Strict-Transport-Security',
          ichigojam: 'IchigoJam',
          inform7: 'Inform 7',
          javadoc: 'JavaDoc',
          javadoclike: 'JavaDoc-like',
          javastacktrace: 'Java stack trace',
          jq: 'JQ',
          jsdoc: 'JSDoc',
          'js-extras': 'JS Extras',
          'js-templates': 'JS Templates',
          json: 'JSON',
          jsonp: 'JSONP',
          json5: 'JSON5',
          latex: 'LaTeX',
          tex: 'TeX',
          context: 'ConTeXt',
          lilypond: 'LilyPond',
          ly: 'LilyPond',
          emacs: 'Lisp',
          elisp: 'Lisp',
          'emacs-lisp': 'Lisp',
          lolcode: 'LOLCODE',
          md: 'Markdown',
          'markup-templating': 'Markup templating',
          matlab: 'MATLAB',
          mel: 'MEL',
          moon: 'MoonScript',
          n1ql: 'N1QL',
          n4js: 'N4JS',
          n4jsd: 'N4JS',
          'nand2tetris-hdl': 'Nand To Tetris HDL',
          nasm: 'NASM',
          nginx: 'nginx',
          nsis: 'NSIS',
          objectivec: 'Objective-C',
          ocaml: 'OCaml',
          opencl: 'OpenCL',
          parigp: 'PARI/GP',
          objectpascal: 'Object Pascal',
          pcaxis: 'PC-Axis',
          px: 'PC-Axis',
          php: 'PHP',
          phpdoc: 'PHPDoc',
          'php-extras': 'PHP Extras',
          plsql: 'PL/SQL',
          powershell: 'PowerShell',
          properties: '.properties',
          protobuf: 'Protocol Buffers',
          py: 'Python',
          q: 'Q (kdb+ database)',
          jsx: 'React JSX',
          tsx: 'React TSX',
          renpy: "Ren'py",
          rest: 'reST (reStructuredText)',
          robotframework: 'Robot Framework',
          robot: 'Robot Framework',
          rb: 'Ruby',
          sas: 'SAS',
          sass: 'Sass (Sass)',
          scss: 'Sass (Scss)',
          'shell-session': 'Shell session',
          solidity: 'Solidity (Ethereum)',
          soy: 'Soy (Closure Template)',
          sparql: 'SPARQL',
          rq: 'SPARQL',
          'splunk-spl': 'Splunk SPL',
          sqf: 'SQF: Status Quo Function (Arma 3)',
          sql: 'SQL',
          tap: 'TAP',
          toml: 'TOML',
          tt2: 'Template Toolkit 2',
          trig: 'TriG',
          ts: 'TypeScript',
          't4-cs': 'T4 Text Templates (C#)',
          t4: 'T4 Text Templates (C#)',
          't4-vb': 'T4 Text Templates (VB)',
          't4-templating': 'T4 templating',
          vbnet: 'VB.Net',
          vhdl: 'VHDL',
          vim: 'vim',
          'visual-basic': 'Visual Basic',
          vb: 'Visual Basic',
          wasm: 'WebAssembly',
          wiki: 'Wiki markup',
          xeoracube: 'XeoraCube',
          xojo: 'Xojo (REALbasic)',
          xquery: 'XQuery',
          yaml: 'YAML',
          yml: 'YAML'
        }
        Prism.plugins.toolbar.registerButton('show-language', function(e) {
          const a = e.element.parentNode
          if (a && /pre/i.test(a.nodeName)) {
            let s
            const t =
              a.getAttribute('data-language') ||
              r[e.language] ||
              ((s = e.language)
                ? (s.substring(0, 1).toUpperCase() + s.substring(1)).replace(
                    /s(?=cript)/,
                    'S'
                  )
                : s)
            if (t) {
              const o = document.createElement('span')
              return (o.textContent = t), o
            }
          }
        })
      } else console.warn('Show Languages plugin loaded before Toolbar plugin.')
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document)
      if (Prism.plugins.toolbar) {
        let r = window.ClipboardJS || void 0
        r || typeof require !== 'function' || (r = require('clipboard'))
        const i = []
        if (!r) {
          const o = document.createElement('script')
          const e = document.querySelector('head')
          ;(o.onload = function() {
            if ((r = window.ClipboardJS)) for (; i.length; ) i.pop()()
          }),
            (o.src =
              'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js'),
            e.appendChild(o)
        }
        Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(e) {
          const t = document.createElement('p')
          return (t.textContent = 'Copy'), r ? o() : i.push(o), t
          function o() {
            const o = new r(t, {
              text() {
                return e.code
              }
            })
            o.on('success', function() {
              ;(t.textContent = 'Copied!'), n()
            }),
              o.on('error', function() {
                ;(t.textContent = 'Press Ctrl+C to copy'), n()
              })
          }
          function n() {
            setTimeout(function() {
              t.textContent = 'Copy'
            }, 5e3)
          }
        })
      } else
        console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.')
  })()
}
