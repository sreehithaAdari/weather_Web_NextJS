"use client";

import React from "react";
import { useGlobalContext, useGlobalContextUpdate } from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [history, setHistory] = React.useState<
    Array<{ name: string; state: string; country: string; lat: number; lon: number }>
  >([]);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
    setIsDialogOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(event);
    setError("");

    if (geoCodedList && geoCodedList.length === 0) {
      setError("Invalid city name entered");
    }
  };

  const addToHistory = (name: string, state: string, country: string, lat: number, lon: number) => {
    setHistory((prevHistory) => {
      const exists = prevHistory.some(
        (item) => item.name === name && item.state === state && item.country === country
      );

      if (exists) return prevHistory;

      const newHistory = [...prevHistory, { name, state, country, lat, lon }].slice(-5);
      return newHistory;
    });
  };

  const removeFromHistory = (index: number) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  return (
    <div className="search-btn">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
            onClick={() => setIsDialogOpen(true)}
          >
            <p className="text-sm text-muted-foreground">Search </p>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInputChange}
              placeholder="Search a place"
            />
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

              {error && <p className="text-red-500 px-2">{error}</p>}
              {geoCodedList?.length === 0 && !error && <p>Invalid place</p>}

              {geoCodedList &&
                geoCodedList.map((item, index) => {
                  const { country, state, name, lat, lon } = item;
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`py-3 px-2 text-sm rounded-sm cursor-default
                        ${hoveredIndex === index ? "bg-accent" : ""}
                      `}
                      onClick={() => {
                        addToHistory(name, state || '', country, lat, lon);
                        getClickedCoords(lat, lon);
                      }}
                    >
                      <p className="text">
                        {name}, {state && state + ","} {country}
                      </p>
                    </li>
                  );
                })}

              <p className="p-2 text-sm text-muted-foreground">History</p>

              {history.length === 0 && !error && <p>No history available</p>}
              {history.map((item, index) => (
                <li
                  key={index}
                  className="py-3 px-2 text-sm rounded-sm cursor-default flex justify-between items-center hover:bg-accent"
                  onClick={() => {
                    getClickedCoords(item.lat, item.lon);
                  }}
                >
                  <p className="text">
                    {item.name}, {item.state && item.state + ","} {item.country}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(index);
                    }}
                    className="ml-2 text-muted-foreground hover:text-red-500"
                    aria-label="Remove from history"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;
