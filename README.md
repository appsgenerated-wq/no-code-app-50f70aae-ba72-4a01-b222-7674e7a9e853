# FoodApp - A Manifest-Powered Application

This is a full-stack food discovery application built entirely with React and Manifest. It allows users to browse restaurants, and for users with a 'chef' role, to add and manage their own restaurant listings.

## Core Features

*   **User Authentication**: Secure user signup and login handled by Manifest's `authenticable` feature.
*   **Role-Based Access**: Distinct roles (`diner`, `chef`, `admin`) with different permissions managed by Manifest policies.
*   **Restaurant Listings**: Publicly viewable restaurant profiles with details like cuisine and description.
*   **Restaurant Management**: Authenticated 'chef' users can create their own restaurant listings.
*   **Dynamic Frontend**: A responsive React application built with Tailwind CSS for styling.
*   **Direct Backend Integration**: All backend operations are performed using the `@mnfst/sdk`, with no custom API layers.

## Tech Stack

*   **Backend**: Manifest
*   **Frontend**: React
*   **Styling**: Tailwind CSS
*   **SDK**: `@mnfst/sdk`

## Getting Started

### Prerequisites

*   Node.js and npm/yarn installed.
*   A running Manifest backend instance.

### Setup

1.  **Clone the repository**

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of your project and add the URL and App ID of your Manifest backend:
    ```
    VITE_BACKEND_URL=your-manifest-backend-url
    VITE_APP_ID=your-manifest-app-id
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Demo Credentials

You can use the following credentials to test the application:

*   **Diner Account**: 
    *   Email: `diner@demo.com`
    *   Password: `password`
*   **Chef Account**: 
    *   Email: `chef@demo.com`
    *   Password: `password`

## Admin Panel

Access the auto-generated admin panel to manage all data directly:

*   **URL**: `${config.BACKEND_URL}/admin`
*   **Admin Email**: `admin@manifest.build`
*   **Admin Password**: `admin`
