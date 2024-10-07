const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');


   
    
// Load the HTML file into the test environment
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('MediaLibraryManagement Settings (Behaviour settings)', () => {
    beforeEach(() => {
        document.body.innerHTML = html;  // Reset DOM before each test
        HTMLFormElement.prototype.requestSubmit = jest.fn();


    });

    
    afterEach(() => {
        // Clean up any mocks after each test
        jest.clearAllMocks();
      });

  test('renders the save button for artists', () => {
    const saveButton = screen.getByRole('button', { name: /Save How you Browse Artists/i });
    expect(saveButton).toBeInTheDocument();
  });


  test('triggers form submission on save button click for artists', () => {
    const saveButton = screen.getByRole('button', { name: /Save How you Browse Artists/i });
    
    // Mock the function to check if it was called
    const mockFunction = jest.fn();
    saveButton.onclick = mockFunction;

    expect(HTMLFormElement.prototype.requestSubmit).toHaveBeenCalled(); // Check if requestSubmit was called

  });
  

  test('renders the save button for release types', () => {
    const saveButton = screen.getByRole('button', { name: /Save Release Types for Albums/i });
    expect(saveButton).toBeInTheDocument();
  });

  test('renders the save button for group artist albums by release type', () => {
    const saveButton = screen.getByRole('button', { name: /Save Group Artist Albums By Release Type/i });
    expect(saveButton).toBeInTheDocument();
  });

  test('renders the save button for group discs', () => {
    const saveButton = screen.getByRole('button', { name: /Save Group Discs/i });
    expect(saveButton).toBeInTheDocument();
  });




  test('renders the noGenreFilterForm with expected elements', () => {

    const saveGenreFiltersButton = screen.getByRole('button', { name: /Save Genre Filters/i });
    expect(saveGenreFiltersButton).toBeInTheDocument();
  });

  test('renders the noRoleFilterForm with expected elements', () => {


    const saveRoleFiltersButton = screen.getByRole('button', { name: /Save Role Filters/i });
    expect(saveRoleFiltersButton).toBeInTheDocument();
  });

  test('renders the ageLimitForm with expected elements', () => {
    const ageLimitInput = screen.getByRole('textbox', { name: /Browse Age Limit/i });
    expect(ageLimitInput).toBeInTheDocument();

    const saveAgeLimitButton = screen.getByRole('button', { name: /Save Number Of Albums Displayed/i });
    expect(saveAgeLimitButton).toBeInTheDocument();
  });

  test('renders the groupDiscsForm with expected elements', () => {


    const saveGroupFilterButton = screen.getByRole('button', { name: /Save Group Discs/i });
    expect(saveGroupFilterButton).toBeInTheDocument();
  });

  test('renders the playlistPersistForm with expected elements', () => {


    const savePlaylistPersistenceButton = screen.getByRole('button', { name: /Save Playlist Persistence/i });
    expect(savePlaylistPersistenceButton).toBeInTheDocument();
  });

  test('renders the saveShuffledPlaylistForm with expected elements', () => {

    const saveShuffledPlaylistButton = screen.getByRole('button', { name: /Save Shuffled Playlist/i });
    expect(saveShuffledPlaylistButton).toBeInTheDocument();
  });

  test('renders the reshuffleOnRepeatForm with expected elements', () => {


    const saveReshuffleRepeatButton = screen.getByRole('button', { name: /Save Reshuffling On Repeat Setting/i });
    expect(saveReshuffleRepeatButton).toBeInTheDocument();
  });


});
