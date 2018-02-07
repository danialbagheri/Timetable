var gmt=parseInt(readCookie('ptgmt'));
var mygmt=parseFloat(readCookie('ptgmt'))/60;
var myaddress=readCookie('ptaddress');
var mycalcmethod=0;
  if(readCookie('ptcalc')!=null)
    mycalcmethod=parseInt(readCookie('ptcalc'));
var mylat=parseFloat(readCookie('ptlat'));
var mylon=parseFloat(readCookie('ptlon'));
var azanst=readCookie('ptazanauto');
var azanmp3=readCookie('ptazanmp3');
var azant5=readCookie('ptazantimes');
var doat4=readCookie('ptdoatimes');

var gmt_sgn=makeGMT_sgn(gmt);

function makeGMT_sgn(gmt_){
var g_sgn="";
if(gmt_>0)
  g_sgn="+";
if(gmt_<0)
  g_sgn="-";

gmt_m=Math.abs(gmt_)%60;
if(gmt_>0)
gmt_h=Math.abs((gmt_-gmt_m)/60);
else
gmt_h=Math.abs((gmt_+gmt_m)/60);

if(gmt_h<10)
  g_sgn=g_sgn+"0"+gmt_h;
else
  g_sgn=g_sgn+gmt_h;
if(gmt_m<10)
  g_sgn=g_sgn+":"+"0"+gmt_m;
else
  g_sgn=g_sgn+":"+gmt_m;

return g_sgn;
}

var methods = new Array(
'Leva Research Institute',
'University of Islamic Sciences, Karachi',
'Islamic Society of North America (ISNA)',
'Muslim World League (MWL)',
'Umm al-Qura',
'Egyptian General Authority of Survey',
'Custom Setting'
);


function getMytimes(){
	prayTime.setCalcMethod(mycalcmethod);
	if(mycalcmethod==6){
		mycustom=readCookie('ptcustom').split(",");
		prayTime.setFajrAngle (parseFloat(mycustom[0]));
		if(parseInt(mycustom[5])==0)
		   prayTime.setMaghribAngle (parseFloat(mycustom[1]));
		else
		   prayTime.setMaghribMinutes (parseInt(mycustom[1]));

		if(parseInt(mycustom[6])==0)
		   prayTime.setIshaAngle (parseFloat(mycustom[2]));
		else
		  prayTime.setIshaMinutes(parseInt(mycustom[2]));

		prayTime.setDhuhrMinutes (parseInt(mycustom[3]));
		prayTime.setAsrMethod (parseInt(mycustom[4]));
		prayTime.setHLAdjustMethod(parseInt(mycustom[7]));

		if(mycustom.length>8){
		  if(parseInt(mycustom[9])==0)
		   prayTime.setImsaakAngle (parseFloat(mycustom[8]));
		  else
		   prayTime.setImsaakMinutes(parseInt(mycustom[8]));
		}

	}
	return prayTime.getPrayerTimes(tdy, mylat, mylon, mygmt);
}


      var azans=new Array(4);
      var isPlay=false;
      var isPlay2=false;
      var optionst=0;
      if(azanst==null)
        azanst=1;
      else
        azanst=azanst%2;
      if(azanmp3==null)
        azanmp3=4;
      else
        azanmp3=azanmp3%100;
      if(azant5==null){
        azant5="ccccc";
      }
      if(doat4==null)
        doat4="cccu";

var Adhans = new Array(
'Aghaei',
'Ghelvash',
'Kazem-Zadeh',
'Moazzen-Zadeh Ardabili',
'Mohammad-Zadeh',
'Rezaeian',
'Rowhani-Nejad',
'Salimi',
'Sharif',
'Sobhdel',
'Tasvieh-Chi',
'Tookhi',
'Abdul-Basit',
'Abdul-Ghaffar',
'Abdul-Hakam',
'Adhan Alaqsa',
'Adhan Egypt',
'Adhan Halab',
'Adhan Madina',
'Adhan Makkah',
'Al-Hossaini',
'Bakir Bash',
'Hafez',
'Hafiz Murad',
'Menshavi',
'Naghshbandi',
'Saber',
'Sharif Doman',
'Yusuf Islam'
);

var azanNames = new Array(
'Fajr',
'Dhuhr',
'Asr',
'Maghrib',
'Isha'
);

