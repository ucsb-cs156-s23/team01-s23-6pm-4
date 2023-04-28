import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import BookEditPage from "main/pages/Books/BookEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

const mockUpdate = jest.fn();
jest.mock('main/utils/bookUtils', () => {
    return {
        __esModule: true,
        bookUtils: {
            update: (_book) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    book: {
                        id: 3,
                        title: "Fahrenheit 451",
                        author: "Ray Bradbury",
                        description: "A story set in a dystopian society that burns books in order to control the thoughts of its citizens.",
                        genre: "Dystopian fiction"
                    }
                }
            }
        }
    }
});


describe("BookEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("BookForm-title")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Fahrenheit 451')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Ray Bradbury')).toBeInTheDocument();
        expect(screen.getByDisplayValue('A story set in a dystopian society that burns books in order to control the thoughts of its citizens.')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Dystopian fiction')).toBeInTheDocument();
    });

    test("redirects to /books on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "book": {
                id: 3,
                title: "It Ends with Us",
                author: "Colleen Hoover",
                description: "A story about a young woman from an abusive home who struggles to find her way in the world without recreating the patterns of violence from her youth.",
                genre: "Romance"


            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookEditPage />
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

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(titleInput, { target: { value: 'It Ends with Us' } })
            fireEvent.change(authorInput, { target: { value: 'Colleen Hoover' } })
            fireEvent.change(descriptionInput, { target: { value: 'A story about a young woman from an abusive home who struggles to find her way in the world without recreating the patterns of violence from her youth.' } })
            fireEvent.change(genreInput, { target: { value: 'Romance' } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/books"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedBook: {"book":{"id":3,"title":"It Ends with Us","author":"Colleen Hoover","description":"A story about a young woman from an abusive home who struggles to find her way in the world without recreating the patterns of violence from her youth.","genre":"Romance"}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});

