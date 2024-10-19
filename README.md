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

By using: https://lyrion.org/reference/cli/using-the-cli/#jsonrpcjs (JSON RPC) - I am looking into setting preferences from the FRONTEND instead of using Perl, as recommeneded by one of the delvopers at Lyrion Music Serever


For detiled information on this problem  Ive documented my findngs SPECIIFCALLY for the Save function in https://github.com/Tasha53505/159.356-capstone-project-group/issues/35
  - it may contain helpful links, so please look through it.

## issues with save settings button
If you're having issues with buttons in general - the fix is described in Detail in https://github.com/Tasha53505/159.356-capstone-project-group/issues/35 
 - it's all due to some of the components being loaded AFTER the DOM
 - but ALSO in tangent with needing to use the highest element to listen for clicks (Event delgation with the body element) - so that even listeners attached AFTER the DOM has rendered, it'll still be recognised)
---
#Issues with File paths
Documented issue here: https://github.com/Tasha53505/159.356-capstone-project-group/issues/73
(Specifically for the rescan button) - but this will help in general, is that `C:` is NOT a valid path, it needed to be `C/` --> Also, I needed to format it so that it was a 2D Array
   ` const formattedPath = [folderPath];`  and `const updatedData = data.replace(/mediadirs:\s*\[.*?\]/, `mediadirs: ["${newMediaDir}"]`);`

----------------------------------------
## Notes about JSON RPC
https://lyrion.org/reference/cli/using-the-cli/#jsonrpcjs --> Documentation is incredibly helpful
- From what I've found and doing research, the drawback from JSON RPC is not being able to send multiple requests at one time, results in an error. Perl would have been able to do this
- Make sure if you're dealing with file paths that they're correct.
- 0 can be used as a placeholder for playerID --> if the command your sending supports it.

  *NOTE:* This has now been replaced by the use of a perl plugin

-------------------------------------
## Generating Songs
The folder menu is created by
Slim::Menu::BrowseLibrary::_bmf
which gets the folder data with a 'musicfolder' request
which is dispatched by Slim::Control::Request
which calls Slim::Control::Queries::mediafolderQuery

(Note: bmf = browse media folder)
-------------------------------------
## Selenium / Jest for testing
---
## Jest
- **Documentation: ** https://jestjs.io/docs/getting-started
- Installed Jest with `npm install --save-dev jest`
- and `npm install --save-dev jest @testing-library/jest-dom @testing-library/dom` --> as I'm hevaily using the DOM
-  Added to _package.json_
    ```
    "scripts": {
          "test": "jest"
    }

    ```
- Tests in `__tests__` folder
- Run tests with `npm run test`
- 
### What tests have been written with Jest:
- Accordion Panel Tests
- Songs Left Panel test
- Artists left panel test
- Albums Left Panel Test
- Basic Settings Language
- Basic Settings Media Folders directory
- Basic Settings Rescan button
- Basic Settings Playlists Folder
- Behaviour Settings Browse Artists
- Behaviour Settings Release Types
- Behaviour Settings Filters
- Advanced File Types
----
## Selenium
- `npm install selenium-webdriver`
- `npm install mocha chai`
- `npm install chromedriver`

- Install the Extension for your browser. --> https://www.selenium.dev/downloads/
- Checkout documentation for YOUR [specific browser](https://www.selenium.dev/documentation/webdriver/browsers/)
- Once Selenum tests are written inside "selenium-test" folder --> make sure the extension is `.mjs`
- Run command `npx mocha test.js` 

### What tests have been written with Selenium:
- I have mainly just automated the process with of clicking through the entire left panel to make sure everything functions correctly. This was especially useful for tiny code changes - with a click of a button it reruns the whole test
---
## Favourites Plugin
- Favourites plugin has been created by inheritenting the EN's skin plugin content, but overwriting the index file. You can see this by following path: Squeezebox\server\Slim\Plugin\Favorites\HTML\capstone\plugins\Favorites


---
## Left To-do (discussed with Prince) - He will work on upon handover of this project
- Plugins (Favourites Plugin has been complete though)
- Plugins Settings
- advanced search
- Dark theme


