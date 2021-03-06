import React, { Component } from "react";

// Pagination component to be reused in other components where pagination is needed.

/**
 *
 *@param {Event} event
 * @class Pagination
 * @extends {Component}
 */
class Pagination extends Component {
  static defaultProps = {
    nextPage: null,
    previousPage: null,
    pages: null,
    currentPage: null
  };

  changePage = event => {
    // preventing default link behaviour
    event.preventDefault();
    // do nothing if the selected page doesnot exist and is not a number
    if (Number.isNaN(Number(event.target.dataset.page))) {
      return;
    }
    // call the change page function if selected page exists
    this.props.changePage(Number(event.target.dataset.page));
  };

  /**
   * @returns {any} rendered items
   * @memberof Pagination
   */
  render() {
    const { pages, currentPage, nextPage, previousPage } = this.props;

    // generating the pages
    const totalpages = Array.from({ length: pages }).map((item, index) => (
      <li
        className={`page-item${index + 1 === currentPage ? " active" : ""}`}
        key={index}
      >
        <a
          className="page-link"
          href="!#"
          data-page={index + 1}
          onClick={this.changePage}
        >
          {index + 1}
        </a>
      </li>
    ));

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* if previous page, do nothing, else add disabled class */}
          <li className={`page-item${previousPage ? "" : " disabled"}`}>
            <a
              className="page-link"
              data-page={previousPage}
              onClick={this.changePage}
              href="!#"
              id="previous"
            >
              Previous
            </a>
          </li>
          {totalpages}
          {/* if next page, do nothing, else add disabled class */}
          <li className={`page-item${nextPage ? "" : " disabled"}`}>
            <a
              className="page-link mb-4"
              href="!#"
              data-page={nextPage}
              onClick={this.changePage}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
