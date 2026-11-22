import{readdirSync as A,mkdirSync as B,readFileSync as C,writeFileSync as D}from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
function R(P,N){
const n=P.length,S=new Int32Array(256),K=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536)
let p=0,s=0,c=0,t=0,i=0,l=0
const E=e=>[e,o.subarray(0,l)]
for(;;){
if(t==1e6)return E(10)
if(p<0||p>=n)return E(9)
let q=P[p],g=p+1,m=q==1?1:q==2?4:q>47&&q<52?2:0
if(!m&&(q>83||q==31||q>7&&q<16||q>34&&q<48||q>52&&q<64||q>65&&q<80))return E(5)
if(p+m>=n)return E(9)
g+=m
t++
if(q<8){
if(!q)return E(0)
if(q<3){if(s>255)return E(3);S[s++]=q==1?(P[g-1]<<24)>>24:P[g-4]|P[g-3]<<8|P[g-2]<<16|P[g-1]<<24}
else if(q==3){if(!s)return E(2);s--}
else if(q==4){if(!s)return E(2);if(s>255)return E(3);S[s]=S[s-1];s++}
else if(q==5){if(s<2)return E(2);let v=S[s-1];S[s-1]=S[s-2];S[s-2]=v}
else if(q==6){if(s<2)return E(2);if(s>255)return E(3);S[s]=S[s-2];s++}
else{if(s<3)return E(2);let v=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=v}
}else if(q>15&&q<35){
if(q==23){if(!s)return E(2);S[s-1]=-S[s-1]|0}
else if(q==27){if(!s)return E(2);S[s-1]=~S[s-1]}
else{
if(s<2)return E(2)
let b=S[s-1],a=S[s-2],r
if(q==16)r=a+b|0
else if(q==17)r=a-b|0
else if(q==18)r=Math.imul(a,b)
else if(q>18&&q<23){if(!b)return E(4);r=q==19?a==-2147483648&&b==-1?a:(a/b)|0:q==20?b==-1?0:a%b|0:q==21?Math.floor((a>>>0)/(b>>>0))|0:(a>>>0)%(b>>>0)|0}
else if(q==24)r=a&b
else if(q==25)r=a|b
else if(q==26)r=a^b
else if(q==28)r=a<<(b&31)
else if(q==29)r=a>>(b&31)
else if(q==30)r=a>>>(b&31)|0
else if(q==32)r=a==b?1:0
else if(q==33)r=a<b?1:0
else r=(a>>>0)<(b>>>0)?1:0
S[s-2]=r;s--
}
}else if(q>47&&q<51){
let r=((P[g-2]|P[g-1]<<8)<<16)>>16,v=1
if(q>48){if(!s)return E(2);let w=S[--s];v=q==49?w==0:w!=0}
if(v)g+=r
}else if(q==51){if(c>63)return E(7);K[c++]=g;g=P[g-2]|P[g-1]<<8
}else if(q==52){if(!c)return E(8);g=K[--c]
}else if(q==64){if(!s)return E(2);let a=S[s-1];if(a<0||a>255)return E(6);S[s-1]=M[a]
}else if(q==65){if(s<2)return E(2);let a=S[s-1];if(a<0||a>255)return E(6);M[a]=S[s-2];s-=2
}else if(q==80){if(!s)return E(2);let b=Buffer.from(String(S[s-1]));if(l+b.length>65536)return E(11);s--;o.set(b,l);l+=b.length
}else if(q==81){if(!s)return E(2);if(l>65535)return E(11);o[l++]=S[--s]&255
}else if(q==82){if(s>255)return E(3);S[s++]=i<N.length?N[i++]:-1
}else{if(!s)return E(2);return E(S[--s]&255)}
p=g
}}
for(const d of A(I).sort()){
const r=R(C(I+'/'+d+'/program.bin'),C(I+'/'+d+'/input.bin'))
B(O+'/'+d,{recursive:true})
D(O+'/'+d+'/stdout.bin',r[1])
D(O+'/'+d+'/exit.txt',r[0]+'\n')
}
