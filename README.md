# Hoya Grand Prize Random Name Picker

A premium, cyber-themed random name picker web application designed for the Hoya Carbon Neutral Event 2025.

## Features

-   **Excel Parsing**: Upload `.xlsx` or `.xls` files to load participant data.
-   **Hoya Surgical Optics Theme**: Custom "Neon Hoya Blue" (#0057B8, #4C9EFF) aesthetic.
-   **Cyber Visuals**:
    -   Matrix Digital Rain effect with integrated participant names.
    -   3D Floating Hexagon Tunnel effect with Factory names (HOGT, HECT, HSOT, HO, GDC).
    -   Glitch text effects and chromatic aberration.
-   **Smart Filtering**:
    -   Factory dropdown filter (HOGT, HECT, HSOT, ALL).
    -   "Includes" logic for flexible matching (e.g., "HOGT -ประจำ HO" matches "HOGT").
    -   Merges "GDC" into "HSOT" logic automatically.
-   **Suspenseful Reveal**: 10-15 second randomized digital reveal animation.

## How to Run

1.  **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2.  **Installation**:
    ```bash
    npm install
    ```
3.  **Development Server**:
    ```bash
    npm run dev
    ```
    Open the local URL (usually `http://localhost:5173`) in your browser.
4.  **Production Build**:
    ```bash
    npm run build
    npm run preview
    ```

## Usage

1.  Click **Upload Excel File** and select your participant list.
    -   *Format*: Must contain Columns A, C, D (Name/Details) and Column H (Factory/Site).
2.  Select a specific Factory from the dropdown or keep it as "ALL FACTORIES".
3.  Click **REVEAL WINNER**.
4.  Wait for the cyber animation to complete (approx 10-15s).
5.  Celebrate with the winner!

## Technologies

-   Vite
-   Vanilla JavaScript
-   CSS3 (Variables, Animations, Flexbox)
-   SheetJS (xlsx) for file parsing
