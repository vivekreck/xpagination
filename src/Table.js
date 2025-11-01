import { useEffect, useState } from 'react';
import styles from './Table.module.css'

export const Table = () => {
    const [members, setMembers] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(
                    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMembers(data)
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again later.");
            }
        }
        getData();
    }, []);

    useEffect(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        setPaginatedData(members.slice(startIndex, endIndex));
    }, [page, members])

    function handlePreviousClick() {
        if ((page - 1) > 0) setPage(page - 1);
    }

    function handleNextClick() {
        if ((page + 1) < (members.length / pageSize + 1)) setPage(page + 1);
    }

    return (
        <div className={styles.container}>
            <h1>Employee Data Table</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedData.map((member, index) => {
                            return (
                                <tr kay={index}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>{member.role}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button onClick={handlePreviousClick}>Previous</button>
                <button className={styles.active}>{page}</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
        </div>
    );
};