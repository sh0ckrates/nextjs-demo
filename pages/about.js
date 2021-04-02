import { GetServerSideProps } from "next";
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export const getServerSideProps = async () => {
    const response = await fetch(`https://reqres.in/api/users?page=1`);
    const users = await response.json();


    return {
        props: { users },
    };
};



export default function About({ users }) {
    users = users.data
    console.log(users)
    return (
        <Layout>
            <section className={utilStyles.headingMd}>
                <h3>About me</h3>
                <p>Shockrates is interested in sharing documents with many headings and subheadings. As a human we can easily tell the difference between headings and paragraphs based on context,
             but computers really struggle at this. So we use tags to 'mark up' the beginning and end of each piece of content.</p>
                <span>Check my portfolio </span><a href="https://github.com/pchalaris-singularlogic" target="_blank">on github!</a>
            </section>

            <section>
                <p>Here are my supervisors:</p>
                {users?.length ? (
                    <div className="container" style={{ paddingBottom: "40px" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className={utilStyles.th}>First name</th>
                                    <th scope="col" className={utilStyles.th}>Last name</th>
                                    <th scope="col" className={utilStyles.th}>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td className={utilStyles.td}>{user.first_name}</td>
                                            <td className={utilStyles.td}>{user.last_name}</td>
                                            <td className={utilStyles.td}>{user.email}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : null}{" "}
            </section>
        </Layout>
    )
}


const handleClick = (e) => {
    alert('Free pizza!');
    console.log(e);
}