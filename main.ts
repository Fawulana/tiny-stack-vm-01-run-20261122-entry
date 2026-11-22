import{readdirSync as A,mkdirSync as B,readFileSync as C,writeFileSync as D}from'fs'
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env
function R(P,N){
const n=P.length,S=new Int32Array(256),K=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),w=()=>o.slice(0,l),F="a+b;a-b;Math.imul(a,b);a/b;a%b;(a>>>0)/(b>>>0);(a>>>0)%(b>>>0);0;a&b;a|b;a^b;0;a<<b;a>>b;a>>>b;0;a==b;a<b;(a>>>0)<(b>>>0)".split(';').map(x=>Function('a','b','return '+x)),U="111223340000000033333332333233303330000000000000122110000000000023000000000000002212"
let p=0,s=0,c=0,t=0,i=0,l=0
try{for(;;){
if(t==1e6)throw 10
if(p>>>0>=n)throw 9
let q=P[p],m=[0,1,4][q]||(q>47&&q<52?2:0),g=p+1+m
if(!+U[q])throw 5
if(p+m>=n)throw 9
if(s<+U[q]-1)throw 2
t++
if(q<8){
if(!q)return[0,w()]
if(q<3)S[s++]=q==1?P.readInt8(p+1):P.readInt32LE(p+1)
else if(q==3)s--
else if(q==4){S[s]=S[s-1];s++}
else if(q==5)[S[s-1],S[s-2]]=[S[s-2],S[s-1]]
else if(q==6){S[s]=S[s-2];s++}
else[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]]
}else if(q>15&&q<35){
if(q==23||q==27)S[s-1]=q-23?~S[s-1]:-S[s-1]
else{let b=S[--s],a=S[--s];if(q>18&&q<23&&!b)throw 4;S[s++]=F[q-16](a,b)}
}else if(q>47&&q<51){
let r=P.readInt16LE(p+1)
if(q==48||(S[--s]==0)==(q==49))g+=r
}else if(q==51){if(c>63)throw 7;K[c++]=g;g=P[g-2]|P[g-1]<<8
}else if(q==52){if(!c)throw 8;g=K[--c]
}else if(q==64){let a=S[s-1];if(a>>>0>255)throw 6;S[s-1]=M[a]
}else if(q==65){let a=S[s-1];if(a>>>0>255)throw 6;M[a]=S[s-2];s-=2
}else if(q==80){let b=Buffer.from(''+S[--s]);if(l+b.length>65536)throw 11;o.set(b,l);l+=b.length
}else if(q==81){if(l>65535)throw 11;o[l++]=S[--s]&255
}else if(q==82)S[s++]=N[i++]??-1
else return[S[--s]&255,w()]
if(s>256)throw 3
p=g
}}catch(e){return[e,w()]}}
for(const d of A(I)){
const j='/'+d+'/',[e,y]=R(C(I+j+'program.bin'),C(I+j+'input.bin'))
B(O+j,{recursive:!0})
D(O+j+'stdout.bin',y)
D(O+j+'exit.txt',e+'\n')
}
