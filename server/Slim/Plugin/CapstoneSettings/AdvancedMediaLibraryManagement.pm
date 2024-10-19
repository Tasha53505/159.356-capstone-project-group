package Slim::Plugin::CapstoneSettings::AdvancedMediaLibraryManagement;


# Logitech Media Server Copyright 2001-2020 Logitech.
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License,
# version 2.

use strict;
use base qw(Slim::Web::Settings);

use Slim::Utils::Prefs;
use Slim::Utils::Strings qw(string);

my $prefs = preferences('server');

sub name {
	return Slim::Web::HTTP::CSRF->protectName('ADVANCED_MEDIALIBRARYMANAGEMENT_SETTINGS');
}

sub page {
	return Slim::Web::HTTP::CSRF->protectURI('plugins/CapstoneSettings/advancedMediaLibraryManagement.html');
}

sub prefs {
	return ($prefs, qw(variousArtistAutoIdentification useTPE2AsAlbumArtist variousArtistsString searchSubString ignoredarticles skipsentinel splitList));
}

sub handler {
	my ( $class, $client, $paramRef ) = @_;

	return $class->SUPER::handler( $client, $paramRef );
}


1;

__END__
