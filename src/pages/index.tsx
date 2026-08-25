import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// ---------------------------------------------------------------------------
// BOOKS CATALOG
//
// To add a new book, add one entry to this array. Each entry needs:
//   - title:       the book's display title
//   - description: a one-sentence summary shown on the card
//   - href:        the book's generated-index URL, i.e.
//                   /docs/category/<book-folder>, where <book-folder> is
//                   the folder name under docs/ that holds the book's
//                   _category_.json and its Part folders
//   - cover:        (optional) path to a cover image under static/, e.g.
//                   '/img/my-cover.jpg'. Omit it if the book has no cover
//                   yet — the card just won't show an image.
//
// New entries are appended to the grid in the order listed here.
// ---------------------------------------------------------------------------
type Book = {
  title: string;
  description: string;
  href: string;
  cover?: string;
};

const books: Book[] = [
  {
    title: 'Statistics for Data Science',
    description:
      'A complete guide to statistics for data science, from foundations to advanced statistical tests.',
    href: '/docs/category/statistics-for-data-science-concepts-methods',
    cover: '/img/statistics-for-data-science-cover.jpg',
  },
  {
    title: 'Federated Learning',
    description:
      'From fundamentals to advanced applications — architectures, algorithms, privacy, security, and trustworthy AI.',
    href: '/docs/category/federated-learning-from-fundamentals-to-advanced-applications',
    cover: '/img/federated-learning.png',
  },
  {
    title: 'Fundamentals of Machine Learning and Deep Learning',
    description:
      'From core ML algorithms to neural networks and transformers, with hands-on Python and end-to-end projects.',
    href: '/docs/category/fundamentals-of-machine-learning-and-deep-learning',
  },
  // Add the next book here, e.g.:
  // {
  //   title: 'Another Book Title',
  //   description: 'A one-sentence summary of the book.',
  //   href: '/docs/category/another-book-folder',
  //   cover: '/img/another-book-cover.jpg',
  // },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <p className={styles.heroSubtitle}>
          A growing library of books and notes on data, statistics, and
          software.
        </p>
      </div>
    </header>
  );
}

function BookCard({title, description, href, cover}: Book) {
  const coverSrc = useBaseUrl(cover ?? '');
  return (
    <Link to={href} className={styles.bookCard}>
      {cover && (
        <img
          src={coverSrc}
          alt={`${title} cover`}
          className={styles.bookCardCover}
        />
      )}
      <div className={styles.bookCardBody}>
        <Heading as="h3" className={styles.bookCardTitle}>
          {title}
        </Heading>
        <p className={styles.bookCardDescription}>{description}</p>
        <span className={styles.bookCardCta}>Start reading →</span>
      </div>
    </Link>
  );
}

function BooksSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Books
        </Heading>
        <div className={styles.bookGrid}>
          {books.map((book) => (
            <BookCard key={book.href} {...book} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NotesSection() {
  return (
    <section className={clsx(styles.section, styles.notesSection)}>
      <div className="container">
        <div className={styles.notesCallout}>
          <div>
            <Heading as="h2" className={styles.sectionTitle}>
              Notes
            </Heading>
            <p className={styles.notesDescription}>
              Shorter write-ups, references, and working notes that don't
              belong in a book.
            </p>
          </div>
          <Link to="/docs/category/notes" className={styles.notesLink}>
            Browse notes →
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          About
        </Heading>
        <p className={styles.aboutText}>
          Learn with Harish is an ongoing collection of books and notes,
          written to build clear, practical understanding one topic at a
          time. New books and notes are added over time, so this library is
          always a work in progress.
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A growing library of books and notes on data, statistics, and software.">
      <HomepageHeader />
      <main>
        <BooksSection />
        <NotesSection />
        <AboutSection />
      </main>
    </Layout>
  );
}
