import { cn } from '@/lib/trycatch';
import React, { HTMLAttributes, ReactNode } from 'react';
import '../../../../../globals.css';

function Table({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex mt-5 w-full h-full flex-col flex-start border border-interactive-disabled-text bg-surface-page rounded-lg',
        className
      )}
    >
      {children}
    </div>
  );
}

function TableDivider() {
  return <div className="border-b border-interactive-disabled-text" />;
}

type TableHeaderProps = {
  children: ReactNode;
  className?: string;
};

function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <div
      className={cn(
        'px-2 flex w-full items-center gap-10 bg-transparent',
        className
      )}
    >
      {children}
    </div>
  );
}

function GrowingItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`flex grow py-5 items-center gap-10`, className)}>
      {children}
    </div>
  );
}

function Cell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`text-label-lg w-42.5 items-center`, className)}>
      {children}
    </div>
  );
}

function CellHolder({ children }: { children: ReactNode }) {
  return <div className="flex items-center  w-150">{children}</div>;
}

function ItemHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`flex  items-centerw-full`, className)}>{children}</div>
  );
}

type ItemsProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

function Items({ children, className, ...props }: ItemsProps) {
  return (
    <div
      className={cn(
        `flex items-center relative group py-4 rounded-2xl hover:bg-neutral-50`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Cell,
  CellHolder,
  GrowingItem,
  ItemHeader,
  Items,
  Table,
  TableDivider,
  TableHeader,
};
