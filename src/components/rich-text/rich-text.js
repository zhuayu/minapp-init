const WxParse = require('./wxParse/wxParse.js');
import hljs  from './hljs/index.js';

Component({
    properties: {
        datas: {
            type: String,
            value: '',
            observer: function(newVal, oldVal){

                // JS 正在不支持 ?>= 所以把前标签也匹配了之后再去掉
                var pattern = /<pre>[\s\S]*?(?=<\/pre>)/mg;
                var lang_pattern = /code\sclass="lang-[\s\S]*?(?=">)/;


                // 过滤
                var value = newVal.replace(pattern,function(code){

                    // 匹配是否有语言
                    let hasLang = 'js|java|php|html|xml|css';
                    let lang = code.match(lang_pattern);

                    if(lang){
                        lang = lang[0].slice(17)
                        // 如何匹配语言中不支持
                        if( hasLang.indexOf(lang) === -1){
                            lang = null;
                        }
                    }

                    // 匹配内容
                    code = code.replace(/<pre><code(\sclass="[\s\S]*")?>/,'');
                    code = code.replace(/<\/code>/,'');
                    code = code.replace(/<br>/,`\n`);
                    // 判断语言类型
                    if(lang){
                        code = hljs.highlight(lang,code).value;
                    }else{
                        code = hljs.highlightAuto(code).value;
                    }
                    // 回车符处理
                    // code = code.replace(/\r\n/g,`\n`);
                    // code = code.replace(/\n\n/g,`\n`);
                    console.log(JSON.stringify(code));
                    // span 和 span 之间的空白字符, 本来想用 \s 匹配空字符串，但是会把 ↵ 也一起匹配了，所以换成[' ']空格。
                    // 事例 `[a, b] = squares;\n\n<span class=\"hljs-built_in\">console</span>.log(a + b);\n`.match(/\s/g)
                    code = code.replace(/ (?=<span)/g, '<span style="opacity:0;">_</span>');
                    console.log(JSON.stringify(code));

                    // 被转译后的 & 字符 + nbsp
                    code = code.replace(/&amp;nbsp;/g, '<span style="opacity:0;">_</span>');
                    code = code.replace(/&nbsp;/g, '<span style="opacity:0;">_</span>');

                    // 特殊大于小于号处理
                    code = code.replace(/‹/g, '>');
                    code = code.replace(/›;/g, '>');
                    // 拼接
                    code = `<pre><code>${code}</code>`;

                    console.log(JSON.stringify(code));

                    return code
                })

                WxParse.wxParse('richtext', 'html', value, this, 5);
            }
        },
    },
    data: {
    },
    methods: {
    }
})
