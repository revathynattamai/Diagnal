# React + Vite

This is a React JS Workshop for DIAGNAL

# Design Requirement

1. Implementation is required only for the mobile portrait view, and there is no need to consider desktop or landscape dimensions.
2. The Grid component should always show three columns, even paddings, ensuring responsive behavior on various mobile resolutions.
3. There should be no visible scroll bars.

# Functional Requirements

1. The listing grid should have vertical scrolling enabled while restricting horizontal scrolling.
2. App must implement lazy loading of contents - image grid must load gradually as the user scrolls down. Data for the first page can be loaded during app load.
3. Client Side Search must be implemented by filtering the data that is already loaded in the UI (not by calling any API). Search results must be rendered on to the main view itself without refreshing/reloading the page or taking the user to a new page
