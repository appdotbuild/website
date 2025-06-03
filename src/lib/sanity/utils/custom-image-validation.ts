import { getExtension, getImageDimensions } from '@sanity/asset-utils';
import { ImageValue, ValidationContext } from 'sanity';

export const customImageValidation = () => {
  let allowedTypes: string[] = [];
  let requiredDimensions: { width: number; height: number } | null = null;
  let expectedAspectRatio: number | null = null;
  let tolerance: number = 0.01; // 1% tolerance

  const validator = (value: ImageValue | undefined, context?: ValidationContext) => {
    const isRequired = context?.type?.options?.required || false;

    if (!isRequired && !value) {
      return true;
    }

    if (!value || !value?.asset?._ref) {
      return 'Image is required';
    }

    const filetype = getExtension(value.asset._ref);

    if (allowedTypes.length > 0 && !allowedTypes.includes(filetype)) {
      return `Image must be one of: ${allowedTypes.join(', ')}`;
    }

    const { width, height } = getImageDimensions(value.asset._ref);

    if (requiredDimensions) {
      if (width < requiredDimensions.width || height < requiredDimensions.height) {
        return `Image must be at least ${requiredDimensions.width}x${requiredDimensions.height}px`;
      }
    }

    if (expectedAspectRatio) {
      const actualAspectRatio = width / height;
      if (Math.abs(actualAspectRatio - expectedAspectRatio) > tolerance) {
        return `Image aspect ratio must be approximately ${expectedAspectRatio.toFixed(2)}:1`;
      }
    }

    return true;
  };

  const methods = {
    type: (...types: string[]) => {
      allowedTypes = types;

      return methods;
    },
    dimensions: (width: number, height: number) => {
      requiredDimensions = { width, height };

      return methods;
    },
    aspectRatio: (ratio: number, tol: number = 0.01) => {
      expectedAspectRatio = ratio;
      tolerance = tol;

      return methods;
    },
    validate: validator,
  };

  return methods;
};
