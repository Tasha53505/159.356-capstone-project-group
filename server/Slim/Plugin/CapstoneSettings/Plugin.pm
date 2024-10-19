package Slim::Plugin::CapstoneSettings::Plugin;

use strict;
use base qw(Slim::Plugin::Base);

use Slim::Utils::Prefs;
use Slim::Utils::Log;

my $log = logger('plugin.capstonesettings');


# Create a preferences object for the plugin
my $prefs = preferences('server');

if(main::WEBUI) {
    require Slim::Plugin::CapstoneSettings::BasicLanguage;
    require Slim::Plugin::CapstoneSettings::BasicMediaFolder;
    require Slim::Plugin::CapstoneSettings::BasicPlaylistDir;
    require Slim::Plugin::CapstoneSettings::BasicDisplay;
    require Slim::Plugin::CapstoneSettings::BasicFormatting;
    require Slim::Plugin::CapstoneSettings::BasicTiming;
    require Slim::Plugin::CapstoneSettings::BasicBrowseArtists;
    require Slim::Plugin::CapstoneSettings::BasicReleaseTypes;
    require Slim::Plugin::CapstoneSettings::BasicFilters;
    require Slim::Plugin::CapstoneSettings::BasicPlaylists;
}

# Subroutine to get the display name for the plugin in the menu
sub getDisplayName {
    return 'PLUGIN_CAPSTONE_SETTINGS';
}

sub getDisplayDescription {
    return 'PLUGIN_CAPSTONE_SETTINGS_DESC';
}

sub initPlugin {
    $log->info("Initializing Capstone Settings Plugin");
    if(main::WEBUI) {
        Slim::Plugin::CapstoneSettings::BasicLanguage->new;
        Slim::Plugin::CapstoneSettings::BasicMediaFolder->new;
        Slim::Plugin::CapstoneSettings::BasicPlaylistDir->new;
        Slim::Plugin::CapstoneSettings::BasicDisplay->new;
        Slim::Plugin::CapstoneSettings::BasicFormatting->new;
        Slim::Plugin::CapstoneSettings::BasicTiming->new;
        Slim::Plugin::CapstoneSettings::BasicBrowseArtists->new;
        Slim::Plugin::CapstoneSettings::BasicReleaseTypes->new;
        Slim::Plugin::CapstoneSettings::BasicFilters->new;
        Slim::Plugin::CapstoneSettings::BasicPlaylists->new;
    }
}

1;

__END__