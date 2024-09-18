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
I'm having a look at the Documentation for creating Plugins as mentioned there are certain rules that they need to have:

https://wiki.slimdevices.com/index.php/HelloWorld.html
 (However, it's not updated for the latest version of Squeezebox)

and the link that IS dated for 7.0: https://wiki.slimdevices.com/index.php/SqueezeCenter_7_Plugins.html#A_Detailed_Example

contains outdated / 404 links on how plugins work. 
-A Detailed Example
- Hello World Sample/Tutorial Plugin


However, I did manage to change my code to adapt with the [new 7.0 changes ](https://wiki.slimdevices.com/index.php/SqueezeCenter_7_Plugins.html) of the preference API. See commit 1d73731 (
Updated LanguageSettings.pm with 7.0 changes https://wiki.slimdevices…
….com/index.php/SqueezeCenter_7_Plugins.html - Previously using outdated https://wiki.slimdevices.com/index.php/HelloWorld.html)

For detiled information on this problem - Ive documented my findngs [SPECIIFCALLY for the Save function in Issue 35]([url](https://github.com/Tasha53505/159.356-capstone-project-group/issues/35))







