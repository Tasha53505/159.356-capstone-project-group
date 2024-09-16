# Audio Player
By Tasha, Ben, Steve and Konrad
---
# Documentation
---

## Playlist Player code
```
[% noPlaylistCover = "Squeezebox-noPlaylistCover"; noPlaylistCover = cookies.$noPlaylistCover.value %] [% IF hasPagebar %]
[% PROCESS pagebar useJS="Main.playlist.load" %]
[% END %]
[% IF playercount < 1 %]
[% PROCESS status_noclients.html ajaxUpdate=1 %]
[% ELSE %] [% IF playlist_items %] [% FOREACH item = playlist_items %] [% PROCESS status_list.html %] [% END %] [% ELSE %]
[% "EMPTY" | string %]

[% END %] [% END %]
[% IF playercount > 0 %]
[% IF pageinfo.totalDuration; "TOTAL_TIME" | string; " " _ pageinfo.totalDuration; END %]  [% IF current_playlist %]   [% "CURRENT_PLAYLIST" | string %][% stringCOLON %] [% current_playlist_name %] [% IF current_playlist_modified %]([% "MODIFIED" | string %])[% END %] [% END %] 
[% END %]

```
![image](https://github.com/user-attachments/assets/8aca0fcf-ca1d-4daf-8470-45f86139f469)

---

## Fetching Songs (Taken from cmdWrappers)
```
[% BLOCK songInfoItem %]
    <div id="[% title %]">
        <span class="songInfoTitle">
            [% IF title; title | string; stringCOLON; END %]
        </span>
        <span class="songInfoText">[% item %]</span>
    </div>
[% END %]

```

---
##  Checks what song is being played and displays it
```
            [% BLOCK trackinfo %]       [% IF item.currentsong %][% item.noHref=1 %]<b>[% END %]
        [% IF item.infohref %]
          <a [% item.infohref %] target="browser" class="browseItemLink">[% ( item.text || item.title ) | html %]</a>
                                        [% ELSIF item.num || item.num == 0 %]
                                            [% UNLESS item.noHref %]<a [% PROCESS songinfoItemHRef %] target="browser">[% END %]
                                            [% item.title | html %][% UNLESS item.noHref %]</a>[% END %]
                                        [% ELSIF item.item || !item.defined('level') && item.itemobj %]
                                            <a [% PROCESS songinfoItemHRef %] target="browser" class="browseItemLink">[% item.text | html %]</a>
                                        [% ELSIF item.songtitle %]
                                            <a [% PROCESS songinfoItemHRef %] target="browser" class="browseItemLink">[% item.songtitle | html %]</a>
                                        [% ELSE %]
                                            [% item.text | html %]
                                        [% END %]
                                        
                                        [% IF item.includeArtist && (artist = item.artistsWithAttributes ? item.artistsWithAttributes.0 : item.itemobj.artist) && artist.name != item.noArtist; PROCESS artistsAsHTML.html itemobj = item.itemobj; END %]
                                        
                                        [% IF item.includeAlbum && (albumTitle = item.albumTitle || (item.itemobj.album && item.itemobj.album.title)) && albumTitle != item.noAlbum && albumTitle != "" %][% stringFROM %]
                                        <a [% PROCESS albumItemHRef %] target="browser" class="browseItemLink">[% albumTitle | html %]</a>[% END %]
   [% IF item.currentsong %]</b>[% END %]
[END %]
```
---
##  SqueezeJS functionality (Play, Pause etc)
Use this to get SqueezeJS functionality according to https://wiki.slimdevices.com/index.php/SqueezeJS_tutorial.html
```
<head>
    <link rel="stylesheet" type="text/css" href="/html/ext/resources/css/ext-all.css?r=[% revision %]" />

    <script type="text/javascript" src="/html/ext/adapter/ext/ext-base.js?r=[% revision %]"></script>
    <script type="text/javascript" src="/html/ext/ext-all.js?r=[% revision %]"></script>
    <script type="text/javascript">[% PROCESS html/vars.js %]</script>
    <script type="text/javascript" src="/html/SqueezeJS/Base.js?r=[% revision %]"></script>
    <script type="text/javascript">[% PROCESS html/SqueezeJS/Strings.js %]</script>
    <script type="text/javascript" src="/html/SqueezeJS/UI.js?r=[% revision %]"></script>

    <title>SqueezeJS demo page</title>
</head>

```
---
## Save Preferences
Preferences are being updated in C:\ProgramData\Squeezebox\prefs server.prefs
---
## Plugin API Documentaion for squeezebox
https://wiki.slimdevices.com/index.php/SqueezeCenter_7_Plugins.html






