# SearchSpace 2.0

SearchSpace 2.0 is the modern, full-stack evolution of a previous algorithm visualizer project. The original project, built in Python, focused heavily on visualizing search concepts related to Artificial Intelligence and Machine Learning (AI/ML). You can find the original Python-based AI/ML algorithm visualizer in the [Search-Space repository](https://github.com/Nightwing-007/Search-Space).

This current version (2.0) expands upon those foundational concepts by providing a highly interactive, web-based educational platform for students, developers, and computer science enthusiasts to observe how data structures and algorithms are manipulated in real-time.

By separating the algorithmic logic into a deterministic backend engine and rendering the state changes on a dynamic frontend, the system ensures accurate visualizations of complex operations, including array manipulations, cycle sorts, binary searches, and bitwise operations.

## Key Features

*   **HTML5 Canvas Rendering:** Transitions standard DOM-based visualizations to a high-performance Canvas API engine for silky smooth animations and beautiful gradient styling, even with large data sets.
*   **"Predict the Step" Quiz Mode:** A built-in gamification module. Users can pause execution and try to predict exactly which element will be manipulated next by clicking on the Canvas. Live score tracking is provided.
*   **Live Pseudocode Tracking:** Integrated with `react-syntax-highlighter`, providing a real-time view of the algorithm's code. The system highlights the precise line currently executing in the backend engine.
*   **Real-time Analytics:** A live telemetry panel streaming mathematical metrics directly from the backend, including Time Complexity, Comparisons So Far, and Array Writes So Far.

## Architecture

The project is structured as a modern full-stack application:

*   **Backend:** Java 17+, Spring Boot 3, Spring Data JPA. Acts as the mathematical engine that processes the initial state and returns a deterministic array of frames representing the algorithm's execution steps.
*   **Frontend:** React (Vite), Tailwind CSS. Responsible for rendering the algorithm frames with a modern, glassmorphic UI, providing playback controls (play, pause, step forward/backward), and managing animation speeds.
*   **Database:** MySQL. Designed to persist user data and execution history (schema provided).

## Prerequisites

Ensure you have the following installed on your local development environment:

*   Java Development Kit (JDK) 17 or higher
*   Maven 3.8+
*   Node.js 18+ and npm
*   MySQL Server 8.0+

## Installation and Setup

### 1. Database Configuration

1.  Start your local MySQL server.
2.  Execute the provided `schema.sql` file at the root of the project to initialize the `algorithm_visualizer` database and its associated tables.
3.  By default, the backend expects the database credentials to be `root` with the password `password`. You can modify these credentials in `backend/src/main/resources/application.properties` or by setting up a `.env` file based on the provided `.env.example`.

### 2. Backend Setup (Spring Boot)

1.  Open a terminal and navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Run the application using the Maven wrapper or your local Maven installation:
    ```bash
    mvn spring-boot:run
    ```
3.  The Spring Boot server will initialize and listen on `http://localhost:8080`.

### 3. Frontend Setup (React/Vite)

1.  Open a new terminal session and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install the required Node dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
4.  The application UI will be accessible at `http://localhost:5173`.

## Usage Instructions

1.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173` or `http://localhost:5174`).
2.  Select an algorithm from the dropdown menu (e.g., Cycle Sort, Binary Search).
3.  Provide a comma-separated list of integers as the input array. For search algorithms, specify the target value.
4.  Click "Generate Visualization" to fetch the deterministic steps from the backend.
5.  Use the playback controls at the bottom of the screen to play, pause, step through, or adjust the speed of the visualization.
6.  **Quiz Mode**: Toggle the "Predict the Step (Quiz)" switch in the controls panel. Once active, the animation halts, and you must click the correct bar on the canvas that will be manipulated in the very next algorithmic step to earn points.
7.  **Analytics & Pseudocode**: Observe the live code panel to understand the algorithm's structure and watch the analytics panel to see the efficiency (comparisons and writes) in real-time.
