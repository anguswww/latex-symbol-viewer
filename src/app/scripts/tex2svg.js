#! /usr/bin/env -S node -r esm

/*************************************************************************
 *
 *  simple/tex2chtml
 *
 *  Uses MathJax v3 to convert a TeX string to an HTML string.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2019 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


//
//  The default TeX packages to use
//
const PACKAGES = 'base, autoload, require, ams, newcommand';

//
//  Get the command-line arguments
//
var argv = require('yargs')
    .demand(0).strict()
    .usage('$0 [options] "math" > file.html')
    .options({
        inline: {
            boolean: true,
            describe: "process as inline math"
        },
        em: {
            default: 16,
            describe: 'em-size in pixels'
        },
        ex: {
            default: 8,
            describe: 'ex-size in pixels'
        },
        width: {
            default: 80 * 16,
            describe: 'width of container in pixels'
        },
        packages: {
            default: PACKAGES,
            describe: 'the packages to use, e.g. "base, ams"; use "*" to represent the default packages, e.g, "*, bbox"'
        },
        css: {
            boolean: true,
            describe: 'output the required CSS rather than the HTML itself'
        },
        fontURL: {
            default: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
            describe: 'the URL to use for web fonts'
        },
        assistiveMml: {
            boolean: true,
            default: false,
            describe: 'whether to include assistive MathML output'
        },
        dist: {
            boolean: true,
            default: false,
            describe: 'true to use webpacked version, false to use MathJax source files'
        }
    })
    .argv;

//
// Load MathJax and initialize MathJax and typeset the given math
//
require('mathjax-full').init({
    //
    //  The MathJax configuration
    //
    options: {
        enableAssistiveMml: argv.assistiveMml
    },
    loader: {
        source: (argv.dist ? {} : require('mathjax-full/components/src/source.js').source),
        load: ['adaptors/liteDOM', 'tex-chtml']
    },
    tex: {
        packages: argv.packages.replace('\*', PACKAGES).split(/\s*,\s*/)
    },
    chtml: {
        fontURL: argv.fontURL
    },
    startup: {
        typeset: false
    }
}).then((MathJax) => {
    //
    //  Typeset and display the math
    //
    MathJax.tex2chtmlPromise(argv._[0] || '', {
        display: !argv.inline,
        em: argv.em,
        ex: argv.ex,
        containerWidth: argv.width
    }).then((node) => {
        const adaptor = MathJax.startup.adaptor;
        //
        //  If the --css option was specified, output the CSS,
        //  Otherwise, output the typeset math as HTML
        //
        if (argv.css) {
            console.log(adaptor.textContent(MathJax.chtmlStylesheet()));
        } else {
            console.log(adaptor.outerHTML(node));
        };
    });
}).catch(err => console.log(err));