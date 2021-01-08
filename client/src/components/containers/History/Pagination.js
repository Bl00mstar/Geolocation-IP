import React, { useState } from 'react';

import PaginationButtons from './PaginationButtons';

export default function Pagination({ value }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage] = useState(3);

  const goToPage = (id) => {
    setCurrentPage(id);
  };

  const indexOfLastTodo = currentPage * itemsOnPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsOnPage;
  const currentTodos = value.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((text, index) => {
    return <p key={index}>{text}</p>;
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(value.length / itemsOnPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {renderTodos}
      <PaginationButtons
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        goToPage={goToPage}
      />
    </div>
  );
}
