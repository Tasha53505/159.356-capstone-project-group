
#!/usr/bin/perl
use strict;
use warnings;
use JSON;

my $musicDirectory = 'C:\Program Files\Songs'; # Need to find better way to get directory, different for others (potentially use FindBin).
opendir(my $dh, $musicDirectory) || die "cannot open file directory: $!"; # $dh reads musicDirectorys content. If not found, Die gives an error. --> $! means a specifc error message

my @files;
while(readdir $dh) { #loops over all content in directory
    next unless /\.(m4a|aif|dff|flac|ogg|wav)$/; #Regex pattern for file types --> Skips to next file if mp3, wav doesn't match
    push @files, $_; #Any files with those endings are found, pushes it to the array.
}
closedir $dh;

#Adding debugging statements for console log
my %response = (
    files => \@files,
    log => "Music has been fetched. No Errors"
);

print "Content-Type: application/json\n\n";
print encode_json(\%response);