import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { getPaginationGenerator } from "@/lib/getPaginationGenerator";
import { Button } from "./ui/button";

type Props = {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  recordsPerPage: number;
  totalRecords: number;
};

const ArticlePagination = (props: Props) => {
  if (props.totalRecords <= props.recordsPerPage) {
    return null;
  }

  const totalNumPages = Math.ceil(props.totalRecords / props.recordsPerPage);

  function renderPagination(currPage: number, totalPage: number) {
    const paginationSchemantics = getPaginationGenerator(currPage, totalPage);
    return paginationSchemantics.map((schema, index) => {
      const isCurrPageActive = index + 1 === props.currentPage;

      // if number
      if (schema !== -1) {
        return (
          <PaginationItem key={index} onClick={() => props.setPage(index + 1)}>
            <PaginationLink isActive={isCurrPageActive}>
              {schema}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        // ellipsis
        return (
          <span key={index} className="inline-block align-middle">
            ...
          </span>
        );
      }
    });
  }

  //   return paginationSchemantics.map(
  //     (schema, index) => {
  //       const isCurrPageActive = index + 1 === props.currentPage;
  //       return (

  //         if (schema !== -1){

  //         }
  //         )

  //     }
  //   )
  // }
  // return (
  //   <PaginationItem key={index} onClick={() => props.setPage(index + 1)}>
  //     <PaginationLink isActive={isCurrPageActive}>
  //       {index + 1}
  //     </PaginationLink>
  //   </PaginationItem>
  // );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          onClick={() => props.setPage(Math.max(1, props.currentPage - 1))}
        >
          <PaginationPrevious />
        </PaginationItem>

        {renderPagination(props.currentPage, totalNumPages)}

        {/* <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem
          onClick={() =>
            props.setPage(Math.min(totalNumPages, props.currentPage + 1))
          }
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ArticlePagination;
