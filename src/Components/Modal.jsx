import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
// 3.12

export default function Modal({ prodId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let data = {
      userEmail: email,
      prodId: prodId,
    };

    axios
      .post("http://localhost:3000/product/addEmail", data)
      .then((response) => {
        console.log(response);
        setMessage("");
        setEmail("");
        setIsSubmitting(false);
        closeModal();
      })
      .catch((err) => {
        setMessage(err?.response?.data.message);
        setIsSubmitting(false);
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="mx-16 mt-4 rounded-full bg-black text-white flex justify-center py-2 hover:bg-slate-800 hover:cursor-pointer"
        onClick={openModal}
      >
        <button type="button" className="mx-auto text-xl text-white">
          T R A C K
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-700 my-1"
                  >
                    <div className="flex justify-between">
                      <BookmarksIcon />
                      <CloseIcon
                        className="hover:cursor-pointer"
                        onClick={closeModal}
                      />
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-700">
                      Get the latest price update about your favorite product
                      right into your inbox
                    </p>
                  </div>
                  <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-400"
                    >
                      Email Address
                    </label>
                    <div className="flex flex-nowrap">
                      <EmailIcon className="text-sm m-1 text-gray-500" />
                      <input
                        required
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email Address"
                        className="w-full px-1"
                      ></input>
                    </div>
                    <div className="text-xs text-red">
                      <p>{message}</p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {isSubmitting ? "Submitting..." : "Track"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
