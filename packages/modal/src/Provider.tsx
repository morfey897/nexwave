import * as React from "react";
import { IModalWrapper } from "./types";
import useModalStore from "./store";
import styled from "styled-components";

const ProviderWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

/**
 * Modal Provider
 * @param param0 - Components: Record<string, React.FC<IModalWrapper>>
 * @param param1 - HTMLAttributes<HTMLDivElement>
 * @returns
 */
function Provider({
  Components,
  ...props
}: {
  Components: Record<string, React.FC<IModalWrapper>>;
} & React.HTMLAttributes<HTMLDivElement>) {
  const listOfModals = useModalStore((state) => state.modals);

  const memoChildren = React.useMemo(() => {
    return listOfModals.map((iModal) => {
      const Component = Components[iModal.name];
      return Component ? (
        <Component
          key={iModal.name}
          name={iModal.name}
          params={iModal.params}
        />
      ) : null;
    });
  }, [Components, listOfModals]);

  return <ProviderWrapper {...props}>{memoChildren}</ProviderWrapper>;
}

export default Provider;
