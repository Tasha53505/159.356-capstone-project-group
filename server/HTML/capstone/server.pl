#!/usr/bin/perl

use strict;
use warnings;
use File::Slurp qw(read_file write_file);  # For reading/writing files


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

# Example usage: update the language to 'FR' (French)
update_language('EN');
