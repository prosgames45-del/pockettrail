// Open, inspectable multinomial Naive Bayes intent model. No remote inference.
export const examples = {
  calm: ['quiet peaceful relax unwind slow nature','read a book breathe calm trees','rest after busy work sit bench','peaceful break away from screen'],
  active: ['run jog workout exercise energetic','brisk walk move stretch fitness','get my steps running outdoors','walk fast training fresh air'],
  observe: ['birds birding wildlife photograph nature','look at trees autumn leaves flowers','observe plants garden discovery','camera photography colours explore'],
  social: ['picnic friends family together outdoors','meet friends chat lunch park','share a snack sit together','family outing picnic conversation']
};
export const tokenize = text => String(text).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').match(/[a-z]+/g) || [];
export function train(data=examples) {
  const vocabulary=new Set(),counts={},totals={},docs={};
  for(const [label,rows] of Object.entries(data)) { counts[label]={}; totals[label]=0; docs[label]=rows.length;
    for(const row of rows) for(const word of tokenize(row)) { vocabulary.add(word); counts[label][word]=(counts[label][word]||0)+1; totals[label]++; }
  }
  return {vocabulary:[...vocabulary].sort(),counts,totals,docs};
}
export function predict(text, model=train()) {
  const words=tokenize(text).filter(w=>model.vocabulary.includes(w));
  if(!words.length) return {intent:null,confidence:null,knownWords:[],reason:'No recognised activity words. Choose an activity below.'};
  const scores=Object.entries(model.counts).map(([label,count])=>[label,Math.log(model.docs[label])+words.reduce((s,w)=>s+Math.log(((count[w]||0)+1)/(model.totals[label]+model.vocabulary.length)),0)]);
  const best=Math.max(...scores.map(x=>x[1])),sum=scores.reduce((s,x)=>s+Math.exp(x[1]-best),0);
  scores.sort((a,b)=>b[1]-a[1]);
  return {intent:scores[0][0],confidence:Math.exp(scores[0][1]-best)/sum,knownWords:[...new Set(words)],reason:'A tiny model trained on developer-written examples; confidence is not a measured real-world accuracy.'};
}
export function distanceKm(a,b) {
  for(const p of [a,b]) if(!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||Math.abs(p.lat)>90||Math.abs(p.lon)>180) throw Error('Use valid latitude and longitude.');
  const r=Math.PI/180,dlat=(b.lat-a.lat)*r,dlon=(b.lon-a.lon)*r;
  const h=Math.sin(dlat/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dlon/2)**2;
  return 6371*2*Math.asin(Math.min(1,Math.sqrt(h)));
}
export function plan({origin,minutes,intent,places}) {
  if(!Number.isFinite(minutes)||minutes<10||minutes>180) throw Error('Choose 10 to 180 minutes.');
  if(!Object.hasOwn(examples,intent)) throw Error('Choose an activity.');
  const options=places.map(p=>{
    const km=distanceKm(origin,p), travel=Math.ceil(km*1.35/4.5*60),outside=minutes-travel*2;
    return {...p,km,travel,outside,score:(p.intents.includes(intent)?30:0)-travel};
  }).filter(p=>p.outside>=10).sort((a,b)=>b.score-a.score);
  if(!options.length) return {place:null,reason:'No listed park leaves 10 minutes outside after an estimated return walk. Try more time or a nearer starting point.'};
  return {place:options[0],alternatives:options.slice(1,3),intent,minutes,reason:'Return walk estimated at 4.5 km/h with a 1.35 distance multiplier. This is not a street route or live opening check.'};
}
