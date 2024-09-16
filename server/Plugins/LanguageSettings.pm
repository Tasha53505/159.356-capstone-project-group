# #!/usr/bin/perl

# use strict;
# use warnings;
# use CGI;
# use CGI::Carp qw(fatalsToBrowser);
# use File::Slurp qw(read_file write_file);

# my $cgi = CGI->new;

# # Get the language parameter from the request
# my $language = $cgi->param('language');

# # Define the path to the prefs file
# my $prefs_file_path = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

# # Function to update the language setting
# sub update_language {
#     my ($new_language) = @_;
    
#     # Read the current content of the file
#     my $file_data = read_file($prefs_file_path);

#     # Modify the line that starts with 'language:'
#     $file_data =~ s/^language: \w+/language: $new_language/m;

#     # Write the updated content back to the file
#     write_file($prefs_file_path, $file_data);

#     print "Language updated to $new_language successfully.\n";
# }


# # update_language("EN"); # Added this to test locally --> This works



# # Execute the update_language function if language is provided
# if (defined $language) {
#     update_language($language);
#     print $cgi->header('text/plain');
#     print "Script executed successfully.";
# } else {
#     print $cgi->header('text/plain');
#     print "No language provided.";
# }


package Plugins::LanguageSettings;
use strict;
use File::Slurp qw(read_file write_file);

# Define the functions that will be used
my %functions = ();

# Define the path to the prefs file
my $prefs_file_path = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

# Subroutine to get the display name for the plugin in the menu
sub getDisplayName {
    return 'PLUGIN_LANGUAGE_SETTINGS';
}

# Return strings for localization
sub strings {
    return ' PLUGIN_LANGUAGE_SETTINGS EN Language Settings DE Spracheinstellungen ';
}

# Subroutine to update the language setting in the prefs file
sub update_language {
    my ($new_language) = @_;

    # Read the current content of the prefs file
    my $file_data = read_file($prefs_file_path);

    # Modify the line that starts with 'language:'
    $file_data =~ s/^language: \w+/language: $new_language/m;

    # Write the updated content back to the prefs file
    write_file($prefs_file_path, $file_data);
}

# Lines function: this can be used to display messages on the LMS UI
sub lines {
    my $client = shift;
    return ("", "Language updated");
}

# Set the mode and display the plugin output
sub setMode {
    my $client = shift;
    $client->lines(\&lines);
    $client->update();
}

# Add the plugin to the menu
sub addMenu {
    return "PLUGINS";
}

# Define the functions for handling remote button events
sub initPlugin {
    %functions = (
        'left'  => sub { my $client = shift; Slim::Buttons::Common::popModeRight($client); },
        'up'    => sub { my $client = shift; $client->bumpUp(); },
        'down'  => sub { my $client = shift; $client->bumpDown(); },
    );
}

sub getFunctions {
    return \%functions;
}

# Execute the update_language function based on input from the UI
sub handleRequest {
    my $request = shift;
    my $client  = $request->client;
    my $language = $request->getParam('language');

    if (defined $language) {
        update_language($language);
        setMode($client);
    }
}

1;
