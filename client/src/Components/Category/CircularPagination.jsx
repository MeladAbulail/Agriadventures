import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export function CircularPagination({ active, onPageChange, totalPages }) {
  const prev = () => {
    if (active === 1) return;

    onPageChange(active - 1);
  };

  const next = () => {
    if (active === totalPages) return;

    onPageChange(active + 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(Math.min(totalPages, 5))].map((_, index) => (
          <IconButton
            key={index}
            variant={active === index + 1 ? 'filled' : 'text'}
            color="gray"
            onClick={() => onPageChange(index + 1)}
            className="rounded-full"
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === totalPages}
      >
        Next <ArrowRightIcon strokeWidth={2} className="w-4 h-4" />
      </Button>
    </div>
  );
}