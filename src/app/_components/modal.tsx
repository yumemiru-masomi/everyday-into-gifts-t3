"use client";

import { useState } from "react";

type props = {
  data: {
    totalLength: number;
  };
};

export function Modal(props: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center">
      <div className="justify-cente container flex flex-col items-center">
        <p className="text-7xl">
          {props.data?.totalLength?.toLocaleString()}
          <span className="text-3xl">円</span>
        </p>
        <button
          className="mt-4 rounded-full bg-red-500 px-6 py-2 text-white"
          onClick={openModal}
        >
          ご褒美に使っちゃおう！
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8 text-center">
            <p className="mb-4 text-lg text-black">
              本当に使ってもいいですか？
            </p>
            <p className="pb-4 text-5xl text-black">
              {props.data?.totalLength?.toLocaleString()}
              <span className="text-3xl text-black">円</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="rounded-full bg-red-500 px-6 py-2 text-white"
                onClick={() => {
                  // ここに「使っちゃう」ボタンを押したら金額をリセットする処理を書く
                  setIsModalOpen(false);
                }}
              >
                使っちゃう！
              </button>
              <button
                className="rounded-full bg-gray-500 px-6 py-2 text-white"
                onClick={closeModal}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
