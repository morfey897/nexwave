"use client";
import withModal, { ModalType } from "@/views/Modal";

const ModalContent = ({ onDismiss }: ModalType) => {
  return (
    <div className="m-auto sm:w-full sm:max-w-sm overflow-hidden px-4 pt-5 pb-4 sm:my-8 sm:p-6 bg-white rounded-lg shadow-xl border dark:border-gray-600 dark:bg-gray-900">
      <h3
        className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
        id="modal-title"
      >
        Invite your team
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Your new project has been created. Invite your team to collaborate on
        this project.
      </p>

      <form className="mt-4" action="#">
        <label className="text-sm text-gray-700 dark:text-gray-200">
          Email address
        </label>

        <label className="block mt-3">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user@email.xyz"
            value="devdhaif@gmail.com"
            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </label>

        <label className="block mt-3">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user@email.xyz"
            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </label>

        <label className="block mt-3">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user@email.xyz"
            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
          />
        </label>

        <button
          type="button"
          className="mt-2 flex items-center rounded py-1.5 px-2 text-sm text-blue-600 transition-colors duration-300 hover:text-blue-400 focus:outline-none dark:text-blue-400 dark:hover:text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>

          <span className="mx-2">Add another</span>
        </button>

        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
          <button
            onClick={onDismiss}
            type="button"
            className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
          >
            Cancel
          </button>

          <button
            type="button"
            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          >
            Send invites
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Page() {
  const Modal = withModal(ModalContent);

  return <Modal />;
}
