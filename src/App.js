import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchMapData } from "./api";
import { DataGrid } from "./components/DataGrid";
import { Map } from "./components/Map";

const StyledContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;

  @media (min-width: 1045px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledParagraph = styled.p`
  margin: 200px;
  font-size: 20px;
`;

function App() {
  const [currentPage, setCurrentPage] = useState([]);

  const { data, error, isLoading, isError } = useQuery(
    "mapData",
    fetchMapData,
    {
      cacheTime: 1000 * 60 * 30,
      staleTime: 1000 * 60 * 30,
    }
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: "Street",
        accessor: "street",
        disableGlobalFilter: true,
      },
      {
        Header: "Street Name",
        accessor: "streetName",
      },
      {
        Header: "Building Number",
        accessor: "buildingNumber",
        disableGlobalFilter: true,
      },
      {
        Header: "City",
        accessor: "city",
        disableGlobalFilter: true,
      },
      {
        Header: "Zipcode",
        accessor: "zipcode",
        disableGlobalFilter: true,
      },
      {
        Header: "Country",
        accessor: "country",
        disableGlobalFilter: true,
      },
      {
        Header: "County code",
        accessor: "county_code",
        disableGlobalFilter: true,
      },
    ],
    []
  );

  if (isLoading) {
    return <StyledParagraph>Loading...</StyledParagraph>;
  }

  if (isError) {
    return <StyledParagraph>{error}</StyledParagraph>;
  }

  return (
    <StyledContainerDiv>
      <DataGrid
        columns={tableColumns}
        data={data.data}
        setCurrentPage={setCurrentPage}
      />
      <Map mapData={currentPage} />
    </StyledContainerDiv>
  );
}

export default App;
