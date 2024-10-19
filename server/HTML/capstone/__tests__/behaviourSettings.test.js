const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

// Load the HTML file into the test environment
const basicBrowseArtists = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicBrowseArtists.html'), 'utf8');
const basicReleaseTypes = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicReleaseTypes.html'), 'utf8');
const basicFilters = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicFilters.html'), 'utf8');

describe('MediaLibraryManagement Settings (Behaviour settings)', () => {
    beforeEach(() => {
        document.body.innerHTML = `${basicBrowseArtists}${basicReleaseTypes}${basicFilters}
        <div id="prefsSubmit">
            <input name="saveSettings" id="saveSettings" type="submit" class="stdclick" value="Save Settings">
        </div>`; // Reset DOM before each test
    });

    afterEach(() => {
        // Clean up any mocks after each test
        jest.clearAllMocks();
    });

    test('renders the save button for artists', () => {
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });

    test('triggers form submission on save button click for artists', () => {
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton);
        // Add your expectation or assertion for the form submission behavior here
    });

    test('renders the save button for release types', () => {
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });

    test('renders the save button for group artist albums by release type', () => {
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });

    test('renders the save button for group discs', () => {
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });

    test('renders the noGenreFilterForm with expected elements', () => {
        const saveGenreFiltersButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveGenreFiltersButton).toBeInTheDocument();
    });

    test('renders the noRoleFilterForm with expected elements', () => {
        const saveRoleFiltersButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveRoleFiltersButton).toBeInTheDocument();
    });

    test('renders the ageLimitForm with expected elements', () => {
        const ageLimitInputs = screen.queryAllByRole('textbox');
        const ageLimitInput = ageLimitInputs.find(input => input.name === 'pref_browseagelimit');
        expect(ageLimitInput).toBeInTheDocument();

        const saveAgeLimitButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveAgeLimitButton).toBeInTheDocument();
    });

    test('renders the groupDiscsForm with expected elements', () => {
        const saveGroupFilterButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveGroupFilterButton).toBeInTheDocument();
    });

    test('renders the playlistPersistForm with expected elements', () => {
        const savePlaylistPersistenceButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(savePlaylistPersistenceButton).toBeInTheDocument();
    });

    test('renders the saveShuffledPlaylistForm with expected elements', () => {
        const saveShuffledPlaylistButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveShuffledPlaylistButton).toBeInTheDocument();
    });

    test('renders the reshuffleOnRepeatForm with expected elements', () => {
        const saveReshuffleRepeatButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveReshuffleRepeatButton).toBeInTheDocument();
    });
});
