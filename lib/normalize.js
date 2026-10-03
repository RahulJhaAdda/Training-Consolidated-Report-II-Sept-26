export const number=x=>{if(typeof x==='number')return Number.isFinite(x)?x:null;if(typeof x!=='string'||!x.trim())return null;const n=Number(x.replace(/[%₹,\s]/g,''));return Number.isFinite(n)?n/(x.includes('%')?100:1):null};
const text=x=>String(x??'').trim();
export const growth=r=>r.a>0&&r.b!==null?(r.b-r.a)/r.a:null;
export function normalize(raw){
 const result={};
 const rows=k=>raw[k].map((r,i)=>({r,row:i+1}));
 const headers={quality:['Name','Email','Aug Quality Score','Sept Quality Score'],pit:['Email','Aug Conversion% On Connected Calls','Sept Conversion% On Connected Calls'],need:['Vertical','AUG Parameter Score','Sep Parameter Score'],vertical:['Verticals']};
 for(const k of Object.keys(headers)){if(!Array.isArray(raw[k]))throw Error('Missing '+k+' tab');const header=(raw[k][0]||[]).map(v=>text(v).replace(/\s+/g,' ').toLowerCase());if(!headers[k].every(h=>header.includes(h.toLowerCase())))throw Error('Unexpected columns in '+k+' tab. Verify configured GID and column order.');}
 const expected={quality:{1:'Name',2:'Email',4:'Vertical',5:'Segment',6:'Aug Quality Score',7:'Sept Quality Score'},need:{1:'Trainer',2:'Vertical',3:'AUG Parameter Score',4:'Sep Parameter Score'},pit:{5:'Trainer Name',6:'Email',7:'Name',11:'Vertical',12:'Segment',13:'Aug Revenue',14:'Sep Revenue Achieved',18:'Aug Conversion% On Connected Calls',19:'Sept Conversion% On Connected Calls',20:'Sept Average Floor Conversion',24:'Aug Quality Score',25:'Sept Quality Score',26:'Sept Average Floor Quality Score'}};
 for(const [k,columns] of Object.entries(expected))for(const [i,label] of Object.entries(columns))if(text(raw[k][0][i]).replace(/\s+/g,' ').toLowerCase()!==label.toLowerCase())throw Error('Column layout changed in '+k+'. Restore source columns or update the mapping.');
 for(const [i,label] of Object.entries({1:'Total call count',3:'August Q-score Achievement',5:'Total call count',7:'September Q-score Achievement'}))if(text(raw.vertical[1]?.[i]).replace(/\s+/g,' ').toLowerCase()!==label.toLowerCase())throw Error('Vertical tab must contain August and September comparison columns. Check GID_VERTICAL.');
 result.quality=rows('quality').filter(({r,row})=>row>1&&r[2]).map(({r,row})=>({row,name:text(r[1]),email:text(r[2]),owner:text(r[3]),vertical:text(r[4]),segment:text(r[5]),a:number(r[6]),b:number(r[7])}));
 result.need=rows('need').filter(({r,row})=>row>1&&r[2]).map(({r,row})=>({row,name:text(r[2]),vertical:text(r[2]),trainer:text(r[1]),a:number(r[3]),b:number(r[4])}));
 result.pit=rows('pit').filter(({r,row})=>row>1&&r[6]).map(({r,row})=>({row,name:text(r[7]),email:text(r[6]),trainer:text(r[5]),vertical:text(r[11]),segment:text(r[12]),location:text(r[10]),a:number(r[18]),b:number(r[19]),floor:number(r[20]),ra:number(r[13]),rb:number(r[14]),rf:number(r[15]),qa:number(r[24]),qb:number(r[25]),qf:number(r[26])}));
 const v=rows('vertical').filter(({r,row})=>row>2&&r[0]);const map=({r,row})=>({row,name:text(r[0]),vertical:text(r[0]),a:number(r[3]),b:number(r[7]),ca:number(r[1]),cb:number(r[5])});
 result.vertical=v.filter(({r})=>text(r[0]).toLowerCase()!=='grand total').map(map);result.total=v.filter(({r})=>text(r[0]).toLowerCase()==='grand total').map(map)[0]||null;
 return result;
}
