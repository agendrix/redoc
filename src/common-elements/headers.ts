import styled, { css, extensionsHook } from '../styled-components';

const headerFontSize = {
  1: '2rem',
  2: '1.5rem',
  3: '1.25rem',
};

export const headerCommonMixin = level => css`
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-weight: ${({ theme }) => theme.typography.headings.fontWeight};
  font-size: ${headerFontSize[level]};
  line-height: ${({ theme }) => theme.typography.headings.lineHeight};
  margin-bottom: 0;
`;

export const H1 = styled.h1`
  ${headerCommonMixin(1)};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-top: 20px;

  ${extensionsHook('H1')};
`;

export const H2 = styled.h2`
  ${headerCommonMixin(2)};
  color: #f5a08c;
  margin-top: 10px;

  ${extensionsHook('H2')};
`;

export const H3 = styled.h3`
  ${headerCommonMixin(3)};
  color: #55585d;

  ${extensionsHook('H3')};
`;

export const RightPanelHeader = styled.h3`
  color: ${({ theme }) => theme.rightPanel.textColor};

  ${extensionsHook('RightPanelHeader')};
`;

export const UnderlinedHeader = styled.h5`
  border-bottom: 1px solid rgba(38, 50, 56, 0.3);
  margin: 1em 0 1em 0;
  color: rgba(38, 50, 56, 0.5);
  font-weight: normal;
  text-transform: uppercase;
  font-size: 0.929em;
  line-height: 20px;

  ${extensionsHook('UnderlinedHeader')};
`;
