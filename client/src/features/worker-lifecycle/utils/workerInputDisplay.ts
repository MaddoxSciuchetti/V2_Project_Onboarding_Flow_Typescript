import { UpdatePayload } from '@/features/task-management/types/index.types';
import { WorkerInfoItem } from '../consts/worker-info.consts';
import { formatDate } from './dateCalculation';

export const isDateField = (item: WorkerInfoItem) =>
  item.schemaKey === 'geburtsdatum' ||
  item.schemaKey === 'eintrittsdatum' ||
  item.schemaKey === 'austrittsdatum';

export const getPendingValue = (
  item: WorkerInfoItem,
  variables?: UpdatePayload
) => (item.schemaKey ? String(variables?.[item.schemaKey] ?? '') : '');

export const getPendingDisplayValue = (
  item: WorkerInfoItem,
  variables?: UpdatePayload
) => {
  const pendingValue = getPendingValue(item, variables);

  if (!pendingValue) return '';

  return isDateField(item) ? formatDate(pendingValue) : pendingValue;
};

export const getDisplayValue = (item: WorkerInfoItem) =>
  isDateField(item)
    ? formatDate(String(item.value || ''))
    : (item.value ?? '-');

export const getPlaceholderValue = (
  item: WorkerInfoItem,
  variables?: UpdatePayload
) => {
  const pendingValue = getPendingValue(item, variables);

  if (!isDateField(item)) {
    return pendingValue || String(item.value ?? '');
  }

  if (pendingValue) {
    return formatDate(pendingValue);
  }

  return item.value ? formatDate(String(item.value)) : '';
};

export const getInputValueForActivation = (item: WorkerInfoItem) =>
  isDateField(item)
    ? item.value
      ? formatDate(String(item.value))
      : ''
    : String(item.value);
