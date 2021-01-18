import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 20px;
`;

const StyledInput = styled.input`
  width: 90%;
  box-sizing: border-box;
  background-color: #b2c5d2b0;
  margin-top: 5px;
  border: 1px solid darkgray;
  line-height: 2;

  &::placeholder {
    font-size: 18px;
    padding: 2px 5px;
  }
`;

export const FilterInput = ({ filter, setFilter }) => {
  return (
    <>
      <StyledLabel>
        Search: {""}
        <StyledInput
          type="text"
          name="searchField"
          id="searchField"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
        />
      </StyledLabel>
    </>
  );
};
