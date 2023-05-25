import React from 'react';
import { Link } from '@inertiajs/react';
import classNames from 'classnames';

interface PageLinkProps {
  active: boolean;
  label: string;
  url: string | null;
}

const PageLink: React.FC<PageLinkProps> = ({ active, label, url }) => {
  const className = classNames(
    [
      'mr-1 mb-1',
      'px-2 py-2',
      'border border-solid border-gray-300 rounded',
      'text-sm',
      'hover:bg-white',
      'focus:outline-none focus:border-gray-700 focus:text-gray-700',
    ],
    {
      'bg-white': active,
    }
  );
  return (
    <Link className={className} href={url ?? ''}>
      <span dangerouslySetInnerHTML={{ __html: label }}></span>
    </Link>
  );
};

interface PageInactiveProps {
  label: string;
}

const PageInactive: React.FC<PageInactiveProps> = ({ label }) => {
  const className = classNames('mr-1 mb-1 px-2 py-2 text-sm border rounded border-solid border-gray-300 text-gray');
  return <div className={className} dangerouslySetInnerHTML={{ __html: label }} />;
};

interface PaginationProps {
  links: { active: boolean; label: string; url: string | null }[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
  if (links.length === 3) return null;
  return (
    <div className='flex flex-wrap'>
      {links.map(({ active, label, url }) => {
        return url === null ? (
          <PageInactive key={label} label={label} />
        ) : (
          <PageLink key={label} label={label} active={active} url={url} />
        );
      })}
    </div>
  );
};

export default Pagination;
