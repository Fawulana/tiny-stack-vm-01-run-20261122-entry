import{readdirSync as A,mkdirSync as B,readFileSync as C,writeFileSync as D}from'fs'
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env
function R(P,N){
let n=P.length,S=new Int32Array(256),K=S.slice(0,64),M=S.slice(),o='',w=()=>Buffer.from(o,'latin1'),F="+;-;*;/;%;/;%;0;&;|;^;0;<<;>>;>>>;0;==;<;<".split(';').map(x=>x=='*'?Math.imul:x=='0'?()=>0:eval('(a,b)=>a'+x+'b')),U="111223340000000033333332333233303330000000000000122110000000000023000000000000002212"
let p=0,s=0,c=0,t=0,i=0
try{for(;;){
if(t==1e6)throw 10
let q=P[p],m=[0,1,4][q]||(q>47&&q<52)*2,g=p+1+m
if(p>>>0>=n|p+m>=n)throw 9
if(!+U[q])throw 5
if(s<+U[q]-1)throw 2
t++
if(q<8){
if(!q)return[0,w()]
if(m)S[s++]=P.readIntLE(p+1,m)
else if(q<4)s--
else if(q<5)S[s]=S[s-1],s++
else if(q<6)[S[s-1],S[s-2]]=[S[s-2],S[s-1]]
else if(q<7)S[s]=S[s-2],s++
else[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]]
}else if(q-16<19){
if(q==23|q==27)S[s-1]=q-23?~S[s-1]:-S[s-1]
else{let b=S[--s],a=S[--s];if(q>18&q<23&&!b)throw 4;if(q==21|q==22|q==34)a>>>=0,b>>>=0;S[s++]=F[q-16](a,b)}
}else if(q-48<3){
if(q<49||!S[--s]!=(q==50))g+=P.readInt16LE(p+1)
}else if(q==51){if(c>>6)throw 7;K[c++]=g;g=P[g-2]|P[g-1]<<8
}else if(q==52){if(!c)throw 8;g=K[--c]
}else if(q-64<2){if(S[s-1]>>>0>255)throw 6;q==64?S[s-1]=M[S[s-1]]:(M[S[s-1]]=S[s-2],s-=2)
}else if(q==80){let b=''+S[--s];if(o.length+b.length>65536)throw 11;o+=b
}else if(q==81){if(o.length>>16)throw 11;o+=String.fromCharCode(S[--s])
}else if(q==82)S[s++]=N[i++]??-1
else return[S[--s]&255,w()]
if(s>256)throw 3;p=g}}catch(e){return[e,w()]}}
for(const d of A(I)){
const j='/'+d+'/',[e,y]=R(C(I+j+'program.bin'),C(I+j+'input.bin'))
B(O+j,{recursive:!0})
D(O+j+'stdout.bin',y)
D(O+j+'exit.txt',e+'')
}
