package Slim::Plugin::CapstoneSettings::BasicDisplay;


# Logitech Media Server Copyright 2001-2020 Logitech.
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License,
# version 2.

use strict;
use base qw(Slim::Web::Settings);

use Slim::Utils::Prefs;

my $prefs = preferences('server');

sub name {
    return Slim::Web::HTTP::CSRF->protectName('BASIC_DISPLAY_SETTINGS');
}

sub page {
    return Slim::Web::HTTP::CSRF->protectURI('plugins/CapstoneSettings/basicDisplay.html');
}

sub prefs {
    return ($prefs, qw(showArtist showYear itemsPerPage thumbSize));
}

sub handler {
	my ($class, $client, $paramRef, $pageSetup) = @_;

	return $class->SUPER::handler($client, $paramRef, $pageSetup);
}

1;

__END__
