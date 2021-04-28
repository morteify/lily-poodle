import styled from "styled-components";

const SectionTitleComponent = styled.h2`
  font-size: 1.75rem;
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SymbolTitle = styled(SectionTitleComponent)`
  color: #000;
`;

export const XSymbol = styled(SectionTitleComponent)`
  color: #ccc;
  margin-left: 0.25em;
  margin-right: 0.25em;
`;

export const IndicatorTitle = styled(SectionTitleComponent)`
  color: #2d9cdb;
`;

export const HelperSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 200;
  margin-bottom: 0.15em;
  color: #898c8f;
`;

export const ChartContent = styled.div`
  width: 100%;
  height: 100%;
`;
