import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { Router } from "next/router";
import { useRouter } from "next/router";
import clsx from "clsx";


export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`);
  const categories = await res.json();

  const allPostsData = getSortedPostsData();

  const restaurantsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/restaurants`
  );
  const restaurants = await restaurantsResponse.json();

  return {
    props: {
      categories,
      allPostsData,
      restaurants,
    },
  };
};

export default function Home({ categories, allPostsData, restaurants }) {
  //const router = useRouter()
  const [displayedRestaurants, setDisplayedRestaurants] = useState(restaurants);
  const [data, setData] = useState();

  const fetchRestaurants = async (selectedCategory) => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories/${selectedCategory}`
    );
    const restaurantsData = await req.json();
    return setData(restaurantsData.results);
  };

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const selectedCategory = e.target.value;

    if (!selectedCategory) {
      return false;
    }

    console.log(selectedCategory);

    const filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.categories.find((category) => category.id === selectedCategory)
    );

    console.log(filteredRestaurants);

    setDisplayedRestaurants(filteredRestaurants);
    return false;
  };

  // let newDate = new Date(params);
  // const currentTime = new Date().getTime();



  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! My name is Shockrates</p>
        <Link href="/about">
          <a>Check out some info about me!</a>
        </Link>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
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
        <h2 className={utilStyles.headingLg}>Check out some posts</h2>
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
                <Date dateString={date} getCurrent = {false} />
              </small>
            </li>
          ))}
        </ul>
        <button className={utilStyles.button} onClick={handleClick}>
          Say hi!
        </button>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {categories.map(({ id, name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/categories/${id}`}>
                <a>{name}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul> */}

        <div className="container" style={{ paddingBottom: "20px" }}>
          <h2 className={utilStyles.headingLg}>
            Here are my favourite restaurants by category!
          </h2>
          <div className="row">
            <div className="col-md-4">
              <select
                className="select"
                onChange={onCategoryChange}
                defaultValue={""}
              >
                <option value={""}>{`Food Categories`}</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {displayedRestaurants?.length ? (
          <div className="container" style={{ paddingBottom: "40px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Closes at</th>
                </tr>
              </thead>
              <tbody>
                {displayedRestaurants.map((restaurant) => {
                  //const criticalDateTime = new Date(criticalDate.deadline).getTime();
                  return (
                    <tr
                      key={restaurant.id}
                      // className={clsx({
                      //   ["table-row-active"]: currentTime <= criticalDateTime,
                      //   ["table-row-inactive"]: currentTime > criticalDateTime,
                      // })}
                    >
                      <td>{restaurant.name}</td>
                      <td>{restaurant.description}</td>
                      <td>{restaurant.closes_at.substring(0, 5)}</td>              
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="container" style={{ paddingBottom: "40px" }}>
            No results found!
          </div>
        )}
      </section>
    </Layout>
  );
}

const handleClick = (e) => {
  alert("Free pizza!");
  console.log(e);
};
