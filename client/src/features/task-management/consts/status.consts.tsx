import { ArrowUpCircle, CheckCircle2, Circle } from 'lucide-react';
import { STATUS_META } from './status.shared';

export const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'erledigt':
      return (
        <CheckCircle2
          className={`h-4 w-4 ${STATUS_META.erledigt.iconClassName}`}
        />
      );
    case 'in_bearbeitung':
      return (
        <ArrowUpCircle
          className={`h-4 w-4 ${STATUS_META.in_bearbeitung.iconClassName}`}
        />
      );
    default:
      return (
        <Circle className={`h-4 w-4 ${STATUS_META.offen.iconClassName}`} />
      );
  }
};
