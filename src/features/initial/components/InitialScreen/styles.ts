import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ff6b6b;
  display: grid;
  place-items: center;
`;

export const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.p.attrs({
  alt: "Random fact",
})`
  color: #ededed;
  max-width: 700px;
  margin-top: 2em;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
`;
