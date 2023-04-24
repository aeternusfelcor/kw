var kody;

BOT = {
    chars:[],
    timeout:5000,
}

function updateTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  
if ((minutes === 0 || minutes === 2 || minutes === 4) && date.getSeconds() === 5) {
    checkCodes();
}

if ((minutes === 0 || minutes === 2 || minutes === 4) && date.getSeconds() === 5) {
    BOT.Start();
  }
}

BOT.GetChars = function(){
    for(i=0; i<GAME.player_chars; i++){
        char = $("li[data-option=select_char]").eq(i);
        BOT.chars.push({
            id: char.attr("data-char_id"),
            source: 'select_char',
            nick: char.find("h3").text(),
        });
    }
    $("li[data-option=select_zast]").each(function() {
        BOT.chars.push({
            id: $(this).attr("data-char_id"),
            source: 'select_zast',
            nick: $(this).find("h3").text(),
        });
    });
}();

BOT.Start = function(){
    if (this.chars.length > 0) {
        for (let i = 0; i < this.chars.length; i++) {
            let char_id = parseInt(this.chars[i].id);
            let source = this.chars[i].source;
            if (source === 'select_char') {
                setTimeout(function(){ BOT.LogIn(char_id); }, i * this.timeout);
            } else if (source === 'select_zast') {
                setTimeout(function(){ BOT.LogIn(char_id, 1); }, i * this.timeout);
            }
        }
        setTimeout(function(){ BOT.LogIn(BOT.chars[0].id); }, this.chars.length * this.timeout);
    }
}

BOT.LogIn = function(char_id, type = 0){
    let orders = {a:2,char_id:char_id};
    if (type === 1) {
        orders.type = 1;
    }
    GAME.emitOrder(orders);
    setTimeout(function(){  GAME.emitOrder({a:8,type:5,doublec:$("#train_upgrade_double").is(':checked'),multi:$("#train_upgrade_multi").is(':checked'),code:kody,apud:'vzaaa'}); }, 1000);
    setTimeout(function(){
    if (GAME.char_tables.timed_actions[0] === undefined) {
      GAME.emitOrder(order);
    }
     }, 3000); 
    setTimeout(function(){  GAME.emitOrder({a:8,type:5,doublec:$("#train_upgrade_double").is(':checked'),multi:$("#train_upgrade_multi").is(':checked'),code:kody,apud:'vzaaa'}); }, 4000);
}

setInterval(updateTime, 1000);


const panelek = document.createElement('div');

panelek.style.position = 'fixed';
panelek.style.top = '30px';
panelek.style.left = '0px';
panelek.style.padding = '10px';
panelek.style.background = '"rgba(0, 0, 0, 0.5)"';
panelek.style.border = '1px solid #444';
panelek.style.borderRadius = '5px';
panelek.style.color = '#fff';
panelek.style.fontSize = '16px';
panelek.style.zIndex = '9999';
panelek.style.width = '200px';

const panels = [panelek];

let isDragging = false;
let startX, startY, initialX, initialY;

panels.forEach(panel => {
  panel.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = panel.offsetLeft;
    initialY = panel.offsetTop;
  });

  panel.addEventListener('mouseup', function() {
    isDragging = false;
  });

  panel.addEventListener('mousemove', function(e) {
    if (isDragging) {
      e.preventDefault();
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      panel.style.left = `${initialX + dx}px`;
      panel.style.top = `${initialY + dy}px`;
    }
  });
});

const statLabel = document.createElement('label');
statLabel.textContent = 'STATYSTYKA:';
statLabel.style.display = 'block';
statLabel.style.marginBottom = '5px';

const statSelect = document.createElement('select');
const statOptions = ['Siła', 'Szybkość', 'Wytrzymałość', 'Siła Woli', 'Energia KI', 'Wtajemniczenie'];
for (let i = 0; i < statOptions.length; i++) {
  const option = document.createElement('option');
  option.value = i+1;
  option.text = statOptions[i];
  option.style.backgroundColor = 'black';
  option.style.color = '#ffffff';
  statSelect.appendChild(option);
}
statSelect.style.display = 'block';
statSelect.style.marginBottom = '10px';
statSelect.style.width = '100%';
statSelect.style.padding = '5px';
statSelect.style.borderRadius = '5px';
statSelect.style.background = 'rgba(0, 0, 0, 0.5)';
statSelect.style.color = '#fff';
statSelect.style.border = '1px solid #444';

