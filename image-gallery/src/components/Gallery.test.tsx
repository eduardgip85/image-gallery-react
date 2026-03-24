import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Gallery  from './Gallery';

describe('Gallery Component', () => {
        it('should render gallery title', () => {
           render(<Gallery />);
           const heading = screen.getByText('Image Gallery');
           expect(heading).toBeInTheDocument();
        });

        it("should render initial images", () => {
            render(<Gallery />);
            
            const images = screen.getAllByRole("img");
            
            expect(images.length).toBe(9);
        });

        it("should delete an image when clicking Delete button", async () => {
            const user = userEvent.setup();
            render(<Gallery />);
            
            // Agafa tots els articles
            let items = screen.getAllByRole("img");
            expect(items.length).toBe(9); // inicialment 9

            console.log(items[0])

            // Agafa el botó Delete del primer article
            const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];

            // Fes click al botó
            await user.click(deleteButton);
            items.pop()

            // Comprova que hi ha un element menys
            expect(items.length).toBe(8);
        });
 });