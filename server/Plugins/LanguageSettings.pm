package Plugins::LanguageSettings;
use strict;
use File::Slurp qw(read_file write_file);

use lib 'C:/Program Files/Squeezebox/server/CPAN';  # Hopefully stops the slim Utils Prefs not found error
use lib 'C:/Program Files/Squeezebox/server/Slim/Utils/Prefs';  # Hopefully stops the slim Utils Prefs not found error

use Slim::Utils::Prefs;


# Create a preferences object for the plugin
my $prefs = preferences('plugin.languagesettings');

# Define the path to the prefs file
my $prefs_file_path = 'C:/ProgramData/Squeezebox/prefs/server.prefs';

# Subroutine to get the display name for the plugin in the menu
sub getDisplayName {
    return 'PLUGIN_LANGUAGE_SETTINGS';
}

# Return strings for localization
sub strings {
    return {
        'PLUGIN_LANGUAGE_SETTINGS' => 'Language Settings',
        'EN'                       => 'English',
        'DE'                       => 'German',
        'FR'                       => 'French',
    };
}

# Subroutine to update the language setting in the prefs file
sub update_language {
    my ($new_language) = @_;

     # Hardcode the language to French for testing
    my $new_language = 'FR';

    # Read the current content of the prefs file
    my $file_data = read_file($prefs_file_path);

    # Modify the line that starts with 'language:'
    $file_data =~ s/^language: \w+/language: $new_language/m;

    # Write the updated content back to the prefs file
    write_file($prefs_file_path, $file_data);

    # Update the plugin preferences with the new language
    $prefs->set('language', $new_language);
}

# Lines function: this can be used to display messages on the LMS UI
sub lines {
    my ($client) = @_;
    
    # Return a hash as per the new display API
    return {
        'line1' => $client->symbols('PLUGIN_LANGUAGE_SETTINGS'),
        'line2' => 'Language updated successfully',
    };
}

# Set the mode and display the plugin output
sub setMode {
    my ($class, $client) = @_;
    $client->lines(\&lines);
    $client->update();
}

# Add the plugin to the menu
sub addMenu {
    return "PLUGINS";
}

# Define the functions for handling remote button events
sub initPlugin {
    my ($class) = @_;
    
    %functions = (
        'left'  => sub { my $client = shift; Slim::Buttons::Common::popModeRight($client); },
        'up'    => sub { my $client = shift; $client->bumpUp(); },
        'down'  => sub { my $client = shift; $client->bumpDown(); },
    );

    Slim::Buttons::Common::addSaver($class);  # Register screensaver if applicable
}

sub getFunctions {
    return \%functions;
}

# Execute the update_language function based on input from the UI
sub handleRequest {
    my ($request) = @_;
    my $client    = $request->client;
    my $language  = $request->getParam('language');

    if (defined $language) {
        update_language($language);
        setMode(__PACKAGE__, $client);
    } else {
            print STDERR "Error: Language parameter not provided.\n";

    }
}

1;
