Main = {
	background : Ext.get('background'),
	body : Ext.get(document.body),
	layout : null,

	init : function(){
		// initialize global controller, which is responsible for all communication with SC
		SqueezeJS.Controller.init({
            player : playerid
        });

        this.playlist = new SqueezeJS.UI.Playlist({
            renderTo: 'playlistPanel',			// the panel where the playlist will be displayed
            playlistEl: 'playList',				// the actual playlist (the panel less the navigation bar, buttons etc.)
            currentSelector: 'div.currentSong'	// selector for the current playlist item
        });
		this.playlist.Highlighter = new SqueezeJS.UI.Highlight();
		this.playlist.onUpdated = function(o){
			var items = Ext.DomQuery.select('#' + this.playlistEl + ' div.draggableSong');
			if (items.length > 0) {
				if (Ext.get('btnPlaylistToggleArtwork')) {
					var noCover = SqueezeJS.getCookie('Squeezebox-noPlaylistCover') == '1';
					var menu = new Ext.menu.Menu({
						items: [
							new Ext.menu.CheckItem({
								text: SqueezeJS.string('hide_artwork'),
								cls: 'albumList',
								handler: function(){
									SqueezeJS.setCookie('Squeezebox-noPlaylistCover', 1);
									this.load();
								}.createDelegate(this),
								group: 'noCover',
								checked: noCover
							}),
							new Ext.menu.CheckItem({
								text: SqueezeJS.string('show_artwork'),
								cls: 'albumXList',
								handler: function(){
									SqueezeJS.setCookie('Squeezebox-noPlaylistCover', 0);
									this.load();
								}.createDelegate(this),
								group: 'noCover',
								checked: !noCover
							})
						]
					});

					new SqueezeJS.UI.SplitButton({
						renderTo: 'btnPlaylistToggleArtwork',
						icon: webroot + 'html/images/albumlist' + (noCover ? '2' : '0')  + '.gif',
						cls: 'x-btn-icon',
						menu: menu,
						arrowTooltip: SqueezeJS.string('coverart')
					});
				}

				new SqueezeJS.UI.Button({
					renderTo: 'btnPlaylistClear',
					cls:      'btn-playlist-clear',
					tooltip:  SqueezeJS.string('clear_playlist'),
					minWidth: 32,
					noText:   true,
					handler:  function(){
						SqueezeJS.Controller.playerControl(['playlist', 'clear']);
						this.load();							// Bug 5709: force playlist to clear
					}.createDelegate(this)
				});

				new SqueezeJS.UI.Button({
					renderTo: 'btnPlaylistSave',
					cls:      'btn-playlist-save',
					tooltip:  SqueezeJS.string('save'),
					minWidth: 32,
					noText:   true,
					handler:  function(){
						frames.browser.location = webroot + 'edit_playlist.html?player=' + SqueezeJS.Controller.getPlayer() + '&saveCurrentPlaylist=1';
					}
				});

				this.Highlighter.init({
					unHighlight : 'playList'
				});
			}
		};

		// IE sucks. It needs a special invitation to load the list.
		if (Ext.isIE)
			this.playlist.load();
        // console.log(playlist)

        // Cover
        new SqueezeJS.UI.Coverart({
            el: 'coverart',
            noLink: true,
        });

        // Display name
        new SqueezeJS.UI.RawTitle({
            el: 'title',
            noLink: true
        });

        // Display artist
        new SqueezeJS.UI.Contributors({
            el: 'artist',
            noLink: true
        });

        // Timers
        new SqueezeJS.UI.Playtime({
            el: 'playtime',
            noLink: true
        });
        new SqueezeJS.UI.PlaytimeRemaining({
            el: 'maxtime',
            noLink: true
        });

        new SqueezeJS.UI.Bitrate({
            el: 'bitrate',
            noLink: true
        });

		SqueezeJS.UI.FilesystemBrowser = {
			init: function(){
				var inputEl, btnEl, filter, classes, start;
		
				var tpl = new Ext.Template('&nbsp;<input type="button" value="' + SqueezeJS.string('browse') + '" onclick="SqueezeJS.UI.FilesystemBrowser.show(\'{inputField}\', \'{filter}\')">');
				tpl.compile();
		
				// try to get the filter expression from the input fields CSS class
				// selectFolder - only display folders
				// selectFile   - display any filetype
				// selectFile_X - only show files of the type X (eg. selectFile_xml -> .xml only)
				var items = Ext.query('input.selectFolder, input[class*=selectFile]');
				for(var i = 0; i < items.length; i++) {
		
					if (inputEl = Ext.get(items[i])) {
						filter = '';
		
						if (inputEl.hasClass('selectFolder'))
							filter = 'foldersonly'
		
						else {
							classes = items[i].className.split(' ');
		
							for (var x=0; x<classes.length; x++) {
		
								if (classes[x].search(/selectFile_/) > -1) {
									filter += (filter ? '|' : '') + classes[x].replace(/selectFile_/, '');
								}
							}
							if (filter)
								filter = "filetype:" + filter;
						}
		
						btnEl = tpl.insertAfter(inputEl, {
							inputField: inputEl.id,
							filter: filter
						});
					}
				}
			},
		
			show: function(inputField, filter){
				var filesystemDlg = new Ext.Window({
					modal: true,
					collapsible: false,
					width: 350,
					height: 400,
					resizeHandles: 'se',
					html: '<div id="filesystembrowser"></div>',
					buttons: [{
						text: SqueezeJS.string('close'),
						handler: function(){
							filesystemDlg.close()
						},
						scope: filesystemDlg,
						template: SqueezeJS.UI.buttonTemplate
					}],
					listeners: {
						resize: this.onResize
					}
				});
		
				filesystemDlg.setTitle(SqueezeJS.string(filter == 'foldersonly' ? 'choose_folder' : 'choose_file'));
				filesystemDlg.show();
		
				new SqueezeJS.UI.FileSelector({
					renderTo: 'filesystembrowser',
					input: inputField,
					filter: filter
				});
			},
		
			onResize: function() {
				var el = Ext.get('filesystembrowser');
				if (el && (el = el.parent())) {
					el.setWidth(el.getWidth()-12);
					el.setStyle({ overflow: 'auto' })
				}
			}
		};

        // console.log("main inited")
		SqueezeJS.UI.FilesystemBrowser = {
			init: function(){
				var inputEl, btnEl, filter, classes, start;
		
				var tpl = new Ext.Template('&nbsp;<input type="button" value="' + SqueezeJS.string('browse') + '" onclick="SqueezeJS.UI.FilesystemBrowser.show(\'{inputField}\', \'{filter}\')">');
				tpl.compile();
		
				// try to get the filter expression from the input fields CSS class
				// selectFolder - only display folders
				// selectFile   - display any filetype
				// selectFile_X - only show files of the type X (eg. selectFile_xml -> .xml only)
				var items = Ext.query('input.selectFolder, input[class*=selectFile]');
				for(var i = 0; i < items.length; i++) {
		
					if (inputEl = Ext.get(items[i])) {
						filter = '';
		
						if (inputEl.hasClass('selectFolder'))
							filter = 'foldersonly'
		
						else {
							classes = items[i].className.split(' ');
		
							for (var x=0; x<classes.length; x++) {
		
								if (classes[x].search(/selectFile_/) > -1) {
									filter += (filter ? '|' : '') + classes[x].replace(/selectFile_/, '');
								}
							}
							if (filter)
								filter = "filetype:" + filter;
						}
		
						btnEl = tpl.insertAfter(inputEl, {
							inputField: inputEl.id,
							filter: filter
						});
					}
				}

				// const softwareIframe = document.getElementById('softwareIframe');
				// const securityIframe = document.getElementById('securityIframe');
				// softwareIframe.onload = function() {
				// 	const bodyContent = softwareIframe.contentDocument.body.innerHTML;
				// 	const contentDiv = document.getElementById('softwareInnerHTML')
				// 	contentDiv.innerHTML = bodyContent
				// }
				// securityIframe.onload = function() {
				// 	const bodyContent = securityIframe.contentDocument.body.innerHTML;
				// 	const contentDiv = document.getElementById('securityInnerHTML')
				// 	contentDiv.innerHTML = bodyContent
				// 	console.log(securityIframe)
				// }

				// securityIframe.src = '[% webroot %]settings/server/security.html';
				// softwareIframe.src = '[% webroot %]settings/server/software.html';
			},
		
			show: function(inputField, filter){
				var filesystemDlg = new Ext.Window({
					modal: true,
					collapsible: false,
					width: 350,
					height: 400,
					resizeHandles: 'se',
					html: '<div id="filesystembrowser"></div>',
					buttons: [{
						text: SqueezeJS.string('close'),
						handler: function(){
							filesystemDlg.close()
						},
						scope: filesystemDlg,
						template: SqueezeJS.UI.buttonTemplate
					}],
					listeners: {
						resize: this.onResize
					}
				});
		
				filesystemDlg.setTitle(SqueezeJS.string(filter == 'foldersonly' ? 'choose_folder' : 'choose_file'));
				filesystemDlg.show();
		
				new SqueezeJS.UI.FileSelector({
					renderTo: 'filesystembrowser',
					input: inputField,
					filter: filter
				});
			},
		
			onResize: function() {
				var el = Ext.get('filesystembrowser');
				if (el && (el = el.parent())) {
					el.setWidth(el.getWidth()-12);
					el.setStyle({ overflow: 'auto' })
				}
			}
		};
	},

	onResize : function(width, height) {
		Ext.util.CSS.updateRule('.x-menu-list', 'max-height', (height - 50) + 'px');
		this.background.setHeight(height - this.offsets[0]);
		this.background.setWidth(width - this.offsets[1]);
	},

	onPlayerSelected : function(playerobj) {
		if (playerobj && playerobj.playerid)
			playerobj = playerobj.playerid
		else
			playerobj = SqueezeJS.getPlayer();

		// set the browser frame to use the selected player
		if (frames.browser && frames.browser.location && frames.browser.location.protocol.match(/^http/)) {
			frames.browser.location = SqueezeJS.Utils.replacePlayerIDinUrl(frames.browser.location, playerobj);
		}

		// make the settings link use the new player ID
		var el;
		if (el = Ext.get('settingsHRef')) {
			el.dom.href = SqueezeJS.Utils.replacePlayerIDinUrl(el.dom.href, playerobj);
		}
		if (el = Ext.get('settingsBtn')) {
			el.dom.href = SqueezeJS.Utils.replacePlayerIDinUrl(el.dom.href, playerobj);
		}
	},

	initPlayerControl : function(){
		new SqueezeJS.UI.Buttons.Rew({
			renderTo: 'ctrlPrevious',
			noText:   true,
			minWidth: 31
		});

		new SqueezeJS.UI.Buttons.Play({
			renderTo: 'ctrlTogglePlay',
			noText:   true,
			minWidth: 31
		});

		new SqueezeJS.UI.Buttons.Fwd({
			renderTo: 'ctrlNext',
			noText:   true,
			minWidth: 31
		});

		new SqueezeJS.UI.Buttons.Repeat({
			renderTo: 'ctrlRepeat',
			noText:   true,
			minWidth: 31
		});

		new SqueezeJS.UI.Buttons.Shuffle({
			renderTo: 'ctrlShuffle',
			noText:   true,
			minWidth: 31
		});

		new SqueezeJS.UI.Buttons.VolumeDown({
			renderTo: 'ctrlVolumeDown',
			noText:   true,
			minWidth: 27
		});

		new SqueezeJS.UI.Buttons.VolumeUp({
			renderTo: 'ctrlVolumeUp',
			noText:   true,
			minWidth: 27
		});

		new SqueezeJS.UI.VolumeBar({
			el: 'ctrlVolume',
			marginLeft: 7,
			marginRight: 6
		});

		new SqueezeJS.UI.Buttons.Power({
			renderTo: 'ctrlPower',
			noText:   true,
			minWidth: 24
		});

		new SqueezeJS.UI.Title('ctrlCurrentTitle');
		new SqueezeJS.UI.CompoundTitle('ctrlCurrentSongInfoCollapsed');
		new SqueezeJS.UI.Album('ctrlCurrentAlbum');
		new SqueezeJS.UI.Contributors('ctrlCurrentArtist');
		new SqueezeJS.UI.Bitrate('ctrlBitrate');
		new SqueezeJS.UI.CurrentIndex('ctrlPlayNum');
		new SqueezeJS.UI.SongCount('ctrlSongCount');

		new SqueezeJS.UI.Playtime('ctrlPlaytime');
		new SqueezeJS.UI.CompoundPlaytime('ctrlPlaytimeCollapsed');
		new SqueezeJS.UI.PlaytimeRemaining('ctrlRemainingTime');
		new SqueezeJS.UI.PlaytimeProgress('ctrlProgress');

		new SqueezeJS.UI.Coverart({
			el: 'ctrlCurrentArt',
			size: 96
		});

		new SqueezeJS.UI.CoverartPopup({
			target: 'ctrlCurrentArt',
			defaultAlign: 'tl-bl'
		});

		// display song information with coverart in the collapsed mode
		new SqueezeJS.UI.CoverartPopup({
			target: 'nowPlayingIcon',
			defaultAlign: 'tl-bl',
			songInfo: true
		});

		new SqueezeJS.UI.Button({
			renderTo: 'ctrlCollapse',
			cls:      'btn-collapse-player',
			tooltip:  SqueezeJS.string('collapse'),
			minWidth: 18,
			noText:   true,
			scope:    this,
			handler:  this.collapseExpand
		});

		if (Ext.get('ctrlUndock')) {
			new SqueezeJS.UI.Button({
				renderTo: 'ctrlUndock',
				cls:      'btn-undock',
				tooltip:  SqueezeJS.string('undock'),
				minWidth: 16,
				noText:   true,
				scope:    this,
				handler:  function(){
					window.open(webroot + 'status_header.html?player=' + SqueezeJS.Controller.getPlayer(), 'playerControl', 'width=500,height=100,status=no,menubar=no,location=no,resizable=yes');
				}
			});
		}

		var el;
		if (el = Ext.get('ctrlCurrentArt'))
			el.setVisibilityMode(Ext.Element.DISPLAY);

		if (el = Ext.get('expandedPlayerPanel'))
			el.setVisibilityMode(Ext.Element.DISPLAY);

		if (el = Ext.get('collapsedPlayerPanel'))
			el.setVisibilityMode(Ext.Element.DISPLAY);

		if (el = Ext.get('ctrlExpand'))
			el.setVisibilityMode(Ext.Element.DISPLAY);

		if (el = Ext.get('ctrlCollapse'))
			el.setVisibilityMode(Ext.Element.DISPLAY);

		// restore player expansion from cookie
		this.collapseExpand({
			doExpand: (SqueezeJS.getCookie('Squeezebox-expandPlayerControl') != 'false')
		});

		new SqueezeJS.UI.Button({
			renderTo: 'ctrlExpand',
			cls:      'btn-expand-player',
			tooltip:  SqueezeJS.string('expand'),
			minWidth: 18,
			noText:   true,
			scope:    this,
			handler:  this.collapseExpand
		});

	},

	_playlistInit : function(){
		this.playlist = new SqueezeJS.UI.Playlist({
			renderTo: 'playlistPanel',			// the panel where the playlist will be displayed
			playlistEl: 'playList',				// the actual playlist (the panel less the navigation bar, buttons etc.)
			currentSelector: 'div.currentSong'	// selector for the current playlist item
		});

		// console.log(this.playlist)

		this.playlist.Highlighter = new SqueezeJS.UI.Highlight();

		this.playlist.onUpdated = function(o){
			var items = Ext.DomQuery.select('#' + this.playlistEl + ' div.draggableSong');
			if (items.length > 0) {
				if (Ext.get('btnPlaylistToggleArtwork')) {
					var noCover = SqueezeJS.getCookie('Squeezebox-noPlaylistCover') == '1';
					var menu = new Ext.menu.Menu({
						items: [
							new Ext.menu.CheckItem({
								text: SqueezeJS.string('hide_artwork'),
								cls: 'albumList',
								handler: function(){
									SqueezeJS.setCookie('Squeezebox-noPlaylistCover', 1);
									this.load();
								}.createDelegate(this),
								group: 'noCover',
								checked: noCover
							}),
							new Ext.menu.CheckItem({
								text: SqueezeJS.string('show_artwork'),
								cls: 'albumXList',
								handler: function(){
									SqueezeJS.setCookie('Squeezebox-noPlaylistCover', 0);
									this.load();
								}.createDelegate(this),
								group: 'noCover',
								checked: !noCover
							})
						]
					});

					new SqueezeJS.UI.SplitButton({
						renderTo: 'btnPlaylistToggleArtwork',
						icon: webroot + 'html/images/albumlist' + (noCover ? '2' : '0')  + '.gif',
						cls: 'x-btn-icon',
						menu: menu,
						arrowTooltip: SqueezeJS.string('coverart')
					});
				}

				new SqueezeJS.UI.Button({
					renderTo: 'btnPlaylistClear',
					cls:      'btn-playlist-clear',
					tooltip:  SqueezeJS.string('clear_playlist'),
					minWidth: 32,
					noText:   true,
					handler:  function(){
						SqueezeJS.Controller.playerControl(['playlist', 'clear']);
						this.load();							// Bug 5709: force playlist to clear
					}.createDelegate(this)
				});

				new SqueezeJS.UI.Button({
					renderTo: 'btnPlaylistSave',
					cls:      'btn-playlist-save',
					tooltip:  SqueezeJS.string('save'),
					minWidth: 32,
					noText:   true,
					handler:  function(){
						frames.browser.location = webroot + 'edit_playlist.html?player=' + SqueezeJS.Controller.getPlayer() + '&saveCurrentPlaylist=1';
					}
				});

				this.Highlighter.init({
					unHighlight : 'playList'
				});
			}
		};

		// IE sucks. It needs a special invitation to load the list.
		if (Ext.isIE)
			this.playlist.load();
	},

	collapseExpand : function(ev){
		var expandCookie = SqueezeJS.getCookie('Squeezebox-expandPlayerControl');
		expandCookie = expandCookie == 'false' ? false : true;

		var doExpand = ev.doExpand == null ? !expandCookie : ev.doExpand;

		var art = Ext.get('ctrlCurrentArt');

		// work around Safari 2 crasher: resize and hide artwork before hiding surrounding DIV
		if (art && !doExpand) {
			art.setHeight(0);
			art.hide();
		}

		var el;
		if (el = Ext.get('collapsedPlayerPanel'))
			el.setVisible(!doExpand);

		if (el = Ext.get('expandedPlayerPanel'))
			el.setVisible(doExpand);

		if (el = Ext.get('ctrlCollapse'))
			el.setVisible(doExpand);

		if (el = Ext.get('ctrlExpand'))
			el.setVisible(!doExpand);

		if (art && doExpand) {
			art.setHeight(96);
			art.show();
		}

		SqueezeJS.setCookie('Squeezebox-expandPlayerControl', doExpand);

		// resize the window if in undocked mode
		var el = Ext.get('ctrlUndock');
		if (el && !el.isVisible()) {
			var width = Ext.get(document.body).getWidth();
			var height = doExpand ? 200 : 115

			if (Ext.isOpera && doExpand) {
				height += 15;
			}

			window.resizeTo(width, height);
		}

		try { this.playlist.onResize(); }
		catch(e) {}
	}

};

