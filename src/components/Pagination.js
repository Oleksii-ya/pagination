import React, { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({ numberPages, activePost, setActivePost }) => {

  const [paginationArr, setPaginationArr] = useState([]);

  useEffect(() => {
    if (numberPages === 0) {
      return;
    }

    if (numberPages < 8) {
      let arr = [];
      for (let i = 1; i <= numberPages; i++) {
        arr.push(i);
      }
      setPaginationArr(arr);
      return;
    }

    if (activePost < 6) {
      let arr = [1, 2, 3, 4, 5, "...", numberPages];
      setPaginationArr(arr);
      return;
    }

    if (numberPages - activePost < 5) {
      let arr = [
        1,
        "...",
        numberPages - 4,
        numberPages - 3,
        numberPages - 2,
        numberPages - 1,
        numberPages,
      ];
      setPaginationArr(arr);
      return;
    }

    if (numberPages - activePost > 4) {
      let arr = [
        1,
        "<<",
        activePost - 1,
        activePost,
        activePost + 1,
        ">>",
        numberPages,
      ];
      setPaginationArr(arr);
      return;
    }
  }, [numberPages, activePost]);

  function handlerClick(e) {
    if (!isNaN(+e.target.innerText)) {
      setActivePost(+e.target.innerText);
      return
    }
    if (activePost < 6) {
      setActivePost(6)
      return
    }
    if (numberPages - activePost < 5) {
      setActivePost(numberPages - 5)
      return
    }
    if (e.target.innerText === "<<") {
      setActivePost(activePost - 2)
      return
    }
    if (e.target.innerText === ">>") {
      setActivePost(activePost + 2)
      return
    }
  }

  return (
    <>
      <button
        className="prev pagination-item"
        onClick={() => {
          if (activePost > 1) setActivePost(activePost - 1);
        }}
      >
        Prev
      </button>

      {paginationArr.map((item, index) => {
        const active = activePost === item ? "active" : "";
        return (
          <button
            key={index}
            className={`pagination-item ${active}`}
            onClick={handlerClick}
          >
            {item}
          </button>
        );
      })}

      <button
        className="next pagination-item"
        onClick={() => {
          if (activePost < numberPages) setActivePost(activePost + 1);
        }}
      >
        Next
      </button>
    </>
  );
};

export default Pagination;
