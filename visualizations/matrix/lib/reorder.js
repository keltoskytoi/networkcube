(function(a){function b(a,b){return!isNaN(a)&&!isNaN(b)&&a!=Infinity&&b!=Infinity}function c(a,b,c,d){var e=[],f=a+c,g=b.length,h=-1;while(++h<g)e[h]=(a*b[h]+c*d[h])/f;return e}function d(a){var b=science.lin.length(a),c=a.length;while(c-->0)a[c]/=b;return a}reorder={version:"0.0.1"},reorder.dot=science.lin.dot,reorder.length=science.lin.length,reorder.normalize=science.lin.normalize,reorder.printmat=function(a){var b,c,d,e;for(b=0;b<a.length;b++){d=a[b],e="";for(c=0;c<d.length;c++)e.length!=0&&(e+=", "),e+=d[c].toFixed(4);console.log(b.toPrecision(3)+": "+e)}},reorder.assert=function(a,b){if(!a)throw console.log(b),b||"Assertion failed"},reorder.printhcluster=function(a,b){return a.left==null?Array(b+1).join(" ")+"id: "+a.id:Array(b+1).join(" ")+"id: "+a.id+", dist: "+a.dist+"\n"+reorder.printhcluster(a.left,b+1)+"\n"+reorder.printhcluster(a.right,b+1)},reorder.mean=science.stats.mean,reorder.meantranspose=function(a,b){var c=a.length;if(c==0)return NaN;var d=a[0].length,e=0,f=-1,g;while(++f<c)e+=(a[f][b]-e)/(f+1);return e},reorder.meancolumns=function(a){var b=a.length;if(b==0)return NaN;var c=a[0].length,d=a[0].slice(0),e=0,f,g;while(++e<b){g=a[e];for(f=0;f<c;f++)d[f]+=(g[f]-d[f])/(e+1)}return d},reorder.sum=function(a){var b=a.length,c=a[0];while(b-->1)c+=a[b];return c},reorder.distance={euclidean:function(a,c){var d=a.length,e=0,f;while(d-->0)b(a[d],c[d])&&(f=a[d]-c[d],e+=f*f);return Math.sqrt(e)},manhattan:function(a,c){var d=a.length,e=0;while(d-->0)b(a[d],c[d])&&(e+=Math.abs(a[d]-c[d]));return e},minkowski:function(a){return function(c,d){var e=c.length,f=0;while(e-->0)b(c[e],d[e])&&(f+=Math.pow(Math.abs(c[e]-d[e]),a));return Math.pow(f,1/a)}},chebyshev:function(a,c){var d=a.length,e=0,f;while(d-->0)b(a[d],c[d])&&(f=Math.abs(a[d]-c[d]),f>e&&(e=f));return e},hamming:function(a,c){var d=a.length,e=0;while(d-->0)b(a[d],c[d])&&a[d]!==c[d]&&e++;return e},jaccard:function(a,c){var d=0,e=a.length,f=0;while(e-->0)b(a[e],c[e])&&(a[e]===c[e]&&f++,d++);return d==0?0:f/d},braycurtis:function(a,c){var d=a.length,e=0,f=0,g,h;while(d-->0)g=a[d],h=c[d],b(g,h)&&(e+=Math.abs(g-h),f+=Math.abs(g+h));return f==0?0:e/f}},reorder.range=function(a,b,c){arguments.length<3&&(c=1,arguments.length<2&&(b=a,a=0));var d=[],e=a;if(c<0)for(;e>b;e+=c)d.push(e);else for(;e<b;e+=c)d.push(e);return d},reorder.transpose=science.lin.transpose,reorder.transposeSlice=function(a,b,c){arguments.length<3&&(c=a[0].length,arguments.length<2&&(b=0));var d=a.length,e=c,f=b-1,g,h=new Array(c-b);while(++f<e){h[f]=new Array(d),g=-1;while(++g<d)h[f-b][g]=a[g][f]}return h},reorder.correlation={pearson:function(a,b){var c=science.stats.mean(a),d=science.stats.mean(b),e=0,f=0,g=0,h,i,j,k=Math.min(a.length,b.length);if(k===0)return NaN;for(h=0;h<k;h++)i=a[h]-c,j=b[h]-d,e+=i*j,f+=i*i,g+=j*j;return e/Math.sqrt(f*g)},pearsonMatrix:function(a){var b,c,d,e,f,g=a.length,h,i,j,k;if(g===0)return NaN;i=Array(g),j=science.zeroes(g),k=science.zeroes(g);for(d=0;d<g;d++)i[d]=science.stats.mean(a[d]);for(d=0;d<g;d++){b=a[d],c=i[d];for(e=0;e<g;e++)f=b[e]-c,j[e]+=f,k[e]+=f*f}h=Array(g);for(d=0;d<g;d++){h[d]=Array(g);for(e=0;e<g;e++)h[d][e]=j[d]*j[e]/Math.sqrt(k[d]*k[e])}return h}},reorder.heap=function(a){function e(a){return a*2+1}function f(a){return a*2+2}function g(a){return Math.floor((a-1)/2)}function h(a,d){var e=b[a],f=b[d];b[a]=f,c[f]=a,b[d]=e,c[e]=d}function i(a){var b=k(c[a],a);j(b)}function j(c){for(;;){var d=e(c),g=f(c),i;d<b.length&&a(b[d],b[c])<0?i=d:i=c,g<b.length&&a(b[g],b[i])<0&&(i=g);if(c==i)return;h(c,i),c=i}}function k(d,e){var f=d;for(par=g(f);f>0&&a(b[par],e)>0;par=g(par)){var h=b[par];b[f]=h,c[h]=f,f=par}return b[f]=e,c[e]=f,f}var b=[],c={},d={};return d.length=function(){return b.length},d.insert=function(a){var c=b.length;b.push(null),k(c,a)},d.isEmpty=function(){return b.length==0},d.peek=function(){if(b.length==0)throw{error:"Empty heap"};return b[0]},d.pop=function(){if(b.length==0)throw{error:"Empty heap"};var a=b[0];if(a==null)return a;var d=b[b.length-1];return b[0]=d,c[d]=0,b.pop(),b.length>1&&j(0),delete c[a],a},d},reorder.permutation=reorder.range,reorder.graph=function(a,b){function g(){var g,h,i=a.length,j=b.length;for(g=0;g<i;++g)(h=a[g]).index=g,h.weight=0;for(g=0;g<j;++g)(h=b[g]).index=g,typeof h.source=="number"&&(h.source=a[h.source]),typeof h.target=="number"&&(h.target=a[h.target]),++h.source.weight,++h.target.weight;f=[];if(typeof d=="function")for(g=0;g<j;++g)f[g]=+d.call(this,b[g],g);else for(g=0;g<j;++g)f[g]=d;e=Array(a.length);for(g=0;g<a.length;++g)e[g]=[];for(g=0;g<b.length;++g){var h=b[g];e[h.source.index].push(h),h.source.index!=h.target.index&&e[h.target.index].push(h)}return c}function h(a){return f[a]}var c={},d=1,e,f;return c.nodes=function(b){return arguments.length?(a=b,c):a},c.links=function(a){return arguments.length?(b=a,c):b},c.linkDistance=function(a){return arguments.length?(d=typeof a=="function"?a:+a,c):d},c.init=g,c.edges=function(a){return e[a]},c.distance=h,c.neighbors=function(a){var b=e[a],c=[];for(var d=0;d<b.length;++d){var f=b[d];f.source.index==a?c.push(f.target):c.push(f.source)}return c},c.other=function(a,c){return typeof a=="number"&&(a=b[a]),a.source.index==c?a.target:a.source},c},reorder.dijkstra=function(a){function d(b,c){var d={},e,f,g,h,i,j,k=reorder.heap(function(a,b){return d[a].weight-d[b].weight}),l={edge:-1,vertex:b,weight:0},m;c||(c={}),c[b]=l,k.insert(b);while(!k.isEmpty()){l=c[k.pop()],f=l.vertex,e=a.edges(f);for(var n=0;n<e.length;n++)h=e[n].index,i=l.weight+a.distance(h),g=a.other(h,f).index,j=c[g],j?j.weight>i&&(j.weight=i,j.edge=h,k.update(j.vertex)):(m={edge:h,vertex:g,weight:i},k.insert(g),c[g]=m)}return c}var b=a,c={};return c.shortestPath=function(b,c){var e=d(b),f,g;g=e[c],f=[g];while(g.edge!=-1)g=e[a.other(g.edge,g.vertex).index],f.unshift(g);return f},c},reorder.distmax=function(a){var b=0,c=a.length,d,e,f;for(d=0;d<c;d++){f=a[d];for(e=d+1;e<c;e++)f[e]>b&&(b=f[e])}return b},reorder.distmin=function(a){var b=Infinity,c=a.length,d,e,f;for(d=0;d<c;d++){f=a[d];for(e=d+1;e<c;e++)f[e]<b&&(b=f[e])}return b},reorder.dist=function(){function b(b){var c=b.length,d=[];for(var e=0;e<c;e++){var f=[];d[e]=f;for(var g=0;g<c;g++)g<e?f.push(d[g][e]):e===g?f.push(0):f.push(a(b[e],b[g]))}return d}var a=reorder.distance.euclidean;return b.distance=function(c){return arguments.length?(a=c,b):a},b},reorder.dist_remove=function(a,b,c){arguments.length<3&&(c=b+1);var d;a.splice(b,c-b);for(d=a.length;d-->0;)a[d].splice(b,c-b);return a},reorder.randomPermute=function(a,b,c){arguments.length<3&&(c=a.length,arguments.length<2&&(b=0));var d=c-b,e,f;while(d>0)f=b+Math.floor(Math.random()*d--),e=a[b+d],a[b+d]=a[f],a[f]=e;return a},reorder.randomPermutation=function(a){return reorder.randomPermute(reorder.permutation(a))},reorder.permute=function(a,b){var c=b.length,d=a.slice(0);while(c--)d[c]=a[b[c]];return d},reorder.permutetranspose=function(a,b){var c=a.length;while(c-->0)a[c]=reorder.permute(a[c],b);return a},reorder.stablepermute=function(a,b){var c=reorder.permute(a,b);return c[0]>c[c.length-1]&&c.reverse(),c},typeof science=="undefined"&&(science={version:"1.9.1"},science.stats={}),science.stats.hcluster=function(){function e(e){var f=e.length,g=[],h=[],i=[],j,k,l,m,n,o,p,q,r=0;if(d==null){d=[],p=-1;while(++p<f){g[p]=0,d[p]=[],q=-1;while(++q<f)d[p][q]=p===q?Infinity:a(e[p],e[q]),d[p][g[p]]>d[p][q]&&(g[p]=q)}}else{if(d.length<f||d[0].length<f)throw{error:"Provided distance matrix length "+d.length+" instead of "+f};p=-1;while(++p<f){g[p]=0,q=-1;while(++q<f)p===q&&(d[p][q]=Infinity),d[p][g[p]]>d[p][q]&&(g[p]=q)}}p=-1;while(++p<f)i[p]=[],i[p][0]={left:null,right:null,dist:0,centroid:e[p],id:r++,size:1,depth:0},h[p]=1;for(n=0;n<f-1;n++){j=0;for(p=0;p<f;p++)d[p][g[p]]<d[j][g[j]]&&(j=p);k=g[j],l=i[j][0],m=i[k][0];var s={left:l,right:m,dist:d[j][k],centroid:c(l.size,l.centroid,m.size,m.centroid),id:r++,size:l.size+m.size,depth:1+Math.max(l.depth,m.depth)};i[j].splice(0,0,s),h[j]+=h[k];for(q=0;q<f;q++)switch(b){case"single":d[j][q]>d[k][q]&&(d[q][j]=d[j][q]=d[k][q]);break;case"complete":d[j][q]<d[k][q]&&(d[q][j]=d[j][q]=d[k][q]);break;case"average":d[q][j]=d[j][q]=(h[j]*d[j][q]+h[k]*d[k][q])/(h[j]+h[q])}d[j][j]=Infinity;for(p=0;p<f;p++)d[p][k]=d[k][p]=Infinity;for(q=0;q<f;q++)g[q]==k&&(g[q]=j),d[j][q]<d[j][g[j]]&&(g[j]=q);o=s}return o}var a=reorder.distance.euclidean,b="simple",d=null;return e.linkage=function(a){return arguments.length?(b=a,e):b},e.distance=function(b){return arguments.length?(a=b,e):a},e.distanceMatrix=function(a){return arguments.length?(d=a.map(function(a){return a.slice(0)}),e):d},e},reorder.leafOrder=function(){function g(a){return a.depth==0}function h(a){return a==null?[]:a.id in e?e[a.id]:e[a.id]=i(a)}function i(a){return a==null?[]:a.depth==0?[a.id]:h(a.left).concat(h(a.right))}function j(a,b,c){var d="k"+a.id+"-"+b+"-"+c;return d in f?f[d]:f[d]=k(a,b,c)}function k(b,c,d){if(b.depth==0)return[0,[b.id]];var e=b.left,f=b.right,g=h(e),i=h(f),k,l;if(g.indexOf(c)!=-1&&i.indexOf(d)!=-1)k=e,l=f;else{if(i.indexOf(c)==-1||g.indexOf(d)==-1)throw{error:"Node is not common ancestor of "+c+", "+d};k=f,l=e}var m=h(k.left),n=h(k.right),o=n.indexOf(c)!=-1?m:n;o.length==0&&(o=[c]);var p=h(l.left),q=h(l.right),r=q.indexOf(d)!=-1?p:q;r.length==0&&(r=[d]);var s=Infinity,t=[];for(var u=0;u<o.length;u++){var v=j(k,c,o[u]);for(var w=0;w<r.length;w++){var x=j(l,r[w],d),y=v[0]+a[o[u]][r[w]]+x[0];y<s&&(s=y,t=v[1].concat(x[1]))}}return[s,t]}function l(b){e={},f={};var c=Infinity,g=[],i=h(b.left),k=h(b.right);d&&console.log(reorder.printhcluster(b,0));for(var l=0;l<i.length;l++)for(var m=0;m<k.length;m++){var n=j(b,i[l],k[m]);n[0]<c&&(c=n[0],g=n[1])}return a=null,g}function m(d){a==null&&(a=reorder.dist().distance(b)(d));var e=science.stats.hcluster().linkage(c).distanceMatrix(a);return l(e(d))}var a=null,b=reorder.distance.euclidean,c="complete",d=0,e={},f={};return m.debug=function(a){return arguments.length?(d=a,m):d},m.distance=function(c){return arguments.length?(b=c,a=null,m):b},m.linkage=function(a){return arguments.length?(c=a,m):c},m.distanceMatrix=function(b){return arguments.length?(a=b.map(function(a){return a.slice(0)}),m):a},m.orderFull=l,m},reorder.order=function(){function j(){a=reorder.distance.euclidean,b=reorder.leafOrder,c="complete",d=null,e=null,f=[],g=0,h=0,i=Infinity}function k(a){e=a,i=Math.min(i,a.length);var b=h>0?h-1:0,c=i<e.length?i+1:i,d,g,k;for(d=f.length-1;d>0;d-=2)g=f[d-1],k=f[d],k>=c?c>i?(c=Math.min(c,g+1),f.splice(d-1,2)):k=c:g<=b?b<h?(b=Math.max(b,k-1),f.splice(d-1,2)):g=b:k-g<3&&f.splice(d-1,2);try{return l(b,c)}finally{j()}}function l(a,b){var c=e,j,k,l,n;e=e.slice(a,b);if(h==0&&i==e.length)return m();g&&console.log("i0="+a+" j0="+b),d!=null?(b!=e.length&&reorder.dist_remove(d,b,e.length),a>0&&reorder.dist_remove(d,0,a)):s();var o=reorder.distmax(d);if(a<h){k=d[0];for(l=k.length;l-->1;)k[l]+=o;for(l=d.length;l-->1;)d[l][0]+=o;o+=o;if(a!=0)for(l=0;l<f.length;l++)f[l]-=a}if(b>i){n=d.length-1,k=d[n];for(l=n;l-->0;)k[l]+=o,d[l][n]+=o}return j=m(),a<h?(j[0]!=0&&j.reverse(),b>i?reorder.assert(j[0]==0&&j[j.length-1]==j.length-1,"Invalid constrained permutation endpoints"):reorder.assert(j[0]==0,"Invalid constrained permutation start")):b>i&&(j[j.length-1]!=j.length-1&&(j=j.reverse()),reorder.assert(j[j.length-1]==j.length-1,"Invalid constrained permutation end")),a!=0&&(j=reorder.permutation(a).concat(j.map(function(b){return b+a}))),c.length>b&&(j=j.concat(reorder.range(b,c.length))),j}function m(){var a,b,c,h,i,j;if(f.length==0)return n();s();for(b=f.length-1;b>0;b-=2)h=f[b-1],i=f[b],d=reorder.dist_remove(d,h+1,i-1),e.splice(h+1,i-h-2),g&&console.log("Except["+h+", "+i+"]"),d[h][h+1]!=0&&(d[h][h+1]=d[h+1][h]=-1);a=n();for(b=0;b<f.length;b+=2){h=f[b],i=f[b+1];for(c=0;c<a.length;c++)a[c]>h?a[c]+=i-h-2:a[c]==h&&(j=c);if(j>0&&a[j-1]==i-1)Array.prototype.splice.apply(a,[j,0].concat(reorder.range(i-2,h,-1)));else{if(a[j+1]!=i-1)throw"Range not respected";Array.prototype.splice.apply(a,[j+1,0].concat(reorder.range(h+1,i-1)))}}return a}function n(){var a,b,c,f,g,h,i,j,k=!1,l=[],m={};s();for(g=0;g<d.length-1;g++){b=d[g],c=[],f=b.indexOf(-1),f!=-1&&(m[g]=[g,f],k=!0);for(h=b.length;--h>g;)b[h]==0?(f=d[h].indexOf(-1),f!=-1&&(m[g]=[h,f],d[f][g]=b[f]=-1,k=!0),c.unshift(h),d=reorder.dist_remove(d,h),e.splice(h,1)):b[h]<0&&(k=!0);c.length!=0&&(c.unshift(g),l.push(c))}if(k)for(g=0;g<d.length-1;g++){b=d[g];for(h=g+1;h<b.length-1;h++)d[h][h+1]==-1&&(d[h+1][h]=d[h][h+1]=0)}a=q();for(g=l.length;g-->0;){c=l[g],h=a.indexOf(c[0]),i=m[c[0]],i&&i[0]==c[0]&&(h=o(a,h,i[0],i[1],0),i=undefined);for(j=1;j<c.length;j++)a=r(a,h,c[j]),i&&i[0]==c[j]&&(h=o(a,h,i[0],i[1],j),i=undefined)}return a}function o(a,b,c,d,e){var f,g,h;if(b>0&&a[b-1]==d)return p(a,b,a.indexOf(c)),b+1;if(a[b+e+1]==d)return p(a,b+e,a.indexOf(c)),b;throw"Index not found"}function p(a,b,c){if(b==c)return;var d=a[b];a[b]=a[c],a[c]=d}function q(){g>1&&reorder.printmat(d),g>2&&reorder.printmat(e);var a=b().debug(g).linkage(c).distanceMatrix(d)(e);return g&&console.log("Permutation: "+a),a}function r(a,b,c){return a=a.map(function(a){return a<c?a:a+1}),a.splice(b,0,c),a}function s(){return d==null&&(d=reorder.dist().distance(a)(e)),d}function t(c,d,e){var f=reorder.dist().distance(a)(c),g,h,i,j=!1,k,l=-1;f[d][d+1]=0,f[d+1][d]=0;var m=b().distanceMatrix(f)(c);l=m.indexOf(d);for(h=0;h<m.length;h++)i=m[h],i>d&&(m[h]+=e-d-2);return l!=0&&m[l-1]==e-1&&(j=!0),j&&(m.reverse(),l=m.length-l-1),k=[l+1,0].concat(reorder.range(d+1,e-1)),Array.prototype.splice.apply(m,k),m}var a=reorder.distance.euclidean,b=reorder.leafOrder,c="complete",d,e,f=[],g=0,h=0,i=Infinity;return k.debug=function(a){return arguments.length?(g=a,k):g},k.distance=function(b){return arguments.length?(a=b,k):a},k.linkage=function(a){return arguments.length?(c=a,k):c},k.limits=function(a,b){return arguments.length?(h=a,i=b,k):[h,i]},k.except=function(a){return arguments.length?(f=a.sort(function(a,b){if(a>=b)throw"Invalid list, indices not sorted";return a-b}),k):f.slice(0)},k.orderrowsexcept=k.orderexcept,k},reorder.covariance=science.lin.dot,reorder.covariancetranspose=function(a,b,c){var d=a.length,e=0,f;for(f=0;f<d;f++)e+=a[f][b]*a[f][c];return e},reorder.variancecovariance=function(a){var b=a[0].length,c=Array(b),d,e;for(d=0;d<b;d++)c[d]=Array(b);for(d=0;d<b;d++)for(e=d;e<b;e++)c[d][e]=c[e][d]=reorder.covariancetranspose(a,d,e);return c},reorder.poweriteration=function(a,b){arguments.length<2&&(b=1e-4);var c=a.length,e=Array(c),f,g,h=Array(c),i,j=10;reorder.assert(c==a[0].length,"poweriteration needs a square matrix");for(f=0;f<c;f++)e[f]=Math.random();e=d(e);while(j-->0){for(f=0;f<c;f++){h[f]=0;for(g=0;g<c;g++)h[f]+=a[f][g]*e[g]}h=d(h);var k=h;h=e,e=k}return h},reorder.sortorder=function(a){return reorder.range(0,a.length).sort(function(b,c){return a[b]-a[c]})},reorder.center=function(a){var b=a.length;if(b==0)return null;var c=reorder.meancolumns(a),d=c.length,e=Array(b),f,g,h;for(f=0;f<b;f++){h=a[f].slice(0);for(g=0;g<d;g++)h[g]-=c[g];e[f]=h}return e},reorder.pca1d=function(a,b){arguments.length<2&&(b=1e-4);var c=a.length;if(a.length==0)return null;a=reorder.center(a);var d=reorder.variancecovariance(a);return reorder.poweriteration(d,b)},reorder.pca1dorder=function(a,b){return reorder.sortorder(pca1d(a,b))},reorder.sumlines=function(a){var b=a.length,c=a[0].length,d=Array(b),e,f,g,h;for(e=0;e<b;e++){g=a[e],h=0;for(f=0;f<c;f++)h+=g[f];d[e]=h}return d},reorder.sumcols=function(a){var b=a.length,c=a[0].length,d=science.zeroes(c),e,f,g;for(e=0;e<b;e++){g=a[e];for(f=0;f<c;f++)d[f]+=g[f]}return d},reorder.ca=function(a,b){arguments.length<2&&(b=1e-4);var c=a.length,d=a[0].length,e=reorder.sumlines(a),f=reorder.sumcols(a),g=reorder.sum(f),h,i,j;for(h=0;h<c;h++)a[h]=a[h].map(function(a){return a/g});e=reorder.sumlines(a),f=reorder.sumcols(a);var k=Array(c),l;for(h=0;h<c;h++){k[h]=Array(d);for(i=0;i<d;i++)l=e[h]*f[i],k[h][i]=(a[h][i]-l)/Math.sqrt(l)}for(h=0;h<c;h++)for(i=0;i<d;i++)l=e[h]*f[i],a[h][i]=(a[h][i]-l)/(f[i]*Math.sqrt(e[h]));var m=Array(c);for(h=0;h<c;h++)m[h]=Array(c);for(h=0;h<c;h++)for(i=h;i<c;i++)m[h][i]=m[i][h]=reorder.covariance(k[h],k[i]);var n=reorder.poweriteration(m,b),o=0;for(h=0;h<c;h++)o+=n[h]*m[h][0];return o/=n[0],n}})(this);