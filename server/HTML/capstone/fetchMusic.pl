#!/usr/bin/perl
use strict;
use warnings;
use JSON;

my $dir = "C:\\Program Files\\Squeezebox\\server\\HTML\\capstone";
opendir(DIR, $dir) or die "Cannot open directory: $!";
my @files = grep(/\.mp3$/, readdir(DIR));
closedir(DIR);

my @songs;
foreach my $file (@files) {
    push @songs, { title => $file };
}

print "Content-Type: application/json\n\n";
print encode_json(\@songs);
