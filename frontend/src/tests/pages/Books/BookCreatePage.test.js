import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import BookCreatePage from "main/pages/Books/BookCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/bookUtils', () => {
    return {
        __esModule: true,
        bookUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("BookCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /books on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "book": {
                id: 3,
                title: "The Hunger Games",
                author: "Suzanne Collins",
                description: "Children in a battle royale to the death.",
                genre: "Dystopian"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const titleInput = screen.getByLabelText("Title");
        expect(titleInput).toBeInTheDocument();

        const authorInput = screen.getByLabelText("Author");
        expect(authorInput).toBeInTheDocument();

        const descriptionInput = screen.getByLabelText("Description");
        expect(descriptionInput).toBeInTheDocument();

        const genreInput = screen.getByLabelText("Genre");
        expect(genreInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();
            
        await act(async () => {
            fireEvent.change(titleInput, { target: { value: 'The Hunger Games' } })
            fireEvent.change(authorInput, { target: { value: 'Suzanne Collins' } })
            fireEvent.change(descriptionInput, { target: { value: 'Children in a battle royale to the death.' } })
            fireEvent.change(genreInput, { target: { value: 'Dystopian' } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/books"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdBook: {"book":{"id":3,"title":"The Hunger Games","author":"Suzanne Collins","description":"Children in a battle royale to the death.","genre":"Dystopian"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


