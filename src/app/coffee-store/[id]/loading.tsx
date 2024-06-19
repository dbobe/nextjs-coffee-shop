import Image from "next/image";

export default function Loading() {
  return (
    <div className="px-72 pt-32 flex flex-row items-center justify-center min-h-screen">
      <Image
        src="/images/icons/loading-spinner.svg"
        alt="Loading"
        width={30}
        height={30}
        className="animate-spin mr-4"
      />
      <p className="text-2xl">Loading...</p>
    </div>
  );
}
