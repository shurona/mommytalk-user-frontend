import { createContext, useContext, useState, ReactNode } from 'react';
import type { LanguageLevel, ResponseLevel, OnboardingData } from '@/types/api';
import { LANGUAGE_LEVEL_MAP, RESPONSE_LEVEL_MAP } from '@/types/api';

interface OnboardingContextType {
  // State
  childName: string;
  languageLevel: LanguageLevel | null;
  responseLevel: ResponseLevel | null;

  // Actions
  setChildName: (name: string) => void;
  setLanguageLevel: (level: LanguageLevel) => void;
  setResponseLevel: (level: ResponseLevel) => void;
  resetOnboarding: () => void;
  getOnboardingData: () => OnboardingData | null;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [childName, setChildName] = useState<string>('');
  const [languageLevel, setLanguageLevel] = useState<LanguageLevel | null>(null);
  const [responseLevel, setResponseLevel] = useState<ResponseLevel | null>(null);

  const resetOnboarding = () => {
    setChildName('');
    setLanguageLevel(null);
    setResponseLevel(null);
  };

  const getOnboardingData = (): OnboardingData | null => {
    if (!childName || !languageLevel || !responseLevel) {
      return null;
    }

    return {
      childName,
      userLevel: LANGUAGE_LEVEL_MAP[languageLevel],
      childLevel: RESPONSE_LEVEL_MAP[responseLevel],
    };
  };

  return (
    <OnboardingContext.Provider
      value={{
        childName,
        languageLevel,
        responseLevel,
        setChildName,
        setLanguageLevel,
        setResponseLevel,
        resetOnboarding,
        getOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