const durationLabel = document.createElement('label');
durationLabel.textContent = 'CZAS:';
durationLabel.style.display = 'block';
durationLabel.style.marginBottom = '5px';

const durationSelect = document.createElement('select');
for (let i = 1; i <= 12; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.text = i + " godz.";
  option.style.backgroundColor = 'black';
  option.style.color = '#ffffff';
  durationSelect.appendChild(option);
}
durationSelect.style.display = 'block';
durationSelect.style.marginBottom = '10px';
durationSelect.style.width = '100%';
durationSelect.style.padding = '5px';
durationSelect.style.borderRadius = '5px';
durationSelect.style.background = 'rgba(0, 0, 0, 0.5)';
durationSelect.style.color = '#fff';
durationSelect.style.border = '1px solid #444';

const masterLabel = document.createElement('label');
const masterLabelText = `MISTRZ: `;
masterLabel.innerHTML = `${masterLabelText} (+0%)`
masterLabel.style.display = 'block';
masterLabel.style.marginBottom = '5px';


const masterSelect = document.createElement('select');
const masterOptions = [{ "name": "BRAK", "cost": 0, "hireType": 1, "level": 0}];
for (const master of Object.values(GAME.masters)) {
  const name = master[GAME.lang];
  const cost = master.hire_cost;
  const hireType = master.hire_type;
  const level = master.level
  if (name && !masterOptions.some(option => option.name === name)) {
    masterOptions.push({ name, cost, hireType, level });
  }
}

for (let i = 0; i < masterOptions.length; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = masterOptions[i].name;
  const label = masterOptions[i].hireType === 1 ? '🟢' : '🔴';
  option.appendChild(document.createTextNode(` (${masterOptions[i].cost}${label})`));
  if (i === 0) {
    option.textContent = 'BRAK';
  }
  option.style.backgroundColor = 'black';
  option.style.color = '#ffffff';
  masterSelect.appendChild(option);
}


masterSelect.style.display = 'block';
masterSelect.style.marginBottom = '10px';
masterSelect.style.width = '100%';
masterSelect.style.padding = '5px';
masterSelect.style.borderRadius = '5px';
masterSelect.style.background = 'rgba(0, 0, 0, 0.5)';
masterSelect.style.color = '#fff';
masterSelect.style.border = '1px solid #444';

statSelect.addEventListener('change', function() {
  order.stat = parseInt(this.value);
});

durationSelect.addEventListener('change', function() {
  order.duration = parseInt(this.value);
});

masterSelect.addEventListener('change', function() {
  order.master = parseInt(this.value);
});

masterSelect.addEventListener('change', () => {
  const selectedMaster = masterOptions[masterSelect.value];
  const selectedCost = selectedMaster.level * 2;
  masterLabel.innerHTML = `${masterLabelText} (+${selectedCost}%)`;
});

const order = {
  a: 8,
  type: 2,
  stat: 1,
  duration: 1,
  code: kody,
  master: 0
};


const chars = BOT.chars;
const nicknames = chars.map(char => char.nick);

const questionMark = document.createElement('span');
questionMark.textContent = '?';
questionMark.style.position = 'absolute';
questionMark.style.top = '0';
questionMark.style.right = '0';
questionMark.style.width = '20px';
questionMark.style.height = '20px';
questionMark.style.lineHeight = '20px';
questionMark.style.textAlign = 'center';
questionMark.style.color = '#fff';
questionMark.style.fontSize = '20px';
questionMark.style.cursor = 'help';
panelek.appendChild(questionMark);

questionMark.addEventListener('mouseover', function() {
  const tooltip = document.createElement('div');
  tooltip.innerHTML = `<b>POSTACIE:</b><br>` + nicknames.join(", ")
  tooltip.style.position = 'absolute';
  tooltip.style.top = '0px';
  tooltip.style.right = '-110%';
  tooltip.style.padding = '10px';
  tooltip.style.textAlign = 'center';
  tooltip.style.background = '#000';
  tooltip.style.color = '#fff';
  tooltip.style.borderRadius = '5px';
  tooltip.style.zIndex = '1';
  panelek.appendChild(tooltip);

questionMark.addEventListener('mouseout', function() {
    if (panelek.contains(tooltip)) {
      panelek.removeChild(tooltip);
    }
  });
});


panelek.appendChild(statLabel);
panelek.appendChild(statSelect);
panelek.appendChild(durationLabel);
panelek.appendChild(durationSelect);
panelek.appendChild(masterLabel);
panelek.appendChild(masterSelect);

document.body.appendChild(panelek);