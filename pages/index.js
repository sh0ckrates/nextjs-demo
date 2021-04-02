import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
//git clone "http://pchalaris@gerrit.10.82.5.96.xip.io/a/slg-cloud-apps/rolls"

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi my name is Shockrates</p>
        <Link href="/about">
          <a>Check out some info about me!</a>
        </Link>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <Link href="https://nextjs.org/learn">
            <a>our Next.js tutorial</a>
          </Link>
          .)
        </p>
        <Link href="/posts/first-post">
          <a>Check my first post</a>
        </Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {id}
              <br />
              <small className={utilStyles.lighText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        <button className={utilStyles.button} onClick={handleClick}>Say hi!</button>
      </section>
    </Layout>
  )
}


const handleClick = (e) => {
  alert('Free pizza!');
  console.log(e);
}