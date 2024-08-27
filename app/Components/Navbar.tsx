"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContextUpdate } from "../context/globalContext";
import { MapPin } from "lucide-react"; // Location icon from lucide-react

function Navbar() {
  const { setActiveCityCoords } = useGlobalContextUpdate(); // Function to update coordinates
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleUseLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setActiveCityCoords([latitude, longitude]); // Set the coordinates for weather fetching
          setLocationError(null); // Clear any previous error
        },
        (error) => {
          console.error("Error obtaining location", error);
          setLocationError("Unable to retrieve your location. Please try again.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            onClick={handleUseLocation}
            variant="outline"
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Use location
          </Button>
        </div>
      </div>

      {/* Display error message if location retrieval fails */}
      {locationError && (
        <div className="error-message text-red-500 mt-2">
          {locationError}
        </div>
      )}
    </div>
  );
}

export default Navbar;
