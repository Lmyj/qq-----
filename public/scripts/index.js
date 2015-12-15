window.onload=function(){	
	var $ = function(id){
		return document.getElementById(id);
	};
	var $$ = function(na){
		return document.getElementsByClassName(na);
	};
	var divplayframe = $('divplayframe'),
		audio = $('audio'),
		playOne = $('playone'),
		upOne = $('upone'),
		nextOne = $('nextone'),
		noVolume = $('novolume'),
		regulate = $('volume_regulate')
		volumeUp = $('volumeUp'),
		volumeDown = $('volumeDown'),
		timeAll = $('time'),
		timeTow = $('timetow'),
		timeThree = $('timethree'),
		timeFore = $('timefore'),
		bofang = $('bofang'),
		playList = $('play_list'),
		listOne = $('list1'),
		listTow = $('list2'),
		listThree = $('list3'),
		jingTan = $('jingtan'),
		listNumber = $('list_number'),
		btnClose = $('btnclose'),
		allList = $('all_list'),
		openList = $('open_list'),
		footerPos = $('footer_pos'),
		geci = $$('geci'),
		footerOne = $('footer-1'),
		databList = $('databaseList');
	var kaiguan = true,datebase = [],
		timeX;
	var ajax = function(o){
		var req = new XMLHttpRequest();
		req.open('get',o.url);
		req.send();
		req.onreadystatechange = function(){
			if(this.readyState == this.DONE && this.status == 200){
				o.onsuccess(this.response);
			}
		};
	};
	ajax({
		url:'http://localhost/tt',
		onsuccess:function(data){
			database = JSON.parse(data);
			divplayframe.onmousedown = function(e){
				e.preventDefault();
			};
			audio.onplay = function(){
				playOne.setAttribute('class','playone playno');
				bofang.setAttribute('class','bofang xianshi');
			};	
			audio.onpause = function(){
				if(audio.ended){
					zhuangTai();	
				}
				playOne.setAttribute('class','playone');
			};
			audio.onvolumechange = function(){
				volumeDown.style.left = this.volume*100 +'%';
				volumeUp.style.width = this.volume*100 +'%';	
			};
			audio.onseeked = function(){
				timeThree.style.width = this.currentTime/audio.duration*100 + '%';
				timeFore.style.left = this.currentTime/audio.duration*100 + '%';
			};
			audio.ontimeupdate = function(){
			    var t  = this.currentTime/this.duration;
			    timeThree.style.width = (t*100) + '%' ;
			    timeFore.style.left = (t*100) + '%';
			    var left = timeThree.offsetWidth;
			    var fenzhong = Math.floor(this.currentTime/60),
			    	miaoshu = Math.floor(this.currentTime%60);
			    if(miaoshu > 9){
			    	timeOut.innerHTML = fenzhong +':'+ miaoshu;
			    }else{
			    	timeOut.innerHTML = fenzhong +':0'+ miaoshu;
			    }
				timeOut.style.display = 'block';
				zhishi.style.display = 'block';
				timeOut.style.left = (left - 11)+'px';
				zhishi.style.left = (left - 3)+ 'px';
			};
			var onmusicchang = function(index){
				if(index == -1){return;}
			// ==================有问题===================
				var fenzhong = Math.floor(audio.duration/60),
			    	miaoshu = Math.floor(audio.duration%60);
			    if(miaoshu > 9){
			    	listThree.innerHTML = fenzhong +':'+ miaoshu;
			    }else{
			    	listThree.innerHTML = fenzhong +':0'+ miaoshu;
			    }
				audio.src = datebase[index].src;
				audio.play();
				if(currentPlist){
					currentPlist.setAttribute('class','play_lists play_lists1');
				}
				playAll[index].setAttribute('class','play_lists play_lists1 play_current');
				currentPlist = playAll[index];
				listOne.title = datebase[index].name;
				jingTan.innerHTML = datebase[index].name;
				listTow.innerHTML = datebase[index].singer;
				listTow.title = datebase[index].singer;
			};
			var zhuangTai = function(){
				if(currentType == 0 || currentType == 3){
					nextOne.onclick();
				}else if(currentType == 1){
					index = currentIndex;
					onmusicchang(index);
				}else if(currentType == 2){
					index = Math.floor( Math.random()*datebase.length );
					onmusicchang(index);
				}
			};
			for(var i=0;i<database.length;i++){
				var li = document.createElement('li');
				li.setAttribute('class','play_lists');
				li.setAttribute('mid',i);
				li.innerHTML = '<strong class="music_name" title='+database[i].name+'>'+database[i].name+'</strong> <strong class="singer_name" title='+database[i].singer+'>'+database[i].singer+'</strong> <strong class="addSong" index="'+i+'" title="添加歌曲">+</strong> </div>';
				databaseList.appendChild(li);
			}
// -------------------添加歌曲-------------------
			var addSong = $$('addSong'),xb = 0;
			var currentPlist = null,
				currentIndex,playAll,
				listCp = $$('list_cp');
			for(var i=0; i<addSong.length; i++){
				addSong[i].onclick = function(){
					if(this.innerHTML == '已添加'){return;}
					var t = this.getAttribute('index');
					var obj = {name:database[t].name,duration:'萌杰',singer:database[t].singer,src:database[t].src};
					datebase.push(obj);
					var li = document.createElement('li');
					li.setAttribute('class','play_lists play_lists1');
					li.setAttribute('mid',xb);
					li.innerHTML = '<strong class="music_name" title='+datebase[xb].name+'>'+datebase[xb].name+'</strong> <strong class="singer_name" title='+datebase[xb].singer+'>'+datebase[xb].singer+'</strong> <strong class="play_time">'+datebase[xb].duration+'</strong> <div class="list_cp" id="list_cp"> <strong class="btn_like" title="喜欢"><span>我喜欢</span></strong> <strong class="btn_share" title="分享"><span>分享</span></strong> <strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong> <strong class="btn_del" ind="'+xb+'" huifu="'+t+'" title="从列表中删除"><span>删除</span></strong> </div>';
					playList.firstElementChild.appendChild(li);
					this.innerHTML = '已添加';
					this.style.fontSize = '14px';
					xb++;
					// ----------------歌曲播放列表点击事件-------------------------
					playAll = $$('play_lists1');
					listNumber.innerHTML = playAll.length;
					for(var k=0;k<playAll.length;k++){
						playAll[k].index = k;
						playAll[k].onclick = function(){
							var index = Number(this.index);
							currentIndex = index;
							onmusicchang(index);
						};
						playAll[k].onmouseover = function(){
							this.lastElementChild.setAttribute('class','list_cp show');
						};
						playAll[k].onmouseout = function(){
							this.lastElementChild.setAttribute('class','list_cp');
						};
					}
					var btnDel = $$('btn_del');
					for(var i=0; i<btnDel.length; i++){
						btnDel[i].onclick = function(e){
							e.stopPropagation();
							var xiabiao = e.target.getAttribute('ind'),
								delEle = e.target.parentElement.parentElement,
								huifu = e.target.getAttribute('huifu');
							console.log(huifu);
							datebase.splice(xiabiao,1);
							playList.firstElementChild.removeChild(delEle);
							listNumber.innerHTML = playAll.length;
							currentIndex = null;
							xb = xb-1;
							addSong[huifu].innerHTML = '+';
							addSong[huifu].style.fontSize = '20px';
							playOne.onclick();
						};
					}
				};
			}
			nextOne.onclick = function(){
				index = Number(currentIndex) + 1;
				currentIndex = index;
				if(index==playAll.length && currentType != 3){
					index = 0;
					currentIndex = index;
				}
				if(index==playAll.length && currentType == 3){
					index = -1;
					currentIndex = index;
					audio.pause();
					return;
				}
				onmusicchang(index);
			};
			upOne.onclick = function(){
				index = Number(currentIndex) - 1;
				currentIndex = index;
				if(index==-1){
					index = playAll.length-1;
					currentIndex = index;
				}
				onmusicchang(index);
			};
			playOne.onclick = function(){
				if(datebase.length == 0)return;
				if(!currentIndex && currentIndex!=0 && currentType != 3){
					index = 0;
					currentIndex = index;
					onmusicchang(index);
					return;
				}
				if(!audio.paused){
					audio.pause();
				}else{
					audio.play();
				}	
			};
			noVolume.onclick = (function(){
				var previous;
				return function(){
					if( this.getAttribute('class').indexOf('novolumes') == -1 ){
						this.setAttribute('class','novolume novolumes');
						previous = audio.volume;
						audio.volume = 0;
					}else{
						this.setAttribute('class','novolume');
						audio.volume = previous;
					}	
				};
			})();
			regulate.onclick = function(e){
				audio.volume = e.layerX/regulate.offsetWidth;
				novolume.setAttribute('class','novolume');
			};
			volumeDown.onclick = function(e){
				e.stopPropagation(); //阻止冒泡事件
			};
			timeAll.onclick = function(e){
				audio.currentTime = (e.layerX/timeTow.offsetWidth)*audio.duration;
			};
			timeFore.onclick = function(e){
				e.stopPropagation(); //阻止冒泡事件
			};
			btnClose.onclick = function(){
				allList.setAttribute('class','all_list all_down');
			};
			openList.onclick = function(){
				allList.setAttribute('class','all_list');
			};
			var allThis = $('allThis'),kaiguan2 = true;
			footerPos.onclick = function(){
				if(kaiguan2){
					allThis.style.display = 'block';
					this.style.marginLeft = '556.4px';
					this.setAttribute('class','shouqi fudong');
					this.setAttribute('title','点击收起');
					kaiguan2 = false;
				}else{
					allThis.style.display = 'none';
					this.style.marginLeft = '0';
					this.setAttribute('class','footer_pos fudong');
					this.setAttribute('title','点击展开');
					kaiguan2 = true;
				}
			};
			var ciyin = $('ciYin'),kaiguan1 = true;
			geci[0].onclick = function(){
				if(kaiguan1){
					ciyin.style.display = 'block';
					kaiguan1 = false;
				}else{
					ciyin.style.display = 'none';
					kaiguan1 = true;
				}
			};
			var allType = $('allType'),
				cycleone = $$('cycleone');
			var currentType = 0,nextType = 1;
			allType.onclick = function(){
				cycleone[currentType].setAttribute('class','cycleone');
				cycleone[nextType].setAttribute('class','cycleone spail');
				currentType = nextType;
				nextType++;
				if(nextType == 4){
					nextType = 0;
				}
			};
			allType.onmouseover = function(e){
				var inner = e.target.getAttribute('title','列表循环');
				if(inner === '列表循环'){
					e.target.style.backgroundPosition = '-219px -32px';
				}else if(inner === '单曲循环'){
					e.target.style.backgroundPosition = '-255px -32px';
				}else if(inner === '随机播放'){
					e.target.style.backgroundPosition = '-327px -60px';
				}else if(inner === '顺序播放'){
					e.target.style.backgroundPosition = '-291px -60px';
				}
			};
			allType.onmouseout = function(e){
				var inner = e.target.getAttribute('title','列表循环');
				if(inner === '列表循环'){
					e.target.style.backgroundPosition = '-219px 0px';
				}else if(inner === '单曲循环'){
					e.target.style.backgroundPosition = '-255px 0px';
				}else if(inner === '随机播放'){
					e.target.style.backgroundPosition = '-327px -32px';
				}else if(inner === '顺序播放'){
					e.target.style.backgroundPosition = '-291px -32px';
				}
			};
			volumeDown.onmousedown = function(e){
				document.onmousemove = function(e){
					var target = e.target.getAttribute('id');
					if(target == 'volume_regulate' || target == 'volumeUp'){
						audio.volume = e.layerX/regulate.offsetWidth;
						novolume.setAttribute('class','novolume');
					}
				};
			};
			document.onmouseup = function(){
				document.onmousemove = null;
			};
			time.onmousedown = function(e){
				time.onmouseover = null;
				time.onmouseout = null;
				document.onmousemove = null;
				document.onmousemove = function(e){
					var target = e.target.getAttribute('id');
					if(target !== 'timefore'){
						audio.currentTime = (e.layerX/timeTow.offsetWidth)*audio.duration;
						var fenzhong = Math.floor(audio.currentTime/60),
					    	miaoshu = Math.floor(audio.currentTime%60);
					    if(miaoshu > 9){
					    	timeOut.innerHTML = fenzhong +':'+ miaoshu;
					    }else{
					    	timeOut.innerHTML = fenzhong +':0'+ miaoshu;
					    }
						timeOut.style.display = 'block';
						zhishi.style.display = 'block';
						timeOut.style.left = (e.layerX - 8)+'px';
						zhishi.style.left = e.layerX + 'px';
					}
				};
			};
			document.onmouseup = function(){
				document.onmousemove = null;
				time.onmouseover = function(e){
					document.onmousemove = function(e){
						var target = e.target.getAttribute('id');
						if(target == 'time'||target == 'timethree'||target == 'timetow'){
							var fenzhong = Math.floor((e.layerX/timeTow.offsetWidth)*audio.duration/60),
						    	miaoshu = Math.floor((e.layerX/timeTow.offsetWidth)*audio.duration%60);
						    if(miaoshu > 9){
						    	timeOut.innerHTML = fenzhong +':'+ miaoshu;
						    }else{
						    	timeOut.innerHTML = fenzhong +':0'+ miaoshu;
						    }
							timeOut.style.display = 'block';
							zhishi.style.display = 'block';
							timeOut.style.left = (e.layerX - 8)+'px';
							zhishi.style.left = e.layerX + 'px';
						}
					};
				};
			};
			var timeOut = $('timeOut'),
				zhishi = $('zhishi');
			time.onmouseout = function(e){
				timeOut.style.display = 'none';
				zhishi.style.display = 'none';
			};
			var clearList = $('clear_list');
			clearList.onclick = function(){
				datebase = [];
				listNumber.innerHTML = datebase.length;
				playList.innerHTML = '<ul></ul>';
				audio.pause();
				currentIndex = null;
				audio.currentTime = 0;
				xb = 0;
				for(var i=0; i<addSong.length; i++){
					addSong[i].innerHTML = '+';
					addSong[i].style.fontSize = '14px';
				}
			};
		}
	});
};