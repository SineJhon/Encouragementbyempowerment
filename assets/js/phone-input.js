/* Premium International Phone Input — phone-input.js */
(function(){
'use strict';
function toFlag(c){return String.fromCodePoint(...[...c.toUpperCase()].map(function(x){return 0x1f1e6+x.charCodeAt(0)-65}))}
var D=[
["Afghanistan","+93","AF",9,9],["Albania","+355","AL",8,9],["Algeria","+213","DZ",9,9],
["American Samoa","+1-684","AS",10,10],["Andorra","+376","AD",6,9],["Angola","+244","AO",9,9],
["Anguilla","+1-264","AI",10,10],["Antigua and Barbuda","+1-268","AG",10,10],
["Argentina","+54","AR",10,11],["Armenia","+374","AM",8,8],["Aruba","+297","AW",7,7],
["Australia","+61","AU",9,9],["Austria","+43","AT",10,13],["Azerbaijan","+994","AZ",9,9],
["Bahamas","+1-242","BS",10,10],["Bahrain","+973","BH",8,8],["Bangladesh","+880","BD",10,10],
["Barbados","+1-246","BB",10,10],["Belarus","+375","BY",9,9],["Belgium","+32","BE",9,9],
["Belize","+501","BZ",7,7],["Benin","+229","BJ",8,8],["Bermuda","+1-441","BM",10,10],
["Bhutan","+975","BT",8,8],["Bolivia","+591","BO",8,8],["Bosnia and Herzegovina","+387","BA",8,8],
["Botswana","+267","BW",8,8],["Brazil","+55","BR",10,11],["British Virgin Islands","+1-284","VG",10,10],
["Brunei","+673","BN",7,7],["Bulgaria","+359","BG",8,9],["Burkina Faso","+226","BF",8,8],
["Burundi","+257","BI",8,8],["Cambodia","+855","KH",8,9],["Cameroon","+237","CM",9,9],
["Canada","+1","CA",10,10],["Cape Verde","+238","CV",7,7],["Cayman Islands","+1-345","KY",10,10],
["Central African Republic","+236","CF",8,8],["Chad","+235","TD",8,8],["Chile","+56","CL",9,9],
["China","+86","CN",11,11],["Colombia","+57","CO",10,10],["Comoros","+269","KM",7,7],
["Congo (DRC)","+243","CD",9,9],["Congo (Republic)","+242","CG",9,9],
["Costa Rica","+506","CR",8,8],["Croatia","+385","HR",8,9],["Cuba","+53","CU",8,8],
["Curaçao","+599","CW",7,7],["Cyprus","+357","CY",8,8],["Czech Republic","+420","CZ",9,9],
["Denmark","+45","DK",8,8],["Djibouti","+253","DJ",8,8],["Dominica","+1-767","DM",10,10],
["Dominican Republic","+1-809","DO",10,10],["East Timor","+670","TL",8,8],
["Ecuador","+593","EC",9,9],["Egypt","+20","EG",10,10],["El Salvador","+503","SV",8,8],
["Equatorial Guinea","+240","GQ",9,9],["Eritrea","+291","ER",7,7],["Estonia","+372","EE",7,8],
["Ethiopia","+251","ET",9,9],["Falkland Islands","+500","FK",5,5],["Faroe Islands","+298","FO",6,6],
["Fiji","+679","FJ",7,7],["Finland","+358","FI",9,10],["France","+33","FR",9,9],
["French Guiana","+594","GF",9,9],["French Polynesia","+689","PF",8,8],["Gabon","+241","GA",7,7],
["Gambia","+220","GM",7,7],["Georgia","+995","GE",9,9],["Germany","+49","DE",10,12],
["Ghana","+233","GH",9,9],["Gibraltar","+350","GI",8,8],["Greece","+30","GR",10,10],
["Greenland","+299","GL",6,6],["Grenada","+1-473","GD",10,10],["Guadeloupe","+590","GP",9,9],
["Guam","+1-671","GU",10,10],["Guatemala","+502","GT",8,8],["Guinea","+224","GN",9,9],
["Guinea-Bissau","+245","GW",7,7],["Guyana","+592","GY",7,7],["Haiti","+509","HT",8,8],
["Honduras","+504","HN",8,8],["Hong Kong","+852","HK",8,8],["Hungary","+36","HU",9,9],
["Iceland","+354","IS",7,7],["India","+91","IN",10,10],["Indonesia","+62","ID",10,12],
["Iran","+98","IR",10,10],["Iraq","+964","IQ",10,10],["Ireland","+353","IE",8,9],
["Israel","+972","IL",9,9],["Italy","+39","IT",9,11],["Ivory Coast","+225","CI",10,10],
["Jamaica","+1-876","JM",10,10],["Japan","+81","JP",10,11],["Jordan","+962","JO",9,9],
["Kazakhstan","+7","KZ",10,10],["Kenya","+254","KE",9,10],["Kiribati","+686","KI",5,5],
["Kosovo","+383","XK",8,8],["Kuwait","+965","KW",8,8],["Kyrgyzstan","+996","KG",9,9],
["Laos","+856","LA",8,9],["Latvia","+371","LV",8,8],["Lebanon","+961","LB",7,8],
["Lesotho","+266","LS",8,8],["Liberia","+231","LR",7,8],["Libya","+218","LY",9,9],
["Liechtenstein","+423","LI",7,9],["Lithuania","+370","LT",8,8],["Luxembourg","+352","LU",8,8],
["Macau","+853","MO",8,8],["Madagascar","+261","MG",9,9],["Malawi","+265","MW",9,9],
["Malaysia","+60","MY",9,10],["Maldives","+960","MV",7,7],["Mali","+223","ML",8,8],
["Malta","+356","MT",8,8],["Marshall Islands","+692","MH",7,7],["Martinique","+596","MQ",9,9],
["Mauritania","+222","MR",8,8],["Mauritius","+230","MU",7,8],["Mexico","+52","MX",10,10],
["Micronesia","+691","FM",7,7],["Moldova","+373","MD",8,8],["Monaco","+377","MC",8,8],
["Mongolia","+976","MN",8,8],["Montenegro","+382","ME",8,8],["Montserrat","+1-664","MS",10,10],
["Morocco","+212","MA",9,9],["Mozambique","+258","MZ",9,9],["Myanmar","+95","MM",7,9],
["Namibia","+264","NA",9,9],["Nauru","+674","NR",7,7],["Nepal","+977","NP",10,10],
["Netherlands","+31","NL",9,9],["New Caledonia","+687","NC",6,6],["New Zealand","+64","NZ",8,9],
["Nicaragua","+505","NI",8,8],["Niger","+227","NE",8,8],["Nigeria","+234","NG",10,11],
["North Korea","+850","KP",10,10],["North Macedonia","+389","MK",8,8],
["Northern Mariana Islands","+1-670","MP",10,10],["Norway","+47","NO",8,8],
["Oman","+968","OM",8,8],["Pakistan","+92","PK",10,10],["Palau","+680","PW",7,7],
["Palestine","+970","PS",9,9],["Panama","+507","PA",8,8],["Papua New Guinea","+675","PG",7,7],
["Paraguay","+595","PY",9,9],["Peru","+51","PE",9,9],["Philippines","+63","PH",10,10],
["Poland","+48","PL",9,9],["Portugal","+351","PT",9,9],["Puerto Rico","+1-787","PR",10,10],
["Qatar","+974","QA",8,8],["Réunion","+262","RE",9,9],["Romania","+40","RO",9,9],
["Russia","+7","RU",10,10],["Rwanda","+250","RW",9,9],
["Saint Kitts and Nevis","+1-869","KN",10,10],["Saint Lucia","+1-758","LC",10,10],
["Saint Vincent and the Grenadines","+1-784","VC",10,10],["Samoa","+685","WS",7,7],
["San Marino","+378","SM",8,10],["São Tomé and Príncipe","+239","ST",7,7],
["Saudi Arabia","+966","SA",9,9],["Senegal","+221","SN",9,9],["Serbia","+381","RS",8,9],
["Seychelles","+248","SC",7,7],["Sierra Leone","+232","SL",8,8],["Singapore","+65","SG",8,8],
["Sint Maarten","+1-721","SX",10,10],["Slovakia","+421","SK",9,9],["Slovenia","+386","SI",8,8],
["Solomon Islands","+677","SB",7,7],["Somalia","+252","SO",8,8],["South Africa","+27","ZA",9,9],
["South Korea","+82","KR",10,11],["South Sudan","+211","SS",9,9],["Spain","+34","ES",9,9],
["Sri Lanka","+94","LK",9,9],["Sudan","+249","SD",9,9],["Suriname","+597","SR",6,7],
["Sweden","+46","SE",9,10],["Switzerland","+41","CH",9,9],["Syria","+963","SY",9,9],
["Taiwan","+886","TW",9,9],["Tajikistan","+992","TJ",9,9],["Tanzania","+255","TZ",9,9],
["Thailand","+66","TH",9,9],["Togo","+228","TG",8,8],["Tonga","+676","TO",7,7],
["Trinidad and Tobago","+1-868","TT",10,10],["Tunisia","+216","TN",8,8],
["Turkey","+90","TR",10,10],["Turkmenistan","+993","TM",8,8],
["Turks and Caicos Islands","+1-649","TC",10,10],["Tuvalu","+688","TV",5,5],
["Uganda","+256","UG",9,9],["Ukraine","+380","UA",9,9],
["United Arab Emirates","+971","AE",9,9],["United Kingdom","+44","GB",10,10],
["United States","+1","US",10,10],["Uruguay","+598","UY",8,8],
["US Virgin Islands","+1-340","VI",10,10],["Uzbekistan","+998","UZ",9,9],
["Vanuatu","+678","VU",7,7],["Vatican City","+379","VA",8,10],["Venezuela","+58","VE",10,10],
["Vietnam","+84","VN",9,10],["Wallis and Futuna","+681","WF",6,6],
["Western Sahara","+212","EH",9,9],["Yemen","+967","YE",9,9],["Zambia","+260","ZM",9,9],
["Zimbabwe","+263","ZW",9,9]
];
var countries=D.map(function(c){return{name:c[0],dial:c[1],code:c[2],flag:toFlag(c[2]),min:c[3],max:c[4]}});
var normDial=function(d){return d.replace(/\D/g,'')};
var TZ_MAP={'Africa/Nairobi':'KE','Africa/Lagos':'NG','Africa/Johannesburg':'ZA','Africa/Cairo':'EG','Africa/Addis_Ababa':'ET','Africa/Accra':'GH','Africa/Dar_es_Salaam':'TZ','Africa/Kampala':'UG','Africa/Kigali':'RW','America/New_York':'US','America/Chicago':'US','America/Denver':'US','America/Los_Angeles':'US','Europe/London':'GB','Europe/Paris':'FR','Europe/Berlin':'DE','Europe/Rome':'IT','Europe/Madrid':'ES','Europe/Amsterdam':'NL','Europe/Brussels':'BE','Europe/Zurich':'CH','Europe/Vienna':'AT','Europe/Stockholm':'SE','Europe/Oslo':'NO','Europe/Copenhagen':'DK','Europe/Helsinki':'FI','Europe/Warsaw':'PL','Europe/Prague':'CZ','Europe/Bucharest':'RO','Europe/Athens':'GR','Europe/Istanbul':'TR','Europe/Moscow':'RU','Asia/Dubai':'AE','Asia/Karachi':'PK','Asia/Kolkata':'IN','Asia/Dhaka':'BD','Asia/Bangkok':'TH','Asia/Ho_Chi_Minh':'VN','Asia/Jakarta':'ID','Asia/Manila':'PH','Asia/Kuala_Lumpur':'MY','Asia/Singapore':'SG','Asia/Hong_Kong':'HK','Asia/Shanghai':'CN','Asia/Tokyo':'JP','Asia/Seoul':'KR','Asia/Taipei':'TW','Australia/Sydney':'AU','Australia/Melbourne':'AU','Pacific/Auckland':'NZ','Pacific/Fiji':'FJ','America/Toronto':'CA','America/Sao_Paulo':'BR','America/Mexico_City':'MX','America/Buenos_Aires':'AR','America/Bogota':'CO','America/Lima':'PE','America/Santiago':'CL','America/Caracas':'VE','Asia/Riyadh':'SA','Asia/Qatar':'QA','Asia/Bahrain':'BH','Asia/Kuwait':'KW','Asia/Muscat':'OM','Asia/Beirut':'LB','Asia/Amman':'JO','Asia/Baghdad':'IQ','Asia/Tehran':'IR','Asia/Kabul':'AF','Africa/Accra':'GH','Africa/Niamey':'NE','Africa/Khartoum':'SD','Africa/Tripoli':'LY','Africa/Maputo':'MZ','Africa/Harare':'ZW','Africa/Lusaka':'ZM','Africa/Windhoek':'NA','Africa/Gaborone':'BW','Africa/Mogadishu':'SO','Africa/Djibouti':'DJ','Africa/Asmara':'ER','Africa/Bujumbura':'BI'};
function detectCountry(){try{var tz=Intl.DateTimeFormat().resolvedOptions().timeZone;if(tz&&TZ_MAP[tz])return countries.find(function(c){return c.code===TZ_MAP[tz]})}catch(e){}return null}
function validatePhone(digits,country){if(!digits||digits.length===0)return{valid:false,msg:'Phone number is required'};if(digits.length<country.min)return{valid:false,msg:'Too short — '+country.name+' requires '+country.min+' digits (you have '+digits.length+')'};if(digits.length>country.max)return{valid:false,msg:'Too long — '+country.name+' allows max '+country.max+' digits (you have '+digits.length+')'};return{valid:true,msg:'Valid '+country.name+' number'}}
function formatNumber(digits,country){var fmt=country.dial+' ';var i=0;var out='';for(var f=0;f<country.dial.length-1;f++)out+=country.dial[f+1];return country.dial+' '+digits}
function toE164(digits,country){return country.dial.replace(/\D/g,'')+digits}
function PhoneInput(el,opts){
opts=opts||{};
this.group=el;
this.defaultCountry=opts.defaultCountry||opts.default||'KE';
this.onValidate=opts.onValidate||null;
this._selected=null;
this._build();
this._bind();
this._detect();
}
PhoneInput.prototype._build=function(){
var g=this.group;
this.group.innerHTML='';
this.wrapper=document.createElement('div');this.wrapper.className='pi-wrapper';
this.countryBtn=document.createElement('button');this.countryBtn.type='button';this.countryBtn.className='pi-country-btn';this.countryBtn.setAttribute('aria-expanded','false');this.countryBtn.setAttribute('aria-haspopup','listbox');
this.flagSpan=document.createElement('span');this.flagSpan.className='pi-flag';
this.nameSpan=document.createElement('span');this.nameSpan.className='pi-country-name';
this.dialSpan=document.createElement('span');this.dialSpan.className='pi-dial';
this.chevron=document.createElement('span');this.chevron.className='pi-chevron';this.chevron.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
this.countryBtn.appendChild(this.flagSpan);this.countryBtn.appendChild(this.nameSpan);this.countryBtn.appendChild(this.dialSpan);this.countryBtn.appendChild(this.chevron);
this.phoneInput=document.createElement('input');this.phoneInput.type='tel';this.phoneInput.className='pi-phone-input';this.phoneInput.setAttribute('inputmode','numeric');this.phoneInput.setAttribute('autocomplete','tel');this.phoneInput.setAttribute('aria-label','Phone number');
this.wrapper.appendChild(this.countryBtn);this.wrapper.appendChild(this.phoneInput);
this.e164Input=document.createElement('input');this.e164Input.type='hidden';this.e164Input.name=g.dataset.name||'phone';
this.validEl=document.createElement('div');this.validEl.className='pi-validation';
this.overlay=document.createElement('div');this.overlay.className='pi-dropdown-overlay';
this.dropdown=document.createElement('div');this.dropdown.className='pi-dropdown';
var sw=document.createElement('div');sw.className='pi-search-wrap';sw.style.position='relative';
this.searchIcon=document.createElement('span');this.searchIcon.className='pi-search-icon';this.searchIcon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
this.searchInput=document.createElement('input');this.searchInput.type='text';this.searchInput.className='pi-search';this.searchInput.placeholder='Search country...';this.searchInput.setAttribute('aria-label','Search countries');
sw.appendChild(this.searchIcon);sw.appendChild(this.searchInput);
this.list=document.createElement('div');this.list.className='pi-list';
this.dropdown.appendChild(sw);this.dropdown.appendChild(this.list);
g.appendChild(this.wrapper);g.appendChild(this.e164Input);g.appendChild(this.validEl);g.appendChild(this.overlay);g.appendChild(this.dropdown);
};
PhoneInput.prototype._bind=function(){
var self=this;
this.countryBtn.addEventListener('click',function(e){e.stopPropagation();self._toggle()});
this.overlay.addEventListener('click',function(){self._close()});
this.searchInput.addEventListener('input',function(){self._filter(this.value)});
this.searchInput.addEventListener('keydown',function(e){self._keyNav(e)});
document.addEventListener('click',function(e){if(!self.group.contains(e.target))self._close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')self._close()});
this.phoneInput.addEventListener('input',function(){this.value=this.value.replace(/[^0-9\s\-\(\)\+]/g,'');self._validate()});
this.phoneInput.addEventListener('blur',function(){self._validate()});
this.phoneInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();self.phoneInput.blur()}});
};
PhoneInput.prototype._detect=function(){
var dc=this.defaultCountry;
if(dc==='auto'){var d=detectCountry();if(d)dc=d.code;else dc='KE'}
var c=countries.find(function(x){return x.code===dc})||countries.find(function(x){return x.code==='KE'});
this._select(c);
};
PhoneInput.prototype._select=function(c){
this._selected=c;
this.flagSpan.textContent=c.flag;
this.nameSpan.textContent=c.name;
this.dialSpan.textContent=c.dial;
this.e164Input.value=c.dial.replace(/\D/g,'');
this.phoneInput.placeholder='e.g. '+(c.min>4?c.dial.replace(/\D/g,'')+' '+''.padEnd(Math.min(c.min,5),'#').replace(/#/g,function(){return Math.floor(Math.random()*9)+1}):''.padEnd(c.min,function(){return Math.floor(Math.random()*9)+1}));
this._renderList('');
this._close();
this._validate();
};
PhoneInput.prototype._toggle=function(){
if(this.dropdown.classList.contains('open'))this._close();else this._open();
};
PhoneInput.prototype._open=function(){
this.dropdown.classList.add('open');this.overlay.classList.add('open');
this.countryBtn.setAttribute('aria-expanded','true');
this.searchInput.value='';this._renderList('');
var self=this;setTimeout(function(){self.searchInput.focus()},50);
};
PhoneInput.prototype._close=function(){
this.dropdown.classList.remove('open');this.overlay.classList.remove('open');
this.countryBtn.setAttribute('aria-expanded','false');
};
PhoneInput.prototype._filter=function(q){
this._renderList(q);
};
PhoneInput.prototype._renderList=function(q){
var self=this;var sel=this._selected;
var filtered=q?countries.filter(function(c){var ql=q.toLowerCase();return c.name.toLowerCase().indexOf(ql)!==-1||c.dial.indexOf(q)!==-1||c.code.toLowerCase().indexOf(ql)!==-1}):countries;
this.list.innerHTML='';
if(filtered.length===0){var em=document.createElement('div');em.className='pi-empty';em.textContent='No countries found';this.list.appendChild(em);return}
filtered.forEach(function(c){
var opt=document.createElement('div');opt.className='pi-option'+(sel&&c.code===sel.code?' selected':'');opt.setAttribute('role','option');opt.setAttribute('tabindex','0');opt.setAttribute('aria-selected',sel&&c.code===sel.code?'true':'false');
opt.innerHTML='<span class="pi-option-flag">'+c.flag+'</span><span class="pi-option-info"><span class="pi-option-name">'+c.name+'</span><span class="pi-option-dial">'+c.dial+'</span></span><svg class="pi-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
opt.addEventListener('click',function(){self._select(c);self.phoneInput.focus()});
opt.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();self._select(c);self.phoneInput.focus()}});
self.list.appendChild(opt);
});
if(!q){var sEl=this.list.querySelector('.selected');if(sEl)sEl.scrollIntoView({block:'nearest'})}
};
PhoneInput.prototype._keyNav=function(e){
var opts=this.list.querySelectorAll('.pi-option');
var cur=this.list.querySelector('.pi-option:focus');
var idx=Array.from(opts).indexOf(cur);
if(e.key==='ArrowDown'){e.preventDefault();if(idx<opts.length-1)opts[idx+1].focus();else if(opts.length>0)opts[0].focus()}
else if(e.key==='ArrowUp'){e.preventDefault();if(idx>0)opts[idx-1].focus();else if(opts.length>0)opts[opts.length-1].focus()}
};
PhoneInput.prototype._validate=function(){
var digits=this.phoneInput.value.replace(/\D/g,'');
var c=this._selected;if(!c)return;
var msgEl=this.validEl;
msgEl.innerHTML='';
if(digits.length===0){this.wrapper.classList.remove('pi-valid','pi-invalid');msgEl.className='pi-validation';return}
var r=validatePhone(digits,c);
if(r.valid){
this.wrapper.classList.add('pi-valid');this.wrapper.classList.remove('pi-invalid');
msgEl.className='pi-validation pi-success';
msgEl.innerHTML='<svg class="pi-validation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'+r.msg;
}else{
this.wrapper.classList.add('pi-invalid');this.wrapper.classList.remove('pi-valid');
msgEl.className='pi-validation pi-error';
msgEl.innerHTML='<svg class="pi-validation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'+r.msg;
}
if(this.onValidate)this.onValidate(digits,c,r);
};
PhoneInput.prototype.getE164=function(){var digits=this.phoneInput.value.replace(/\D/g,'');var c=this._selected;if(!c||!digits)return'';return toE164(digits,c)};
PhoneInput.prototype.getCountry=function(){return this._selected};
PhoneInput.prototype.getDigits=function(){return this.phoneInput.value.replace(/\D/g,'')};
PhoneInput.prototype.isValid=function(){var d=this.phoneInput.value.replace(/\D/g,'');var c=this._selected;if(!c||d.length===0)return false;var r=validatePhone(d,c);return r.valid};
PhoneInput.prototype.setCountry=function(code){var c=countries.find(function(x){return x.code===code});if(c)this._select(c)};
PhoneInput.prototype.reset=function(){this.phoneInput.value='';this._validate()};

function autoInit(){
var groups=document.querySelectorAll('[data-phone-input]');
groups.forEach(function(g){
if(g._piInit)return;g._piInit=true;
var dc=g.dataset.default||g.dataset.defaultCountry||'auto';
new PhoneInput(g,{defaultCountry:dc});
});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',autoInit);else autoInit();
window.PhoneInput=PhoneInput;
window.PhoneInputAutoInit=autoInit;
})();