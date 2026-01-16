import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [userData, setuserData] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=10`
    );
    setuserData(response.data);
  };

  useEffect(() => {
    getData();
  }, [page]);

  let printUserData = (
    <h3 className="text-sm text-gray-800">No data available!</h3>
  );

  if (userData.length > 0) {
    printUserData = userData.map((e, idx) => {
      return (
        <a key={idx} target="_blank" href={e.url}>
          <div className=" rounded-lg flex flex-col justify-center overflow-hidden h-full w-full">
            <img
              className="rounded h-50 hover:rounded-4xl object-cover transition-all duration-150 "
              src={e.download_url}
              alt=""
            />
            <h3>{e.author}</h3>
          </div>
        </a>
      );
    });
  }

  return (
    <div className="w-full bg-gray-100 font-mono p-8 text-neutral-800 flex flex-col justify-center items-center gap-4">
      <div className="flex flex-wrap justify-center items-center gap-4 p-2 w-[80%]">
        {printUserData}
      </div>

      <div className="gap-6 flex items-center justify-center mt-4">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1), getData();
            }
          }}
          className=" active:scale-85 cursor-pointer px-2 py-1 text-neutral-800 border-none font-semibold text-md bg-gray-300 transition-all duration-100 ease-in-out hover:scale-90 rounded-md"
        >
          Prev
        </button>
        <span className="text-md text-neutral-800 font-semibold">{page}</span>
        <button
          onClick={() => {
            setPage(page + 1), getData();
          }}
          className=" active:scale-85 cursor-pointer px-2 py-1 text-neutral-800 border-none font-semibold text-md bg-gray-300 transition-all duration-100 ease-in-out hover:scale-90 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
