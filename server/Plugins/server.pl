#!/usr/bin/perl

use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use File::Slurp qw(read_file write_file);

my $cgi = CGI->new;

# Get the language parameter from the request
my $language = $cgi->param('language');

# Define the path to the prefs file
my $prefs_file_path = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

# Function to update the language setting
sub update_language {
    my ($new_language) = @_;
    
    # Read the current content of the file
    my $file_data = read_file($prefs_file_path);

    # Modify the line that starts with 'language:'
    $file_data =~ s/^language: \w+/language: $new_language/m;

    # Write the updated content back to the file
    write_file($prefs_file_path, $file_data);

    print "Language updated to $new_language successfully.\n";
}


# update_language("FR"); # Added this to test locally --> This works
# Execute the update_language function if language is provided
if (defined $language) {
    update_language($language);
    print $cgi->header('text/plain');
    print "Script executed successfully.";
} else {
    print $cgi->header('text/plain');
    print "No language provided.";
}
