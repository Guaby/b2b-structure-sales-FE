import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
  User, 
  Home, 
  Sun, 
  Battery, 
  DollarSign, 
  Calendar,
  ArrowLeft,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import { CustomerInfoStep } from '../components/create-lead/CustomerInfoStep';
import { PropertyDetailsStep } from '../components/create-lead/PropertyDetailsStep';
import { SystemDetailsStep } from '../components/create-lead/SystemDetailsStep';
import { FinancingStep } from '../components/create-lead/FinancingStep';
import { ReviewStep } from '../components/create-lead/ReviewStep';

const steps = [
  { id: 'customer', title: 'Customer Information', icon: User },
  { id: 'property', title: 'Property Details', icon: Home },
  { id: 'system', title: 'System Configuration', icon: Sun },
  { id: 'financing', title: 'Financing Options', icon: DollarSign },
  { id: 'review', title: 'Review & Create', icon: Check }
];

export function CreateLead() {
  const [currentStep, setCurrentStep] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    customer: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    property: {
      monthlyBill: '',
      yearlyUsage: '',
      roofType: '',
      roofAge: '',
      shading: '',
      creditScore: '',
      propertyType: '',
      squareFootage: ''
    },
    system: {
      size: '',
      battery: false,
      monthlyProduction: '',
      price: '',
      savings: '',
      paybackPeriod: '',
      co2Reduction: '',
      roiPercentage: ''
    },
    financing: {
      provider: '',
      term: '',
      apr: '',
      monthlyPayment: '',
      downPayment: '',
      totalCost: ''
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((currentStep + 1) / steps.length) * 100}%`,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    // Animate step indicators
    stepsRef.current.forEach((step, index) => {
      if (step) {
        gsap.to(step, {
          scale: index === currentStep ? 1.1 : 1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }
    });

    // Animate content
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/projects');
    }
  };

  const handleSubmit = () => {
    // Here you would typically submit the data to your backend
    console.log('Form submitted:', formData);
    navigate('/projects');
  };

  const updateFormData = (step: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step as keyof typeof prev],
        ...data
      }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CustomerInfoStep
            data={formData.customer}
            onUpdate={(data) => updateFormData('customer', data)}
          />
        );
      case 1:
        return (
          <PropertyDetailsStep
            data={formData.property}
            onUpdate={(data) => updateFormData('property', data)}
          />
        );
      case 2:
        return (
          <SystemDetailsStep
            data={formData.system}
            onUpdate={(data) => updateFormData('system', data)}
          />
        );
      case 3:
        return (
          <FinancingStep
            data={formData.financing}
            onUpdate={(data) => updateFormData('financing', data)}
          />
        );
      case 4:
        return (
          <ReviewStep
            data={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Create New Lead
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-8 sm:mb-12">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-between mb-8 sm:mb-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={el => stepsRef.current[index] = el}
              className={`flex flex-col items-center ${
                index <= currentStep
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-blue-600 dark:bg-blue-500'
                  : index === currentStep
                  ? 'bg-blue-100 dark:bg-blue-500/10'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <step.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  index < currentStep
                    ? 'text-white'
                    : index === currentStep
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-600'
                }`} />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-medium hidden sm:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div 
          ref={contentRef}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Back
          </button>
          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Create Lead
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}