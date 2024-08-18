#!/usr/bin/perl
use strict;
use warnings;
use JSON;

# Set up the music directory
my $musicDirectory = 'server/HTML/capstone'; 
opendir(my $dh, $musicDirectory) || die "Cannot open file directory: $!";

# Read and filter the music files
my @files;
while (readdir $dh) {
    next unless /\.(m4a|aif|dff|flac|ogg|wav|mp3)$/; # Regex pattern for file types
    push @files, $_;
}
closedir $dh;

# Generate HTML output manually
my $html_output = '';
foreach my $file (@files) {
    my $title = $file;
    my $item = $file;

    $html_output .= qq{
        <div id="$title">
            <span class="songInfoTitle">
                $title: 
            </span>
            <span class="songInfoText">$item</span>
        </div>
    };
}

# Prepare the JSON response
my %response = (
    files => \@files,
    log => "Music has been fetched. No Errors",
    html_output => $html_output
);
 
# Print the JSON response
print "Content-Type: application/json\n\n";
print encode_json(\%response);
