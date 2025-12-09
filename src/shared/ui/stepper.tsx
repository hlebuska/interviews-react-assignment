import { Button } from '@mui/material';
import { useStepper } from '../hooks/useStepper';
import { StepperPage } from '../model/types';

export interface StepperProps {
  pages: StepperPage[];
  initialStep?: number;
  showStepIndicators?: boolean;
  showNavigation?: boolean;
  onStepChange?: (step: number) => void;
  nextButtonLabel?: string;
  prevButtonLabel?: string;
  className?: string;
}

export const Stepper = ({
  pages,
  initialStep = 0,
  showStepIndicators = true,
  showNavigation = true,
  onStepChange,
  nextButtonLabel = 'Next',
  prevButtonLabel = 'Previous',
  className = '',
}: StepperProps) => {
  const {
    currentPage,
    currentStep,
    isFirstStep,
    isLastStep,
    nextPage,
    prevPage,
    goToStep,
    totalSteps,
  } = useStepper({ pages, initialStep });

  const handleNext = () => {
    nextPage();
    onStepChange?.(currentStep + 1);
  };

  const handlePrev = () => {
    prevPage();
    onStepChange?.(currentStep - 1);
  };

  const handleGoToStep = (step: number) => {
    goToStep(step);
    onStepChange?.(step);
  };

  return (
    <div className={`stepper ${className}`}>
      {showStepIndicators && (
        <div className="stepper-indicators" style={styles.indicators}>
          {pages.map((page, index) => (
            <div
              key={page.id}
              className={`stepper-indicator ${
                index === currentStep ? 'active' : ''
              } ${index < currentStep ? 'completed' : ''}`}
              style={{
                ...styles.indicator,
                ...(index === currentStep ? styles.activeIndicator : {}),
                ...(index < currentStep ? styles.completedIndicator : {}),
              }}
              onClick={() => handleGoToStep(index)}
            >
              <div
                style={{
                  ...styles.indicatorCircle,
                  ...(index === currentStep
                    ? styles.activeIndicatorCircle
                    : {}),
                  ...(index < currentStep
                    ? styles.completedIndicatorCircle
                    : {}),
                }}
              >
                {index + 1}
              </div>
              <span style={styles.indicatorLabel}>{page.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="stepper-content" style={styles.content}>
        {currentPage.content}
      </div>

      {showNavigation && (
        <div className="stepper-navigation" style={styles.navigation}>
          <Button
            onClick={handlePrev}
            disabled={isFirstStep}
            className="stepper-prev-button"
          >
            {prevButtonLabel}
          </Button>

          <div style={styles.stepCounter}>
            Step {currentStep + 1} of {totalSteps}
          </div>

          <Button
            onClick={handleNext}
            disabled={isLastStep}

            className="stepper-next-button"
          >
            {nextButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

const styles = {
  indicators: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    gap: '1rem',
  },
  indicator: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    flex: 1,
  },
  activeIndicator: {
    fontWeight: 'bold',
  },
  completedIndicator: {
    opacity: 0.7,
  },
  indicatorCircle: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ccc',
    backgroundColor: '#fff',
    color: '#666',
  },
  activeIndicatorCircle: {
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  completedIndicatorCircle: {
    borderColor: '#28a745',
    backgroundColor: '#28a745',
    color: '#fff',
  },
  indicatorLabel: {
    fontSize: '0.875rem',
    textAlign: 'center' as const,
  },
  content: {
    minHeight: '300px',
    padding: '1rem',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
    gap: '1rem',
  },
  stepCounter: {
    fontSize: '0.875rem',
    color: '#666',
  },
};
