import { LanguageDescription, StreamLanguage } from '@codemirror/language';

function legacy(parser) {
  return StreamLanguage.define(parser);
}

async function sql(dialect) {
  const data = await import('@codemirror/lang-sql');
  return data[dialect];
}

// eslint-disable-next-line import/prefer-default-export
export const languages = [
  LanguageDescription.of({
    name: 'Plain Text',
    extensions: ['text', 'txt', 'plain text', 'simple'],
    async load() {
      return [];
    },
  }),
  LanguageDescription.of({
    name: 'C',
    extensions: ['c', 'h', 'ino'],
    async load() {
      const m = await import('@codemirror/lang-cpp');
      return m.cpp();
    },
  }),
  LanguageDescription.of({
    name: 'C++',
    alias: ['cpp'],
    extensions: ['cpp', 'c++', 'cc', 'cxx', 'hpp', 'h++', 'hh', 'hxx'],
    async load() {
      const m = await import('@codemirror/lang-cpp');
      return m.cpp();
    },
  }),
  LanguageDescription.of({
    name: 'CQL',
    alias: ['cassandra'],
    extensions: ['cql'],
    load() {
      return sql('Cassandra');
    },
  }),
  LanguageDescription.of({
    name: 'CSS',
    extensions: ['css'],
    async load() {
      const m = await import('@codemirror/lang-css');
      return m.css();
    },
  }),
  LanguageDescription.of({
    name: 'HTML',
    alias: ['xhtml'],
    extensions: ['html', 'htm', 'handlebars', 'hbs'],
    async load() {
      const m = await import('@codemirror/lang-html');
      return m.html();
    },
  }),
  LanguageDescription.of({
    name: 'Java',
    extensions: ['java'],
    async load() {
      const m = await import('@codemirror/lang-java');
      return m.java();
    },
  }),
  LanguageDescription.of({
    name: 'JavaScript',
    alias: ['ecmascript', 'js', 'node'],
    extensions: ['js', 'mjs', 'cjs'],
    async load() {
      const m = await import('@codemirror/lang-javascript');
      return m.javascript();
    },
  }),
  LanguageDescription.of({
    name: 'JSON',
    alias: ['json5'],
    extensions: ['json', 'map'],
    async load() {
      const m = await import('@codemirror/lang-json');
      return m.json();
    },
  }),
  LanguageDescription.of({
    name: 'JSX',
    extensions: ['jsx'],
    async load() {
      const m = await import('@codemirror/lang-javascript');
      return m.javascript({ jsx: true });
    },
  }),
  LanguageDescription.of({
    name: 'MariaDB SQL',
    load() {
      return sql('MariaSQL');
    },
  }),
  LanguageDescription.of({
    name: 'Markdown',
    extensions: ['md', 'markdown', 'mkd'],
    async load() {
      const m = await import('@codemirror/lang-markdown');
      return m.markdown();
    },
  }),
  LanguageDescription.of({
    name: 'MS SQL',
    load() {
      return sql('MSSQL');
    },
  }),
  LanguageDescription.of({
    name: 'MySQL',
    load() {
      return sql('MySQL');
    },
  }),
  LanguageDescription.of({
    name: 'PHP',
    extensions: ['php', 'php3', 'php4', 'php5', 'php7', 'phtml'],
    async load() {
      const m = await import('@codemirror/lang-php');
      return m.php();
    },
  }),
  LanguageDescription.of({
    name: 'PLSQL',
    extensions: ['pls'],
    load() {
      return sql('PLSQL');
    },
  }),
  LanguageDescription.of({
    name: 'PostgreSQL',
    load() {
      return sql('PostgreSQL');
    },
  }),
  LanguageDescription.of({
    name: 'Python',
    extensions: ['BUILD', 'bzl', 'py', 'pyw'],
    filename: /^(BUCK|BUILD)$/,
    async load() {
      const m = await import('@codemirror/lang-python');
      return m.python();
    },
  }),
  LanguageDescription.of({
    name: 'Rust',
    extensions: ['rs'],
    async load() {
      const m = await import('@codemirror/lang-rust');
      return m.rust();
    },
  }),
  LanguageDescription.of({
    name: 'SQL',
    extensions: ['sql'],
    load() {
      return sql('StandardSQL');
    },
  }),
  LanguageDescription.of({
    name: 'SQLite',
    load() {
      return sql('SQLite');
    },
  }),
  LanguageDescription.of({
    name: 'TSX',
    extensions: ['tsx'],
    async load() {
      const m = await import('@codemirror/lang-javascript');
      return m.javascript({ jsx: true, typescript: true });
    },
  }),
  LanguageDescription.of({
    name: 'TypeScript',
    alias: ['ts'],
    extensions: ['ts'],
    async load() {
      const m = await import('@codemirror/lang-javascript');
      return m.javascript({ typescript: true });
    },
  }),
  LanguageDescription.of({
    name: 'WebAssembly',
    extensions: ['wat', 'wast'],
    async load() {
      const m = await import('@codemirror/lang-wast');
      return m.wast();
    },
  }),
  LanguageDescription.of({
    name: 'XML',
    alias: ['rss', 'wsdl', 'xsd'],
    extensions: ['xml', 'xsl', 'xsd', 'svg'],
    async load() {
      const m = await import('@codemirror/lang-xml');
      return m.xml();
    },
  }),

  // Legacy modes ported from CodeMirror 5

  LanguageDescription.of({
    name: 'APL',
    extensions: ['dyalog', 'apl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/apl');
      return legacy(m.apl);
    },
  }),
  LanguageDescription.of({
    name: 'PGP',
    alias: ['asciiarmor'],
    extensions: ['asc', 'pgp', 'sig'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/asciiarmor');
      return legacy(m.asciiArmor);
    },
  }),
  LanguageDescription.of({
    name: 'ASN.1',
    extensions: ['asn', 'asn1'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/asn1');
      return legacy(m.asn1({}));
    },
  }),
  LanguageDescription.of({
    name: 'Asterisk',
    filename: /^extensions\.conf$/i,
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/asterisk');
      return legacy(m.asterisk);
    },
  }),
  LanguageDescription.of({
    name: 'Brainfuck',
    extensions: ['b', 'bf'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/brainfuck');
      return legacy(m.brainfuck);
    },
  }),
  LanguageDescription.of({
    name: 'Cobol',
    extensions: ['cob', 'cpy'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/cobol');
      return legacy(m.cobol);
    },
  }),
  LanguageDescription.of({
    name: 'C#',
    alias: ['csharp', 'cs'],
    extensions: ['cs'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clike');
      return legacy(m.csharp);
    },
  }),
  LanguageDescription.of({
    name: 'Clojure',
    extensions: ['clj', 'cljc', 'cljx'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clojure');
      return legacy(m.clojure);
    },
  }),
  LanguageDescription.of({
    name: 'ClojureScript',
    extensions: ['cljs'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clojure');
      return legacy(m.clojure);
    },
  }),
  LanguageDescription.of({
    name: 'Closure Stylesheets (GSS)',
    extensions: ['gss'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/css');
      return legacy(m.gss);
    },
  }),
  LanguageDescription.of({
    name: 'CMake',
    extensions: ['cmake', 'cmake.in'],
    filename: /^CMakeLists\.txt$/,
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/cmake');
      return legacy(m.cmake);
    },
  }),
  LanguageDescription.of({
    name: 'CoffeeScript',
    alias: ['coffee', 'coffee-script'],
    extensions: ['coffee'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/coffeescript');
      return legacy(m.coffeeScript);
    },
  }),
  LanguageDescription.of({
    name: 'Common Lisp',
    alias: ['lisp'],
    extensions: ['cl', 'lisp', 'el'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/commonlisp');
      return legacy(m.commonLisp);
    },
  }),
  LanguageDescription.of({
    name: 'Cypher',
    extensions: ['cyp', 'cypher'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/cypher');
      return legacy(m.cypher);
    },
  }),
  LanguageDescription.of({
    name: 'Cython',
    extensions: ['pyx', 'pxd', 'pxi'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/python');
      return legacy(m.cython);
    },
  }),
  LanguageDescription.of({
    name: 'Crystal',
    extensions: ['cr'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/crystal');
      return legacy(m.crystal);
    },
  }),
  LanguageDescription.of({
    name: 'D',
    extensions: ['d'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/d');
      return legacy(m.d);
    },
  }),
  LanguageDescription.of({
    name: 'Dart',
    extensions: ['dart'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clike');
      return legacy(m.dart);
    },
  }),
  LanguageDescription.of({
    name: 'diff',
    extensions: ['diff', 'patch'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/diff');
      return legacy(m.diff);
    },
  }),
  LanguageDescription.of({
    name: 'Dockerfile',
    filename: /^Dockerfile$/,
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/dockerfile');
      return legacy(m.dockerFile);
    },
  }),
  LanguageDescription.of({
    name: 'DTD',
    extensions: ['dtd'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/dtd');
      return legacy(m.dtd);
    },
  }),
  LanguageDescription.of({
    name: 'Dylan',
    extensions: ['dylan', 'dyl', 'intr'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/dylan');
      return legacy(m.dylan);
    },
  }),
  LanguageDescription.of({
    name: 'EBNF',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/ebnf');
      return legacy(m.ebnf);
    },
  }),
  LanguageDescription.of({
    name: 'ECL',
    extensions: ['ecl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/ecl');
      return legacy(m.ecl);
    },
  }),
  LanguageDescription.of({
    name: 'edn',
    extensions: ['edn'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clojure');
      return legacy(m.clojure);
    },
  }),
  LanguageDescription.of({
    name: 'Eiffel',
    extensions: ['e'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/eiffel');
      return legacy(m.eiffel);
    },
  }),
  LanguageDescription.of({
    name: 'Elm',
    extensions: ['elm'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/elm');
      return legacy(m.elm);
    },
  }),
  LanguageDescription.of({
    name: 'Erlang',
    extensions: ['erl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/erlang');
      return legacy(m.erlang);
    },
  }),
  LanguageDescription.of({
    name: 'Esper',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/sql');
      return legacy(m.esper);
    },
  }),
  LanguageDescription.of({
    name: 'Factor',
    extensions: ['factor'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/factor');
      return legacy(m.factor);
    },
  }),
  LanguageDescription.of({
    name: 'FCL',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/fcl');
      return legacy(m.fcl);
    },
  }),
  LanguageDescription.of({
    name: 'Forth',
    extensions: ['forth', 'fth', '4th'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/forth');
      return legacy(m.forth);
    },
  }),
  LanguageDescription.of({
    name: 'Fortran',
    extensions: ['f', 'for', 'f77', 'f90', 'f95'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/fortran');
      return legacy(m.fortran);
    },
  }),
  LanguageDescription.of({
    name: 'F#',
    alias: ['fsharp'],
    extensions: ['fs'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mllike');
      return legacy(m.fSharp);
    },
  }),
  LanguageDescription.of({
    name: 'Gas',
    extensions: ['s'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/gas');
      return legacy(m.gas);
    },
  }),
  LanguageDescription.of({
    name: 'Gherkin',
    extensions: ['feature'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/gherkin');
      return legacy(m.gherkin);
    },
  }),
  LanguageDescription.of({
    name: 'Go',
    extensions: ['go'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/go');
      return legacy(m.go);
    },
  }),
  LanguageDescription.of({
    name: 'Groovy',
    extensions: ['groovy', 'gradle'],
    filename: /^Jenkinsfile$/,
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/groovy');
      return legacy(m.groovy);
    },
  }),
  LanguageDescription.of({
    name: 'Haskell',
    extensions: ['hs'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/haskell');
      return legacy(m.haskell);
    },
  }),
  LanguageDescription.of({
    name: 'Haxe',
    extensions: ['hx'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/haxe');
      return legacy(m.haxe);
    },
  }),
  LanguageDescription.of({
    name: 'HXML',
    extensions: ['hxml'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/haxe');
      return legacy(m.hxml);
    },
  }),
  LanguageDescription.of({
    name: 'HTTP',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/http');
      return legacy(m.http);
    },
  }),
  LanguageDescription.of({
    name: 'IDL',
    extensions: ['pro'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/idl');
      return legacy(m.idl);
    },
  }),
  LanguageDescription.of({
    name: 'JSON-LD',
    alias: ['jsonld'],
    extensions: ['jsonld'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/javascript');
      return legacy(m.jsonld);
    },
  }),
  LanguageDescription.of({
    name: 'Jinja2',
    extensions: ['j2', 'jinja', 'jinja2'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/jinja2');
      return legacy(m.jinja2);
    },
  }),
  LanguageDescription.of({
    name: 'Julia',
    extensions: ['jl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/julia');
      return legacy(m.julia);
    },
  }),
  LanguageDescription.of({
    name: 'Kotlin',
    extensions: ['kt'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clike');
      return legacy(m.kotlin);
    },
  }),
  LanguageDescription.of({
    name: 'LESS',
    extensions: ['less'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/css');
      return legacy(m.less);
    },
  }),
  LanguageDescription.of({
    name: 'LiveScript',
    alias: ['ls'],
    extensions: ['ls'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/livescript');
      return legacy(m.liveScript);
    },
  }),
  LanguageDescription.of({
    name: 'Lua',
    extensions: ['lua'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/lua');
      return legacy(m.lua);
    },
  }),
  LanguageDescription.of({
    name: 'mIRC',
    extensions: ['mrc'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mirc');
      return legacy(m.mirc);
    },
  }),
  LanguageDescription.of({
    name: 'Mathematica',
    extensions: ['m', 'nb', 'wl', 'wls'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mathematica');
      return legacy(m.mathematica);
    },
  }),
  LanguageDescription.of({
    name: 'Modelica',
    extensions: ['mo'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/modelica');
      return legacy(m.modelica);
    },
  }),
  LanguageDescription.of({
    name: 'MUMPS',
    extensions: ['mps'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mumps');
      return legacy(m.mumps);
    },
  }),
  LanguageDescription.of({
    name: 'Mbox',
    extensions: ['mbox'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mbox');
      return legacy(m.mbox);
    },
  }),
  LanguageDescription.of({
    name: 'Nginx',
    filename: /nginx.*\.conf$/i,
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/nginx');
      return legacy(m.nginx);
    },
  }),
  LanguageDescription.of({
    name: 'NSIS',
    extensions: ['nsh', 'nsi'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/nsis');
      return legacy(m.nsis);
    },
  }),
  LanguageDescription.of({
    name: 'NTriples',
    extensions: ['nt', 'nq'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/ntriples');
      return legacy(m.ntriples);
    },
  }),
  LanguageDescription.of({
    name: 'Objective-C',
    alias: ['objective-c', 'objc'],
    extensions: ['m'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clike');
      return legacy(m.objectiveC);
    },
  }),
  LanguageDescription.of({
    name: 'Objective-C++',
    alias: ['objective-c++', 'objc++'],
    extensions: ['mm'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clike');
      return legacy(m.objectiveCpp);
    },
  }),
  LanguageDescription.of({
    name: 'OCaml',
    extensions: ['ml', 'mli', 'mll', 'mly'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mllike');
      return legacy(m.oCaml);
    },
  }),
  LanguageDescription.of({
    name: 'Octave',
    extensions: ['m'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/octave');
      return legacy(m.octave);
    },
  }),
  LanguageDescription.of({
    name: 'Oz',
    extensions: ['oz'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/oz');
      return legacy(m.oz);
    },
  }),
  LanguageDescription.of({
    name: 'Pascal',
    extensions: ['p', 'pas'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/pascal');
      return legacy(m.pascal);
    },
  }),
  LanguageDescription.of({
    name: 'Perl',
    extensions: ['pl', 'pm'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/perl');
      return legacy(m.perl);
    },
  }),
  LanguageDescription.of({
    name: 'Pig',
    extensions: ['pig'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/pig');
      return legacy(m.pig);
    },
  }),
  LanguageDescription.of({
    name: 'PowerShell',
    extensions: ['ps1', 'psd1', 'psm1'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/powershell');
      return legacy(m.powerShell);
    },
  }),
  LanguageDescription.of({
    name: 'Properties files',
    alias: ['ini', 'properties'],
    extensions: ['properties', 'ini', 'in'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/properties');
      return legacy(m.properties);
    },
  }),
  LanguageDescription.of({
    name: 'ProtoBuf',
    extensions: ['proto'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/protobuf');
      return legacy(m.protobuf);
    },
  }),
  LanguageDescription.of({
    name: 'Puppet',
    extensions: ['pp'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/puppet');
      return legacy(m.puppet);
    },
  }),
  LanguageDescription.of({
    name: 'Q',
    extensions: ['q'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/q');
      return legacy(m.q);
    },
  }),
  LanguageDescription.of({
    name: 'R',
    alias: ['rscript'],
    extensions: ['r', 'R'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/r');
      return legacy(m.r);
    },
  }),
  LanguageDescription.of({
    name: 'RPM Changes',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/rpm');
      return legacy(m.rpmChanges);
    },
  }),
  LanguageDescription.of({
    name: 'RPM Spec',
    extensions: ['spec'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/rpm');
      return legacy(m.rpmSpec);
    },
  }),
  LanguageDescription.of({
    name: 'Ruby',
    alias: ['jruby', 'macruby', 'rake', 'rb', 'rbx'],
    extensions: ['rb'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/ruby');
      return legacy(m.ruby);
    },
  }),
  LanguageDescription.of({
    name: 'SAS',
    extensions: ['sas'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/sas');
      return legacy(m.sas);
    },
  }),
  LanguageDescription.of({
    name: 'Sass',
    extensions: ['sass'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/sass');
      return legacy(m.sass);
    },
  }),
  LanguageDescription.of({
    name: 'Scala',
    extensions: ['scala'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clike');
      return legacy(m.scala);
    },
  }),
  LanguageDescription.of({
    name: 'Scheme',
    extensions: ['scm', 'ss'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/scheme');
      return legacy(m.scheme);
    },
  }),
  LanguageDescription.of({
    name: 'SCSS',
    extensions: ['scss'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/css');
      return legacy(m.sCSS);
    },
  }),
  LanguageDescription.of({
    name: 'Shell',
    alias: ['bash', 'sh', 'zsh'],
    extensions: ['sh', 'ksh', 'bash'],
    filename: /^PKGBUILD$/,
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/shell');
      return legacy(m.shell);
    },
  }),
  LanguageDescription.of({
    name: 'Sieve',
    extensions: ['siv', 'sieve'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/sieve');
      return legacy(m.sieve);
    },
  }),
  LanguageDescription.of({
    name: 'Smalltalk',
    extensions: ['st'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/smalltalk');
      return legacy(m.smalltalk);
    },
  }),
  LanguageDescription.of({
    name: 'Solr',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/solr');
      return legacy(m.solr);
    },
  }),
  LanguageDescription.of({
    name: 'SML',
    extensions: ['sml', 'sig', 'fun', 'smackspec'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mllike');
      return legacy(m.sml);
    },
  }),
  LanguageDescription.of({
    name: 'SPARQL',
    alias: ['sparul'],
    extensions: ['rq', 'sparql'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/sparql');
      return legacy(m.sparql);
    },
  }),
  LanguageDescription.of({
    name: 'Spreadsheet',
    alias: ['excel', 'formula'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/spreadsheet');
      return legacy(m.spreadsheet);
    },
  }),
  LanguageDescription.of({
    name: 'Squirrel',
    extensions: ['nut'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/clike');
      return legacy(m.squirrel);
    },
  }),
  LanguageDescription.of({
    name: 'Stylus',
    extensions: ['styl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/stylus');
      return legacy(m.stylus);
    },
  }),
  LanguageDescription.of({
    name: 'Swift',
    extensions: ['swift'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/swift');
      return legacy(m.swift);
    },
  }),
  LanguageDescription.of({
    name: 'sTeX',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/stex');
      return legacy(m.stex);
    },
  }),
  LanguageDescription.of({
    name: 'LaTeX',
    alias: ['tex'],
    extensions: ['text', 'ltx', 'tex'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/stex');
      return legacy(m.stex);
    },
  }),
  LanguageDescription.of({
    name: 'SystemVerilog',
    extensions: ['v', 'sv', 'svh'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/verilog');
      return legacy(m.verilog);
    },
  }),
  LanguageDescription.of({
    name: 'Tcl',
    extensions: ['tcl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/tcl');
      return legacy(m.tcl);
    },
  }),
  LanguageDescription.of({
    name: 'Textile',
    extensions: ['textile'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/textile');
      return legacy(m.textile);
    },
  }),
  LanguageDescription.of({
    name: 'TiddlyWiki',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/tiddlywiki');
      return legacy(m.tiddlyWiki);
    },
  }),
  LanguageDescription.of({
    name: 'Tiki wiki',
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/tiki');
      return legacy(m.tiki);
    },
  }),
  LanguageDescription.of({
    name: 'TOML',
    extensions: ['toml'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/toml');
      return legacy(m.toml);
    },
  }),
  LanguageDescription.of({
    name: 'Troff',
    extensions: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/troff');
      return legacy(m.troff);
    },
  }),
  LanguageDescription.of({
    name: 'TTCN',
    extensions: ['ttcn', 'ttcn3', 'ttcnpp'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/ttcn');
      return legacy(m.ttcn);
    },
  }),
  LanguageDescription.of({
    name: 'TTCN_CFG',
    extensions: ['cfg'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/ttcn-cfg');
      return legacy(m.ttcnCfg);
    },
  }),
  LanguageDescription.of({
    name: 'Turtle',
    extensions: ['ttl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/turtle');
      return legacy(m.turtle);
    },
  }),
  LanguageDescription.of({
    name: 'Web IDL',
    extensions: ['webidl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/webidl');
      return legacy(m.webIDL);
    },
  }),
  LanguageDescription.of({
    name: 'VB.NET',
    extensions: ['vb'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/vb');
      return legacy(m.vb);
    },
  }),
  LanguageDescription.of({
    name: 'VBScript',
    extensions: ['vbs'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/vbscript');
      return legacy(m.vbScript);
    },
  }),
  LanguageDescription.of({
    name: 'Velocity',
    extensions: ['vtl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/velocity');
      return legacy(m.velocity);
    },
  }),
  LanguageDescription.of({
    name: 'Verilog',
    extensions: ['v'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/verilog');
      return legacy(m.verilog);
    },
  }),
  LanguageDescription.of({
    name: 'VHDL',
    extensions: ['vhd', 'vhdl'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/vhdl');
      return legacy(m.vhdl);
    },
  }),
  LanguageDescription.of({
    name: 'XQuery',
    extensions: ['xy', 'xquery'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/xquery');
      return legacy(m.xQuery);
    },
  }),
  LanguageDescription.of({
    name: 'Yacas',
    extensions: ['ys'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/yacas');
      return legacy(m.yacas);
    },
  }),
  LanguageDescription.of({
    name: 'YAML',
    alias: ['yml'],
    extensions: ['yaml', 'yml'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/yaml');
      return legacy(m.yaml);
    },
  }),
  LanguageDescription.of({
    name: 'Z80',
    extensions: ['z80'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/z80');
      return legacy(m.z80);
    },
  }),
  LanguageDescription.of({
    name: 'MscGen',
    extensions: ['mscgen', 'mscin', 'msc'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mscgen');
      return legacy(m.mscgen);
    },
  }),
  LanguageDescription.of({
    name: 'Xù',
    extensions: ['xu'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mscgen');
      return legacy(m.xu);
    },
  }),
  LanguageDescription.of({
    name: 'MsGenny',
    extensions: ['msgenny'],
    async load() {
      const m = await import('@codemirror/legacy-modes/mode/mscgen');
      return legacy(m.msgenny);
    },
  }),
];
