#!/usr/bin/perl

use strict;
use warnings;
use HTTP::Daemon;
use HTTP::Status;
use JSON;
use File::Slurp qw(read_file write_file);  # For reading/writing files

# Define the path to the prefs file
my $prefs_file_path = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

# Create a new HTTP::Daemon object to listen for incoming HTTP requests
my $d = HTTP::Daemon->new(
    LocalAddr => 'localhost',
    LocalPort => 3000,
    ReuseAddr => 1
) || die "Failed to start HTTP daemon: $!";

print "Server is running at: ", $d->url, "\n";

# Main loop to accept and handle incoming connections
while (my $c = $d->accept) {
    while (my $r = $c->get_request) {
        if ($r->method eq 'POST') {
            my $path = $r->uri->path;
            my $content = $r->content;

            # Parse the JSON content from the request
            my $data = eval { decode_json($content) };
            if ($@) {
                $c->send_response(RC_BAD_REQUEST, 'Invalid JSON');
                next;
            }

            if ($path eq '/saveLanguage') {
                my $new_language = $data->{language};  # Get the new language from the request

                # Read the current prefs file data
                my $file_data = read_file($prefs_file_path);

                # Update the language in the file (e.g., replace "language: EN" with the new language)
                $file_data =~ s/language: \w+/language: $new_language/;

                # Write the updated data back to the prefs file
                eval { write_file($prefs_file_path, $file_data) };
                if ($@) {
                    $c->send_response(RC_INTERNAL_SERVER_ERROR, 'Failed to update language');
                } else {
                    $c->send_response(RC_OK, 'Language updated successfully');
                }
            } else {
                $c->send_response(RC_NOT_FOUND, 'Endpoint not found');
            }
        } else {
            $c->send_response(RC_METHOD_NOT_ALLOWED, 'Method not allowed');
        }
    }
    $c->close;
    undef $c;
}
