import { render, screen, waitFor } from "@testing-library/react";
import BookIndexPage from "main/pages/Books/BookIndexPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockDelete = jest.fn();
jest.mock('main/utils/bookUtils', () => {
    return {
        __esModule: true,
        bookUtils: {
            del: (id) => {
                return mockDelete(id);
            },
            get: () => {
                return {
                    nextId: 5,
                    books: [
                        {
                            "id": 3,
                            "title": "Fahrenheit 451",
                            "author": "Ray Bradbury",
                            "description": "A story set in a dystopian society that burns books in order to control the thoughts of its citizens.",
                            "genre": "Dystopian fiction",
                        },
                    ]
                }
            }
        }
    }
});


describe("BookIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders correct fields", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const createBookButton = screen.getByText("Create Book");
        expect(createBookButton).toBeInTheDocument();
        expect(createBookButton).toHaveAttribute("style", "float: right;");

        const title = screen.getByText("Fahrenheit 451");
        expect(title).toBeInTheDocument();

        const author = screen.getByText("Ray Bradbury");
        expect(author).toBeInTheDocument();

        const description = screen.getByText("A story set in a dystopian society that burns books in order to control the thoughts of its citizens.");
        expect(description).toBeInTheDocument();

        const genre = screen.getByText("Dystopian fiction");
        expect(genre).toBeInTheDocument();

        expect(screen.getByTestId("BookTable-cell-row-0-col-Delete-button")).toBeInTheDocument();
        expect(screen.getByTestId("BookTable-cell-row-0-col-Details-button")).toBeInTheDocument();
        expect(screen.getByTestId("BookTable-cell-row-0-col-Edit-button")).toBeInTheDocument();
    });

    test("delete button calls delete and reloads page", async () => {

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        const title = screen.getByText("Fahrenheit 451");
        expect(title).toBeInTheDocument();

        const author = screen.getByText("Ray Bradbury");
        expect(author).toBeInTheDocument();

        const description = screen.getByText("A story set in a dystopian society that burns books in order to control the thoughts of its citizens.");
        expect(description).toBeInTheDocument();

        const genre = screen.getByText("Dystopian fiction");
        expect(genre).toBeInTheDocument(); 

        const deleteButton = screen.getByTestId("BookTable-cell-row-0-col-Delete-button");
        expect(deleteButton).toBeInTheDocument();

        deleteButton.click();

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(3);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/books"));


        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage = `BookIndexPage deleteCallback: {"id":3,"title":"Fahrenheit 451","author":"Ray Bradbury","description":"A story set in a dystopian society that burns books in order to control the thoughts of its citizens.","genre":"Dystopian fiction"}`;
        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});

