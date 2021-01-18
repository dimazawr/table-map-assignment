import { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import styled from "styled-components";

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 300px;
  margin-top: 25px;
  margin-bottom: 55px;
  order: -1;

  @media (min-width: 1045px) {
    width: 40%;
    order: 1;
    margin-bottom: 0;
    margin-top: 105px;
  }
`;

export const Map = ({ mapData }) => {
  return (
    <StyledMapContainer center={[-31.854399, -4.221778]} zoom={1}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.map((address, i) => {
        return (
          <Fragment key={i}>
            <Marker
              position={[address.original.latitude, address.original.longitude]}
              key={address.originalbuildingNumber}
            >
              <Tooltip direction="right" offset={[-8, -2]} permanent>
                {address.original.streetName}
              </Tooltip>
            </Marker>
          </Fragment>
        );
      })}
    </StyledMapContainer>
  );
};