var DoasOptions = new Array(
'doa1',
'doa2',
'doa3',
'doa4'
);

function setdoaAlarm()
{
alarm=getById('txtalarm');
if(getById('doa4').checked)
alarm.style.visibility='visible';
else
alarm.style.visibility='hidden';
setdoaTimes();
}

function setdoaTimes()
{
doat4="";
for (var i=0; i<4;i++)
   {
    if(document.getElementById(DoasOptions[i]).checked)
      doat4=doat4+"c";
    else
      doat4=doat4+"u";
   }
setCookie('ptdoatimes', doat4, 356, '/', '', '');
}

function updateAzan(){
var now = new Date();
var hours=now.getHours();
var minutes=now.getMinutes();
var seconds=now.getSeconds();
	if(mycalcmethod==6){
           $.getJSON('getprayertimes.php',{y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate(),lat:mylat,lon:mylon,gmt:gmt,school:mycalcmethod,params:readCookie('ptcustom')},updatePrayerTimes);
	}else{
           $.getJSON('getprayertimes.php',{y:now.getFullYear(),m:now.getMonth()+1,d:now.getDate(),lat:mylat,lon:mylon,gmt:gmt,school:mycalcmethod},updatePrayerTimes);
	}
}

function updatePrayerTimes(data){
        setAzan(data.Fajr,data.Dhuhr,data.Asr,data.Maghrib,data.Isha);
	$('#time7').html(data.Imsaak);
	$('#time0').html(data.Fajr);
	$('#time1').html(data.Sunrise);
	$('#time2').html(data.Dhuhr);
	$('#time3').html(data.Asr);
	$('#time4').html(data.Sunset);
	$('#time5').html(data.Maghrib);
	$('#time6').html(data.Isha);
	runAzan3();
}

function setAzan(fajr,zohr,asr,maghreb,isha)
{
tmp1=fajr.split(":");
tmp2=zohr.split(":");
tmp3=asr.split(":");
tmp4=maghreb.split(":");
tmp5=isha.split(":");

azans[0]=parseFloat(tmp1[0])*60+parseFloat(tmp1[1]);
azans[1]=parseFloat(tmp2[0])*60+parseFloat(tmp2[1]);
azans[2]=parseFloat(tmp3[0])*60+parseFloat(tmp3[1]);
azans[3]=parseFloat(tmp4[0])*60+parseFloat(tmp4[1]);
azans[4]=parseFloat(tmp5[0])*60+parseFloat(tmp5[1]);
azans[5]=parseFloat(tmp1[0])*60+parseFloat(tmp1[1])+(24*60);

}

function optionAdhan()
{
optionst=(optionst+1)%2;
if(optionst==1)
getById('table1').style.display = 'block';
else
getById('table1').style.display = 'none';

getById('azanStatus').innerHTML=OptionStatus(optionst);
}

function rundoa(did)
{
isPlay2=false;

if(did==1)
{
isPlay2=true;
wimpy_clearPlaylist();
setTimeout("wimpy_addTrack(true,'mp3s/DoaSahar.mp3', 'Sahar', 'Sahar')",1000);
}
if(did==2)
{
isPlay2=true;
wimpy_clearPlaylist();
setTimeout("wimpy_addTrack(true,'mp3s/RABANA.mp3', 'Iftar', 'Iftar')",1000);
setTimeout("wimpy_addTrack(false,'mp3s/Asmaolhosna.mp3', 'Iftar', 'Iftar')",2000);
}
if(did==3)
{
isPlay2=true;
wimpy_clearPlaylist();
setTimeout("wimpy_addTrack(true,'mp3s/DoaEftar.mp3', 'Iftar', 'Iftar')",1000);
}
if(did==4)
{
isPlay2=true;
wimpy_clearPlaylist();
setTimeout("wimpy_addTrack(true,'mp3s/DoaEftetah.mp3', 'Iftar', 'Iftar')",1000);
}


}

var myvisit=1;
  if(readCookie('ptnum')!=null)
    myvisit=parseInt(readCookie('ptnum'))+1;
setCookie('ptnum', myvisit, 356, '/', '', '');
var tmz=new Date().getTimezoneOffset();
setCookie('pttmz', tmz, 356, '/', '', '');

