import * as React from 'react';
import styled from 'styled-components';

interface SeeMoreProps {
  children?: React.ReactNode;
  height: string;
}

export function SeeMore({ children }: SeeMoreProps): JSX.Element {
  const ref = React.createRef() as React.RefObject<HTMLDivElement>;

  return (
    <>
      <Container ref={ref} style={{ height: 'auto' }}>
        {children}
      </Container>
    </>
  );
}

const Container = styled.div`
  overflow-y: hidden;
`;
