import re
sh=open('src/shell.html').read()
for k,f in [('/*GIRL*/','art.js'),('/*FX*/','fx.js'),('/*CORE*/','core.js'),('/*DRESS*/','dress.js'),('/*MAP*/','map.js'),('/*GAMES*/','games.js'),('/*STORY*/','story.js')]:
    sh=sh.replace(k,open('src/'+f).read())
open('index.html','w').write(sh)
open('/tmp/g.js','w').write(re.search(r'<script>(.*)</script>',sh,re.S).group(1))