function playAdhan()
{
wimpy_clearPlaylist();
setTimeout("AdhanFile()",500);
}

function AdhanFile()
{
var azan_file='mp3s/'+Adhans[azanmp3]+'.mp3';
wimpy_addTrack(true,azan_file, 'Azan', 'Azan');
}

function setAzanAuto()
{
if(getById('option1').checked)
azanst=1;
else
azanst=0;
setCookie('ptazanauto', azanst, 356, '/', '', '');
}

var AdhansOptions = new Array(
'Adhan1',
'Adhan2',
'Adhan3',
'Adhan4',
'Adhan5'
);

function setAzanTimes()
{
azant5="";
for (var i=0; i<5;i++)
   {
    if(document.getElementById(AdhansOptions[i]).checked)
      azant5=azant5+"c";
    else
      azant5=azant5+"u";
   }
setCookie('ptazantimes', azant5, 356, '/', '', '');
}

function setAlarmTime()
{
setCookie('ptalarmtime', document.getElementById('txtalarm').selectedIndex, 356, '/', '', '');
}

function closeWarning(){
getById('Warning').style.visibility='hidden';
}

function closeLocationMoved(){
getById('locationMoved').style.visibility='hidden';
}

function closeAnnoucement(){
getById('annoucement').style.visibility='hidden';
getById('annoucement').innerHTML='';
}

function resetLocation(){
setCookie('ptflag', '-1', 356, '/', '', '');
document.location='index.php';
}

function setAzanMp3()
{
azanmp3=getById('option2').selectedIndex;
setCookie('ptazanmp3', azanmp3, 356, '/', '', '');
playAdhan();
}

function OptionStatus()
{
if(optionst==1)
{
return "Hide Options";
}
else
{
return "Options...";
}
}

var myday;
function runAzan3()
{
var now = new Date();
myday=now.getDate();
var hours=now.getHours()
var minutes=now.getMinutes()
var seconds=now.getSeconds()

var now_hm=hours*60+minutes;

for (var i=0; i<6;i++)
   {
if(azant5.substring(i%5,i%5+1)=="c")
{
     if(now_hm<azans[i]+1)
     {
 hours=Math.floor((azans[i]-now_hm)/60);
 minutes=(azans[i]-now_hm)-hours*60;
 seconds=59-seconds;
 if (hours <10) {hours="0"+hours}
 if (minutes < 10) {minutes="0"+minutes}
 if (seconds < 10) {seconds="0"+seconds}
 thistime = hours+":"+minutes+":"+seconds;
 getById('bgclocknoshade').innerHTML=thistime;
 document.title=thistime+" PrayTime";
 getById('bgclocknoshade').style.color="#6fb326"; //B3B3B3";
 getById('bgclocknoshade').style.fontSize=30+'px';
      break;
     }
}
   }
}

function runAzan2()
{
runAzan3();
setTimeout("runAzan()",2000);
}

