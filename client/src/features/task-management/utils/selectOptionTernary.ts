import { STATUS_META } from '../consts/status.shared';

export const STATUS_MAP: Record<string, { label: string; className: string }> =
  {
    erledigt: {
      label: STATUS_META.erledigt.label,
      className: STATUS_META.erledigt.className,
    },
    in_bearbeitung: {
      label: STATUS_META.in_bearbeitung.label,
      className: STATUS_META.in_bearbeitung.className,
    },
    offen: {
      label: STATUS_META.offen.label,
      className: STATUS_META.offen.className,
    },
  };
