import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItem} from '@docusaurus/plugin-content-docs';
import type {Props} from '@theme/DocCardList';

import docTopics from '@site/src/data/docTopics.generated.json';
import styles from './styles.module.css';

type Topic = {title: string; anchor: string};

type ResolvedRow = {
  key: string;
  label: string;
  href: string;
  dropdown: DropdownEntry[];
};

type DropdownEntry = {label: string; href: string};

function topicsForDocId(docId?: string): Topic[] {
  if (!docId) return [];
  return (docTopics as Record<string, Topic[]>)[docId] ?? [];
}

function resolveItem(item: PropSidebarItem): ResolvedRow | null {
  if (item.type === 'link') {
    const topics = topicsForDocId(item.docId);
    return {
      key: item.href,
      label: item.label,
      href: item.href,
      dropdown: topics.map((t) => ({
        label: t.title,
        href: `${item.href}#${t.anchor}`,
      })),
    };
  }

  if (item.type !== 'category') return null;

  const href = findFirstSidebarItemLink(item);
  if (!href) return null;

  const onlyChild: PropSidebarItem | null =
    item.items.length === 1 ? item.items[0] : null;
  if (onlyChild && onlyChild.type === 'link') {
    const topics = topicsForDocId(onlyChild.docId);
    return {
      key: href,
      label: item.label,
      href,
      dropdown: topics.map((t) => ({
        label: t.title,
        href: `${onlyChild.href}#${t.anchor}`,
      })),
    };
  }

  return {
    key: href,
    label: item.label,
    href,
    dropdown: item.items
      .map((child) => {
        if (child.type === 'html') return null;
        const childHref =
          child.type === 'link' ? child.href : findFirstSidebarItemLink(child);
        return childHref ? {label: child.label, href: childHref} : null;
      })
      .filter((v): v is DropdownEntry => v !== null),
  };
}

function DocListRow({row}: {row: ResolvedRow}) {
  if (row.dropdown.length === 0) {
    return (
      <li className={styles.row}>
        <Link to={row.href} className={styles.rowLink}>
          {row.label}
        </Link>
      </li>
    );
  }

  return (
    <li className={styles.row}>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <Link to={row.href} className={styles.rowLink}>
            {row.label}
          </Link>
        </summary>
        <ul className={styles.topicList}>
          {row.dropdown.map((entry) => (
            <li key={entry.href}>
              <Link to={entry.href} className={styles.topicLink}>
                {entry.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}

function DocCardListForCurrentSidebarCategory({className}: Props) {
  const items = useCurrentSidebarSiblings();
  return <DocCardList items={items} className={className} />;
}

export default function DocCardList(props: Props): ReactNode {
  const {items, className} = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  const rows = filteredItems
    .map((item) => resolveItem(item))
    .filter((v): v is ResolvedRow => v !== null);

  return (
    <ul className={`${styles.list} ${className ?? ''}`}>
      {rows.map((row) => (
        <DocListRow key={row.key} row={row} />
      ))}
    </ul>
  );
}
