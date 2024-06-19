"use client";
import { upvoteAction } from "@/actions";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="min-w-[120px]"
    >
      {pending ? (
        <Image
          src="/images/icons/loading-spinner.svg"
          alt="Loading"
          width={30}
          height={30}
          className="animate-spin m-auto"
        />
      ) : (
        "Up vote!"
      )}
    </button>
  );
}

export default function Upvote({ voting, id }: { voting: number; id: string }) {
  const initialState = { id, voting };

  const [state, dispatch] = useFormState(upvoteAction, initialState);

  return (
    <form action={dispatch}>
      <div className="mb-6 flex">
        <Image
          src="/images/icons/star.svg"
          width={24}
          height={24}
          alt="star icon"
        />
        <p className="pl-2">{state?.voting}</p>
      </div>
      {/* <button onClick={handleOnClick}>{pending ? "..." : "Up vote!"}</button> */}
      <SubmitButton />
    </form>
  );
}
