import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({ totalPages, currentPage, setPage }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setPage(currentPage + 1);
        }
    };

    return (
        <ButtonGroup spacing={4} mt={8} mb={4} display="flex" justifyContent="center">
            <Button
                onClick={handlePrevious}
                isDisabled={currentPage === 1}
            >
                Previous
            </Button>
            <Button
                onClick={handleNext}
                isDisabled={currentPage === totalPages}
            >
                Next
            </Button>
        </ButtonGroup>
    );
};

export default Pagination;
