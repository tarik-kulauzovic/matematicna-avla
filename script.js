document.addEventListener('DOMContentLoaded', () => {
    const searchOverlay = document.getElementById('search-overlay');
    const openSearchLink = document.getElementById('open-search-link');
    const mainContent = document.getElementById('main-content');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    const HIGHLIGHT_CLASS = 'highlighted-search-term';

    // --- Overlay Functions ---
    function openSearch() {
        searchOverlay.classList.add('active');
        mainContent.classList.add('blurry');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }

    window.closeSearch = function() {
        searchOverlay.classList.remove('active');
        mainContent.classList.remove('blurry');
        clearHighlights(mainContent); // Clear highlights when closing
    }

    // --- Highlighting Functions ---

    // 1. Function to remove any existing highlights
    function clearHighlights(container) {
        // Use a persistent backup to restore the original HTML content
        if (container.originalHTML) {
            container.innerHTML = container.originalHTML;
        }
        // If there's no backup, try to remove the highlight spans
        const highlightedElements = container.querySelectorAll(`.${HIGHLIGHT_CLASS}`);
        highlightedElements.forEach(span => {
            // Replace the span with its text content
            span.outerHTML = span.innerHTML;
        });
    }

    // 2. Function to perform the search and highlighting
    function searchAndHighlight() {
        const searchTerm = searchInput.value.trim();

        // 1. Clear previous highlights
        clearHighlights(mainContent);

        if (searchTerm.length === 0) {
            return; // Do nothing if search term is empty
        }

        // Create a backup of the original HTML content before we modify it
        // We exclude the search overlay itself from the backup
        if (!mainContent.originalHTML) {
             mainContent.originalHTML = mainContent.innerHTML;
        }

        // 2. Prepare for search (case-insensitive)
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        let totalMatches = 0;

        // 3. Recursive function to find and replace text nodes
        function walk(node) {
            // Skip nodes that should not be searched (like script or style tags)
            if (node.nodeType === 1 && /^(script|style|textarea|input|select|button)$/i.test(node.tagName)) {
                return;
            }

            // Text Node: Perform the replacement
            if (node.nodeType === 3) {
                const text = node.nodeValue;
                if (regex.test(text)) {
                    totalMatches += (text.match(regex) || []).length;
                    
                    // Create the highlighted span HTML structure
                    const newHtml = text.replace(regex, `<span class="${HIGHLIGHT_CLASS}">$1</span>`);
                    
                    // Create a temporary div to convert the HTML string into DOM elements
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newHtml;

                    // Insert the new nodes before the current text node and remove the old one
                    while (tempDiv.firstChild) {
                        node.parentNode.insertBefore(tempDiv.firstChild, node);
                    }
                    node.parentNode.removeChild(node);
                }
            } 
            // Element Node: Walk through its children
            else if (node.nodeType === 1) {
                // To avoid issues with live node lists, we iterate backward
                for (let i = node.childNodes.length - 1; i >= 0; i--) {
                    walk(node.childNodes[i]);
                }
            }
        }

        // Start the search from the main content container
        walk(mainContent);

        // 4. Scroll to the first match if any were found
        const firstMatch = document.querySelector(`.${HIGHLIGHT_CLASS}`);
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Optional: Show a message to the user about the number of matches
            console.log(`Found ${totalMatches} matches for "${searchTerm}"`);
        } else {
            console.log(`No matches found for "${searchTerm}"`);
        }

        // Close the search overlay after searching
        closeSearch(); 
    }

    // --- Event Listeners ---
    
    // 1. Search link in navbar
    openSearchLink.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
    });

    // 2. 'Išči' button click
    searchSubmit.addEventListener('click', searchAndHighlight);

    // 3. Pressing 'Enter' in the input field
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchAndHighlight();
        }
    });

    // 4. Cmd/Ctrl + K shortcut to open/close
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { 
            e.preventDefault();
            if (searchOverlay.classList.contains('active')) {
                closeSearch();
            } else {
                openSearch();
            }
        }

        // Close on 'Escape' key
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
});