#!/usr/bin/perl

# Use strict and warnings to enforce good coding practices
use strict;
use warnings;

# Import necessary modules
use HTTP::Daemon;     # For creating an HTTP server
use HTTP::Status;     # For HTTP status codes
use JSON;             # For JSON encoding/decoding
use File::Slurp qw(read_file write_file);  # For reading/writing files

# Define the path to the prefs file
my $prefs_file_path = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

# Create a new HTTP::Daemon object to listen for incoming HTTP requests
my $d = HTTP::Daemon->new(
    LocalAddr => 'localhost',  # Bind to localhost
    LocalPort => 3000,         # Listen on port 3000
    ReuseAddr => 1             # Allow reusing the address
) || die "Failed to start HTTP daemon: $!";  # Exit if server fails to start

# Print the server URL to the console
print "Server is running at: ", $d->url, "\n";

# Main loop to accept and handle incoming connections
while (my $c = $d->accept) {  # Accept a new client connection
    while (my $r = $c->get_request) {  # Get the request from the client
        if ($r->method eq 'POST') {  # Check if the request method is POST
            my $path = $r->uri->path;    # Get the request path
            my $content = $r->content;   # Get the request content (body)

            my $data;
            eval {
                $data = decode_json($content);  # Decode JSON data from the request body
            };

            if ($@) {  # If decoding fails
                $c->send_response(HTTP::Response->new(RC_BAD_REQUEST, 'Invalid JSON'));  # Send a 400 Bad Request response
                next;  # Skip to the next request
            }

            if ($path eq '/saveLanguage') {  # Handle the /saveLanguage path
                my $new_language = $data->{language};  # Extract the new language from the JSON data
                my $file_data = read_file($prefs_file_path);  # Read the current prefs file data
                $file_data =~ s/language: \w+/language: $new_language/;  # Update the language in the file data
                write_file($prefs_file_path, $file_data);  # Write the updated data back to the prefs file
                $c->send_response(HTTP::Response->new(RC_OK, 'Language updated successfully'));  # Send a success response
            }
            elsif ($path eq '/updateMediaDirs') {  # Handle the /updateMediaDirs path
                my $new_media_dir = $data->{mediaDir};  # Extract the new media directory from the JSON data
                my $file_data = read_file($prefs_file_path);  # Read the current prefs file data
                $file_data =~ s/mediadirs:.*\n/mediadirs:\n- $new_media_dir\n/;  # Update the media directories in the file data
                write_file($prefs_file_path, $file_data);  # Write the updated data back to the prefs file
                $c->send_response(HTTP::Response->new(RC_OK, 'Media directories updated successfully'));  # Send a success response
            }
            else {  # If the request path does not match any known endpoints
                $c->send_response(HTTP::Response->new(RC_NOT_FOUND, 'Not Found'));  # Send a 404 Not Found response
            }
        }
        else {  # If the request method is not POST
            $c->send_response(HTTP::Response->new(RC_METHOD_NOT_ALLOWED, 'Method Not Allowed'));  # Send a 405 Method Not Allowed response
        }
    }
    $c->close;  # Close the client connection
    undef $c;    # Undefine the client object to free memory
}
