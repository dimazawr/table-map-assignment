import { useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import styled from "styled-components";
import { FilterInput } from "./FilterInput";

const StyledContainterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1045px) {
    width: 55%;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  border: 1px solid;
  margin-top: 20px;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #0390f4;
  color: white;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 30px;
  align-self: center;
`;

const StyledBtn = styled.button`
  width: 25%;
  font-size: 16px;
  border: none;
  background-color: #03a9f4;
  border-radius: 5%;
  font-family: inherit;

  @media (min-width: 498px) {
    width: 20%;
  }

  @media (min-width: 615px) {
    width: 15%;
  }
`;

export const DataGrid = ({ columns, data, setCurrentPage }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  const renderSortingArrows = (column) => {
    // adds sorting arrows
    return column.isSorted ? (
      column.isSortedDesc ? (
        <>&#9650;</>
      ) : (
        <>&#9660;</>
      )
    ) : null;
  };

  return (
    <StyledContainterDiv>
      <FilterInput filter={globalFilter} setFilter={setGlobalFilter} />

      <StyledTable {...getTableProps()} className="table-dark table-bordered">
        <thead>
          {headerGroups.map((headerGroup) => (
            <StyledTr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <StyledTh
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {renderSortingArrows(column)}
                </StyledTh>
              ))}
            </StyledTr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <StyledTr {...row.getRowProps()} key={i}>
                {row.cells.map((cell) => {
                  return (
                    <StyledTd {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </StyledTd>
                  );
                })}
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>

      <BtnBox>
        <StyledBtn onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous Page
        </StyledBtn>
        <StyledBtn onClick={() => nextPage()} disabled={!canNextPage}>
          Next Page
        </StyledBtn>
        <p>
          Page {pageIndex + 1} of {pageOptions.length}
        </p>
      </BtnBox>
    </StyledContainterDiv>
  );
};
