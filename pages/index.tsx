import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import React, { ChangeEvent, FC, useState } from "react";

export const getServerSideProps = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`);
  const categories = await res.json();

  const allPostsData = getSortedPostsData()
  return {
    props: {
      categories,
      allPostsData
    },
  };
};



const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
  e.preventDefault();
  const selectedRegion = e.target.value;

  // if (!selectedRegion) {
  //   setDisplayedVotePrograms(votePrograms);
  //   return false;
  // }

  // const filtered = votePrograms.filter((program) => program.continent === selectedRegion);

  // setDisplayedVotePrograms(filtered);
  // return false;
};




export default function Home({ categories, allPostsData }) {
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
        <h2 className={utilStyles.headingLg}>Check out my favourite restaurants per category!</h2>
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

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {categories.map(({ id, name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/categories/${id}`}>
                <a>{name}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul>


        <div className="container" style={{ paddingBottom: "20px" }}>
          <div className="row">
            <div className="col-md-4">
              <select className="form-select" onChange={onCategoryChange} defaultValue={""}>
                <option value={""}>{`Food Categories`}</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}


const handleClick = (e) => {
  alert('Free pizza!');
  console.log(e);
}