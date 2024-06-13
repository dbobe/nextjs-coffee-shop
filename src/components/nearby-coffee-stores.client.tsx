"use client";
import useTrackLocation from "@/hooks/use-track-location";
import Banner from "./banner.client";
import { CoffeeStoreType } from "@/types";
import Card from "./card.server";
import { useEffect, useState } from "react";
import { fetchCoffeeStores } from "@/lib/coffee-stores";

export default function NearbyCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation();
  const [coffeeStores, setCoffeeStores] = useState([]);

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function coffeeStoresByLocaction() {
      if (longLat) {
        try {
          const limit = 10;
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          const results = await response.json();
          setCoffeeStores(results);
        } catch (error) {
          console.error(error);
        }
      }
    }
    coffeeStoresByLocaction();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}
      {coffeeStores.length > 0 && (
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Stores near me
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {coffeeStores.map((coffeeStore: CoffeeStoreType, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}?id=${idx}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
