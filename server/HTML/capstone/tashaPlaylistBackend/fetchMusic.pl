use strict
use warnings
use JSON 

my $musicDirectory = 'C:\Program Files\Squeezebox\server\HTML\capstone\tashaPlaylistBackend\testMusic'; 
opendir(my $dh, $musicDirectory) || die "cannot open file directory: $!" # $dh reads musicDirectorys content. If not found, Die gives an error. --> $! means a specifc error message

my @files;
while(readdir $dh) { #loops over all content in directory
    next unless /\.(mp3|wav)$/; #Regex pattern for file types --> Skips to next file if mp3, wav doesn't match
    push @files, $_; #Any files with those endings are found, pushes it to the array.
}
closedir $dh