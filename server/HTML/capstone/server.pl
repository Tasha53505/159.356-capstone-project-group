#!/usr/bin/perl

use strict;
use warnings;
use HTTP::Daemon;
use HTTP::Status;
use JSON;
use File::Slurp qw(read_file write_file);

my $prefs_file_path = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

my $d = HTTP::Daemon->new(
    LocalAddr => 'localhost',
    LocalPort => 3000,
    ReuseAddr => 1
) || die "Failed to start HTTP daemon: $!";

print "Server is running at: ", $d->url, "\n";

while (my $c = $d->accept) {
    while (my $r = $c->get_request) {
        if ($r->method eq 'POST') {
            my $path = $r->uri->path;
            my $content = $r->content;
            my $data = decode_json($content);

            if ($path eq '/saveLanguage') {
                my $new_language = $data->{language};
                my $file_data = read_file($prefs_file_path);
                $file_data =~ s/language: \w+/language: $new_language/;
                write_file($prefs_file_path, $file_data);
                $c->send_response(HTTP::Response->new(RC_OK, 'Language updated successfully'));
            }
            elsif ($path eq '/updateMediaDirs') {
                my $new_media_dir = $data->{mediaDir};
                my $file_data = read_file($prefs_file_path);
                $file_data =~ s/mediadirs:.*\n/mediadirs:\n- $new_media_dir\n/;
                write_file($prefs_file_path, $file_data);
                $c->send_response(HTTP::Response->new(RC_OK, 'Media directories updated successfully'));
            }
            else {
                $c->send_response(HTTP::Response->new(RC_NOT_FOUND, 'Not Found'));
            }
        }
        else {
            $c->send_response(HTTP::Response->new(RC_METHOD_NOT_ALLOWED, 'Method Not Allowed'));
        }
    }
    $c->close;
    undef $c;
}
