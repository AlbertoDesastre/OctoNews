import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <img src="/favicon.ico" alt="icon octonews" />
        <input type="search" placeholder="search" />
        <button className="settings" type="button">
          settings
        </button>
      </header>
      <main>
        <section className="carousel">
          <ul>
            <li>
              <p>category</p>
              <img src="/favicon.ico" alt="img category" />
            </li>
            <li>
              <p>category</p>
              <img src="/favicon.ico" alt="img category" />
            </li>
            <li>
              <p>category</p>
              <img src="/favicon.ico" alt="img category" />
            </li>
          </ul>
        </section>
        <div className="filterAndPost">
          <select name="filter" id="filter">
            <option>Most votes</option>
            <option>Recent</option>
          </select>
          <select name="filter-date" id="filter-date">
            <option>Today</option>
            <option>Yesterday</option>
          </select>
          <svg id="verticalLine">
            <line x1="20" y1="20" x2="20" y2="70"></line>
          </svg>
          <button type="button">+</button>
        </div>
        <section className="feed">
          <ul>
            <li className="news">
              <hr />
              <p className="author-news">Published by Gnomo 15 minutes ago</p>
              <p className="category-news">Category</p>
              <img className="img-news" src="/favicon.ico" alt="news img" />
              <p className="title-news">lorem ipsum colepsum tumatsu postrum</p>
              <p className="desc-news">
                lorem ipsum colepsum tumatsu postrumlorem ipsum colepsum tumatsu
                postrum lorem ipsum colepsum tumatsu postrum lorem ipsum
                colepsum tumatsu postrum lorem ipsum colepsum tumatsu postrum
                lorem ipsum colepsum tumatsu postrum lorem ipsum colepsum
                tumatsu postrum
              </p>
              <div className="actions-news">
                <button type="button">S</button>
                <button type="button">C</button>
                <button type="button">+1</button>
                <button type="button">-1</button>
              </div>
            </li>
            <li className="news">
              <hr />
              <p className="author-news">Published by Gnomo 15 minutes ago</p>
              <p className="category-news">Category</p>
              <img className="img-news" src="/favicon.ico" alt="news img" />
              <p className="title-news">lorem ipsum colepsum tumatsu postrum</p>
              <p className="desc-news">
                lorem ipsum colepsum tumatsu postrumlorem ipsum colepsum tumatsu
                postrum lorem ipsum colepsum tumatsu postrum lorem ipsum
                colepsum tumatsu postrum lorem ipsum colepsum tumatsu postrum
                lorem ipsum colepsum tumatsu postrum lorem ipsum colepsum
                tumatsu postrum
              </p>
              <div className="actions-news">
                <button type="button">S</button>
                <button type="button">C</button>
                <button type="button">+1</button>
                <button type="button">-1</button>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
