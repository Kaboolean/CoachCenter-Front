import { date } from 'quasar';

export function formatDate(dateStr: string) {
  return date.formatDate(dateStr, 'DD/MM/YYYY');
}
