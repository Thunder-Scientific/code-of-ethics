import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

const SECTIONS = [
  ['section-a', 'Section A'],
  ['section-b', 'Section B'],
  ['section-c', 'Section C'],
  ['section-d', 'Section D'],
  ['section-e', 'Section E'],
  ['section-f', 'Section F'],
  ['section-g', 'Section G'],
  ['section-h', 'Section H'],
];

export default function Home() {
  return (
    <Layout description="The Thunder Scientific Corporation Code of Ethics">
      <main style={{maxWidth: 760, margin: '0 auto', padding: '3rem 1rem'}}>
        <h1>Code of Ethics</h1>
        <p>The rulebook of the Thunder Scientific Corporation, maintained by the Ethics Committee.</p>
        <p>
          <Link className="button button--primary" to="/about/introduction">Start here</Link>
        </p>
        <h2>Sections</h2>
        <ul>
          {SECTIONS.map(([slug, label]) => (
            <li key={slug}><Link to={`/${slug}`}>{label}</Link></li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
