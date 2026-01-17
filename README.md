# DriveNet Intelligence - Frontend

The futuristic user interface for the DriveNet Intelligence vehicle analysis system. Built with Next.js and styled for a premium, high-tech aesthetic.

## Features

-   **Analysis Module**: Interactive interface for uploading vehicle images and specifying physical metadata.
-   **Real-time Feedback**: Dynamic animations and status updates during model inference.
-   **Futuristic UI/UX**: Custom cursor, glassmorphism effects, and smooth Framer Motion animations.
-   **Responsive Design**: Optimized for various screen sizes.

## Tech Stack

-   **Next.js 14**: React framework for production.
-   **TypeScript**: Type-safe code.
-   **Tailwind CSS**: Utility-first styling.
-   **Framer Motion**: Production-ready animation library.

## Setup

1.  **Clone the repository** (if separate) or navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root of `frontend`:
    ```env
    NEXT_PUBLIC_API_URL="http://localhost:8000"
    ```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Integration

Ensure the **DriveNet Intelligence Model** API is running on port 8000 (default) for the analysis feature to function.
