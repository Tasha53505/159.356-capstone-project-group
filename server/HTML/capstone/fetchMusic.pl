# #!/usr/bin/perl
# use strict;
# use warnings;
# use JSON;

# # Set up the music directory
# my $musicDirectory = 'server/HTML/capstone'; 
# opendir(my $dh, $musicDirectory) || die "Cannot open file directory: $!";

# # Read and filter the music files
# my @files;
# while (readdir $dh) {
#     next unless /\.(m4a|aif|dff|flac|ogg|wav|mp3)$/; # Regex pattern for file types
#     push @files, $_;
# }
# closedir $dh;

# # Generate HTML output manually
# my $html_output = '';
# foreach my $file (@files) {
#     my $title = $file;
#     my $item = $file;

#     $html_output .= qq{
#         <div id="$title">
#             <span class="songInfoTitle">
#                 $title: 
#             </span>
#             <span class="songInfoText">$item</span>
#         </div>
#     };
# }

# # Prepare the JSON response
# my %response = (
#     files => \@files,
#     log => "Music has been fetched. No Errors",
#     html_output => $html_output
# );
 
# # Print the JSON response
# print "Content-Type: application/json\n\n";
# print encode_json(\%response);


#!/usr/bin/perl
use strict;
use warnings;
use JSON;
use CGI qw(:standard);
use CGI::Carp qw(fatalsToBrowser);

# Print the HTTP header
print header('application/json');

# Mock data for demonstration purposes
my $playercount = 1; # Example: 1 player available
my $current_playlist_name = "Chill Vibes";
my $current_playlist_modified = 0; # 0 means not modified, 1 means modified
my $cansave = 1; # Example: 1 means saving is possible
my $playlist_items = [
    "Song A - Artist 1",
    "Song B - Artist 2",
    "Song C - Artist 3"
];
my $savePlaylistLink = "save_playlist.cgi";
my $downloadPlaylistLink = "download_playlist.cgi";
my $clearPlaylistLink = "clear_playlist.cgi";

# Build the data structure
my %data = (
    playercount => $playercount,
    current_playlist_name => $current_playlist_name,
    current_playlist_modified => $current_playlist_modified,
    cansave => $cansave,
    playlist_items => $playlist_items,
    savePlaylistLink => $savePlaylistLink,
    downloadPlaylistLink => $downloadPlaylistLink,
    clearPlaylistLink => $clearPlaylistLink,
);

# Convert the data structure to JSON
my $json = encode_json(\%data);

# Print the JSON response
print $json;
