import React from 'react';

interface IContext {
  isOpenHamburger: boolean;
  setIsOpenHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HamburgerContext = React.createContext<IContext>(null as any);

export const HamburgerProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isOpenHamburger, setIsOpenHamburger] = React.useState<boolean>(false);

  const value = {
    isOpenHamburger,
    setIsOpenHamburger,
  };

  return (
    <HamburgerContext.Provider value={value}>
      {children}
    </HamburgerContext.Provider>
  );
};

export const useHamburgerContext = () => React.useContext(HamburgerContext);
