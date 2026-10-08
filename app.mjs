import {train,predict,plan} from './model.mjs?v=2';
const model=train(), $=id=>document.getElementById(id);
let places=[];
try{ const res=await fetch('./places.json'); if(!res.ok)throw Error(); places=await res.json(); }catch{$('error').textContent='The park pack could not load. Start the documented local server and reload.';}
const activities={calm:['Find a spot to pause.','Read, breathe, or watch the trees for a few minutes.','Leave the place as you found it.'],active:['Start with a gentle walk.','Choose your own comfortable pace on marked paths.','Turn back in time for your return walk.'],observe:['Put your phone away for a moment.','Notice three leaf shapes or colours. Do not disturb wildlife.','Write or sketch one thing you noticed.'],social:['Meet at a location you both know.','Bring a snack if allowed and take litter home.','Keep the walk comfortable for everyone.']};
function node(tag,text){const n=document.createElement(tag);n.textContent=text;return n;}
$('form').addEventListener('submit',e=>{
 e.preventDefault(); $('error').textContent='';
 try{
  const inferred=predict($('wish').value,model),intent=$('activity').value==='auto'?inferred.intent:$('activity').value;
  $('model').textContent=$('activity').value==='auto'?`Local model: ${intent||'unknown'} · recognised words: ${inferred.knownWords.join(', ')||'none'}. ${inferred.reason}`:'Your explicit activity choice overrides the model.';
  const result=plan({origin:{lat:Number($('lat').value),lon:Number($('lon').value)},minutes:Number($('minutes').value),intent,places});
  const box=$('result'); box.replaceChildren(node('span','YOUR POCKET CARD'));
  if(!result.place){box.append(node('h2','A nearer place or a little more time?'),node('p',result.reason));return;}
  const p=result.place,caption=`About ${p.travel} min each way · ${p.outside} min outside`;
  box.append(node('h2',p.name),node('p',caption),node('p',`${p.km.toFixed(1)} km straight-line distance from your chosen start.`));
  const list=node('ol','');list.className='steps'; for(const text of activities[intent])list.append(node('li',text)); box.append(list);
  const note=node('p',`${p.note} ${result.reason}`);note.className='micro';box.append(note);
  const source=node('a','Check the venue source ↗');source.href=p.source;source.target='_blank';source.rel='noopener noreferrer';box.append(source);
  const text=`PocketTrail\n${p.name}\n${caption}\n\n${activities[intent].join('\n')}\n\n${p.note}\n${result.reason}\nSource: ${p.source}\n`;
  const link=node('a','Save the pocket card');link.className='download';link.style.marginTop='20px';link.style.display='block';
  link.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));link.download='pockettrail.txt';box.append(link);
  const print=node('button','Print card');print.className='secondary';print.addEventListener('click',()=>window.print());box.append(print);
 }catch(err){$('error').textContent=err.message;}
});
