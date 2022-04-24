import moment from 'moment';

export function formatDate(date: string): string {
  return moment(date).format('MMM d, YYYY @ HH:mm');
}
