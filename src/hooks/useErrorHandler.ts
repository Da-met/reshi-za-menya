'use client';

import { useCallback } from 'react';
import { handleError, AppError, ErrorCode } from '@/lib/error-handling';

export function useErrorHandler() {
  const handleApiError = useCallback((error: unknown, context: string) => {
    handleError(error, `API: ${context}`);
  }, []);

  const handleValidationError = useCallback((field: string, message: string) => {
    handleError(new AppError(
      `Validation error in ${field}: ${message}`,
      ErrorCode.VALIDATION_ERROR,
      `Пожалуйста, проверьте поле "${field}"`
    ), 'validation');
  }, []);

  const handleNetworkError = useCallback((error: unknown) => {
    handleError(error, 'network');
  }, []);




  return {
    handleApiError,
    handleValidationError,
    handleNetworkError,
  };
}