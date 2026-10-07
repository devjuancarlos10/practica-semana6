import React, { createContext, useContext, useState } from 'react';
import { useUsers } from '../hooks/useUsers';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const usersHook = useUsers();
  const [labInspectorOpen, setLabInspectorOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activeSteps, setActiveSteps] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });
  const [navigationCounter, setNavigationCounter] = useState(1);

  const toggleStep = (stepNumber) => {
    setActiveSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const activateAllSteps = () => {
    setActiveSteps({ 1: true, 2: true, 3: true, 4: true, 5: true });
  };

  const deactivateAllSteps = () => {
    setActiveSteps({ 1: false, 2: false, 3: false, 4: false, 5: false });
  };

  return (
    <AppContext.Provider
      value={{
        ...usersHook,
        labInspectorOpen,
        setLabInspectorOpen,
        activeStep,
        setActiveStep,
        activeSteps,
        toggleStep,
        activateAllSteps,
        deactivateAllSteps,
        navigationCounter,
        incrementNav: () => setNavigationCounter((c) => c + 1)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};
