import { render, screen } from "@testing-library/react";
import BookDetailsPage from "main/pages/Books/BookDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

jest.mock('main/utils/bookUtils', () => {
    return {
        __esModule: true,
        bookUtils: {
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

describe("BookDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <BookDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("Fahrenheit 451")).toBeInTheDocument();
        expect(screen.getByText("Ray Bradbury")).toBeInTheDocument();
        expect(screen.getByText("A story set in a dystopian society that burns books in order to control the thoughts of its citizens.")).toBeInTheDocument();
        expect(screen.getByText("Dystopian fiction")).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});


