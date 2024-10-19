package Slim::Plugin::CapstoneSettings::BasicLanguage;


# Logitech Media Server Copyright 2001-2020 Logitech.
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License,
# version 2.

use strict;
use base qw(Slim::Web::Settings);

use Slim::Utils::Log;
use Slim::Utils::Prefs;

my $prefs = preferences('server');
my $log = logger('scan.scanner');

sub name {
	return Slim::Web::HTTP::CSRF->protectName('BASIC_LANGUAGE_SETTINGS');
}

sub page {
	return (Slim::Web::HTTP::CSRF->protectURI('plugins/CapstoneSettings/basicLanguage.html'));
}

sub prefs {
	return ($prefs, qw(language) );
}

sub handler {
	my ($class, $client, $paramRef) = @_;

	$paramRef->{'newVersion'}  = $::newVersion;
	$paramRef->{'languageoptions'} = Slim::Utils::Strings::languageOptions();

	return $class->SUPER::handler($client, $paramRef);
}

1;

__END__
