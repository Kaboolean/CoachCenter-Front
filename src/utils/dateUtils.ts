import { date } from 'quasar';

export function formatDate(dateStr?: string | null) {
  if (!dateStr) {
    return '';
  }
  return date.formatDate(dateStr, 'DD/MM/YYYY');
}
