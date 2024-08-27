This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# Weather App

## Project Overview

This is a Next.js-based responsive web application that provides detailed weather information using the OpenWeatherMap API. The app allows users to search for weather details of any location or use their current location to get real-time weather data. It provides comprehensive weather details such as temperature, humidity, pressure, wind speed, UV index, visibility, sunrise and sunset times, and a 5-day weather forecast. Additionally, it includes a map view for visualizing the searched location and maintains a session history of user-searched places for quick access.

## Features

- Real-time weather details based on user search or current location
- Detailed weather parameters: temperature, humidity, pressure, wind speed, UV index, visibility, sunrise, and sunset times
- 5-day weather forecast
- Interactive map for visualizing locations
- Session history to easily access recently searched locations

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14.x or above)
- npm (version 6.x or above

## API Usage Details

The application uses the OpenWeatherMap API to fetch various weather data. Below is a summary of the API endpoints used for each feature:

### 1. Current Weather Data

**Endpoint:**
- `GET https://api.openweathermap.org/data/2.5/weather

### 2. 5-Day Weather Forecast

**Endpoint:**
- `http://api.openweathermap.org/data/2.5/forecast`

### 3. Geocoding (City Search)

**Endpoint:**
- `http://api.openweathermap.org/geo/1.0/direct`

### 4. Air Pollution Data

**Endpoint:**
- `http://api.openweathermap.org/data/2.5/air_pollution`

### 5. UV Index Forecast

**Endpoint:**
- `https://api.open-meteo.com/v1/forecast`

### Approach
This project is built using Next.js, leveraging its server-side rendering (SSR) capabilities for optimal performance and SEO. The user interface is designed with React components and styled using TailwindCSS modules for modular and maintainable styling.

The application maintains user session history using local storage to store recent search queries. This provides a convenient way for users to access weather details of previously searched locations quickly. Axios is used to make API requests, and lodash's debouncing is applied to manage API call frequency efficiently, enhancing performance and preventing unnecessary requests.

The integration with OpenWeatherMap API is achieved through environment variables to ensure security and ease of configuration. Error handling and edge cases, such as missing data or network errors, are gracefully managed to provide a seamless user experience.
### Screenshots
![Screenshot 2024-08-27 183842](https://github.com/user-attachments/assets/90a6c274-33b4-4f6a-be9e-53108194dac1)

![Screenshot 2024-08-27 183926](https://github.com/user-attachments/assets/dc5c1ed3-7fa3-4e62-aec3-0473e539c1b4)

![Screenshot 2024-08-27 184036](https://github.com/user-attachments/assets/33bd4b85-b338-4f2c-85b6-eff54720218c)


![Screenshot 2024-08-27 184023](https://github.com/user-attachments/assets/6896c346-23d5-4cd4-9d72-d2f194be4138)