function runAzan()
{
var now = new Date();
var hours=now.getHours()
var minutes=now.getMinutes()
var seconds=now.getSeconds()
if(now.getDate()!=myday){
document.location='index.php';
//    myday=now.getDate();
//    updateAzan();
}

var now_hm=hours*60+minutes;

     if((!isPlay2)&&(doat4.substring(3,4)=="c"))
     {
        alarm=document.getElementById('txtalarm');
        if(azans[0]+parseFloat(alarm.options[alarm.selectedIndex].value)==now_hm)
          {
	  wimpy_clearPlaylist();
	  setTimeout("wimpy_addTrack(true,'mp3s/DoaEftetah.mp3', 'Iftar', 'Iftar')",1000);
          isPlay2=true;
          }
     }
     if((!isPlay2)&&(doat4.substring(0,1)=="c"))
     {
        if(((azans[0]*60-now_hm*60)<=15*60+48)&&((azans[0]-now_hm)>0))
          {
          wimpy_clearPlaylist();
	  setTimeout("wimpy_addTrack(true,'mp3s/DoaSahar.mp3', 'Sahar', 'Sahar')",1000);
          setTimeout("wimpy_addTrack(false,'mp3s/loklak.mp3', 'Sahar','Sahar')",2000);
          isPlay2=true;
          }
     }
     if((!isPlay2)&&(doat4.substring(1,2)=="c"))
     {
        if(((azans[3]*60-now_hm*60)<=7*60+25)&&((azans[3]-now_hm)>0))
          {
          wimpy_clearPlaylist();
	  setTimeout("wimpy_addTrack(true,'mp3s/RABANA.mp3', 'Iftar', 'Iftar')",1000);
          setTimeout("wimpy_addTrack(false,'mp3s/Asmaolhosna.mp3', 'Iftar', 'Iftar')",2000);
          setTimeout("wimpy_addTrack(false,'mp3s/loklak.mp3', 'Iftar', 'Iftar')",2500);
          setTimeout("wimpy_addTrack(false,'mp3s/loklak.mp3', 'Iftar', 'Iftar')",3000);
          setTimeout("wimpy_addTrack(false,'mp3s/loklak.mp3', 'Iftar', 'Iftar')",3500);
          setTimeout("wimpy_addTrack(false,'mp3s/loklak.mp3', 'Iftar', 'Iftar')",4000);
          isPlay2=true;
          }
     }

for (var i=0; i<6;i++)
   {
if(azant5.substring(i%5,i%5+1)=="c")
{
     if(now_hm<azans[i]+1)
     {
 hours=Math.floor((azans[i]-now_hm)/60);
 minutes=(azans[i]-now_hm)-hours*60;
 seconds=59-seconds;
 if (hours <10) {hours="0"+hours}
 if (minutes < 10) {minutes="0"+minutes}
 if (seconds < 10) {seconds="0"+seconds}
 thistime = hours+":"+minutes+":"+seconds;
 getById('bgclocknoshade').innerHTML=thistime;
 document.title=thistime+" PrayTime";
 getById('bgclocknoshade').style.color="#6fb326"; //B3B3B3";
 getById('bgclocknoshade').style.fontSize=30+'px';
 isPlay=false;
      break;
     }
     else
     if(now_hm<azans[i]+5)
     {
      if(!isPlay)
        {
	if(azanst==1)
           {
	   playAdhan();
           if((doat4.substring(2,3)=="c")&&(i==3))
               setTimeout("wimpy_addTrack(false,'mp3s/DoaEftar.mp3', 'Iftar')",2000);
           }
        getById('bgclocknoshade').innerHTML=azanNames[i]+" Adhan";
        getById('bgclocknoshade').style.color="#D95722";
        getById('bgclocknoshade').style.fontSize=18+'px';
        isPlay=true;
        isPlay2=false;
        }
      break;
     }
}
   }

setTimeout("runAzan()",1000);
}

function makeAzanSettings(){
	if(Math.abs(timeoff)>=9){
	timeoff_s=Math.abs(timeoff)%60;

	if(timeoff>0)
	  timeoff_m=Math.abs((timeoff-timeoff_s)/60);
	else
	  timeoff_m=Math.abs((timeoff+timeoff_s)/60);

	timeoff_sgn="";
	if(timeoff_m>0)
	  timeoff_sgn=timeoff_m+" min, ";

	if(timeoff_s>0)
	  timeoff_sgn=timeoff_sgn+timeoff_s+" sec";

	if(timeoff>0)
	  document.write("<p><font color=\"#D95722\">Your computer clock is "+timeoff_sgn+" fast!</font></p>");
	else
	  document.write("<p><font color=\"#D95722\">Your computer clock is "+timeoff_sgn+" slow!</font></p>");
	}

	//setAzan(times[0],times[2],times[3],times[5],times[6]);
	for (var i=0; i<5;i++){
 	  if(azant5.substring(i,i+1)=="u"){
	    document.getElementById(AdhansOptions[i]).checked=false;
	 }
	}
	if(azanst==0)
	   getById('option1').checked=false;
        getById('option2').selectedIndex=azanmp3;
}

function makeDoaSettings(){
	for (var i=0; i<4;i++){
	 if(doat4.substring(i,i+1)=="u")
	   document.getElementById(DoasOptions[i]).checked=false;
	 else
	   document.getElementById(DoasOptions[i]).checked=true;
	}
	setdoaAlarm();
	document.getElementById('txtalarm').selectedIndex=readCookie('ptalarmtime')%100;
}


function getById(id){
 return document.getElementById(id);
}
