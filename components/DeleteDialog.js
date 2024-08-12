import Link from "next/link";

export default function DeleteDialog({ isOpen, close }) {
  return (
    <dialog
      id="delete-dialog"
      className={`${isOpen ? "flex" : ""} bg-red-800/40 border-red-700/80 fixed inset-0 m-auto flex-col gap-6 items-start w-[70%] max-w-[300px] p-5 backdrop:bg-zinc-900/40 backdrop-blur-md border rounded-xl`}>
      <p className="text-base font-normal tracking-wide text-zinc-100">
        Are you sure you want to delete your account?
      </p>
      <div className="flex justify-end self-end gap-4">
        <Link
          href="/delete-account"
          className="w-20 text-center bg-red-600 hover:bg-red-700 text-zinc-100 font-medium tracking-wide rounded-lg px-[.5em] py-[.25em]">
          Yes
        </Link>
        <button
          className="w-20 text-center border border-zinc-100 text-zinc-100 hover:border-zinc-300 hover:text-zinc-300 font-medium tracking-wide rounded-lg px-[.5em] py-[.25em]"
          onClick={close}>
          No
        </button>
      </div>
    </dialog>
  );
}
