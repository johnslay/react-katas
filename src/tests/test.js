import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  prettyDOM
} from "react-testing-library";
import mockMovies from "./movies.json";
import App from "../katas/async/FINISH/App";

describe("testing api", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(cleanup);

  it("fecthes data from the url", async () => {
    const url = "https://ghibliapi.herokuapp.com/films";
    fetch.mockResponseOnce(JSON.stringify(mockMovies));

    const { getByText } = render(<App url={url} />);

    const [movies, descriptions, directors, relaseDates] = await waitForElement(
      () => [
        mockMovies.map(movie => getByText(movie.title)),
        mockMovies.map(movie => getByText(movie.description)),
        mockMovies.map(movie => getByText(movie.director)),
        mockMovies.map(movie => getByText(movie.release_date))
      ]
    );

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(url);

    expect(movies.length).toEqual(3);
    expect(descriptions.length).toEqual(3);
    expect(directors.length).toEqual(3);
    expect(relaseDates.length).toEqual(3);
  });
});
