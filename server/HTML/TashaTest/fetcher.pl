#!/usr/bin/perl
use strict;
use warnings;
use JSON;
use MP3::Tag;
use File::Spec;
use Cwd 'abs_path';


my $tempDirectory = 'okcomputer';
my $jsonfile = 'okcomputer.json';

open my $fh, '>', $jsonfile or die "Can't open $jsonfile: $!";

my $json = JSON->new->utf8->pretty;

my @songs;

opendir my $dir, $tempDirectory or die "Can't open $tempDirectory: $!";
my @files = readdir $dir;
closedir $dir;

foreach my $file (@files){
    next unless $file =~ /\.mp3$/i;
    my $filepath = File::Spec->catfile($tempDirectory, $file);
    my $mp3 = MP3::Tag->new($filepath);
    $mp3->get_tags();
    my $data = $mp3->{ID3v1};
    my $path = File::Spec->abs2rel($filepath, abs_path('capstone'));

    my %song = (
        title => $data->title,
        artist => $data->artist,
        file => $path
    );
    push @songs, \%song;
}
print $fh $json->encode(\@songs);
close $fh;


#my $mp3 = MP3::Tag->new($file);

#$mp3->get_tags();

#my $info = $mp3->{ID3v1};
#print "Title: ", $info->title;