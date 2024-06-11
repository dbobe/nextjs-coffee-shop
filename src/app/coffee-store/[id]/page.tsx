import { fetchCoffeeStore, fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData(id: string) {
  return await fetchCoffeeStore(id);
}

export async function generateStaticParams() {
  const coffeeStores = await fetchCoffeeStores();

  return coffeeStores.map((coffeeStore: CoffeeStoreType) => ({
    id: coffeeStore.id,
  }));
}

export default async function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;

  const coffeeStore = await getData(id);
  const { name = "", address = "", imgUrl = "" } = coffeeStore;

  console.log({ coffeeStore });
  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to Home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={740}
            height={360}
            alt={`${name} Image`}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px]"
          />
        </div>
        <div className="glass mt-12 flex-col rounded-lg p-4 lg:mt-48">
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/images/icons/places.svg"
                alt="places icon"
                width={24}
                height={24}
              />
              <p className="pl-2">{address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
